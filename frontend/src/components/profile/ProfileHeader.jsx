import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const ProfileHeader = () => {
  const { user, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
      // call backend update if needed
      updateUserProfile({ profilePic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow mb-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            className="w-16 h-16 rounded-full border-2 border-black cursor-pointer hover:scale-105 transition"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
          />
        </div>
        <div>
          <h2 className="font-bold text-lg">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;