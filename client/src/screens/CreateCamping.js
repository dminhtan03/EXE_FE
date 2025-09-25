import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CreateCamping.css";
import BannerHome from '../components/BannerHome';

const CreateCamping = () => {
  const { campingId } = useParams(); // <-- lấy id từ URL
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    ownerId: "a7ea138e-3ba5-42a3-9686-2c7f9a9d57f4",
    name: "",
    address: "",
    description: "",
    basePrice: "",
    thumbnail: "",
    services: [],
  });
  const [message, setMessage] = useState("");

  // Lấy danh sách services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/service");
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  // Nếu có campingId, fetch data để điền form
  useEffect(() => {
    if (!campingId) return;

    const fetchCamping = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/camping/${campingId}`);
        const camping = res.data;
        setFormData({
          ownerId: camping.ownerId,
          name: camping.name,
          address: camping.address,
          description: camping.description,
          basePrice: camping.basePrice,
          thumbnail: camping.thumbnail,
          services: camping.services?.map((s) => ({
            serviceId: s.serviceId,
            price: s.price,
          })) || [],
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchCamping();
  }, [campingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (serviceId, checked) => {
    setFormData((prev) => {
      const existing = prev.services.find((s) => s.serviceId === serviceId);
      if (checked) {
        if (!existing) return { ...prev, services: [...prev.services, { serviceId, price: 0 }] };
      } else {
        return { ...prev, services: prev.services.filter((s) => s.serviceId !== serviceId) };
      }
      return prev;
    });
  };

  const handlePriceChange = (serviceId, price) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.map((s) =>
        s.serviceId === serviceId ? { ...s, price: parseFloat(price) } : s
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (campingId) {
        // Update
        const res = await axios.put(`http://localhost:8080/api/v1/camping/update/${campingId}`, formData);
        if (res.status === 200) setMessage("Camping updated successfully!");
      } else {
        // Create mới
        const res = await axios.post("http://localhost:8080/api/v1/camping", formData);
        if (res.status === 200 || res.status === 201) {
          setMessage("Camping created successfully!");
          setFormData({
            ownerId: "a7ea138e-3ba5-42a3-9686-2c7f9a9d57f4",
            name: "",
            address: "",
            description: "",
            basePrice: "",
            thumbnail: "",
            services: [],
          });
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Error saving camping.");
    }
  };

  return (
    <>
      <BannerHome />
      
      <div className="create-camping-container">
        <Link to="/managercamping" className="btn btn-secondary me-2">
            ← Quay lại danh sách
          </Link>
        <h2>{campingId ? "Update Camping" : "Create New Camping"}</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="ownerId" value={formData.ownerId} />

          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div>
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>

          <div>
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>

          <div>
            <label>Base Price:</label>
            <input type="number" name="basePrice" value={formData.basePrice} onChange={handleChange} required />
          </div>

          <div>
            <label>Thumbnail URL:</label>
            <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
          </div>

          <div>
            <h3>Services:</h3>
            {services.map((s) => {
              const selected = formData.services.find((fs) => fs.serviceId === s.id);
              return (
                <div key={s.id}>
                  <label>
                    <input type="checkbox" checked={!!selected} onChange={(e) => handleServiceChange(s.id, e.target.checked)} />
                    {s.name} - {s.description}
                  </label>
                  {selected && (
                    <input
                      type="number"
                      placeholder="Price"
                      value={selected.price}
                      onChange={(e) => handlePriceChange(s.id, e.target.value)}
                      required
                    />
                  )}
                </div>
              );
            })}
          </div>

          <button type="submit">{campingId ? "Update Camping" : "Create Camping"}</button>
          
        </form>
      </div>
    </>
  );
};

export default CreateCamping;
