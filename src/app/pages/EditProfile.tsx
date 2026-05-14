import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Camera, X } from "lucide-react";

export function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "Armenam",
    username: "armenam244",
    bio: "Digital creator ✨\nSharing little moments, big dreams and\ngood vibes 🌸\nLet's enjoy life together 👋",
    website: "",
    location: "Montenegro",
  });

  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/150?img=30");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Saving profile:", formData);
    navigate("/profile");
  };

  const handleImageChange = () => {
    // Simulate image selection
    console.log("Select new profile image");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E91E63] via-[#FF5722] to-[#FFC107]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#E91E63] to-[#FF5722] px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white font-bold text-lg">Edit Profile</h1>
        <button
          onClick={handleSave}
          className="font-semibold text-white"
        >
          Save
        </button>
      </header>

      <div className="p-4">
        {/* Profile Photo */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-md">
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button
                onClick={handleImageChange}
                className="absolute bottom-0 right-0 bg-gradient-to-r from-[#E91E63] to-[#FF5722] text-white p-2 rounded-full shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleImageChange}
              className="text-[#E91E63] font-semibold text-sm"
            >
              Change Profile Photo
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <label className="text-xs text-gray-500 font-medium block mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full text-gray-900 focus:outline-none"
            />
          </div>
          <div className="p-4 border-b border-gray-100">
            <label className="text-xs text-gray-500 font-medium block mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full text-gray-900 focus:outline-none"
            />
          </div>
          <div className="p-4 border-b border-gray-100">
            <label className="text-xs text-gray-500 font-medium block mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full text-gray-900 focus:outline-none resize-none"
            />
          </div>
          <div className="p-4 border-b border-gray-100">
            <label className="text-xs text-gray-500 font-medium block mb-2">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://"
              className="w-full text-gray-900 focus:outline-none"
            />
          </div>
          <div className="p-4">
            <label className="text-xs text-gray-500 font-medium block mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full text-gray-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-md mt-4 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Personal Information</h3>
            <p className="text-xs text-gray-500 mt-1">
              Provide your personal information for account security
            </p>
          </div>
          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between">
            <span className="text-gray-900">Email</span>
            <span className="text-gray-500 text-sm">armenam@example.com</span>
          </button>
          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between border-t border-gray-100">
            <span className="text-gray-900">Phone</span>
            <span className="text-gray-500 text-sm">+382 123 456 789</span>
          </button>
          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between border-t border-gray-100">
            <span className="text-gray-900">Gender</span>
            <span className="text-gray-500 text-sm">Female</span>
          </button>
        </div>
      </div>
    </div>
  );
}
