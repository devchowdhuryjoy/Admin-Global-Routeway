// import React, { useState, useEffect } from "react";
// import BASE_URL from "../../ApiBaseUrl/BaseUrl";
// import ImageBaseurl from "../../ApiBaseUrl/ImageBaseurl";

// const AdminBlogList = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}blog`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch blogs");
//         }
//         const data = await response.json();
//         setBlogs(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this blog?")) {
//       try {
//         const response = await fetch(`${BASE_URL}blog/${id}`, {
//           method: "DELETE",
//         });

//         if (!response.ok) {
//           throw new Error("Failed to delete blog");
//         }

//         setBlogs(blogs.filter((blog) => blog.id !== id));
//       } catch (err) {
//         console.error("Error deleting blog:", err);
//       }
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error)
//     return <div className="text-center py-8 text-red-500">Error: {error}</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Blog Management</h1>

//       <div className="overflow-x-auto rounded-lg border border-gray-200">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Image
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Title
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Author
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Tag
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {blogs.map((blog) => (
//               <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {blog.image ? (
//                     <img
//                       src={`${ImageBaseurl}${
//                         blog.image.startsWith("/")
//                           ? blog.image.substring(1)
//                           : blog.image
//                       }`}
//                       alt={blog.title}
//                       className="w-16 h-16 object-cover rounded"
//                       onError={(e) => {
//                         e.target.src =
//                           "https://via.placeholder.com/80?text=No+Image";
//                         e.target.onerror = null;
//                       }}
//                     />
//                   ) : (
//                     <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
//                       <span className="text-xs text-gray-400">No Image</span>
//                     </div>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">
//                     {blog.title}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-500">{blog.author}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-500">{blog.date}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                     {blog.tag}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <div className="flex space-x-2">
//                     <a
//                       href={`/admin/blog/edit/${blog.id}`}
//                       className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                     >
//                       Edit
//                     </a>
//                     <button
//                       onClick={() => handleDelete(blog.id)}
//                       className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminBlogList;

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import ImageBaseurl from "../../ApiBaseUrl/ImageBaseurl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit form states
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [existingImage, setExistingImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${BASE_URL}blog`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete blog
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${BASE_URL}blogs/${id}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Failed to delete blog");
          const data = await res.json();
          Swal.fire("Deleted!", data.message, "success");
          setBlogs(blogs.filter((b) => b.id !== id));
          if (isEditing && editId === id) {
            resetForm();
          }
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  // Load blog data into form for editing
  const handleEditClick = (blog) => {
    setIsEditing(true);
    setEditId(blog.id);
    setSlug(blog.slug);
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setAuthor(blog.author);
    setDate(blog.date);
    setTag(blog.tag);
    setContent(blog.content);
    setExistingImage(blog.image);
    setImageFile(null);
  };

  // Reset form and edit mode
  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setSlug("");
    setTitle("");
    setExcerpt("");
    setAuthor("");
    setDate("");
    setTag("");
    setContent("");
    setExistingImage(null);
    setImageFile(null);
  };

  // Handle image input change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Submit updated blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!slug || !title || !excerpt || !author || !date || !tag || !content) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("slug", slug);
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("author", author);
    formData.append("date", date);
    formData.append("tag", tag);
    formData.append("content", content);
    formData.append("existingImage", existingImage || "");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch(`${BASE_URL}blogs/${editId}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update blog");

      const data = await res.json();
      Swal.fire("Success", data.message, "success");
      // Update the blog in the local list without refetch
      setBlogs((prev) =>
        prev.map((b) =>
          b.id === editId
            ? {
                ...b,
                slug,
                title,
                excerpt,
                author,
                date,
                tag,
                content,
                image: imageFile ? `/uploads/${imageFile.name}` : existingImage,
              }
            : b
        )
      );
      resetForm();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
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
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>

      {/* Blog List */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tag
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  {blog.image ? (
                    <img
                      src={`${ImageBaseurl}${
                        blog.image.startsWith("/")
                          ? blog.image.substring(1)
                          : blog.image
                      }`}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/80?text=No+Image";
                        e.target.onerror = null;
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">No Image</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {blog.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {blog.tag}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEditClick(blog)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className=" p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label className="block mb-2 font-medium">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />

            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />

            <label className="block mb-2 font-medium">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              rows={3}
              required
            />

            <label className="block mb-2 font-medium">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />

            <label className="block mb-2 font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />

            <label className="block mb-2 font-medium">Tag</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />

            <label className="block mb-2 font-medium">Content</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={quillModules}
              formats={quillFormats}
              className="mb-4 bg-white"
              placeholder="Write blog content with formatting..."
            />

            <label className="block mb-2 font-medium">Image</label>
            {existingImage && !imageFile && (
              <img
                src={`${ImageBaseurl}${
                  existingImage.startsWith("/")
                    ? existingImage.substring(1)
                    : existingImage
                }`}
                alt="Current"
                className="w-32 h-32 object-cover mb-4 rounded"
              />
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />

            <div className="flex space-x-4 mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Update Blog
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminBlogList;
