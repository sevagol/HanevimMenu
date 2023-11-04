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

const MainButtonLogic: React.FC<{ addedItemsCount: number, orders: { title: string; count: number; price: number }[], alignment: 'toGo' | 'here' }> = ({ addedItemsCount, orders, alignment }) => {
    const location = useLocation();
    const navigate = useNavigate();


    const TELEGRAM_TOKEN = "6958756705:AAFTQYV28jtGBu-Qa0ZkFf_6M1ZNGoX3EOg";
    const CHANNEL_ID = "-1002008195730";

    const sendOrderToTelegram = (orders: { title: string; count: number; price: number; selectedOption?: string }[]) => {
        const orderInfo = orders.map(order => {
          let orderText = `${order.title} - ${order.count}x at ${order.price.toFixed(2)}`;
          if (order.selectedOption) {
            orderText += ` (Option: ${order.selectedOption})`;
          }
          return orderText;
        }).join('\n'); // Склеиваем все строки заказа в один большой текст
        
        const finalMessage = `Order Type: ${alignment === "toGo" ? "To Go" : "Here"}\n\n${orderInfo}`;
    
        const baseURL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        const messageText = `New Order:\n\n${finalMessage}`;

        fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: CHANNEL_ID,
                text: messageText
            })
        });
    }


    // useEffect для обработки нажатия кнопки "назад"
    useEffect(() => {
        const backbutton = WebApp.BackButton;

        const handleBackClick = () => {
            navigate("/"); // Вместо window.history.back()
        };

        if (location.pathname === "/orders") {
            backbutton.show();
            backbutton.onClick(handleBackClick);
        } else {
            backbutton.hide();
            backbutton.offClick(handleBackClick); // Убедимся, что обработчик отключен, когда мы не находимся на странице заказов
        }

        return () => {
            backbutton.offClick(handleBackClick); // Отключаем обработчик при размонтировании
        };

    }, [location.pathname, navigate]);

    // Отдельный useEffect для логики MainButton
    useEffect(() => {
        const mainbutton = WebApp.MainButton;

        // Если мы на главной странице
        if (location.pathname === "/") {
            mainbutton.setParams({
                color: '#1E83DB'
            });

            // Показываем кнопку "VIEW ORDER" если есть добавленные товары, иначе скрываем ее
            if (addedItemsCount > 0) {
                mainbutton.setText("VIEW ORDER");
                mainbutton.show();
                mainbutton.onClick(() => {
                    navigate("/orders");
                });
            } else {
                mainbutton.hide();
            }
        }
        // Если мы на странице заказов
        else if (location.pathname === "/orders") {
            mainbutton.setParams({
                color: '#24c46a'
            });
            mainbutton.setText("ORDER NOW");
            mainbutton.show();
            mainbutton.onClick(() => {
                sendOrderToTelegram(orders);
            });

        }
    }, [addedItemsCount, navigate, location.pathname]);




    return null;
};
const App = () => {
    const [addedItemsCount, setAddedItemsCount] = useState(0);
    const [orders, setOrders] = useState<{ id: string, title: string; count: number; price: number; options?: string[], selectedOption?: string }[]>([]);
    const [alignment, setAlignment] = useState<'toGo' | 'here'>('here');


    const menuItems = [
        { title: 'Cappucino', price: 4.99, imgUrl: Cappucino, options: ['Soy', 'Almond', 'Oat', 'Regular'] },
        { title: 'Cortado', price: 5.99, imgUrl: Cortado, options: ['Soy', 'Almond', 'Oat', 'Regular'] },
        { title: 'Espresso', price: 2.99, imgUrl: Espresso },
        { title: 'Flat White', price: 4.99, imgUrl: FlatWhite, options: ['Soy', 'Almond', 'Oat', 'Regular'] },
        { title: 'Latte', price: 4.99, imgUrl: Latte, options: ['Soy', 'Almond', 'Oat', 'Regular'] },
        { title: 'Filter', price: 4.99, imgUrl: filter },
        { title: 'Juice', price: 4.99, imgUrl: Juice },
        { title: 'Matcha', price: 4.99, imgUrl: Matcha },
        { title: 'V60', price: 4.99, imgUrl: V60 },
    ];

    const handleAddChange = (title: string, isAdded: boolean, count: number = 1) => {
        const menuItem = menuItems.find(item => item.title === title);
        setAddedItemsCount(prevCount => isAdded ? prevCount + count : prevCount - count);

    
        setOrders((prevOrders) => {
            if (isAdded) {
                // Добавление нового заказа с уникальным id
                const newOrder = {
                    id: `id-${Date.now()}-${Math.random()}`,
                    title,
                    count,
                    price: menuItem?.price || 0,
                    options: menuItem?.options
                };
                return [...prevOrders, newOrder];
            } else {
                // Удаление заказа по id
                return prevOrders.filter(order => order.title !== title || (order.title === title && order.count > 1));
            }
        });
    };
    

    return (
        <Router>
            <MainButtonLogic addedItemsCount={addedItemsCount} orders={orders} alignment={alignment} />
            <Routes>
            <Route path="/orders" element={<OrdersList orders={orders} alignment={alignment} setAlignment={setAlignment} setOrders={setOrders}/>} />
                <Route path="/" element={
                    <div className="menu-container">
                        <Grid container spacing={0.5}>
                            {menuItems.map((item, index) => (
                                <Grid item xs={4} sm={4} md={4} key={index}>
                                    <MenuItem {...item} key={index} onAddChange={handleAddChange} orders={orders} />
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
