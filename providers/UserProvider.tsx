"use client";

import { createContext, useContext } from "react";

enum UserRole {
  ADMIN = "admin",
  USER = "user",
  OWNER = "owner",
}

export interface UserInterface {
  name: string;
  user_role: {
    id: number;
    name: UserRole;
  };
}

export const UserContext = createContext<UserInterface | null>(null);

export function useUser() {
  const user = useContext(UserContext);

  if (user?.user_role.name === UserRole.ADMIN)
    return {
      user,
      settings: {
        dashboard: ["read", "create", "update", "delete"],
        schedule: ["read", "create", "update", "delete"],
        staffs: ["read", "create", "update", "delete"],
      },
    };

  if (user?.user_role.name === UserRole.OWNER)
    return {
      user,
      settings: {
        dashboard: ["read", "create", "update", "delete"],
      },
    };

  if (user?.user_role.name === UserRole.USER)
    return {
      user,
      settings: {
        dashboard: ["read", "create", "update", "delete"],
      },
    };
}

export function UserProvider({
  value,
  children,
}: {
  value: UserInterface | null;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
