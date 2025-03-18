import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './PasswordReset.css';
import Navbar from '../Navbar/Navbar';

const PasswordResetConfirm = ({ userType }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirmation: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirmation) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(`http://localhost:3000/${userType}/password`, {
        [userType]: {
          reset_password_token: searchParams.get('reset_password_token'),
          password: formData.password,
          password_confirmation: formData.passwordConfirmation
        }
      });

      if (response.data.status.code === 200) {
        toast.success('Password has been reset successfully');
        navigate(`/${userType}/login`);
      }
    } catch (error) {
      toast.error(error.response?.data?.status?.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
    <Navbar/>
    <div className="password-reset-container">
      <div className="password-reset-box">
        <h2 className="password-reset-heading">
          Set New Password
        </h2>
        <p className="password-reset-subtext">
          Please enter your new password below
        </p>
      </div>

      <div className="password-reset-box">
        <div className="password-reset-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirmation" className="form-label">
                Confirm New Password
              </label>
              <div>
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  required
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
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
                {isLoading ? 'Resetting...' : 'Reset Password'}
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

export default PasswordResetConfirm;
