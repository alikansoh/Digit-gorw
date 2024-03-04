import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../../Components/Navbar";
import ReactPaginate from "react-paginate";
import userIcon from "../../assets/user.png";
import moneyIcon from "../../assets/money.png";
import truckIcon from "../../assets/truck.png";
import ticketIcon from "../../assets/support.png";
import maxIcon from "../../assets/max.png";
import minIcon from "../../assets/min.png";
import priceIcon from "../../assets/tag.png";
import cancelIcon from "../../assets/cancel.png";
import refillIcon from "../../assets/refill.png";
import feedIcon from "../../assets/feed.png";
import Modal from "./Modal";
import axios from "axios";
import "./Service.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import BarLoader from "react-spinners/BarLoader";
function Service() {
  const [user, setUser] = useState({});
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedName, setSelectedServiceName] = useState(null);
  const [selectedServiceDescription, setSelectedServiceDescription] =
    useState(null);
  const [selectedServiceMax, setSelectedServiceMax] = useState(null);
  const [selectedServiceMin, setSelectedServiceMin] = useState(null);
  const [selectedServicePrice, setSelectedServicePrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedServiceId, setSelectedServiceID] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const servicesPerPage = 4;
  const pagesVisited = pageNumber * servicesPerPage;

  useEffect(() => {
    const userData = sessionStorage.getItem("user");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        const userId = parsedUser._id;

        const fetchUser = async () => {
          setLoading(true);
          try {
            const response = await fetch(
              `https://digit-gorw.onrender.com/api/user/${userId}`
            );
            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
            } else {
              console.error("Failed to fetch user data");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          } finally {
            setLoading(false);
          }
        };

        fetchUser();
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("https://digit-gorw.onrender.com/api/service");
      if (response.ok) {
        const servicesData = await response.json();
        setServices(servicesData);

        const uniqueCategories = Array.from(
          new Set(servicesData.map((service) => service.category))
        );

        const categories = uniqueCategories.map((category) => ({
          id: category,
        }));
        setCategories(categories);
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearchTerm =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter
        ? service.category === categoryFilter
        : true;
      return matchesSearchTerm && matchesCategory;
    });
  }, [services, searchTerm, categoryFilter]);

  const pageCount = Math.ceil(filteredServices.length / servicesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let userName = "";
  if (user.user && user.user.firstName && user.user.lastName) {
    userName = `${user.user.firstName} ${user.user.lastName}`;
  }

  const handleOrder = (service) => {
    setSelectedServiceID(service.service);
    setSelectedServiceName(service.name);
    setSelectedServiceDescription(service.description);
    setSelectedServiceMin(service.min);
    setSelectedServiceMax(service.max);
    setSelectedServicePrice(service.our_price);
    setQuantity(service.min);
    setQuantity("");

    setShowModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://digit-gorw.onrender.com/api/order", {
        user: user.user._id,
        services: selectedServiceId,
        quantity: quantity,
        link: link,
      });

      toast.success("Order created successfully!");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }

    setShowModal(false);
    console.log("Quantity selected:", quantity);
    console.log("Link selected", link);
    setSelectedServiceID(null);
    console.log(selectedServiceId);
    setQuantity(null);
    setQuantity("");
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedServiceID(null);
    setQuantity(null);
  };
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleLinkChange = (newLink) => {
    setLink(newLink);
  };
  return (
    <div>
      <section className="service-content">
        <section className="service-content-top">
          <section className="top-card">
            <img src={userIcon} alt="" />
            <div className="top-card-text">
              <p className="username">
                <strong>{userName}</strong>
              </p>
              <p> Welcome to Digit Crops!</p>
            </div>
          </section>

          <section className="top-card">
  <img src={moneyIcon} alt="" />
  <div className="top-card-text">
    <p className="username">
      {loading ? (
        <div className="loader">loading data...</div>
      ) : (
        <strong>{user.user && `${user.user.balance} $`}</strong>
      )}
    </p>
    <p> your account Balance</p>
  </div>
</section>
          {loading ? (
            <div className="loader"></div>
          ) : (
            user.user && user.user._id && (
              <Link to={`/orders/${user.user._id}`}>
                <section className="top-card">
                  <img src={truckIcon} alt="" />
                  <div className="top-card-text">
                    <p> your last orders </p>
                  </div>
                </section>
              </Link>
            )
          )}
          <section className="top-card">
            <img src={ticketIcon} alt="" />
            <div className="top-card-text">
              <p> Support Ticket</p>
            </div>
          </section>
        </section>
        <section className="fetched-services">
          <input
            type="text"
            placeholder="Search service..."
            style={{ textAlign: "justify" }}
            className="search-service"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="search-service"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.id}
              </option>
            ))}
          </select>
        </section>
        <section className="fetched-services-section">
          {loading ? (
           <BarLoader
           color="#d63696"
           height={6}
           width={300}
         />

          ) : (
            filteredServices
              .slice(pagesVisited, pagesVisited + servicesPerPage)
              .map((service) => (
                <section key={service.id} className="service-card">
                  <p className="service-card-title">{service.name}</p>
                  <p className="service-card-category">{service.category}</p>
                  <p className="service-card-text">
                    <img src={minIcon} alt="" className="inner-icon" /> minimum
                    : {service.min}
                  </p>
                  <p className="service-card-text">
                    <img src={maxIcon} alt="" className="inner-icon" />
                    maximum : {service.max}
                  </p>
                  <p className="service-card-text">
                    <img src={priceIcon} alt="" className="inner-icon" />
                    Price Per 1000 : {service.our_price} $
                  </p>
                  <p className="service-card-text">
                    <img src={cancelIcon} alt="" className="inner-icon" />
                    Cancel: {service.cancel ? "Yes" : "No"}
                  </p>
                  <p className="service-card-text">
                    <img src={refillIcon} alt="" className="inner-icon" />
                    Refill: {service.refill ? "Yes" : "No"}
                  </p>
                  <p className="service-card-text">
                    <img src={feedIcon} alt="" className="inner-icon" />
                    dripfeed: {service.dripfeed ? "Yes" : "No"}
                  </p>

                  <button
                    className="btn"
                    onClick={() => handleOrder(service)}
                  >
                    Order
                  </button>
                </section>
              ))
          )}
          {loading ? null : (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          )}
        </section>
        {selectedServiceId && (
          <Modal
            handleSubmit={handleSubmit}
            closeModal={closeModal}
            serviceName={selectedName}
            serviceDescription={selectedServiceDescription}
            serviceMax={selectedServiceMax}
            serviceMin={selectedServiceMin}
            servicePrice={selectedServicePrice}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onLinkChange={handleLinkChange}
            loading={loading}
          />
        )}
      </section>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Service;
