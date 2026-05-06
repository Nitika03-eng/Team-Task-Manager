import React from 'react';

const AuthLayout = ({ children, isLogin }) => {
  return (
    <div className="auth-layout">
      {/* Background Blobs */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="auth-box">
        <h1 className="main-heading">Task Manager</h1>
        <p className="sub-heading">
          {isLogin ? "Sign in to manage your workflow" : "Start your professional journey"}
        </p>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;