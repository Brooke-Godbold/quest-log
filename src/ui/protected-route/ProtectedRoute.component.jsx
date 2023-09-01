import PropTypes from "prop-types";

import { Navigate } from "react-router-dom";

import { useUser } from "../../query/auth/useUser";

import Spinner from "../spinner/Spinner";

function ProtectedRoute({ children }) {
  const { isGettingUser, isAuthenticated } = useUser();

  if (isGettingUser) return <Spinner />;

  if (!isGettingUser && !isAuthenticated) {
    console.log(isAuthenticated);
    return <Navigate to="/login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
