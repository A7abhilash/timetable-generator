import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import CenteredContainer from "../../containers/CenteredContainer";

function Signup() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== confirmpasswordRef.current.value) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  return (
    <CenteredContainer>
      <div className="card w-100" style={{ maxWidth: "400px" }}>
        <div className="card-header text-center">
          <h2>Sign Up</h2>
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
              />
            </div>
            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                ref={passwordRef}
                className="form-control"
                placeholder="New Password"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                ref={confirmpasswordRef}
                className="form-control"
                placeholder="Confirm Password"
                required
              />
            </div>
            <button disabled={loading} className="btn btn-primary btn-block">
              Sign Up
            </button>
          </form>
        </div>
        <div className="card-footer text-center pb-1">
          <h6>
            Already have an account? <Link to="/login">Login</Link>
          </h6>
        </div>
      </div>
    </CenteredContainer>
  );
}

export default Signup;
