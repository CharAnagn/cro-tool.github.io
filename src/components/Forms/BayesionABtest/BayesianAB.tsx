import { useState } from "react";
import jStat from "jstat";
import "./Bayesian.css";

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
        <p>Probability that B is better than A: {(result * 100).toFixed(2)}%</p>
      )}
    </div>
  );
};

export default BayesianABTest;
