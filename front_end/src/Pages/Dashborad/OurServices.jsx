import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SideBar from "./sideBar";
import "./Dashboard.css";
import { ToastContainer, toast } from "react-toastify";

function ourPrice() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [formDataList, setFormDataList] = useState([]);
  const itemsPerPage = 50;

  useEffect(() => {
    fetchData();
  }, [searchQuery, selectedCategory]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://digit-gorw.onrender.com/api/service", {
        
      });
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    let computedData = data;

    if (searchQuery) {
      computedData = computedData.filter((item) =>
        item.service.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      computedData = computedData.filter(
        (item) => item.category === selectedCategory
      );
    }

    setTotalItems(computedData.length);

    return computedData.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage
    );
  }, [data, currentPage, searchQuery, selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFormInputChange = (index, e) => {
    const newData = [...formDataList];
    newData[index][e.target.name] = e.target.value;
    setFormDataList(newData);
  };

  const handleEditService = async (index) => {
    const item = filteredData[index];
    const formData = formDataList[index];
  
    const confirmEdit = window.confirm("Are you sure you want to edit this service?");
    if (confirmEdit) {
      try {
        const res = await axios.patch(`https://digit-gorw.onrender.com/api/service/${item._id}`, {
          ...formData
        });
        console.log("Service edited successfully:", res.data);
        toast.success("Service edited successfully");
        fetchData();
      } catch (error) {
        console.error("Error editing service:", error);
        toast.error(error.response.data.error);
      }
    }
  };

  const handleDeleteService = async (index) => {
    const item = filteredData[index];
  
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (confirmDelete) {
      try {
        const res = await axios.delete(`https://digit-gorw.onrender.com/api/service/${item._id}`);
        console.log("Service deleted successfully:", res.data);
        toast.success("Service deleted successfully");
        fetchData();
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error(error.response.data.error);
      }
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetFilter = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setCurrentPage(1);
  };

  useEffect(() => {
    setFormDataList(filteredData.map(item => ({ profit: 0, description: "" })));
  }, [filteredData]);

  return (
    <>
      <SideBar />
      <section className="add-service-cont">
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search by code..."
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="search-dropdown"
          >
            <option value="">All Categories</option>
            {[...new Set(data.map((item) => item.category))].map(
              (category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </div>
        <h1>our services</h1>
        <section className="content-apiService">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            filteredData.map((item, index) => (
              <div className="cardDash" key={index}>
                <div className="form-item">
                  <label htmlFor="service">Service:</label>
                  <input
                    type="text"
                    id="service"
                    name="service"
                    value={item.service}
                    readOnly
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={item.name}
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="category">Category:</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={item.category}
                    readOnly
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="original-price">Original rate:</label>
                  <input
                    type="number"
                    id="original-price"
                    name="rate"
                    value={item.rate}
                    readOnly
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="min">Min:</label>
                  <input
                    type="text"
                    id="min"
                    name="min"
                    value={item.min}
                    readOnly
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="max">Max:</label>
                  <input
                    type="text"
                    id="max"
                    name="max"
                    value={item.max}
                    readOnly
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="dripfeed">Dripfeed:</label>
                  <input
                    type="text"
                    id="dripfeed"
                    name="dripfeed"
                    value={item.dripfeed}
                    readOnly
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="refill">Refill:</label>
                  <input
                    type="text"
                    id="refill"
                    name="refill"
                    value={item.refill}
                    readOnly
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="cancel">Cancel:</label>
                  <input
                    type="text"
                    id="cancel"
                    name="cancel"
                    value={item.cancel}
                    readOnly
                  />
                </div>
                <div className="form-item">
                  <label htmlFor={`profit-${index}`}>Profit %:</label>
                  <input
                    type="number"
                    id={`profit-${index}`}
                    name="profit"
                    value={formDataList[index]?.profit || item.profit}
                    onChange={(e) => handleFormInputChange(index, e)}
                    min="0"
                  />
                  
                  
                  
                </div>
                <div className="form-item">
                  <label htmlFor={`our-price-${index}`}>our price:</label>
                  <input
                    type="number"
                    id={`our price-${index}`}
                    name="our price"
                    value={ item.our_price}
                    readOnly
                  />
                  
                  
                  
                </div>

               
                <div className="form-item">
                  <label htmlFor={`description-${index}`}>Description:</label>
                  <input
                    type="text"
                    id={`description-${index}`}
                    name="description"
                    value={formDataList[index]?.description || item.description}
                    onChange={(e) => handleFormInputChange(index, e)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleEditService(index)}
                >
                  Edit Service
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteService(index)}
                >
                  Delete Service
                </button>
              </div>
            ))
          )}
        </section>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(totalItems / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default ourPrice;
