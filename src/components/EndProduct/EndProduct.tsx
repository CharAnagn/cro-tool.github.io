import React from "react";
import "./endProduct.css";
import croImage from "../../../public/images/Screenshot 2024-05-26 at 15.48.35.png";
import Graph from "../Graph/Graph";
import { useSelector } from "react-redux";

interface Props {
  title: string;
}

const EndProduct: React.FC<Props> = ({ title }) => {
  const data = useSelector((state) => state.form);
  const probabilityData = useSelector((state) => state.form.probability);
  console.log(data, "data");
  return (
    <div className="cro-wrapper">
      <div className="cro-image-container">
        <img src={croImage} alt="CRO Screenshot" />
        <h2 className="cro-title">{title}</h2>
      </div>

      {/* Put code between here */}

      {probabilityData.map((probability: number, index: number) => (
        <Graph percentage={probability} indexNumber={index} key={index} />
      ))}
    </div>
  );
};

export default EndProduct;
