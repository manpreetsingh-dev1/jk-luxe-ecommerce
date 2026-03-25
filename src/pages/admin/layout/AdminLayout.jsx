import { Outlet } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminTopbar from "../../../components/AdminTopbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4ede3_0%,#fffdfa_36%,#f1ebe4_100%)] text-stone-900 lg:flex">
      <AdminSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
