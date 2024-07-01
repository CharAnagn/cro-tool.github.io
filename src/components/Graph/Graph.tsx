import React, { useState } from "react";
import "./Graph.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

interface Props {
  percentage: number;
  indexNumber: number;
  key: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph: React.FC<Props> = ({ percentage, indexNumber }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const inputData = useSelector((state) => state.form);
  const formData = useSelector((state) => state.form.formData);

  const usersA = formData[`bayesian-group-a-${indexNumber}`];
  const usersB = formData[`bayesian-group-b-${indexNumber}`];
  const conversionsA = formData[`bayesian-conversions-group-a-${indexNumber}`];
  const conversionsB = formData[`bayesian-conversions-group-b-${indexNumber}`];
  const kpi = formData[`bayesian-kpi-${indexNumber}`];
  const conversionRateA = ((conversionsA / usersA) * 100).toFixed(2);
  const conversionRateB = ((conversionsB / usersB) * 100).toFixed(2);

  const upliftB = inputData.uplift[indexNumber].replace("%", "");
  const upliftA = ((conversionRateA - conversionRateB) / conversionRateB) * 100;

  const data = {
    labels: ["Group A", "Group B"],
    datasets: [
      {
        label: [`Probability A is better than B`],
        data: inView ? [(100 - percentage).toFixed(2), percentage] : [0, 0],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 0.2)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100,
      },
    },
    indexAxis: "y",
    animation: {
      duration: inView ? 2500 : 0, // Animation duration when in view
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "blue",
          font: {
            size: 14,
            family: "Helvetica",
          },
          padding: 20,
          boxWidth: 20,
          boxHeight: 10,
        },
        title: {
          display: true,
          text: kpi,
          color: "black",
          font: {
            size: 24,
            family: "Arial",
          },
        },
      },
      title: {
        display: true,
        text: "Probability Comparison",
        color: "black",
        font: {
          size: 26,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const labelIndex = tooltipItem.dataIndex;
            const label =
              labelIndex === 0
                ? `Probability A is better than B: ${(100 - percentage).toFixed(
                    2
                  )}%`
                : `Probability B is better than A: ${percentage}%`;
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="graph-container" ref={ref}>
      <Bar data={data} options={options} />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Users</th>
              <th>Conversion</th>
              <th>CR</th>
              <th>Uplift</th>
              <th>Chance of being best</th>
            </tr>
          </thead>
          <tbody>
            {Number(upliftB) > 0 ? (
              <>
                <tr>
                  <td>A</td>
                  <td>{usersA}</td>
                  <td>{conversionsA}</td>
                  <td>{Number(conversionRateA).toFixed(2)}%</td>
                  <td></td>
                  <td>{(100 - percentage).toFixed(2)}%</td>
                </tr>
                <tr>
                  <td>B</td>
                  <td>{usersB}</td>
                  <td>{conversionsB}</td>
                  <td>{Number(conversionRateB).toFixed(2)}%</td>
                  <td>{upliftB}%</td>
                  <td>{percentage}%</td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>A</td>
                  <td>{usersA}</td>
                  <td>{conversionsA}</td>
                  <td>{Number(conversionRateA).toFixed(2)}%</td>
                  <td>{upliftA.toFixed(2)}%</td>
                  <td>{(100 - percentage).toFixed(2)}%</td>
                </tr>
                <tr>
                  <td>B</td>
                  <td>{usersB}</td>
                  <td>{conversionsB}</td>
                  <td>{Number(conversionRateB).toFixed(2)}%</td>
                  <td></td>
                  <td>{percentage}%</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {Number(upliftB) > 0 ? (
        percentage > 90 ? (
          <p className="graph-text">
            {kpi}: Significant increase of{" "}
            <span className="significant">({upliftB}%)</span> and{" "}
            <span className="significant">({percentage}%)</span> chance that the
            new variant is better
          </p>
        ) : (
          <p className="graph-text">
            {kpi}: Increase of <span>({upliftB}%)</span> and{" "}
            <span>({percentage}%)</span> chance that the new variant is better
          </p>
        )
      ) : percentage > 90 ? (
        <p className="graph-text">
          {kpi}: Significant increase of{" "}
          <span className="significant">({upliftA.toFixed(2)}%)</span> and{" "}
          <span className="significant">
            ({(100 - percentage).toFixed(2)}% )
          </span>{" "}
          chance that control is better
        </p>
      ) : (
        <p className="graph-text">
          {kpi}: Increase of <span>({upliftA.toFixed(2)}%)</span> and{" "}
          <span>({(100 - percentage).toFixed(2)})</span> chance that control is
          better
        </p>
      )}
    </div>
  );
};

export default Graph;
