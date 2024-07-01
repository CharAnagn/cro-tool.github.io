import "./App.css";
import React from "react";
import { RootState } from "./store";
import FormViewer from "./components/FormViewer/FormViewer";
import EndProduct from "./components/EndProduct/EndProduct";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const loading = useSelector((state: RootState) => state.form.loading);
  const [reportTitle, setReportTitle] = useState("");

  return (
    <BrowserRouter>
      <div className={`page-container ${loading ? "c-center" : ""}`}>
        {loading ? (
          <EndProduct title={reportTitle} />
        ) : (
          <FormViewer
            setReportTitle={setReportTitle}
            reportTitle={reportTitle}
          ></FormViewer>
        )}
      </div>

      {/* <Sidebar></Sidebar> */}
    </BrowserRouter>
  );
}

export default App;
