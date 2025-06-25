import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, DollarSign } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="inline mr-2 text-2xl font-bold">₹</span>
            Expense Tracker
          </div>
          
          <div className="user-info">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>Welcome, {user?.name || 'User'}</span>
            </div>
            <button
              onClick={logout}
              className="btn btn-secondary"
              title="Logout"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;