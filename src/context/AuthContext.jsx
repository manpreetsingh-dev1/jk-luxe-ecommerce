import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

const normalizeUser = (userData = {}, token) => {
  let decoded = {};

  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      decoded = {};
    }
  }

  return {
    _id: userData._id || userData.id || decoded.id || "",
    id: userData.id || userData._id || decoded.id || "",
    name: userData.name || decoded.name || "Guest",
    email: userData.email || decoded.email || "",
    role: userData.role || decoded.role || "user",
    phone: userData.phone || "",
    profilePic: userData.profilePic || "",
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(storedToken);

      if (decoded.exp * 1000 < Date.now()) {
        logout();
      } else {
        const parsedUser = storedUser ? JSON.parse(storedUser) : {};
        const normalizedUser = normalizeUser(parsedUser, storedToken);
        setUser(normalizedUser);
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Invalid token on load:", error);
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData, jwt) => {
    const normalizedUser = normalizeUser(userData, jwt);
    setUser(normalizedUser);
    setToken(jwt);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", jwt);
  };

  const value = useMemo(() => {
    const isAuthenticated = Boolean(user && token);
    const isAdmin = user?.role === "admin";

    return {
      user,
      token,
      loading,
      isAuthenticated,
      isAdmin,
      login,
      logout,
    };
  }, [loading, token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
