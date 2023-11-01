import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import OrderList from './OrderList'; 
import Cup from './assets/cofffee-cup.svg';
import Pancake from './assets/pancakes.svg';
import Tea from './assets/tea.svg';
import './App.css';
import WebApp from '@twa-dev/sdk';

const App = () => {
  WebApp.setBackgroundColor("#000000");
  const [addedItemsCount, setAddedItemsCount] = useState(0);
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Coffee', price: 10.99, imgUrl: Cup },
    { title: 'Pancake', price: 7.99, imgUrl: Pancake },
    { title: 'Tea', price: 3.99, imgUrl: Tea },
  ];

  const handleAddChange = (isAdded: boolean) => {
    setAddedItemsCount((prevCount) => (isAdded ? prevCount + 1 : prevCount - 1));
  };

  useEffect(() => {
    const mainbutton = WebApp.MainButton;

    if (addedItemsCount > 0) {
      mainbutton.setText("VIEW ORDER");
      mainbutton.show();
      mainbutton.onClick(() => {
        navigate("/orders"); 
      });
    } else {
      mainbutton.hide();
    }
  }, [addedItemsCount]);

  return (
    <Router>
      <Routes>
        <Route path="/orders" element={<OrderList /* передайте сюда ваш список заказов, например orders={orders} */ />} />
        <Route path="/" element={
          <div className="menu-container">
            {menuItems.map((item, index) => (
              <MenuItem {...item} key={index} onAddChange={handleAddChange} />
            ))}
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
