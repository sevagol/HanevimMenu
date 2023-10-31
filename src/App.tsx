
import MenuItem from './MenuItem';
import Cup from './assets/cofffee-cup.svg';
import Pancake from './assets/pancakes.svg';
import Tea from './assets/tea.svg';
import './App.css';

const App = () => {
  const menuItems = [
    { title: 'Coffee', price: 10.99, imgUrl: Cup},
    { title: 'Pancake', price: 7.99, imgUrl: Pancake },
    { title: 'Tea', price: 3.99, imgUrl: Tea},
  ];

  return (
    <div className="menu-container">
      {menuItems.map((item, index) => (
        <MenuItem {...item} key={index} />
      ))}
    </div>
  );
};

export default App;
