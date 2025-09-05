import { useEffect, useState } from "react";
import axios from "axios";
import config from "./config"; 

const API_URL = `${config.url}/productapi`; 

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
  });

  // Load products on startup
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    axios.get(`${API_URL}/all`).then((res) => setProducts(res.data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.id) {
      // Update
      axios.put(`${API_URL}/update`, form).then(() => {
        loadProducts();
        resetForm();
      });
    } else {
      // Create
      axios.post(`${API_URL}/add`, form).then(() => {
        loadProducts();
        resetForm();
      });
    }
  };

  const handleEdit = (product) => {
    setForm(product);
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/delete/${id}`).then(() => loadProducts());
  };

  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      price: "",
      description: "",
      stock: "",
      category: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Management</h2>

      {/* Product Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          type="number"
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
          type="number"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <button type="submit">{form.id ? "Update" : "Add"} Product</button>
        {form.id && (
          <button onClick={resetForm} type="button">
            Cancel
          </button>
        )}
      </form>

      {/* Product List */}
      <h3>Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <b>{p.name}</b> - ₹{p.price} - {p.category} - Stock: {p.stock}
            <button onClick={() => handleEdit(p)} style={{ marginLeft: "10px" }}>
              Edit
            </button>
            <button onClick={() => handleDelete(p.id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductManager;