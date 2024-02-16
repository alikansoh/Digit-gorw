import Package from "../Models/Package.js";
import mongoose from "mongoose";

export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find()
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPackage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Package not found!" });
    }

    const packagee = await Package.findById(id)

    if (!packagee) {
      return res.status(404).json({ error: "Package not found!" });
    }

    res.status(200).json(packagee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPackage = async (req, res) => {
  const { name, price, services } = req.body;

  try {
    const newPackage = new Package({
      name,
      price,
      services,
    });
    await newPackage.save();
    res.status(201).json({ message: "Package created successfully", package: newPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePackage = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Package not found!" });
    }

    const updatedPackage = await Package.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPackage) {
      return res.status(404).json({ error: "Package not found!" });
    }

    res.status(200).json({ message: "Package updated successfully", package: updatedPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePackage = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Package not found!" });
    }

    const deletedPackage = await Package.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({ error: "Package not found!" });
    }

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
