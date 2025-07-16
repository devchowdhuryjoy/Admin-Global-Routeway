import React from 'react'

const AdminReviewForm = () => {
  return (
     <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Submit a Review</h2>

      <form className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Review Text Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
          <textarea
            placeholder="Write your review..."
            rows={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Rating Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1 to 5)</label>
          <input
            type="number"
            min="1"
            max="5"
            placeholder="5"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-xl file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="button"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminReviewForm