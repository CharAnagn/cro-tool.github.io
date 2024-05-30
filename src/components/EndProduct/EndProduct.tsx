import React from "react";
import "./endProduct.css";
import croImage from "../../../public/images/Screenshot 2024-05-26 at 15.48.35.png";

interface Props {
  title: string;
}

const EndProduct: React.FC<Props> = ({ title }) => {
  return (
    <div className="cro-wrapper">
      <div className="cro-image-container">
        <img src={croImage} alt="CRO Screenshot" />
        <h2 className="cro-title">{title}</h2>
      </div>
    </div>
  );
};

export default EndProduct;
