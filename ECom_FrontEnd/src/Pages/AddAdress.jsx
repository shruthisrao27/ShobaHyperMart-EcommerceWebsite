import React, { useState } from "react";
import { useAppContext } from "../Context/Context";

const AddAddress = () => {
  const { addresses, setAddresses, navigate } = useAppContext();

  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone: ""
  });

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save address
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.street || !form.city || !form.state || !form.country || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    const newAddress = { ...form, id: Date.now() };

    setAddresses([...addresses, newAddress]); // ✅ Add to context
    alert("Address added successfully!");

    navigate("/cart"); // ✅ Redirect back to Cart
  };

  return (
    <div className="mt-16 pb-16 max-w-xl mx-auto">
      <p className="text-2xl md:text-3xl text-gray-500 mb-6">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-none"
        />
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={form.street}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-none"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-none"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-none"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-none"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded outline-none"
        />

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
