import React from "react";
import TransactionInfoCard from "../Card/TransactionInfoCard.jsx";
import { LuDownload } from "react-icons/lu";
import moment from "moment";

function IncomeList({ transactions, onDownload, onDelete }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" />
          Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            id={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("DD MM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={(id) => onDelete(id)}
          />
        ))}
      </div>
    </div>
  );
}

export default IncomeList;
