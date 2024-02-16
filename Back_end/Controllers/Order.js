import Order from "../Models/Order.js";
import mongoose from "mongoose";
import User from "../Models/User.js";
import Service from "../Models/Service.js";
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
    const { date, services = [], packages = [], user } = req.body;
  
    try {
        // Fetch the user document
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found!" });
        }
  
        // Calculate total price based on the services and packages selected
        let totalPrice = 0;
  
        // Calculate total price for services
        for (const serviceId of services) {
            // Fetch service details based on the ID
            const service = await Service.findById(serviceId);
            if (!service) {
                return res.status(400).json({ error: `Service not found for ID: ${serviceId}` });
            }
            // Add service price to the total
            totalPrice += service.our_price;
        }
  
        // Calculate total price for packages
        for (const packageId of packages) {
            // Fetch package details based on the ID
            const packageDetail = await Package.findById(packageId);
            if (!packageDetail) {
                return res.status(400).json({ error: `Package not found for ID: ${packageId}` });
            }
            // Add package price to the total
            totalPrice += packageDetail.price;
        }
  
        // Check if the user has enough balance
        if (existingUser.balance < totalPrice) {
            return res.status(400).json({ error: "Insufficient balance!" });
        }
  
        // Calculate the new balance
        const newBalance = existingUser.balance - totalPrice;
  
        // Update the user's balance
        await User.findByIdAndUpdate(user, { balance: newBalance });
  
        // Create the new order
        const newOrder = new Order({
            date,
            total_price: totalPrice,
            services,
            packages,
            user,
        });
        await newOrder.save();
  
        res.status(201).json({ message: "Order created successfully", order: newOrder });
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
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
  
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
                        return res.status(400).json({ error: `Service not found for ID: ${serviceId}` });
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
                        return res.status(400).json({ error: `Package not found for ID: ${packageId}` });
                    }
                    updatedTotalPrice += packageDetail.price;
                }
            }
        }
  
        // Update the user's balance if the total price is changed
        if (originalTotalPrice !== updatedTotalPrice) {
            // Fetch the user document
            const existingUser = await User.findById(existingOrder.user);
            if (!existingUser) {
                return res.status(404).json({ error: "User not found!" });
            }
  
            // Calculate the new balance
            const newBalance = existingUser.balance + originalTotalPrice - updatedTotalPrice;
  
            // Update the user's balance
            await User.findByIdAndUpdate(existingOrder.user, { balance: newBalance });
        }
  
        res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controller function to delete an existing order by ID
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
