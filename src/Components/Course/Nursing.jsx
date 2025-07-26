import React, { useState, useEffect } from "react";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import IMAGE_BASE_URL from "../../ApiBaseUrl/ImageBaseUrl";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Nursing = () => {
  const [formData, setFormData] = useState({
    text: "",
    content: "",
  });
  const [image, setImage] = useState(null);

  const [savedData, setSavedData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch saved data from GET API
  const fetchSavedData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}course-nurse-get`);
      const data = await res.json();
      if (data && data.length > 0) {
        setSavedData(data[0]);
      }
    } catch (error) {
      console.error("Error fetching saved data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      Swal.fire("Error", "Please select an image", "error");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("text", formData.text);
    formPayload.append("image", image);
    formPayload.append("content", formData.content);

    try {
      const response = await fetch(`${BASE_URL}course-nurse`, {
        method: "POST",
        body: formPayload,
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Success", "Submitted successfully", "success");
        setFormData({ text: "", content: "" });
        setImage(null);
        fetchSavedData(); // refresh display
      } else {
        Swal.fire("Error", result.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Failed to submit", "error");
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow rounded-xl">
      {/* FORM */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Nursing API Submission
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-12">
        <div>
          <label className="block mb-1 font-medium">Text</label>
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Content</label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleContentChange}
            modules={quillModules}
            formats={quillFormats}
            className="bg-white"
            placeholder="Write content with formatting..."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* DISPLAY SAVED DATA */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Saved Nursing Content
        </h2>

        {loading && <p className="text-center">Loading...</p>}

        {savedData ? (
          <>
            <h3 className="text-xl font-bold mb-2">{savedData.text}</h3>

            {savedData.image && (
              <img
                src={`${IMAGE_BASE_URL}${savedData.image}`}
                alt={savedData.text}
                className="w-full max-h-96 object-cover rounded mb-4"
              />
            )}

            <div
              className="prose prose-li:marker:text-gray-800 prose-ol:pl-6 max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: savedData.content }}
            ></div>
          </>
        ) : (
          !loading && (
            <p className="text-center text-gray-600">No data available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Nursing;
