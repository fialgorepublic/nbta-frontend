// Create a new file called ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetail") || '{}');
  const token = userDetails.token;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  const decodedToken = jwtDecode(token);
  if (decodedToken.role === 'investor') {
    return <Navigate to="/investor-landing" replace />;
  }

  return children;
};

export default ProtectedRoute;