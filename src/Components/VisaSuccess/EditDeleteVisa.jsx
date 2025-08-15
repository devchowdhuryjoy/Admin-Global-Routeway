import React, { useEffect, useState } from "react";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
// import IMAGE_BASE_URL from "../../ApiBaseUrl/ImageBaseUrl";
import ImageBaseurl from "../../ApiBaseUrl/ImageBaseurl";
import Swal from "sweetalert2";

const EditDeleteVisa = () => {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const fetchVisaSuccess = async () => {
    try {
      const res = await fetch(`${BASE_URL}visa-success`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch data", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This entry will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${BASE_URL}visa-success/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          Swal.fire("Deleted", "Entry removed", "success");
          fetchVisaSuccess();
        } else {
          Swal.fire("Error", "Failed to delete", "error");
        }
      } catch (err) {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setText(item.text);
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${BASE_URL}visa-success/${editItem.id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        Swal.fire("Success", "Updated successfully", "success");
        fetchVisaSuccess();
        setEditItem(null);
        setText("");
        setImage(null);
      } else {
        Swal.fire("Error", "Update failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  useEffect(() => {
    fetchVisaSuccess();
  }, []);

  return (
    <div className="max-w-5xl mx-auto my-12 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-orange-700">
        Manage Visa Success Entries
      </h2>

      {editItem && (
        <div className="bg-gray-50 border rounded-lg p-5 mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Edit Entry (ID: {editItem.id})
          </h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block font-medium text-sm mb-1">Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              ></textarea>
            </div>

            <div>
              <label className="block font-medium text-sm mb-1">
                New Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {editItem.image && (
                <img
                  // src={`${IMAGE_BASE_URL}${editItem.image}`}
                  src={`${ImageBaseurl}${editItem.image.startsWith("/") ? editItem.image.substring(1) : editItem.image}`}
                  alt="Current"
                  className="w-24 h-24 rounded mt-2 object-cover"
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Update
            </button>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border rounded-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Text</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{item.id}</td>
                <td className="px-4 py-2 border">{item.text}</td>
                <td className="px-4 py-2 border">
                  {item.image && (
                    <img
                      // src={`${IMAGE_BASE_URL}${item.image}`}
                      src={`${ImageBaseurl}${item.image.startsWith("/") ? item.image.substring(1) : item.image}`}
                      alt="Visa"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-5 text-gray-500">
                  No entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditDeleteVisa;
