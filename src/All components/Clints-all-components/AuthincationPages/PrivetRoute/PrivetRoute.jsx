import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Authconnect } from "../Authincation/Authincation";
// import { Authconnect } from "../../../Clints-all-components/AuthincationPages/Authincation/Authincation";

const PrivetRoute = ({ children }) => {
  const { currentUser, loading } = useContext(Authconnect);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-primary text-4xl"></span>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivetRoute;
