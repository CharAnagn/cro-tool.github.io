import React, { useState } from "react"; // Import React
import "./reportForm.css";
import Heading from "../Heading/Heading";
import BayesianABTest from "../BayesionABtest/BayesianAB";
import { Button, TextField } from "@mui/material";

interface ReportFormProps {
  reportTitle: string;
  setReportTitle: (title: string) => void;
  isItFinished: (finished: boolean) => void; // Now expects a boolean parameter
}

const ReportForm: React.FC<ReportFormProps> = ({
  reportTitle,
  setReportTitle,
  isItFinished,
}) => {
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

  const [usersA, setUsersA] = useState<number>(0);
  const [usersB, setUsersB] = useState<number>(0);
  const [conversionsA, setConversionsA] = useState<number>(0);
  const [conversionsB, setConversionsB] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(event.target.value));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("inside handleSubmit");
    event.preventDefault();
    const probBIsBetter = calculateProbability(
      usersA,
      usersB,
      conversionsA,
      conversionsB
    );
    setResult(probBIsBetter);
  };

  const calculateProbability = (
    usersA: number,
    usersB: number,
    conversionsA: number,
    conversionsB: number
  ): number => {
    const alphaPrior = 1;
    const betaPrior = 1;
    const alphaA = alphaPrior + conversionsA;
    const betaA = betaPrior + usersA - conversionsA;
    const alphaB = alphaPrior + conversionsB;
    const betaB = betaPrior + usersB - conversionsB;

    let probBGreaterA = 0;
    const sampleSize = 10000;
    for (let i = 0; i < sampleSize; i++) {
      const sampleA = jStat.beta.sample(alphaA, betaA);
      const sampleB = jStat.beta.sample(alphaB, betaB);
      if (sampleB > sampleA) probBGreaterA++;
    }

    return probBGreaterA / sampleSize;
  };

  const handleButtonClick = () => {
    const inputTitle = document.getElementById(
      "report-title"
    ) as HTMLInputElement;
    if (inputTitle && inputTitle.value.length > 0) {
      setReportTitle(inputTitle.value);

      // isItFinished(true);
    }
    console.log("click");
  };

  return (
    <>
      <Heading title={"Report data"}></Heading>
      <form className="report-form" onSubmit={handleButtonClick}>
        <TextField
          label="Report title"
          variant="outlined"
          fullWidth
          type="text"
          margin="dense"
          name="report-title"
          id="report-title"
          defaultValue={reportTitle}
        />
        <TextField
          label="Hypothesis"
          variant="outlined"
          multiline
          margin="dense"
          fullWidth
          name="report-hypothesis"
          id="report-hypothesis"
        />
        <TextField
          label="Changes"
          variant="outlined"
          multiline
          margin="dense"
          fullWidth
          name="report-changes"
          id="report-changes"
        />

        <div className="form-half">
          <TextField
            label="Runtime"
            variant="outlined"
            margin="dense"
            name="report-runtime"
            id="report-runtime"
          />
          <TextField
            label="Targeting"
            variant="outlined"
            margin="dense"
            name="report-targeting"
            id="report-targeting"
          />
          <TextField
            label="Location"
            variant="outlined"
            margin="dense"
            name="report-location"
            id="report-location"
          />
          <TextField
            label="Runtime again"
            variant="outlined"
            margin="dense"
            name="report-runtime-again"
            id="report-runtime-again"
          />
        </div>

        <BayesianABTest
          usersA={usersA}
          handleUsersA={handleInputChange(setUsersA)}
          usersB={usersB}
          handleUsersB={handleInputChange(setUsersB)}
          result={result}
          conversionA={conversionsA}
          handleConversionA={handleInputChange(setConversionsA)}
          conversionB={conversionsB}
          handleConversionB={handleInputChange(setConversionsB)}
          submitForm={handleSubmit}
        />
      </form>

      <Button
        variant="contained"
        type="button"
        id="report-data-submit"
        className="report-button"
        onClick={handleButtonClick}
      >
        Next
      </Button>
    </>
  );
};

export default ReportForm;
