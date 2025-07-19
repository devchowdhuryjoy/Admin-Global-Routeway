import React, { useState } from 'react';
import Swal from 'sweetalert2';
import BASE_URL from '../../ApiBaseUrl/BaseUrl';

const AdminReviewForm = () => {
  const [name, setName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !reviewText || !rating || !imageFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill all fields!',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("review_text", reviewText);
    formData.append("rating", rating);
    formData.append("image", imageFile);

    try {
      const response = await fetch(`${BASE_URL}reviewpost`, {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      console.log(result);

      Swal.fire({
        icon: 'success',
        title: 'Review submitted successfully!',
        showConfirmButton: false,
        timer: 1800
      });

      setName('');
      setReviewText('');
      setRating('');
      setImageFile(null);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to submit review.',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Submit a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Review */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            rows={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1 to 5)</label>
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

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
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

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminReviewForm;
