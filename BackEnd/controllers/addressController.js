import Address from "../models/address.model.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, name, phone, addressLine, city, state, pincode, isDefault } = req.body;
    const requesterId = req.user?._id?.toString();

    if (!userId || !name || !phone || !addressLine || !city || !state || !pincode) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    if (requesterId !== userId && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    if (isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    const address = await Address.create({
      user: userId,
      name,
      phone,
      addressLine,
      city,
      state,
      pincode,
      isDefault: Boolean(isDefault),
    });

    return res.status(201).json({ success: true, address });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user._id.toString() !== userId && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const addresses = await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });
    return res.json({ success: true, addresses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    if (address.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    if (req.body.isDefault) {
      await Address.updateMany({ user: address.user }, { isDefault: false });
    }

    const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.json({ success: true, address: updatedAddress });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    if (address.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await Address.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const setDefaultAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.body;

    if (req.user._id.toString() !== userId && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await Address.updateMany({ user: userId }, { isDefault: false });
    await Address.findByIdAndUpdate(addressId, { isDefault: true });

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
