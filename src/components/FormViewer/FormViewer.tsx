import "./formViewer.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import ReportForm from "../Forms/Report/ReportForm";
// import TestForm from "../Forms/Test/TestForm";
// import BusinessForm from "../Forms/Business/BusinessForm";

interface Props {
  setReportTitle: (title: string) => void;
  reportTitle: string;
}

const FormViewer: React.FC<Props> = ({ setReportTitle, reportTitle }) => {
  return (
    <main className="main">
      <Routes>
        <Route
          path="/"
          element={
            <ReportForm
              setReportTitle={setReportTitle}
              reportTitle={reportTitle}
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
