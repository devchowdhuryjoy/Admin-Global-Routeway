// import React, { useState } from "react";
// import BASE_URL from "../../ApiBaseUrl/BaseUrl";
// import Swal from "sweetalert2";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const Blogs = () => {
//   const [formData, setFormData] = useState({
//     slug: "",
//     title: "",
//     excerpt: "",
//     author: "",
//     date: "",
//     tag: "",
//     content: "",
//     created_at: "",
//   });
//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleContentChange = (value) => {
//     setFormData({ ...formData, content: value });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formPayload = new FormData();
//     formPayload.append("slug", formData.slug);
//     formPayload.append("title", formData.title);
//     formPayload.append("excerpt", formData.excerpt);
//     formPayload.append("image", image);
//     formPayload.append("author", formData.author);
//     formPayload.append("date", formData.date);
//     formPayload.append("tag", formData.tag);
//     formPayload.append("content", formData.content);
//     formPayload.append("created_at", formData.created_at);

//     try {
//       const response = await fetch(`${BASE_URL}blogs`, {
//         method: "POST",
//         body: formPayload,
//       });

//       const result = await response.json();
//       console.log(result);

//       if (response.ok) {
//         Swal.fire("Success", "Blog created successfully", "success");
//       } else {
//         Swal.fire("Error", result.message || "Something went wrong", "error");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       Swal.fire("Error", "Failed to submit blog", "error");
//     }
//   };

//   const quillModules = {
//     toolbar: [
//       [{ header: [1, 2, 3, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ color: [] }, { background: [] }],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image"],
//       ["clean"],
//     ],
//   };

//   const quillFormats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "color",
//     "background",
//     "list",
//     "bullet",
//     "link",
//     "image",
//   ];

//   return (
//     <div className=" mt-10 bg-white p-6 shadow rounded-xl">
//       <h2 className="text-2xl font-bold mb-6 text-center">Create New Blog</h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
//         {[
//           { label: "Slug", name: "slug" },
//           { label: "Title", name: "title" },
//           { label: "Excerpt", name: "excerpt" },
//           { label: "Author", name: "author" },
//           { label: "Date", name: "date", type: "date" },
//           { label: "Tag", name: "tag" },
//           { label: "Created At", name: "created_at", type: "datetime-local" },
//         ].map(({ label, name, type = "text" }) => (
//           <div key={name}>
//             <label className="block mb-1 font-medium">{label}</label>
//             <input
//               type={type}
//               name={name}
//               value={formData[name]}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded p-2"
//               required
//             />
//           </div>
//         ))}

//         <div>
//           <label className="block mb-1 font-medium">Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full border border-gray-300 rounded p-2"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Content</label>
//           <ReactQuill
//             theme="snow"
//             value={formData.content}
//             onChange={handleContentChange}
//             modules={quillModules}
//             formats={quillFormats}
//             className="bg-white"
//             placeholder="Write blog content with formatting..."
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Submit Blog
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Blogs;

import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import Swal from "sweetalert2";

const Blogs = () => {
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    author: "",
    date: "",
    tag: "",
    content: "",
    created_at: "",
  });
  const [image, setImage] = useState(null);

  const editor = useRef(null);

  const joditConfig = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write blog content here...",
    }),
    []
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (newContent) => {
    setFormData({ ...formData, content: newContent });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("slug", formData.slug);
    formPayload.append("title", formData.title);
    formPayload.append("excerpt", formData.excerpt);
    formPayload.append("image", image);
    formPayload.append("author", formData.author);
    formPayload.append("date", formData.date);
    formPayload.append("tag", formData.tag);
    formPayload.append("content", formData.content);
    formPayload.append("created_at", formData.created_at);

    try {
      const response = await fetch(`${BASE_URL}blogs`, {
        method: "POST",
        body: formPayload,
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        Swal.fire("Success", "Blog created successfully", "success");
      } else {
        Swal.fire("Error", result.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Failed to submit blog", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Blogs</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {[
          { label: "Slug", name: "slug" },
          { label: "Title", name: "title" },
          { label: "Excerpt", name: "excerpt" },
          { label: "Author", name: "author" },
          { label: "Date", name: "date", type: "date" },
          { label: "Tag", name: "tag" },
          { label: "Created At", name: "created_at", type: "datetime-local" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
        ))}

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
          <JoditEditor
            ref={editor}
            value={formData.content}
            config={joditConfig}
            onBlur={handleContentChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default Blogs;
