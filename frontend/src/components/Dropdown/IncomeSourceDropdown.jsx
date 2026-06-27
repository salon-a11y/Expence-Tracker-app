import { useState, useRef } from "react";

function IncomeSourceDropdown({ label, onChange, value }) {
  const selectRef = useRef();
  if (label !== "Income Source") return null;

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box">
        <select
          className="w-full border-none  outline-none"
          ref={selectRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select Income Source</option>
          <option value="Salary">Salary</option>
          <option value="Business">Business</option>
          <option value="Freelance">Freelance</option>
          <option value="Others">Others</option>
        </select>
      </div>
    </div>
  );
}

export default IncomeSourceDropdown;
