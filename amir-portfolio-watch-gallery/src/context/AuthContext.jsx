import { useEffect, useState } from "react";
import AuthContext from "./authContextValue";

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("am-user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "am-user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("am-user");
    }
  }, [user]);

  // LOGIN
  const login = (email, password) => {
    const savedAccount =
      localStorage.getItem("am-account");

    if (!savedAccount) {
      return {
        success: false,
        message: "حسابی با این ایمیل پیدا نشد.",
      };
    }

    const account = JSON.parse(savedAccount);

    if (
      account.email !== email ||
      account.password !== password
    ) {
      return {
        success: false,
        message: "ایمیل یا رمز عبور اشتباه است.",
      };
    }

    setUser({
      name: account.name,
      email: account.email,
      phone: account.phone || "",
      city: account.city || "",
      address: account.address || "",
      postalCode: account.postalCode || "",
    });

    return {
      success: true,
    };
  };

  // REGISTER
  const register = (name, email, password) => {
    const savedAccount =
      localStorage.getItem("am-account");

    if (savedAccount) {
      const account = JSON.parse(savedAccount);

      if (account.email === email) {
        return {
          success: false,
          message: "این ایمیل قبلاً ثبت شده است.",
        };
      }
    }

    const newAccount = {
      name,
      email,
      password,
      phone: "",
      city: "",
      address: "",
      postalCode: "",
    };

    localStorage.setItem(
      "am-account",
      JSON.stringify(newAccount)
    );

    setUser({
      name,
      email,
      phone: "",
      city: "",
      address: "",
      postalCode: "",
    });

    return {
      success: true,
    };
  };

  // UPDATE PROFILE
  const updateProfile = (
    name,
    email,
    phone,
    city,
    address,
    postalCode
  ) => {
    const savedAccount =
      localStorage.getItem("am-account");

    if (!savedAccount) {
      return {
        success: false,
        message: "حساب کاربری پیدا نشد.",
      };
    }

    const account = JSON.parse(savedAccount);

    const updatedAccount = {
      ...account,
      name,
      email,
      phone,
      city,
      address,
      postalCode,
    };

    localStorage.setItem(
      "am-account",
      JSON.stringify(updatedAccount)
    );

    setUser({
      name,
      email,
      phone,
      city,
      address,
      postalCode,
    });

    return {
      success: true,
      message:
        "اطلاعات پروفایل با موفقیت ذخیره شد.",
    };
  };

  // UPDATE PASSWORD
  const updatePassword = (
    currentPassword,
    newPassword
  ) => {
    const savedAccount =
      localStorage.getItem("am-account");

    if (!savedAccount) {
      return {
        success: false,
        message: "حساب کاربری پیدا نشد.",
      };
    }

    const account = JSON.parse(savedAccount);

    if (account.password !== currentPassword) {
      return {
        success: false,
        message: "رمز عبور فعلی اشتباه است.",
      };
    }

    if (newPassword.length < 6) {
      return {
        success: false,
        message:
          "رمز عبور جدید باید حداقل ۶ کاراکتر باشد.",
      };
    }

    const updatedAccount = {
      ...account,
      password: newPassword,
    };

    localStorage.setItem(
      "am-account",
      JSON.stringify(updatedAccount)
    );

    return {
      success: true,
      message:
        "رمز عبور با موفقیت تغییر کرد.",
    };
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        updateProfile,
        updatePassword,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;