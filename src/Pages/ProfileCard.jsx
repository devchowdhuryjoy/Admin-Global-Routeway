import React, { useState, useRef } from "react";
import { FiX, FiEdit2, FiSave, FiCamera } from "react-icons/fi";
import { FaTwitter, FaLinkedin, FaGithub, FaDribbble } from "react-icons/fa";

const ProfileCard = () => {
  const [isVisible, setIsVisible] = useState(true); // কার্ড দৃশ্যমান কিনা
  const [name, setName] = useState("Imran Uddin");
  const [image, setImage] = useState("https://i.pravatar.cc/150?img=3");
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(name);

  const fileInputRef = useRef(null);

  const handleClose = () => {
    setIsVisible(false); // কার্ড লুকিয়ে দেয়ার ফাংশন
  };

  const handleNameClick = () => {
    setIsEditingName(true);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSave = () => {
    if (newName.trim()) {
      setName(newName);
    }
    setIsEditingName(false);
  };

  const handleCancel = () => {
    setNewName(name);
    setIsEditingName(false);
  };

  const socialIcons = {
    twitter: <FaTwitter />,
    linkedin: <FaLinkedin />,
    github: <FaGithub />,
    dribbble: <FaDribbble />,
  };

  if (!isVisible) return null; // যদি visible না হয়, কিছু রেন্ডার করবে না

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl relative">
      
      {/* Cross icon - absolute top right */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition-colors"
        title="Close"
      >
        <FiX size={24} />
      </button>

      <div className="flex flex-col items-center p-8">
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        {/* Profile Image with Red Edit Icon */}
        <div className="relative group">
          <img
            src={image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#f16f22] cursor-pointer"
            onClick={handleImageClick}
          />
          <div
            className="absolute bottom-0 right-0 bg-red-500 rounded-full p-2 cursor-pointer transform translate-y-1/4 hover:bg-red-600 transition-colors shadow-md"
            onClick={handleImageClick}
            title="Change profile image"
          >
            <FiCamera className="text-white" size={16} />
          </div>
        </div>

        {/* Name Section */}
        <div className="mt-6 w-full text-center relative">
          {isEditingName ? (
            <div className="relative inline-block w-full max-w-xs mx-auto">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border-b-2 border-[#f16f22] px-3 py-2 pr-10 w-full text-center text-xl font-semibold bg-transparent focus:outline-none focus:ring-1 focus:ring-[#f16f22] rounded-t"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <button
                  onClick={handleSave}
                  className="text-green-600 hover:text-green-800 transition-colors"
                  title="Save"
                >
                  <FiSave size={18} />
                </button>
                <button
                  onClick={handleCancel}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  title="Cancel"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-[#f16f22] transition-colors" onClick={handleNameClick}>
                {name}
              </h2>
              <button
                onClick={handleNameClick}
                className="text-gray-500 hover:text-[#f16f22] transition-colors"
                title="Edit name"
              >
                <FiEdit2 size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
