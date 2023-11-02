import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import OrdersList from './OrdersList';
import Cup from './assets/cofffee-cup.svg';
import Pancake from './assets/pancakes.svg';
import Tea from './assets/tea.svg';
import './App.css';
import WebApp from '@twa-dev/sdk';

const MainButtonLogic: React.FC<{ addedItemsCount: number }> = ({ addedItemsCount }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const mainbutton = WebApp.MainButton;
        if (addedItemsCount > 0) {
            mainbutton.setText("VIEW ORDER");
            mainbutton.show();
            mainbutton.onClick(() => {
                navigate("/orders");
                mainbutton.setText("ORDER NOW");
            });
        } else {
            mainbutton.hide();
        }
    }, [addedItemsCount, navigate]);

    return null;
};

const App = () => {
    const [addedItemsCount, setAddedItemsCount] = useState(0);
    const [orders, setOrders] = useState<{ title: string; count: number; }[]>([]);
    
    const menuItems = [
        { title: 'Coffee', price: 10.99, imgUrl: Cup },
        { title: 'Pancake', price: 7.99, imgUrl: Pancake },
        { title: 'Tea', price: 3.99, imgUrl: Tea },
    ];

    const handleAddChange = (title: string, isAdded: boolean) => {
      setAddedItemsCount((prevCount) => (isAdded ? prevCount + 1 : prevCount - 1));
      setOrders((prevOrders) => {
          const existingOrder = prevOrders.find(order => order.title === title);
          if (isAdded) {
              if (existingOrder) {
                  return prevOrders.map(order => order.title === title ? { ...order, count: order.count + 1 } : order);
              } else {
                  return [...prevOrders, { title, count: 1 }];
              }
          } else {
              if (existingOrder?.count === 1) {
                  return prevOrders.filter(order => order.title !== title);
              } else if (existingOrder) {
                  return prevOrders.map(order => order.title === title ? { ...order, count: order.count - 1 } : order);
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
