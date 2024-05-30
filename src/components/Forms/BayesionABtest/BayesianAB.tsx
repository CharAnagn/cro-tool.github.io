import React, { useState } from "react";
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
import jStat from "jstat";
import "./Bayesian.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BayesianABTestProps {}

const BayesianABTest: React.FC<BayesianABTestProps> = () => {
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

  const data = {
    labels: ["Group A", "Group B"],
    datasets: [
      {
        label: `Probability A is better than B: ${(100 - result * 100).toFixed(
          2
        )}%`,
        data: [100 - result * 100, result * 100],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },

    indexAxis: "x",
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="bayesian-form-wrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Users in Group A:
            <input
              type="number"
              value={usersA}
              onChange={handleInputChange(setUsersA)}
            />
          </label>
        </div>
        <div>
          <label>
            Users in Group B:
            <input
              type="number"
              value={usersB}
              onChange={handleInputChange(setUsersB)}
            />
          </label>
        </div>
        <div>
          <label>
            Conversions in Group A:
            <input
              type="number"
              value={conversionsA}
              onChange={handleInputChange(setConversionsA)}
            />
          </label>
        </div>
        <div>
          <label>
            Conversions in Group B:
            <input
              type="number"
              value={conversionsB}
              onChange={handleInputChange(setConversionsB)}
            />
          </label>
        </div>
        <button type="submit">Calculate</button>
      </form>
      {result !== null && (
        <>
          <Bar data={data} options={options} />
          <p>
            Probability that B is better than A: {(result * 100).toFixed(2)}%
          </p>
        </>
      )}
    </div>
  );
};

export default BayesianABTest;
