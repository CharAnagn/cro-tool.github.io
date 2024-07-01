import React from "react";

import { useSelector } from "react-redux";

interface Props {
  percentage: number;
  indexNumber: number;
}

const ResultItem: React.FC<Props> = ({ percentage, indexNumber }) => {
  const inputData = useSelector((state) => state.form);
  const formData = useSelector((state) => state.form.formData);
  const kpi = formData[`bayesian-kpi-${indexNumber}`];

  const upliftB = inputData.uplift[indexNumber].replace("%", "");

  const isSignificant = percentage > 90;

  return (
    <div className="result-item">
      <div className="result-title">
        {indexNumber === 0 ? "Main Kpi:" : `${kpi}:`}
      </div>

      {isSignificant ? (
        <div className="result-info">
          {kpi}: Significant increase of{" "}
          <span className="significant">({upliftB}%)</span> and{" "}
          <span className="significant">({percentage}%)</span>
          chance that the new variant is better
        </div>
      ) : (
        <div className="result-info">
          {kpi}: Not significant increase of{" "}
          <span className="not-significant">({upliftB}%)</span> and{" "}
          <span className="not-significant">({percentage}%)</span> change that
          the new variant is better
        </div>
      )}
    </div>
  );
};

export default ResultItem;
