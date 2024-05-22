import './reportForm.css';
import Heading from '../Heading/Heading';

const ReportForm = () => {
	return (
		<>
			<Heading title={'Report data'}></Heading>
			<form className="report-form">
				<label htmlFor="report-title">
					Report title
					<input type="text" name="report-title" id="report-title" />
				</label>
				<label htmlFor="report-hypothesis">
					Hypothesis
					<textarea name="report-hypothesis" id="report-hypothesis"></textarea>
				</label>
				<label htmlFor="report-changes">
					Changes
					<textarea name="report-changes" id="report-changes"></textarea>
				</label>
				<div className="form-half">
					<label htmlFor="report-runtime">
						Runtime
						<input type="text" name="report-runtime" id="report-runtime" />
					</label>
					<label htmlFor="report-targeting">
						Targeting
						<input type="text" name="report-targeting" id="report-targeting" />
					</label>
				</div>
				<div className="form-half">
					<label htmlFor="report-location">
						Location
						<input type="text" name="report-location" id="report-location" />
					</label>
					<label htmlFor="report-runtime">
						Runtime
						<input type="text" name="report-runtime" id="report-runtime" />
					</label>
				</div>
			</form>
		</>
	);
};

export default ReportForm;
