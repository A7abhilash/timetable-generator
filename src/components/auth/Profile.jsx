import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import CenteredContainer from "../../containers/CenteredContainer";

function Profile() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <CenteredContainer>
      <div className="card w-100" style={{ maxWidth: "400px" }}>
        <div className="card-header text-center">
          <h2>Profile</h2>
        </div>
        <div className="card-body">
          <p className="lead">
            <strong>Email:</strong> {currentUser && currentUser.email}
          </p>
          <Link to="updateProfile" className="btn btn-dark">
            Update Profile
          </Link>
        </div>
        <div className="card-footer">
          <button onClick={handleLogout} className="btn btn-block btn-danger">
            Sign out
          </button>
        </div>
      </div>
    </CenteredContainer>
  );
}

export default Profile;
