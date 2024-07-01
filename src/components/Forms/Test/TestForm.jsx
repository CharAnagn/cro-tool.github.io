import "./testForm.css";
import Heading from "../Heading/Heading";

const TestForm = () => {
  return (
    <>
      <Heading title={"Test data"}></Heading>
      <form className="test-form">
        <label htmlFor="test-title">
          Test title
          <input type="text" name="test-title" id="test-title" />
        </label>
        <label htmlFor="test-hypothesis">
          Hypothesis
          <textarea name="test-hypothesis" id="test-hypothesis"></textarea>
        </label>
        <label htmlFor="test-changes">
          Changes
          <textarea name="test-changes" id="test-changes"></textarea>
        </label>
        <div className="form-half">
          <label htmlFor="test-runtime">
            Runtime
            <input type="text" name="test-runtime" id="test-runtime" />
          </label>
          <label htmlFor="test-targeting">
            Targeting
            <input type="text" name="test-targeting" id="test-targeting" />
          </label>
        </div>
        <div className="form-half">
          <label htmlFor="test-location">
            Location
            <input type="text" name="test-location" id="test-location" />
          </label>
          <label htmlFor="test-runtime">
            Runtime
            <input type="text" name="test-runtime" id="test-runtime" />
          </label>
        </div>
      </form>
    </>
  );
};

export default TestForm;
