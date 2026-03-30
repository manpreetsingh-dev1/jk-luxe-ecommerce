import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, getProductById, updateProduct } from "../../api/adminApi";

const AdminProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    if (!isEdit) return;
    getProductById(id)
      .then((response) => setFormData(response.data.product))
      .catch((error) => console.error("Failed to load product:", error));
  }, [id, isEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEdit) {
      await updateProduct(id, formData);
    } else {
      await createProduct(formData);
    }
    navigate("/admin/products");
  };

  return (
    <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-white/60 bg-white/80 p-8 shadow-[0_25px_90px_rgba(23,19,18,0.08)]">
      <p className="text-xs uppercase tracking-[0.45em] text-amber-700">Catalog</p>
      <h1 className="mt-3 font-['Sora'] text-3xl font-semibold text-stone-950">{isEdit ? "Edit Product" : "Add Product"}</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        {["name", "price", "image", "category"].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={(event) => setFormData((current) => ({ ...current, [field]: event.target.value }))}
            placeholder={field.replace(/^./, (value) => value.toUpperCase())}
            className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none"
            required
          />
        ))}
        <textarea
          name="description"
          value={formData.description}
          onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))}
          placeholder="Description"
          rows="5"
          className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm outline-none"
        />

        <button type="submit" className="rounded-full bg-stone-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-amber-800">
          {isEdit ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;
