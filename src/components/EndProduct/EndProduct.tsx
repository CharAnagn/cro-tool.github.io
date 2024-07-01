import React from "react";
import "./endProduct.css";
import croImage from "../../../public/images/smallgiants.jpeg";
import Graph from "../Graph/Graph";
import { useSelector } from "react-redux";
import Details from "../Details/Details";
import ExperimentSummary from "../ExoerimentSummary/ExperimentSummary";

interface Props {
  title: string;
}

const EndProduct: React.FC<Props> = ({ title }) => {
  const probabilityData = useSelector((state) => state.form.probability);

  return (
    <div className="cro-wrapper">
      <div className="cro-image-container">
        <img src={croImage} alt="CRO Screenshot" />
        <h2 className="cro-title">{title}</h2>
      </div>

      <Details />
      <ExperimentSummary />
      {probabilityData.map((probability: number, index: number) => (
        <Graph percentage={probability} indexNumber={index} key={index} />
      ))}
    </div>
  );
};

export default EndProduct;
