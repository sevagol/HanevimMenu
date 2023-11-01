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

type MenuItemType = {
  title: string;
  price: number;
  imgUrl: string;
  count: number;
};

const App = () => {
  WebApp.setBackgroundColor("#000000");
  const [addedItemsCount, setAddedItemsCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState<MenuItemType[]>([]);
  const navigate = useNavigate();

  const menuItems: MenuItemType[] = [
    { title: 'Coffee', price: 10.99, imgUrl: Cup, count: 0 },
    { title: 'Pancake', price: 7.99, imgUrl: Pancake, count: 0 },
    { title: 'Tea', price: 3.99, imgUrl: Tea, count: 0 },
  ];

  const handleAddChange = (item: MenuItemType, isAdded: boolean) => {
    setAddedItemsCount((prevCount) => (isAdded ? prevCount + 1 : prevCount - 1));

    if (isAdded) {
      setSelectedItems(prevItems => {
        const existingItem = prevItems.find(i => i.title === item.title);
        if (existingItem) {
          return prevItems.map(i => 
            i.title === item.title ? {...i, count: i.count + 1} : i
          );
        }
        return [...prevItems, {...item, count: 1}];
      });
    } else {
      setSelectedItems(prevItems => {
        const existingItem = prevItems.find(i => i.title === item.title);
        if (existingItem && existingItem.count > 1) {
          return prevItems.map(i => 
            i.title === item.title ? {...i, count: i.count - 1} : i
          );
        }
        return prevItems.filter(i => i.title !== item.title);
      });
    }
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
        <Route path="/orders" element={<OrderList orders={selectedItems.filter(item => item.count > 0)} />} />
        <Route path="/" element={
          <div className="menu-container">
            {menuItems.map((item, index) => (
              <MenuItem {...item} key={index} onAddChange={(isAdded) => handleAddChange(item, isAdded)} />
            ))}
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
