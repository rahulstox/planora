import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const GoogleLoginButton = ({ onSuccess, onError, buttonText = "Continue with Google", className = "" }) => {
  const { googleLogin } = useAuth();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Check if Google Client ID is configured
  if (!googleClientId) {
    console.warn("Google Client ID is not configured. Please set VITE_GOOGLE_CLIENT_ID in your .env file");
  }

  const handleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse || !credentialResponse.credential) {
        toast.error("Google authentication failed - no credential received");
        if (onError) onError("No credential received from Google");
        return;
      }

      const result = await googleLogin(credentialResponse.credential);

      if (result.success) {
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.error || "Google login failed");
        if (onError) onError(result.error);
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("An unexpected error occurred during Google login");
      if (onError) onError("Failed to login with Google");
    }
  };

  const handleError = () => {
    toast.error('Google login was cancelled or failed');
    if (onError) onError('Google login was cancelled or failed');
  };

  return (
    <div className={className}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="filled_blue"
        size="large"
        text={buttonText}
        shape="rectangular"
        locale="en"
      />
    </div>
  );
};

export default GoogleLoginButton;
