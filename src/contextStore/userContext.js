import React, { createContext, useState, useEffect } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState(() => {
    const savedUserDetail = localStorage.getItem("userDetail");
    return savedUserDetail ? JSON.parse(savedUserDetail) : null;
  });

  useEffect(() => {
    if (userDetail) {
      localStorage.setItem("userDetail", JSON.stringify(userDetail));
    } else {
      localStorage.removeItem("userDetail");
    }
  }, [userDetail]);

  return (
    <UserContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserContext.Provider>
  );
};
