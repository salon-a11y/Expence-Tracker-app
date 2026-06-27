import { useState, useRef } from "react";

function ExpenseCategoryDropdown({ label, onChange, value }) {
  const selectRef = useRef();
  if (label !== "Expense Category") return null;

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
          <option value="">Select Expense Category</option>
          <option value="Food"> Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Rent">Rent</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
}

export default ExpenseCategoryDropdown;
