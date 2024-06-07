import React, { useState } from "react";
import "./reportForm.css";
import Heading from "../Heading/Heading";
import CloseIcon from "@mui/icons-material/Close";
import { Button, TextField, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  updateField,
  updateProbability,
  updateUplift,
  updateLoading,
  updateText,
} from "../../../features/form/formSlicer";
import BayesianGroup from "../Bayesian/BayesianGroup";

interface ReportFormProps {}

const ReportForm: React.FC<ReportFormProps> = () => {
  const formData = useSelector((state) => state.form.formData);
  const loading = useSelector((state) => state.form.loading);

  const dispatch = useDispatch();
  const [bayesianGroups, setBayesianGroups] = useState([{}]);

  const handleChangeNumber = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateText({ field: name, value }));
  };

  const addBayesianGroup = () => {
    setBayesianGroups([...bayesianGroups, {}]);
  };

  // const [image, setImage] = useState<string | null>(null);

  // const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files && event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (upload: ProgressEvent<FileReader>) => {
  //     if (upload.target && typeof upload.target.result === "string") {
  //       setImage(upload.target.result);
  //     }
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    bayesianGroups.forEach((_, index) => {
      calculateAndDispatchProbability(index);
      calculateUplift(index);

      setTimeout(() => {
        dispatch(updateLoading(true));
      });
    });

    console.log(loading);
  };

  const calculateAndDispatchProbability = (index: number) => {
    const usersA = formData[`bayesian-group-a-${index}`];
    const usersB = formData[`bayesian-group-b-${index}`];
    const conversionsA = formData[`bayesian-conversions-group-a-${index}`];
    const conversionsB = formData[`bayesian-conversions-group-b-${index}`];

    if (usersA > 0 && usersB > 0 && conversionsA > 0 && conversionsB > 0) {
      const probability = calculateProbability(
        usersA,
        usersB,
        conversionsA,
        conversionsB
      );
      dispatch(updateProbability({ index, probability }));
    }
  };

  const calculateUplift = (index: number) => {
    const usersA = formData[`bayesian-group-a-${index}`];
    const usersB = formData[`bayesian-group-b-${index}`];
    const conversionsA = formData[`bayesian-conversions-group-a-${index}`];
    const conversionsB = formData[`bayesian-conversions-group-b-${index}`];

    const conversionRateA = conversionsA / usersA;
    const conversionRateB = conversionsB / usersB;
    const uplift =
      ((conversionRateB - conversionRateA) / conversionRateA) * 100;

    dispatch(updateUplift({ index, uplift }));
  };

  const calculateProbability = (
    usersA: number,
    usersB: number,
    conversionsA: number,
    conversionsB: number
  ) => {
    const alphaPrior = 1;
    const betaPrior = 1;
    const alphaA = alphaPrior + conversionsA;
    const betaA = betaPrior + usersA - conversionsA;
    const alphaB = alphaPrior + conversionsB;
    const betaB = betaPrior + usersB - conversionsB;

    function betaSample(alpha, beta) {
      const gammaSampleA = gammaSample(alpha);
      const gammaSampleB = gammaSample(beta);
      return gammaSampleA / (gammaSampleA + gammaSampleB);
    }

    function gammaSample(alpha) {
      const d = alpha - 1 / 3;
      const c = 1 / Math.sqrt(9 * d);
      let x, v;
      do {
        x = gaussianSample();
        v = 1 + c * x;
      } while (v <= 0);
      v = v * v * v;
      const u = Math.random();
      if (u < 1 - 0.0331 * (x * x) * (x * x)) return d * v;
      if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
      return gammaSample(alpha);
    }

    function gaussianSample() {
      const u1 = Math.random();
      const u2 = Math.random();
      return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    }

    let probBGreaterA = 0;
    const sampleSize = 10000;
    for (let i = 0; i < sampleSize; i++) {
      const sampleA = betaSample(alphaA, betaA);
      const sampleB = betaSample(alphaB, betaB);

      if (sampleB > sampleA) {
        probBGreaterA++;
      }
    }

    return probBGreaterA / sampleSize;
  };

  const removeBayesianGroup = (index: number) => {
    if (bayesianGroups.length > 1) {
      const newGroups = [...bayesianGroups];
      newGroups.splice(index, 1);
      setBayesianGroups(newGroups);
    }
  };

  return (
    <>
      <Heading title={"Report data"}></Heading>
      <form className="report-form" onSubmit={handleSubmit}>
        <TextField
          label="Report title"
          variant="outlined"
          fullWidth
          type="text"
          margin="dense"
          name="report-title"
          value={formData["report-title"] || ""}
          onChange={handleChangeText}
        />
        <TextField
          label="Hypothesis"
          variant="outlined"
          multiline
          margin="dense"
          fullWidth
          name="report-hypothesis"
          value={formData["report-hypothesis"] || ""}
          onChange={handleChangeText}
        />
        <TextField
          label="Changes"
          variant="outlined"
          multiline
          margin="dense"
          fullWidth
          name="report-changes"
          value={formData["report-changes"] || ""}
          onChange={handleChangeText}
        />

        <div className="form-half">
          <TextField
            label="Runtime"
            variant="outlined"
            margin="dense"
            name="report-runtime"
            value={formData["report-runtime"] || ""}
            onChange={handleChangeText}
          />
          <TextField
            label="Targeting"
            variant="outlined"
            margin="dense"
            name="report-targeting"
            id="report-targeting"
            value={formData["report-targeting"] || ""}
            onChange={handleChangeText}
          />
          <TextField
            label="Location"
            variant="outlined"
            margin="dense"
            name="report-location"
            id="report-location"
            value={formData["report-location"] || ""}
            onChange={handleChangeText}
          />
          <TextField
            label="Runtime again"
            variant="outlined"
            margin="dense"
            name="report-runtime-again"
            id="report-runtime-again"
            value={formData["report-runtime-again"] || ""}
            onChange={handleChangeText}
          />
        </div>

        {bayesianGroups.map((_, index) => (
          <div key={index} className="bayesian-group-wrapper">
            {bayesianGroups.length > 1 && (
              <IconButton
                onClick={() => removeBayesianGroup(index)}
                aria-label="delete"
              >
                <CloseIcon />
              </IconButton>
            )}
            <BayesianGroup index={index} />
          </div>
        ))}

        <Button
          style={{ marginBottom: "2rem" }}
          onClick={addBayesianGroup}
          variant="outlined"
          color="primary"
        >
          Add Another Group
        </Button>

        <Button
          variant="contained"
          type="submit"
          id="report-data-submit"
          className="report-button"
        >
          Next
        </Button>
      </form>
    </>
  );
};

export default ReportForm;
