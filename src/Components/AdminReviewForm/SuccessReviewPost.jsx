import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";

const SuccessReviewPost = () => {
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formVisible, setFormVisible] = useState(false); // form visibility

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${BASE_URL}reviewget`);
      const data = await res.json();
      setReviews(data);
      
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !reviewText || !rating || (!imageFile && !editId)) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields!",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("review_text", reviewText);
    formData.append("rating", rating);
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await fetch(
        `${BASE_URL}${editId ? `reviewupdate/${editId}` : "reviewpost"}`,
        {
          method: editId ? "PUT" : "POST",
          body: formData,
        }
      );

      const result = await response.text();
      console.log(result);

      Swal.fire({
        icon: "success",
        title: `Review ${editId ? "updated" : "submitted"} successfully!`,
        showConfirmButton: false,
        timer: 1800,
      });

      setName("");
      setReviewText("");
      setRating("");
      setImageFile(null);
      setEditId(null);
      setFormVisible(false); // hide after submit
      fetchReviews();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to submit review.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleEdit = (review) => {
    setEditId(review.id);
    setName(review.name);
    setReviewText(review.review_text);
    setRating(review.rating);
    setImageFile(null);
    setFormVisible(true); // show form on edit
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${BASE_URL}reviewdelete/${id}`, {
          method: "DELETE",
        });
        const result = await res.json();
        Swal.fire("Deleted!", result.message, "success");
        fetchReviews();
      } catch (err) {
        Swal.fire("Error!", "Failed to delete.", "error");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        {editId ? "Edit Review" : "Edit & Delete Success Review"}
      </h2>

      {formVisible && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating (1 to 5)
            </label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              placeholder="5"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-xl file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200"
            >
              {editId ? "Update Review" : "Submit Review"}
            </button>
          </div>
        </form>
      )}

      {/* Review List */}
      <div className="mt-10">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-xl p-4 mb-4 flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold text-lg">{review.name}</h4>
              <p className="text-sm text-gray-600">{review.review_text}</p>
              <p className="text-sm">Rating: {review.rating}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(review)}
                className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessReviewPost;
