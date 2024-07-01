import React, { useState } from "react";
import "./reportForm.css";
import Heading from "../Heading/Heading.tsx";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  TextField,
  IconButton,
  Box,
  MenuItem,
  Checkbox,
  ListItemText,
  Select,
  Typography,
} from "@mui/material";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProbability,
  updateUplift,
  updateLoading,
  updateText,
  updateImage,
  updateSelect,
  updateStartingDate,
  updateEndingDate,
  updateDateDifference,
} from "../../../features/form/formSlicer.js";
import BayesianGroup from "../Bayesian/BayesianGroup.tsx";
import dayjs from "dayjs";

const ReportForm = () => {
  const formData = useSelector((state) => state.form.formData);
  const dispatch = useDispatch();
  const [bayesianGroups, setBayesianGroups] = useState([{}]);
  console.log(formData, "formData");
  const handleChangeText = (e) => {
    const { name, value } = e.target;
    dispatch(updateText({ field: name, value }));
  };

  const addBayesianGroup = () => {
    setBayesianGroups([...bayesianGroups, {}]);
  };

  const handleChangeSelectLocation = (e) => {
    let selectedOptions = e.target.value;

    if (
      selectedOptions &&
      selectedOptions.length > 1 &&
      selectedOptions.includes("Select location")
    ) {
      const index = selectedOptions.indexOf("Select location");
      selectedOptions.splice(index, 1);
    } else if (selectedOptions.length < 1) {
      selectedOptions = ["Select location"];
    }

    dispatch(
      updateSelect({ field: "report-location", value: selectedOptions })
    );
  };

  const handleChangeSelectTargeting = (e) => {
    let selectedOptions = e.target.value;

    if (
      selectedOptions &&
      selectedOptions.length > 1 &&
      selectedOptions.includes("Select targeting")
    ) {
      const index = selectedOptions.indexOf("Select targeting");
      selectedOptions.splice(index, 1);
    } else if (selectedOptions.length < 1) {
      selectedOptions = ["Select targeting"];
    }

    dispatch(
      updateSelect({ field: "report-targeting", value: selectedOptions })
    );
  };

  const handleUploadImage = (key) => (event) => {
    const file = event.target.files && event.target.files[0];
    const reader = new FileReader();

    reader.onload = (upload) => {
      if (upload.target && typeof upload.target.result === "string") {
        dispatch(updateImage({ key, image: upload.target.result }));
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0 });

    bayesianGroups.forEach((_, index) => {
      calculateAndDispatchProbability(index);
      calculateUplift(index);

      setTimeout(() => {
        dispatch(updateLoading(true));
      });
    });
  };

  const calculateAndDispatchProbability = (index) => {
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

  const calculateUplift = (index) => {
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

  const calculateProbability = (usersA, usersB, conversionsA, conversionsB) => {
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

  const removeBayesianGroup = (index) => {
    if (bayesianGroups.length > 1) {
      const newGroups = [...bayesianGroups];
      newGroups.splice(index, 1);
      setBayesianGroups(newGroups);
    }
  };

  // const { startingDate, endingDate, dayDifference } = useSelector(
  //   (state) => state.form
  // );

  // const handleDateChange = (newStartDate, newEndDate) => {
  //   dispatch(
  //     updateDates({ startingDate: newStartDate, endingDate: newEndDate })
  //   );
  // };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dayDifference, setDayDifference] = useState(null);

  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    if (newStartDate && newEndDate) {
      const difference = dayjs(newEndDate).diff(dayjs(newStartDate), "day");
      const startingDate = newStartDate.format("dddd MMM D YYYY");
      const endingDate = newEndDate.format("dddd MMM D YYYY");

      dispatch(updateDateDifference(difference));
      dispatch(updateStartingDate(startingDate));
      dispatch(updateEndingDate(endingDate));
    } else {
      return;
    }
  };

  const targetingOptions = ["Desktop", "Mobile", "Tablet", "All Devices"];

  const locationOptions = [
    "Homepage",
    "PDP",
    "PLP",
    "Cart",
    "Checkout",
    "Sitewide",
  ];

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
          type="text"
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
          type="text"
          margin="dense"
          fullWidth
          name="report-changes"
          value={formData["report-changes"] || ""}
          onChange={handleChangeText}
        />

        <TextField
          label="Recommendation"
          variant="outlined"
          multiline
          margin="dense"
          fullWidth
          name="report-reccomendation"
          value={formData["report-reccomendation"] || ""}
          onChange={handleChangeText}
        />

        <div className="form-images">
          <h2>Upload images</h2>
          <div className="images-container">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: "20px" }}
              >
                Original Desktop:
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleUploadImage("originalDesktop")}
                />
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: "20px" }}
              >
                Original Mobile:
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleUploadImage("originalMobile")}
                />
              </Button>
            </Box>
          </div>

          <div className="images-container">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: "20px" }}
              >
                Variant Desktop:
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleUploadImage("variantDesktop")}
                />
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: "20px" }}
              >
                Variant Mobile:
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleUploadImage("variantMobile")}
                />
              </Button>
            </Box>
          </div>
        </div>

        <div className="form-half">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              gap="20px"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                gap="20px"
              >
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  sx={{ width: "100%" }}
                  onChange={(newValue) => {
                    handleDateChange(newValue, endDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  sx={{ width: "100%" }}
                  minDate={startDate}
                  onChange={(newValue) => {
                    handleDateChange(startDate, newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              {dayDifference !== null && (
                <Typography variant="h6">
                  Difference: {dayDifference} day{dayDifference !== 1 && "s"}
                </Typography>
              )}
            </Box>
          </LocalizationProvider>
        </div>
        <Select
          variant="outlined"
          margin="dense"
          name="report-targeting"
          id="report-targeting"
          multiple
          value={
            formData["report-targeting"].length > 0
              ? formData["report-targeting"]
              : ["Select targeting"]
          }
          onChange={handleChangeSelectTargeting}
          renderValue={(selected) => selected.join(", ")}
          className="select-input"
        >
          {targetingOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                checked={formData["report-targeting"]?.indexOf(option) > -1}
              />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>

        <Select
          variant="outlined"
          margin="dense"
          name="report-location"
          id="report-location"
          multiple
          value={
            formData["report-location"].length > 0
              ? formData["report-location"]
              : ["Select location"]
          }
          onChange={handleChangeSelectLocation}
          renderValue={(selected) => selected.join(", ")}
          className="select-input"
        >
          {locationOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                checked={formData["report-location"]?.indexOf(option) > -1}
              />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>

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
          Add Another KPI
        </Button>

        <Button
          variant="contained"
          type="submit"
          id="report-data-submit"
          className="report-button"
        >
          Generate
        </Button>
      </form>
    </>
  );
};

export default ReportForm;
