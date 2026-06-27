import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import { useUserAuth } from "../../hooks/useUserAuth.jsx";
import ExpenseOverview from "../../components/Expense/ExpenseOverview.jsx";
import api from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import Modal from "../../components/Modal.jsx";
import AddExpenseForm from "../../components/Expense/AddExpenseForm.jsx";
import ExpenseList from "../../components/Expense/ExpenseList.jsx";

function Expense({ setActiveMenu, activeMenu }) {
  const [openAddExpenseModel, setOpenExpenseModel] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  useUserAuth();

  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);

  //Get All expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await api.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
      if (response.data) {
        setExpenseData(response.data?.data);
      }
    } catch (error) {
      console.error("something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  //handle Add expense
  const handleAddExpense = async (currentExpense) => {
    //Api call for adding expense
    const res = await api.post(
      `${API_PATHS.EXPENSE.ADD_EXPENSE}`,
      currentExpense,
    );
    fetchExpenseDetails();
    setOpenExpenseModel(false);
  };
  //Delete expense
  const handleDeleteExpense = async (id) => {
    console.log(id);
    await api.delete(`${API_PATHS.EXPENSE.DELETE_EXPENSE(id)}`);
    fetchExpenseDetails();
  };

  //handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await api.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsr");
      document.body.append(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.removeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
    }
  };
  return (
    <DashboardLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenExpenseModel(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDownload={(id) => handleDownloadExpenseDetails(id)}
            onDelete={(id) => handleDeleteExpense(id)}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModel}
          onClose={() => setOpenExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Expense;
