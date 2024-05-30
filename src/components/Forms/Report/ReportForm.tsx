import React, { useState } from "react"; // Import React
import "./reportForm.css";
import Heading from "../Heading/Heading";
import BayesianABTest from "../BayesionABtest/BayesianAB";

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

  const handleButtonClick = () => {
    const inputTitle = document.getElementById(
      "report-title"
    ) as HTMLInputElement;
    if (inputTitle && inputTitle.value.length > 0) {
      setReportTitle(inputTitle.value);

      isItFinished(true);
    }
  };

  return (
    <>
      <Heading title={"Report data"}></Heading>
      <form className="report-form">
        <label htmlFor="report-title">
          Report title
          <input
            type="text"
            name="report-title"
            id="report-title"
            defaultValue={reportTitle}
          />
        </label>
        <label htmlFor="report-hypothesis">
          Hypothesis
          <textarea name="report-hypothesis" id="report-hypothesis"></textarea>
        </label>
        <label htmlFor="report-changes">
          Changes
          <textarea name="report-changes" id="report-changes"></textarea>
        </label>
        <div className="form-half">
          <label htmlFor="report-runtime">
            Runtime
            <input type="text" name="report-runtime" id="report-runtime" />
          </label>
          <label htmlFor="report-targeting">
            Targeting
            <input type="text" name="report-targeting" id="report-targeting" />
          </label>
        </div>
        <div className="form-half">
          <label htmlFor="report-location">
            Location
            <input type="text" name="report-location" id="report-location" />
          </label>
          <label htmlFor="report-runtime">
            Runtime again
            <input type="text" name="report-runtime" id="report-runtime" />
          </label>

          {/* <label htmlFor="report-image">
            Upload image
            <input type="file" accept="image/*" onChange={handleUploadImage} />
            {image && (
              <img
                src={image}
                alt="Uploaded"
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </label> */}
        </div>

        <div className=""></div>

        <button
          type="button"
          id="report-data-submit"
          className="report-button"
          onClick={handleButtonClick}
        >
          Next
        </button>
      </form>
      <BayesianABTest />
    </>
  );
};

export default ReportForm;
