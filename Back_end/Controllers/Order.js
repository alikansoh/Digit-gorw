import Order from "../Models/Order.js";
import mongoose from "mongoose";
import User from "../Models/User.js";
import Service from "../Models/Service.js";
import Package from "../Models/Package.js";
import axios from "axios";

// Controller function to get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get a single order by ID
export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Order not found!" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found!" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to create a new order

export const createOrder = async (req, res) => {
  const { services, user, quantity, link } = req.body;

  try {
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    const service = await Service.findOne({ service: services });
    if (!service) {
      return res.status(404).json({ error: `Service ${services} not found!` });
    }

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "Invalid quantity!" });
    }

    const totalPrice = (service.our_price / 1000) * quantity;

    if (existingUser.balance < totalPrice) {
      return res.status(400).json({ error: "Insufficient balance!" });
    }

    try {
      const axiosResponse = await axios.post(
        "https://justanotherpanel.com/api/v2",
        {
          key: "c333f403b31f0c5c35d52a34afdd90f0",
          action: "add",
          service: services,
          quantity: quantity,
          link: link,
        }
      );

      const responseData = {
        status: axiosResponse.status,
        data: axiosResponse.data,
      };

      if (responseData.data.error) {
        console.error("Error from external API:", responseData.data.error);
        return res.status(400).json({ error: responseData.data.error });
      }

      let date = new Date().toLocaleString();
      const order = new Order({
        date,
        user: user,
        services: services,
        quantity: quantity,
        Total_price: totalPrice,
        link: link,
        orderID: responseData.data.order,
      });
      await order.save();

      const newBalance = existingUser.balance - totalPrice;
      await User.findByIdAndUpdate(user, { balance: newBalance });

      res
        .status(200)
        .json({ message: "Order created successfully", order: order });
    } catch (error) {
      console.error("Error proxying request:", error);
      return res
        .status(500)
        .json({ error: "Error creating order. Please try again later." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update an existing order by ID
export const updateOrder = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Order not found!" });
    }

    // Find the existing order
    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found!" });
    }

    // Calculate the original total price
    let originalTotalPrice = existingOrder.total_price;

    // Calculate the updated total price if services or packages are modified
    let updatedTotalPrice = originalTotalPrice;

    // Update the order with the new data
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found!" });
    }

    // Check if services or packages are modified
    if (req.body.services || req.body.packages) {
      // Recalculate the total price for services
      if (req.body.services) {
        updatedTotalPrice = 0;
        for (const serviceId of updatedOrder.services) {
          const service = await Service.findById(serviceId);
          if (!service) {
            return res
              .status(400)
              .json({ error: `Service not found for ID: ${serviceId}` });
          }
          updatedTotalPrice += service.our_price;
        }
      }
      // Recalculate the total price for packages
      if (req.body.packages) {
        updatedTotalPrice = 0;
        for (const packageId of updatedOrder.packages) {
          const packageDetail = await Package.findById(packageId);
          if (!packageDetail) {
            return res
              .status(400)
              .json({ error: `Package not found for ID: ${packageId}` });
          }
          updatedTotalPrice += packageDetail.price;
        }
      }
    }

    // Update the user's balance if the total price is changed
    if (originalTotalPrice !== updatedTotalPrice) {
      const existingUser = await User.findById(existingOrder.user);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found!" });
      }

      // Calculate the new balance
      const newBalance =
        existingUser.balance + originalTotalPrice - updatedTotalPrice;

      // Update the user's balance
      await User.findByIdAndUpdate(existingOrder.user, { balance: newBalance });
    }

    res
      .status(200)
      .json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Order not found!" });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found!" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller function to fetch order by user ID
export const orderByUserId = async (req, res) => {
  try {
    const userID = req.params.userID;
    console.log(userID);
    const orders = await Order.find({ user: userID });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for the specified userID" });
    }

    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
