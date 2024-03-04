import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import './Order.css';
function Order() {
  const { userId } = useParams(); 
  const [orderData, setOrderData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`https://digit-gorw.onrender.com/api/order/orderbyuser/${userId}`);
        setOrderData(response.data);
        if(response.data.length === 0){
          setError('No orders found for this user.');
        }
      } catch (error) {
        // Check if the error response contains a message
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          // Fallback to a generic error message
          setError('An error occurred while fetching orders.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
 }, [userId]);;

  return (
    <div>
      <Navbar />
      <div className="order-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Price</th>
                <th>Quantity</th>
                <th> social media Link</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.Total_price}</td>
                  <td>{item.quantity}</td>
                  <td><Link to={item.link}>Link</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Order;
