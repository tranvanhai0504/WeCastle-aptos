import React, { useContext, useEffect } from "react";
import AuthContext, { AuthContextType } from "../contexts/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context as AuthContextType;
};

export default useAuth;
