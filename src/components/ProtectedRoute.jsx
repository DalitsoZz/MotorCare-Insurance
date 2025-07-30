import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const session = localStorage.getItem('userSession');
      
      if (authStatus === 'true' && session) {
        try {
          const user = JSON.parse(session);
          setUserData(user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user session:', error);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userSession');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userSession');
    setIsAuthenticated(false);
    setUserData(null);
    history.push('/login');
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return (
            <div className="protected-route">
              <header className="user-header">
                <div className="user-info">
                  <div className="user-avatar">
                    <User size={20} />
                  </div>
                  <div className="user-details">
                    <span className="user-name">{userData?.name || 'User'}</span>
                    <span className="user-email">{userData?.email}</span>
                  </div>
                </div>
                <button className="btn btn-icon logout-btn" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </header>
              <Component {...props} />
            </div>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute; 