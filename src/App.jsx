import React, { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    driver: "",
    date: new Date().toISOString().slice(0, 10),
    mileage: "",
    oilLevel: "",
    comments: "",
    carNumber: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw9C-ZiRxK2PMQ54f13vTMyCqGklv4-SX.../exec",
        {
          method: "POST",
          body: data,
        }
      );
      if (!response.ok) throw new Error("Tinklo klaida");
      alert("Duomenys išsiųsti!");
    } catch (err) {
      alert("Klaida siunčiant duomenis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <img src="/tradiala-logo.png" alt="Tradiala" className="mb-4 w-32" />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <div>
          <label className="block font-medium">Vairuotojas:</label>
          <input
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Data:</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Mašinos numeris:</label>
          <input
            name="carNumber"
            value={formData.carNumber}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Rida pradžioje:</label>
          <input
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Tepalų lygis (1–5):</label>
          <input
            name="oilLevel"
            value={formData.oilLevel}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Komentarai / nesklandumai:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Nuotrauka (nebūtina):</label>
          <input
            name="photo"
            type="file"
            onChange={handleChange}
            accept="image/*"
            className="w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Siunčiama..." : "Siųsti"}
        </button>
      </form>
    </div>
  );
}
