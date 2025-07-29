import React, { useState } from "react";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import Swal from "sweetalert2";

const CreateCollaboration = () => {
  const [formData, setFormData] = useState({ text: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, text: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.text.trim() || !image) {
      Swal.fire("Warning", "Please enter text and select an image", "warning");
      return;
    }
    setLoading(true);

    const payload = new FormData();
    payload.append("text", formData.text);
    payload.append("image", image);

    try {
      const res = await fetch(`${BASE_URL}collaborations`, {
        method: "POST",
        body: payload,
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire("Success", "Collaboration created", "success");
        setFormData({ text: "" });
        setImage(null);
      } else {
        Swal.fire("Error", result.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Create New Collaboration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2">Text</label>
          <textarea
            value={formData.text}
            onChange={handleChange}
            rows={4}
            placeholder="Enter your collaboration details..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateCollaboration;
