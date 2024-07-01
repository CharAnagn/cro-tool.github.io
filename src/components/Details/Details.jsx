import React from "react";
import "./Details.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Details = () => {
  const data = useSelector((state) => state.form.formData);
  const images = useSelector((state) => state.form.images);

  const reportTitle = data["report-title"];
  const reportChanges = data["report-changes"];
  const reportHypothesis = data["report-hypothesis"];
  const reportReccomendation = data["report-reccomendation"];

  const originalDesktop = images["originalDesktop"];
  const originalMobile = images["originalMobile"];
  const variantDesktop = images["variantDesktop"];
  const variantMobile = images["variantMobile"];

  return (
    <div className="details-wrapper">
      <h1>{reportTitle}</h1>
      <div className="details-container">
        <h3>Hypothesis</h3>
        <p>{reportHypothesis}</p>
      </div>

      <div className="details-container">
        <h3>Changes in variation</h3>
        <p>{reportChanges}</p>
      </div>

      <div className="details-container">
        <h3>Reccomendation</h3>
        <p>{reportReccomendation}</p>
      </div>

      <div className="images-wrapper">
        <div className="images-container_original images_container">
          <h3>Original</h3>
          <div className="images">
            {originalDesktop ? (
              <img
                className="image-desktop"
                src={originalDesktop}
                alt="Uploaded"
              />
            ) : null}
            {originalMobile ? (
              <img
                className="image-mobile"
                src={originalMobile}
                alt="Uploaded"
              />
            ) : null}
          </div>
        </div>

        <div className="images-container_original images_container">
          <h3>Variant</h3>
          <div className="images">
            {variantDesktop ? (
              <img
                className="image-desktop"
                src={variantDesktop}
                alt="Uploaded"
              />
            ) : null}
            {variantMobile ? (
              <img
                className="image-mobile"
                src={variantMobile}
                alt="Uploaded"
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Details;
