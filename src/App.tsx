import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import MenuItem from './MenuItem';
import OrdersList from './OrdersList'; // Импортируйте новый компонент
import Cup from './assets/cofffee-cup.svg';
import Pancake from './assets/pancakes.svg';
import Tea from './assets/tea.svg';
import './App.css';
import WebApp from '@twa-dev/sdk';

const App = () => {
  WebApp.setBackgroundColor("#000000");
  const [addedItemsCount, setAddedItemsCount] = useState(0);
  const history = useHistory();

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
        history.push("/orders"); // переход на страницу заказов
      });
    } else {
      mainbutton.hide();
    }
  }, [addedItemsCount, history]);

  return (
    <Router>
      <Switch>
        <Route path="/orders">
          <OrdersList /* передайте сюда ваш список заказов, например orders={orders} */ />
        </Route>
        <Route path="/">
          <div className="menu-container">
            {menuItems.map((item, index) => (
              <MenuItem {...item} key={index} onAddChange={handleAddChange} />
            ))}
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
