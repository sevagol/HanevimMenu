import MenuItem from './MenuItem';
import Cup from './assets/cofffee-cup.svg';
import Pancake from './assets/pancakes.svg';
import Tea from './assets/tea.svg';
import './App.css';
import { useState } from 'react';
import WebApp from '@twa-dev/sdk';


const App = () => {
  const menuItems = [
    { title: 'Coffee', price: 10.99, imgUrl: Cup},
    { title: 'Pancake', price: 7.99, imgUrl: Pancake },
    { title: 'Tea', price: 3.99, imgUrl: Tea},
  ];

  const [isItemAdded, setIsItemAdded] = useState(false);

  const handleAddChange = (isAdded: boolean) => {
    if (isAdded && !isItemAdded) {
      setIsItemAdded(true);
      const mainbutton = WebApp.MainButton;
      mainbutton.setText('VIEW ORDER')
      mainbutton.show();
    } else if (!isAdded && isItemAdded) {
      setIsItemAdded(false);
      const mainbutton = WebApp.MainButton;
      mainbutton.hide();
    }
  };

  return (
    <div className="menu-container">
      {menuItems.map((item, index) => (
        <MenuItem {...item} key={index} onAddChange={handleAddChange} />
      ))}
    </div>
  );
};

export default App;
