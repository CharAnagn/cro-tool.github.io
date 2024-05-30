import { useState } from 'react';
import jStat from 'jstat';
import './Bayesian.css';
import { TextField, Button } from '@mui/material';

interface BayesianABTestProps {}

const BayesianABTest: React.FC<BayesianABTestProps> = () => {
	const [usersA, setUsersA] = useState<number>(0);
	const [usersB, setUsersB] = useState<number>(0);
	const [conversionsA, setConversionsA] = useState<number>(0);
	const [conversionsB, setConversionsB] = useState<number>(0);
	const [result, setResult] = useState<number | null>(null);

	const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setter(Number(event.target.value));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const probBIsBetter = calculateProbability(usersA, usersB, conversionsA, conversionsB);
		setResult(probBIsBetter);
	};

	const calculateProbability = (usersA: number, usersB: number, conversionsA: number, conversionsB: number): number => {
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
					<TextField
						label="ChanUsers in Group A:"
						variant="outlined"
						type="number"
						margin="dense"
						fullWidth
						name="report-changes"
						id="report-changes"
						value={usersA}
						onChange={handleInputChange(setUsersA)}
					/>
				</div>
				<div>
					<TextField
						label="ChanUsers in Group B:"
						variant="outlined"
						type="number"
						margin="dense"
						fullWidth
						name="report-changes"
						id="report-changes"
						value={usersB}
						onChange={handleInputChange(setUsersB)}
					/>
				</div>
				<div>
					<TextField
						label="Conversions in Group A:"
						variant="outlined"
						type="number"
						margin="dense"
						fullWidth
						name="report-changes"
						id="report-changes"
						value={conversionsA}
						onChange={handleInputChange(setConversionsA)}
					/>
				</div>
				<div>
					<TextField
						label="Conversions in Group B:"
						variant="outlined"
						type="number"
						margin="dense"
						fullWidth
						name="report-changes"
						id="report-changes"
						value={conversionsB}
						onChange={handleInputChange(setConversionsB)}
					/>
				</div>
				<div className="control">
					<Button type="submit" variant="contained">
						Calculate
					</Button>
				</div>
				<div className="results">
					{result !== null && (
						<p>
							Probability that B is better than A: <span className="result">{(result * 100).toFixed(2)}%</span>
						</p>
					)}
				</div>
			</form>
		</div>
	);
};

export default BayesianABTest;
