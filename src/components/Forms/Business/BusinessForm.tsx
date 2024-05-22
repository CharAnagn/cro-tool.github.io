import './businessForm.css';
import Heading from '../Heading/Heading';

const BusinessForm = () => {
	return (
		<>
			<Heading title={'Business data'}></Heading>
			<form className="business-form">
				<label htmlFor="business-title">
					Business title
					<input type="text" name="business-title" id="business-title" />
				</label>
				<label htmlFor="business-hypothesis">
					Hypothesis
					<textarea name="business-hypothesis" id="business-hypothesis"></textarea>
				</label>
				<label htmlFor="business-changes">
					Changes
					<textarea name="business-changes" id="business-changes"></textarea>
				</label>
				<div className="form-half">
					<label htmlFor="business-runtime">
						Runtime
						<input type="text" name="business-runtime" id="business-runtime" />
					</label>
					<label htmlFor="business-targeting">
						Targeting
						<input type="text" name="business-targeting" id="business-targeting" />
					</label>
				</div>
				<div className="form-half">
					<label htmlFor="business-location">
						Location
						<input type="text" name="business-location" id="business-location" />
					</label>
					<label htmlFor="business-runtime">
						Runtime
						<input type="text" name="business-runtime" id="business-runtime" />
					</label>
				</div>
			</form>
		</>
	);
};

export default BusinessForm;
