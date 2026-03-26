import Address from "../Models/addressModel.js";

// ADD ADDRESS
export const addAddress = async (req, res) => {
  try {
    const { userId, name, phone, addressLine, city, state, pincode, isDefault } = req.body;
    const requesterId = req.user?._id?.toString();

    if (!userId || !name || !phone || !addressLine || !city || !state || !pincode) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (requesterId !== userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    // if default → unset old default
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
      isDefault: isDefault || false,
    });

    res.status(201).json({ success: true, address });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET USER ADDRESSES
export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    if (req.user._id.toString() !== userId && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    const addresses = await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });
    res.json({ success: true, addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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

    const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, address: updatedAddress });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE ADDRESS
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    if (address.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await Address.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// SET DEFAULT ADDRESS
export const setDefaultAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.body;

    if (req.user._id.toString() !== userId && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await Address.updateMany({ user: userId }, { isDefault: false });
    await Address.findByIdAndUpdate(addressId, { isDefault: true });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
