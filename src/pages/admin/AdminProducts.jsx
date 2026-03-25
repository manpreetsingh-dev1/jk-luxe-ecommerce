import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../../api/adminApi";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    getAllProducts()
      .then((response) => setProducts(response.data.products || []))
      .catch((error) => console.error("Failed to fetch products:", error));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-amber-700">Catalog</p>
          <h1 className="font-['Sora'] text-3xl font-semibold text-stone-950">Products</h1>
        </div>
        <Link to="/admin/products/new" className="rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800">
          Add Product
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article key={product._id} className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_20px_70px_rgba(23,19,18,0.08)]">
            <img src={product.image} alt={product.name} className="h-80 w-full object-cover" />
            <div className="space-y-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-amber-700">{product.category}</p>
                  <h2 className="mt-2 font-['Sora'] text-xl font-semibold text-stone-950">{product.name}</h2>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">Rs. {product.price}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link to={`/admin/products/${product._id}`} className="rounded-full border border-stone-300 px-4 py-3 text-center text-sm font-semibold text-stone-900">
                  Edit
                </Link>
                <button type="button" onClick={async () => { await deleteProduct(product._id); loadProducts(); }} className="rounded-full bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-700">
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
