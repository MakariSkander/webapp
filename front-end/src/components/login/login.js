import React, { useState } from 'react';
import './style.css';
import { loginapi } from '../../api/api';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const credentials = { email, password };
      const result = await loginapi(credentials);
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <section className="login-block min-vh-100">
      <div className="container">
        <div className="row">
          <div className="col-md-4 login-sec">
            <h2 className="text-center">Login Now</h2>
            <div className="login-form">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="text-uppercase">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" />
                  <small>Remember Me</small>
                </label>
                <Link to={'stream'}>
                <button className="btn btn-login float-right" onClick={handleLogin}>
                  Submit
                </button>
                </Link>
              </div>
            </div>
            <div className="copy-text">
              Created with <i className="fa fa-heart"></i> by <a href="http://grafreez.com">Exypnotech.com</a>
            </div>
          </div>
          <div className="col-md-8 banner-sec"></div>
        </div>
      </div>
    </section>
  );
}

export default Login;
