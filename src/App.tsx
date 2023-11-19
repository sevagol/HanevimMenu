import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import MenuItem from './MenuItem';
import OrdersList from './OrdersList';
import './App.css';
import WebApp from '@twa-dev/sdk';
import { Grid } from '@mui/material';
import { useCallback } from 'react';
import { Tabs, Tab, Box } from '@mui/material';


const MainButtonLogic: React.FC<{
    addedItemsCount: number,
    orders: { id: string, title: string; count: number; price: number; selectedOption?: string, category: string }[],
    alignment: 'toGo' | 'here'
  }> = ({ addedItemsCount, orders, alignment }) => {    const location = useLocation();
    const navigate = useNavigate();


    const TELEGRAM_TOKEN = "6958756705:AAFTQYV28jtGBu-Qa0ZkFf_6M1ZNGoX3EOg";
    const CHANNEL_ID = "-1002008195730";

    const sendOrderToTelegram = (orders: { id: string; title: string; count: number; price: number; selectedOption?: string, category: string }[]) => {
        const orderInfo = orders.map(order => {
          let orderText = `${order.title} - ${order.count}x at ${(order.price * order.count).toFixed(2)}`;
          if (order.selectedOption) {
            orderText += ` (Option: ${order.selectedOption})`;
          }
          return orderText;
        }).join('\n'); // Каждый заказ отображается отдельной строкой
        
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
      

    const handleBackClick = useCallback(() => {
        navigate("/"); // Вместо window.history.back()
    }, [navigate]);

    const handleMainButtonClick = useCallback(() => {
        // Если мы на главной странице
        if (location.pathname === "/") {
            navigate("/orders");
        }
        // Если мы на странице заказов
        else if (location.pathname === "/orders") {
            WebApp.showConfirm("Do you want to place an order?", (confirmed) => {
                if (confirmed) {
                    sendOrderToTelegram(orders);
                    alert("Your order has been placed!");
                    WebApp.close();

                }})
            
        }
    }, [navigate, location.pathname, orders]);


    // useEffect для обработки нажатия кнопки "назад"
    useEffect(() => {
        const backbutton = WebApp.BackButton;

        if (location.pathname === "/orders") {
            backbutton.show();
            backbutton.onClick(handleBackClick);
        } else {
            backbutton.hide();
        }

        // Отключаем обработчик при размонтировании
        return () => backbutton.offClick(handleBackClick);

    }, [location.pathname, handleBackClick]);

    // Отдельный useEffect для логики MainButton
    useEffect(() => {
        const mainbutton = WebApp.MainButton;

        mainbutton.setParams({
            color: location.pathname === "/" ? '#000000' : '#000000'
        });

        // Показываем кнопку "VIEW ORDER" если есть добавленные товары, иначе скрываем ее
        if (location.pathname === "/" && addedItemsCount > 0) {
            mainbutton.setText("VIEW ORDER");
            mainbutton.show();
        } else if (location.pathname === "/orders") {
            mainbutton.setText("ORDER NOW");
            mainbutton.show();
        } else {
            mainbutton.hide();
        }

        mainbutton.onClick(handleMainButtonClick);

        // Отключаем обработчик при размонтировании
        return () => mainbutton.offClick(handleMainButtonClick);

    }, [location.pathname, addedItemsCount, handleMainButtonClick]);

    return null;
};
const App = () => {
    const [addedItemsCount, setAddedItemsCount] = useState(0);
    const [orders, setOrders] = useState<{ id: string, title: string; count: number; price: number; options?: string[], selectedOption?: string, category: string }[]>([]);
    const [alignment, setAlignment] = useState<'toGo' | 'here'>('here');

    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };
    
    

    const categories = ['Beverages', 'Pastries', 'Specials'];


    const menuItems = [
        { title: 'Latte', price: 16, imgUrl: '1-removebg-preview.png', options: ['Soy', 'Almond', 'Oat', 'Regular'], category: 'Beverages' },
        { title: 'Filter', price: 15, imgUrl: '2-removebg-preview.png', category: 'Beverages' },
        { title: 'Turkish', price: 21, imgUrl: '3-removebg-preview.png', category: 'Pastries' },
        { title: 'Matcha', price: 18, imgUrl: '4-removebg-preview.png', category: 'Specials' },
        { title: 'V60', price: 20, imgUrl: '5-removebg-preview.png' },
        { title: 'Cruassain', price: 20, imgUrl: '6-removebg-preview.png' },
        { title: 'Cofee beans', price: 18, imgUrl: '7-removebg-preview.png' },
        { title: 'Chocolate', price: 18, imgUrl: '8-removebg-preview.png' },
        { title: 'Pie', price: 18, imgUrl: '9-removebg-preview.png' },
        { title: 'Cappucino', price: 18, imgUrl: '10-removebg-preview.png' },
        { title: 'M tonic', price: 18, imgUrl: '11-removebg-preview.png' },
        { title: 'Latte 2', price: 22, imgUrl: '12-removebg-preview.png' },
    ];

    const handleAddChange = (title: string, isAdded: boolean, count: number = 1, selectedOption?: string) => {
        const menuItem = menuItems.find(item => item.title === title);
        
        // Обновляем заказы
        setOrders((prevOrders) => {
            // Если добавляем товар
            if (isAdded) {
                // Создаем новый заказ
                const newOrder = {
                    id: `id-${Date.now()}-${Math.random()}`,
                    title,
                    count,
                    price: menuItem?.price || 0,
                    options: menuItem?.options,
                    selectedOption,
                    category: menuItem?.category || ''
                };
                return [...prevOrders, newOrder]; // Добавляем новый заказ в массив
            } else {
                // Если удаляем товар, находим первый подходящий и уменьшаем количество или удаляем заказ
                const orderIndex = prevOrders.findIndex(order => order.title === title && order.selectedOption === selectedOption);
                if (orderIndex !== -1) {
                    const newOrders = [...prevOrders];
                    if (newOrders[orderIndex].count > 1) {
                        newOrders[orderIndex].count -= count;
                    } else {
                        newOrders.splice(orderIndex, 1);
                    }
                    return newOrders;
                }
            }
            return prevOrders; // Если ничего не добавляем и не удаляем, возвращаем предыдущие заказы
        });
        
        // Обновляем счетчик добавленных элементов
        setAddedItemsCount(prevCount => {
            if (isAdded) {
                return prevCount + count;
            } else {
                return prevCount - count < 0 ? 0 : prevCount - count;
            }
        });
    };
    
    
    

    
    return (
        <Router>
            <MainButtonLogic addedItemsCount={addedItemsCount} orders={orders} alignment={alignment} />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
                    {categories.map((category, index) => (
                        <Tab label={category} key={index} />
                    ))}
                </Tabs>
            </Box>
            <Routes>
                <Route path="/orders" element={<OrdersList orders={orders} alignment={alignment} setAlignment={setAlignment} setOrders={setOrders}/>} />
                <Route path="/" element={
                    <div className="menu-container">
                        <Grid container spacing={0.5}>
                        {menuItems.filter(item => item.category === categories[activeTab]).map((item, index) => (
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
