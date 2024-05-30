import "./formViewer.css";
import { Routes, Route } from "react-router-dom";

import ReportForm from "../Forms/Report/ReportForm";
// import TestForm from "../Forms/Test/TestForm";
// import BusinessForm from "../Forms/Business/BusinessForm";

interface Props {
  setReportTitle: (title: string) => void;
  reportTitle: string;
  isItFinished: (finished: boolean) => void;
}

const FormViewer: React.FC<Props> = ({
  setReportTitle,
  reportTitle,
  isItFinished,
}) => {
  return (
    <main className="main">
      <Routes>
        <Route
          path="/"
          element={
            <ReportForm
              setReportTitle={setReportTitle}
              reportTitle={reportTitle}
              isItFinished={isItFinished}
            />
          }
        ></Route>
        {/* <Route path="/test" element={<TestForm />}></Route> */}
        {/* <Route path="/business" element={<BusinessForm />}></Route> */}
      </Routes>
    </main>
  );
};

export default FormViewer;
