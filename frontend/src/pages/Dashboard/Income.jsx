import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import { useUserAuth } from "../../hooks/useUserAuth.jsx";
import IncomeOverview from "../../components/Income/IncomeOverview.jsx";
import api from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import Modal from "../../components/Modal.jsx";
import AddIncomeForm from "../../components/Income/AddIncomeForm.jsx";
import IncomeList from "../../components/Income/IncomeList.jsx";
//

//
function Income({ setActiveMenu, activeMenu }) {
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  useUserAuth();

  //Get All income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await api.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
      if (response.data) {
        setIncomeData(response.data?.data);
      }
    } catch (error) {
      console.log("something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);

  //handle Add income
  const handleAddIncome = async (currentIncome) => {
    //Api call for adding income
    const res = await api.post(`${API_PATHS.INCOME.ADD_INCOME}`, currentIncome);
    fetchIncomeDetails();
    setOpenAddIncomeModel(false);
  };
  //Delete Income
  const handleDeleteIncome = async (id) => {
    await api.delete(`${API_PATHS.INCOME.DELETE_INCOME(id)}`);
    fetchIncomeDetails();
  };

  //handle download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await api.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
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
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDownload={handleDownloadIncomeDetails}
            onDelete={(id) => handleDeleteIncome(id)}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;
