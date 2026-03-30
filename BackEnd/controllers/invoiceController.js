import PDFDocument from "pdfkit";
import Order from "../models/orderModel.js";

export const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=invoice-${order._id}.pdf`);
    doc.pipe(res);

    doc.fontSize(22).text("Invoice", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Customer: ${order.user?.name || "Unknown"}`);
    doc.text(`Email: ${order.user?.email || "Unknown"}`);
    doc.text(`Status: ${order.status}`);
    doc.text(`Total: Rs. ${order.total}`);
    doc.moveDown();
    doc.text("Items:");

    order.items.forEach((item) => {
      doc.text(`${item.name} x ${item.quantity} - Rs. ${item.price}`);
    });

    doc.end();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
