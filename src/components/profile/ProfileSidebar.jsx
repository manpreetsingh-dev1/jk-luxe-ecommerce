import { NavLink } from "react-router-dom";
import {
  UserIcon,
  ShoppingBagIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const ProfileSidebar = () => {
  const links = [
    { name: "Profile", to: "/profile", icon: UserIcon },
    { name: "My Orders", to: "/profile/orders", icon: ShoppingBagIcon },
    { name: "Addresses", to: "/profile/addresses", icon: MapPinIcon },
    { name: "Edit Profile", to: "/profile/edit", icon: UserIcon },
  ];

  return (
    <div className="bg-white shadow-xl p-4 rounded-xl w-64 space-y-4 sticky top-4 h-fit">
      {links.map(({ name, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition ${
              isActive ? "bg-black text-white" : "hover:bg-gray-200"
            }`
          }
        >
          <Icon className="w-5 h-5" />
          {name}
        </NavLink>
      ))}
    </div>
  );
};

export default ProfileSidebar;