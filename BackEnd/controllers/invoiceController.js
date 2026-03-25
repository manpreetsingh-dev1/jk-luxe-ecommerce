import PDFDocument from "pdfkit";
import Order from "../models/orderModel.js";

export const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Set headers FIRST
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    const doc = new PDFDocument({ margin: 50 });

    // Handle stream errors properly
    doc.on("error", (err) => {
      console.error("PDF Error:", err);
      if (!res.headersSent) {
        res.status(500).end();
      }
    });

    doc.pipe(res);

    // Header
    doc.fontSize(22).text("J&K Luxe", { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text("Order Invoice");
    doc.moveDown();

    doc.fontSize(12).text(`Invoice ID: INV-${order._id.toString().slice(-6)}`);
    doc.text(`Date: ${new Date(order.createdAt).toDateString()}`);
    doc.text(`Status: ${order.status}`);
    doc.moveDown();

    // Items
    order.items.forEach((item) => {
      doc.text(
        `${item.name} | Qty: ${item.quantity} | ₹${item.price} | ₹${
          item.quantity * item.price
        }`
      );
    });

    doc.moveDown();
    doc.fontSize(14).text(`Total Amount: ₹${order.total}`, {
      align: "right",
    });

    doc.end(); // END ONLY ONCE

  } catch (error) {
    console.error(error);

    // IMPORTANT: Do NOT send JSON if headers already sent
    if (!res.headersSent) {
      res.status(500).json({ message: "Invoice generation failed" });
    }
  }
};