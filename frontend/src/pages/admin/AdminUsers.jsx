import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../api/adminApi";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    getAllUsers()
      .then((response) => setUsers(response.data.users || []))
      .catch((error) => console.error("Failed to fetch users:", error));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.45em] text-amber-700">Accounts</p>
        <h1 className="font-['Sora'] text-3xl font-semibold text-stone-950">Users</h1>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <article key={user._id} className="flex flex-col gap-4 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_20px_70px_rgba(23,19,18,0.08)] md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-['Sora'] text-xl font-semibold text-stone-950">{user.name}</p>
              <p className="mt-2 text-sm text-stone-500">{user.email}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${user.role === "admin" ? "bg-emerald-100 text-emerald-800" : "bg-stone-100 text-stone-700"}`}>
                {user.role}
              </span>
              <button
                type="button"
                disabled={user.role === "admin"}
                onClick={async () => {
                  await deleteUser(user._id);
                  loadUsers();
                }}
                className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
