import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import CenteredContainer from "../../containers/CenteredContainer";

function Login() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
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
          <h2>Login</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                ref={emailRef}
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                ref={passwordRef}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <button disabled={loading} className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          <div className="my-2 text-center">
            <Link to="forgotPassword">Forgot password?</Link>
          </div>
        </div>
        <div className="card-footer text-center pb-1">
          <h6>
            Don't have an account? <Link to="/signup">Signup</Link>
          </h6>
        </div>
      </div>
    </CenteredContainer>
  );
}

export default Login;
