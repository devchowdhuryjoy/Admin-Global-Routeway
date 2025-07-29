import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";

const StudentsEditDelete = () => {
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false); // <-- form show/hide control

  // Fetch existing reviews
  useEffect(() => {
    fetch(`${BASE_URL}reviewtwoget`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !reviewText || (!imageFile && !editingId)) {
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
    if (imageFile) formData.append("image", imageFile);

    const url = editingId
      ? `${BASE_URL}reviewtwoupdate/${editingId}`
      : `${BASE_URL}reviewtwopost`;

    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();

      Swal.fire({
        icon: "success",
        title: editingId ? "Review updated!" : "Review submitted!",
        showConfirmButton: false,
        timer: 1800,
      });

      setName("");
      setReviewText("");
      setImageFile(null);
      setEditingId(null);
      setShowForm(false); // hide form after submit

      const refreshed = await fetch(`${BASE_URL}reviewtwoget`).then((res) =>
        res.json()
      );
      setReviews(refreshed);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleEdit = (review) => {
    setName(review.name);
    setReviewText(review.review_text);
    setEditingId(review.id);
    setImageFile(null);
    setShowForm(true); // show form when editing
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`${BASE_URL}reviewtwodelete/${id}`, {
          method: "DELETE",
        });

        Swal.fire("Deleted!", "Review has been deleted.", "success");

        setReviews(reviews.filter((item) => item.id !== id));
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error!", "Could not delete review.", "error");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      {showForm && (
        <>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            {editingId ? "Edit Review" : "Submit a Review"}
          </h2>

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
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
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
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700"
              >
                {editingId ? "Update Review" : "Submit Review"}
              </button>
            </div>
          </form>
        </>
      )}

      {/* Review List */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">All Reviews</h3>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-200 rounded-xl p-4 mb-4 flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-gray-800">{review.name}</p>
              <p className="text-gray-600">{review.review_text}</p>
              {review.image_url && (
                <img
                  src={`http://localhost:3000${review.image_url}`}
                  alt="review"
                  className="w-24 mt-2 rounded"
                />
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(review)}
                className="bg-yellow-400 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
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

export default StudentsEditDelete;
