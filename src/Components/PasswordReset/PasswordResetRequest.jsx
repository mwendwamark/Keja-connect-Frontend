import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './PasswordReset.css';
import Navbar from '../Navbar/Navbar';

const PasswordResetRequest = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await axios.post(`${apiUrl}/${userType}/password`, {
        [userType]: { email }
      });

      if (response.data.status.code === 200) {
        toast.success('Password reset instructions sent to your email');
        setEmail('');
      }
    } catch (error) {
      toast.error(error.response?.data?.status?.message || 'Failed to send reset instructions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="password-reset-container">
      <div className="password-reset-box">
        <h2 className="password-reset-heading">
          Reset your password
        </h2>
        <p className="password-reset-subtext">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>

      <div className="password-reset-box">
        <div className="password-reset-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <button
                type="submit"
                disabled={isLoading}
                className={`submit-button ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default PasswordResetRequest;
