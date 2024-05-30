import React, { useState } from 'react'; // Import React
import './reportForm.css';
import Heading from '../Heading/Heading';
import BayesianABTest from '../BayesionABtest/BayesianAB';
import { Button, TextField } from '@mui/material';

interface ReportFormProps {
	reportTitle: string;
	setReportTitle: (title: string) => void;
	isItFinished: (finished: boolean) => void; // Now expects a boolean parameter
}

const ReportForm: React.FC<ReportFormProps> = ({ reportTitle, setReportTitle, isItFinished }) => {
	// const [image, setImage] = useState<string | null>(null);

	// const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
	//   const file = event.target.files && event.target.files[0];
	//   const reader = new FileReader();

	//   reader.onload = (upload: ProgressEvent<FileReader>) => {
	//     if (upload.target && typeof upload.target.result === "string") {
	//       setImage(upload.target.result);
	//     }
	//   };

	//   if (file) {
	//     reader.readAsDataURL(file);
	//   }
	// };

	const handleButtonClick = () => {
		const inputTitle = document.getElementById('report-title') as HTMLInputElement;
		if (inputTitle && inputTitle.value.length > 0) {
			setReportTitle(inputTitle.value);

			isItFinished(true);
		}
	};

	return (
		<>
			<Heading title={'Report data'}></Heading>
			<form className="report-form">
				<TextField
					label="Report title"
					variant="outlined"
					fullWidth
					type="text"
					margin="dense"
					name="report-title"
					id="report-title"
					defaultValue={reportTitle}
				/>
				<TextField label="Hypothesis" variant="outlined" multiline margin="dense" fullWidth name="report-hypothesis" id="report-hypothesis" />
				<TextField label="Changes" variant="outlined" multiline margin="dense" fullWidth name="report-changes" id="report-changes" />

				<div className="form-half">
					<TextField label="Runtime" variant="outlined" margin="dense" name="report-runtime" id="report-runtime" />
					<TextField label="Targeting" variant="outlined" margin="dense" name="report-targeting" id="report-targeting" />
					<TextField label="Location" variant="outlined" margin="dense" name="report-location" id="report-location" />
					<TextField label="Runtime again" variant="outlined" margin="dense" name="report-runtime-again" id="report-runtime-again" />
				</div>

				{/* <label htmlFor="report-image">
            Upload image
            <input type="file" accept="image/*" onChange={handleUploadImage} />
            {image && (
              <img
                src={image}
                alt="Uploaded"
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </label> */}

				<Button variant="contained" type="button" id="report-data-submit" className="report-button" onClick={handleButtonClick}>
					Next
				</Button>
			</form>
			<BayesianABTest />
		</>
	);
};

export default ReportForm;
