import { useNavigate } from "react-router-dom";
import ProfilePage from "./profilePage";

const Addresses = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="px-4 pt-4 sm:px-6">
        <button type="button" onClick={() => navigate("/profile")} className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900">
          Back to Profile
        </button>
      </div>
      <ProfilePage />
    </div>
  );
};

export default Addresses;
