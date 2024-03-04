import Service from "../Models/Service.js"; 
import mongoose from "mongoose";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find(); 
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "test", error: error.message });
  }
};

export const getService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "service not found!" });
    }

    const service = await Service.findById(id); 

    if (!service) {
      return res.status(404).json({ error: "service not found!" });
    }

    res.status(200).json({ service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createservice = async (req, res) => {
  const {
    service,
    name,
    type,
    min,
    max,
    rate,
    description,
    category,
    dripfeed,
    profit,
    refill,
    cancel,
  } = req.body;
  let our_price = rate * (1 + profit /  100);  

  // Check if a service with the same name already exists
  const existingService = await Service.findOne({ service });
  if (existingService) {
    return res.status(400).json({ error: "this service already exists." });
  }

  try {
    const newService = new Service({
      service,
      name,
      type,
      min,
      max,
      rate,
      our_price,
      description,
      category,
      dripfeed,
      profit,
      refill,
      cancel,
    });
    await newService.save(); // Save the new service to the database
    res
      .status(201)
      .json({ message: "Service created successfully", service: newService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateservice = async (req, res) => { 
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Service not found!" });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ error: "Service not found!" });
    }

    // Assuming rate is stored in the service document
    const rate = service.rate;

    const updatedServiceData = req.body;

    if ('profit' in updatedServiceData) {
      const profit = parseFloat(updatedServiceData.profit);
      
      if (isNaN(profit)) {
        return res.status(400).json({ error: "Profit must be a valid number!" });
      }
    
      updatedServiceData.our_price = parseFloat(rate * (1 + profit / 100));
      if (isNaN(updatedServiceData.our_price)) {
        return res.status(400).json({ error: "Error calculating our_price!" });
      }
    } else {
      return res.status(400).json({ error: "Profit field is required!" });
    }
    

    const updatedService = await Service.findByIdAndUpdate(id, updatedServiceData, { new: true });

    res.status(200).json({ message: "Service updated successfully!", service: updatedService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteservice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "service not found!" });
    }

    const service = await Service.findByIdAndDelete(id); 
    if (!service) {
      return res.status(404).json({ error: "service not found!" });
    }

    res.status(200).json({ message: "service was deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
