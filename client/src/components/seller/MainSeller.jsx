import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Listofproducts from './Listofproducts';

function MainSeller() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Redirect if not logged in or not a seller
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'seller') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'seller') {
    return null; // or a loading state
  }

  return (
    <div className="seller-dashboard">
      <Listofproducts />
    </div>
  );
}

export default MainSeller;
