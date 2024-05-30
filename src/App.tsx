import "./App.css";
// import Sidebar from "./components/Sidebar/Sidebar";
import FormViewer from "./components/FormViewer/FormViewer";
import EndProduct from "./components/EndProduct/EndProduct";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isValid, setIsValid] = useState(false);
  const [reportTitle, setReportTitle] = useState("");

  return (
    <BrowserRouter>
      <div className={`page-container ${isValid ? "c-center" : ""}`}>
        {isValid ? (
          <EndProduct title={reportTitle} />
        ) : (
          <FormViewer
            setReportTitle={setReportTitle}
            reportTitle={reportTitle}
            isItFinished={setIsValid}
          ></FormViewer>
        )}
      </div>

      {/* <Sidebar></Sidebar> */}
    </BrowserRouter>
  );
}

export default App;
