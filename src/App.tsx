import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import MenuItem from './MenuItem';
import OrdersList from './OrdersList';
import Cappucino from './assets/cappucino.svg';
import Cortado from './assets/cortado.svg';
import Espresso from './assets/espresso.svg';
import FlatWhite from './assets/flatv.svg';
import Latte from './assets/latte.svg';
import filter from './assets/filter.svg';
import Juice from './assets/juice.svg';
import Matcha from './assets/matcha.svg';
import V60 from './assets/v60.svg';
import './App.css';
import WebApp from '@twa-dev/sdk';
import { Grid } from '@mui/material';

const MainButtonLogic: React.FC<{ addedItemsCount: number }> = ({ addedItemsCount }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const orderbutton = WebApp.MainButton;
    orderbutton.setText("ORDER");
    orderbutton.setParams({
        color: '#00FF00'
    });

    useEffect(() => {
        const mainbutton = WebApp.MainButton;
        if (location.pathname === "/orders") {
            mainbutton.hide();
            orderbutton.show();
            return; // Если пользователь находится на странице заказов, просто скройте кнопку и выйдите из useEffect
        }
        if (addedItemsCount > 0) {
            mainbutton.setText("VIEW ORDER");
            mainbutton.show();
            mainbutton.onClick(() => {
                navigate("/orders");
                mainbutton.hide();
            });
        } else {
            mainbutton.hide();
        }
    }, [addedItemsCount, navigate, location]);

    return null;
};
const App = () => {
    const [addedItemsCount, setAddedItemsCount] = useState(0);
    const [orders, setOrders] = useState<{ title: string; count: number; price: number }[]>([]);
    
    const menuItems = [
        { title: 'Cappucino', price: 4.99, imgUrl: Cappucino },
        { title: 'Cortado', price: 5.99, imgUrl: Cortado },
        { title: 'Espresso', price: 2.99, imgUrl: Espresso },
        { title: 'Flat White', price: 4.99, imgUrl: FlatWhite },
        { title: 'Latte', price: 4.99, imgUrl: Latte },
        { title: 'Filter', price: 4.99, imgUrl: filter },
        { title: 'Juice', price: 4.99, imgUrl: Juice },
        { title: 'Matcha', price: 4.99, imgUrl: Matcha },
        { title: 'V60', price: 4.99, imgUrl: V60 },
    ];

    const handleAddChange = (title: string, isAdded: boolean) => {
      setAddedItemsCount((prevCount) => (isAdded ? prevCount + 1 : prevCount - 1));

      const menuItem = menuItems.find(item => item.title === title);

      setOrders((prevOrders) => {
          const existingOrder = prevOrders.find(order => order.title === title);

          if (isAdded) {
              if (existingOrder) {
                  return prevOrders.map(order => 
                    order.title === title 
                        ? { ...order, count: order.count + 1 } 
                        : order);
              } else {
                  return [...prevOrders, { title, count: 1, price: menuItem?.price || 0 }];
              }
          } else {
              if (existingOrder?.count === 1) {
                  return prevOrders.filter(order => order.title !== title);
              } else if (existingOrder) {
                  return prevOrders.map(order => 
                    order.title === title 
                        ? { ...order, count: order.count - 1 } 
                        : order);
              }
              return prevOrders;
          }
      });
  };

    return (
        <Router>
            <MainButtonLogic addedItemsCount={addedItemsCount} />
            <Routes>
                <Route path="/orders" element={<OrdersList orders={orders} />} />
                <Route path="/" element={
                    <div className="menu-container">
                        <Grid container spacing={0.5}>
                        {menuItems.map((item, index) => (
                            <Grid item xs={4} sm={4} md={4} key={index}>
                            <MenuItem {...item} key={index} onAddChange={handleAddChange} />
                            </Grid>
                        ))}
                        </Grid>
                    </div>
                } />
            </Routes>
        </Router>
    );
};

export default App;
