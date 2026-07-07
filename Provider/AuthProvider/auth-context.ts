"use client";

import { Auth } from "@/Types/Types";
import { createContext } from "react";

type AuthContextType = {
  logOut: () => void;
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  isLoading: boolean
};

export const AuthContext = createContext<AuthContextType | null>(null);
