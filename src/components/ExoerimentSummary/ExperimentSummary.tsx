import "./experimentSummary.css";
import { useSelector } from "react-redux";
import ResultItem from "../ResultItem/ResultItem";

const ExperimentSummary = () => {
  const probabilityData = useSelector((state) => state.form.probability);
  const daysDifference = useSelector((state) => state.form.daysDifference);
  const targeting = useSelector(
    (state) => state.form.formData["report-targeting"]
  );
  const location = useSelector(
    (state) => state.form.formData["report-location"]
  );
  const dateRange = useSelector(
    (state) => state.form.formData["report-date-range"]
  );
  const startingDate = useSelector((state) => state.form.startingDate);

  const endingDate = useSelector((state) => state.form.endingDate);
  console.log(startingDate, "startingDate", endingDate, "endingDate");
  return (
    <div className="summary-wrapper">
      <h2>Experiment Summary</h2>

      <div className="summary-container">
        <h3>Results</h3>
        <div className="results-container">
          {probabilityData.map((probability: number, index: number) => (
            <ResultItem
              percentage={probability}
              indexNumber={index}
              key={index}
            />
          ))}
        </div>

        <div className="experiment-data">
          <h3 className="experiment-data_title">Experiment Data:</h3>
          <div className="experiment-data_details">
            <div className="experiment-data_item">
              <div>Runtime:</div>
              <div>{daysDifference} Days</div>
            </div>
            <div className="experiment-data_item">
              <div>Targeting:</div>
              <div>
                {targeting.length > 1 ? targeting.join(", ") : targeting[0]}
              </div>
            </div>

            <div className="experiment-data_item">
              <div>Location:</div>
              <div>{location}</div>
            </div>

            <div className="experiment-data_item">
              <div>Date Range:</div>
              <div>
                {startingDate} - {endingDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentSummary;
