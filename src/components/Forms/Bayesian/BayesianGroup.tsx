import React from "react";
import "./Bayesian.css";
import { TextField } from "@mui/material";
import { updateField, updateText } from "../../../features/form/formSlicer";

import { useSelector, useDispatch } from "react-redux";

interface BayesianGroupProps {
  index: number;
}

const BayesianGroup: React.FC<BayesianGroupProps> = ({ index }) => {
  const formData = useSelector((state) => state.form.formData);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateText({ field: name, value }));
  };

  return (
    <div className="bayesian-form-wrapper">
      <TextField
        label={index === 0 ? "Main KPI" : "KPI"}
        variant="outlined"
        fullWidth
        type="text"
        margin="dense"
        name={`bayesian-kpi-${index}`}
        value={formData[`bayesian-kpi-${index}`] || ""}
        onChange={handleChangeText}
      />

      <div className="bayesian-inputs-wrapper">
        <div className="bayesian-container">
          <TextField
            label="Users in Group A"
            variant="outlined"
            margin="dense"
            type="number"
            inputProps={{ min: 0 }}
            name={`bayesian-group-a-${index}`}
            value={formData[`bayesian-group-a-${index}`] || ""}
            onChange={handleChange}
          />

          <TextField
            label="Conversions in Group A"
            variant="outlined"
            margin="dense"
            type="number"
            inputProps={{ min: 0 }}
            name={`bayesian-conversions-group-a-${index}`}
            value={formData[`bayesian-conversions-group-a-${index}`] || ""}
            onChange={handleChange}
          />
        </div>
        <div className="bayesian-container">
          <TextField
            label="Users in Group B"
            variant="outlined"
            margin="dense"
            type="number"
            inputProps={{ min: 0 }}
            name={`bayesian-group-b-${index}`}
            value={formData[`bayesian-group-b-${index}`] || ""}
            onChange={handleChange}
          />
          <TextField
            label="Conversions in Group B"
            variant="outlined"
            margin="dense"
            type="number"
            inputProps={{ min: 0 }}
            name={`bayesian-conversions-group-b-${index}`}
            value={formData[`bayesian-conversions-group-b-${index}`] || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BayesianGroup;
