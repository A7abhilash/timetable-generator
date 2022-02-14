import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function UpdateProfile() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== confirmpasswordRef.current.value) {
      return alert("Passwords do not match");
    }

    setLoading(true);

    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className="card w-100" style={{ maxWidth: "400px" }}>
      <div className="card-header text-center">
        <h2>Update Profile</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              ref={emailRef}
              className="form-control"
              placeholder="Enter new email"
              required
              defaultValue={currentUser.email}
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              ref={passwordRef}
              className="form-control"
              placeholder="Leave blank to keep the same password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              ref={confirmpasswordRef}
              className="form-control"
              placeholder="Leave blank to keep the same password"
            />
          </div>
          <button disabled={loading} className="btn btn-primary btn-block">
            Update Profile
          </button>
        </form>
      </div>
      <div className="card-footer text-center pb-1">
        <Link to="/" className="btn btn-sm btn-danger">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default UpdateProfile;
