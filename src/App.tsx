import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import MenuItem from './MenuItem';
import OrdersList from './OrdersList';
import WebApp from '@twa-dev/sdk';
import { Grid } from '@mui/material';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

interface ApiParams {
    name: string;
    login: string;
    order_id: string;
    amount: number;
    currency: string;
    lang: string;
    notifications_url: string;
    client_name: string;
    client_email: string;
    client_phone: string;
    sign?: string; // Добавляем поле 'sign' с опциональным типом
  }
  
  

const firebaseConfig = {
    apiKey: "AIzaSyAgIIof3E7rTJ_MysoXHHGTESLtD9vavCw",
    authDomain: "menu-89271.firebaseapp.com",
    projectId: "menu-89271",
  //   databaseURL: "https://menu-89271.firebaseio.com",
    storageBucket: "menu-89271.appspot.com",
    messagingSenderId: "55850687910",
    appId: "1:55850687910:web:5c6305c2269e95d6510367"
  };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const MainButtonLogic: React.FC<{
  addedItemsCount: number,
  orders: { id: string, title: string; count: number; price: number; selectedOption?: string }[],
  alignment: 'toGo' | 'here'
}> = ({ addedItemsCount, orders }) => {
  const location = useLocation();
  const navigate = useNavigate();

//   const sendOrderToTelegram = async (orders) => {
    const sendOrderToTelegram = async () => {
    // const TELEGRAM_TOKEN = "6958756705:AAFTQYV28jtGBu-Qa0ZkFf_6M1ZNGoX3EOg";
    // const CHANNEL_ID = "-1002008195730";
    const apiUrl = "https://allpay.to/app/?show=getpayment&mode=api2";
  
    const api_login = "pp1002467";
    
    // Явно указываем тип params и добавляем поле 'sign'
    let params: ApiParams;
params = {
  'name': 'Payment for order #12345 on site.com',
  'login': api_login,
  'order_id': '12345',
  'amount': 1000.00,
  'currency': 'ILS',
  'lang': 'ENG',
  'notifications_url': 'https://site.com/checkout-confirm',
  'client_name': 'Joe Doe',
  'client_email': 'joe@doe.com',
  'client_phone': '+972545678900',
  'sign': '', // Временное значение, пока не будет вычислена подпись
};

const signature = await getApiSignature(params, "C62B7D2FDA8F1C9B6281DD5D36C123BD");
params['sign'] = signature;

  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
  
      if (response.ok) {
        const responseData = await response.json();
        const paymentUrl = responseData.payment_url;
  
        if (paymentUrl) {
          WebApp.openLink(paymentUrl);
        } else {
          alert("Payment URL not found in the response.");
        }
      } else {
        alert("Failed to make the payment request.");
      }
    } catch (error) {
      console.error("Error sending payment request:", error);
      alert("An error occurred while sending the payment request.");
    }
  }
  

  async function getApiSignature(params: ApiParams, apikey: string) {
    const sortedParams = Object.keys(params).sort();
    const chunks = [];

    for (const key of sortedParams) {
        const value = (params as any)[key].trim();
      if (value !== '' && key !== 'sign') {
        chunks.push(value);
      }
    }

    const signatureInput = chunks.join(':') + ':' + apikey;

    const encoder = new TextEncoder();
    const data = encoder.encode(signatureInput);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return signature;
  }

  const handleBackClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleMainButtonClick = useCallback(() => {
    if (location.pathname === "/") {
      navigate("/orders");
    } else if (location.pathname === "/orders") {
      WebApp.showConfirm("Do you want to place an order?", (confirmed) => {
        if (confirmed) {
            // sendOrderToTelegram(orders);
          sendOrderToTelegram();
          alert("Your order has been placed!");
          WebApp.close();
        }
      });
    }
  }, [navigate, location.pathname, orders]);

  useEffect(() => {
    const backbutton = WebApp.BackButton;

    if (location.pathname === "/orders") {
      backbutton.show();
      backbutton.onClick(handleBackClick);
    } else {
      backbutton.hide();
    }

    return () => backbutton.offClick(handleBackClick);

  }, [location.pathname, handleBackClick]);

  useEffect(() => {
    const mainbutton = WebApp.MainButton;

    mainbutton.setParams({
      color: location.pathname === "/" ? '#000000' : '#000000'
    });

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

    return () => mainbutton.offClick(handleMainButtonClick);

  }, [location.pathname, addedItemsCount, handleMainButtonClick]);

  return null;
};

const App = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [addedItemsCount, setAddedItemsCount] = useState(0);
  const [orders, setOrders] = useState<{ id: string, title: string; count: number; price: number; options?: string[], selectedOption?: string }[]>([]);
  const [alignment, setAlignment] = useState<'toGo' | 'here'>('here');

  interface MenuItemType {
    title: string;
    price: number;
    imgUrl: string;
    options?: string[];
  }

  useEffect(() => {
    const fetchMenuItems = async () => {
      const productsCollection = collection(firestore, "products");
      const querySnapshot = await getDocs(productsCollection);
      const productsData: MenuItemType[] = [];
      querySnapshot.forEach((doc) => {
        productsData.push(doc.data() as MenuItemType);
      });
      setMenuItems(productsData);
    };

    fetchMenuItems();
  }, []);

  const handleAddChange = (title: string, isAdded: boolean, count: number = 1, selectedOption?: string) => {
    const menuItem = menuItems.find(item => item.title === title);

    setOrders((prevOrders) => {
      if (isAdded) {
        const newOrder = {
          id: `id-${Date.now()}-${Math.random()}`,
          title,
          count,
          price: menuItem?.price || 0,
          options: menuItem?.options,
          selectedOption,
        };
        return [...prevOrders, newOrder];
      } else {
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
      return prevOrders;
    });

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
      <Routes>
        <Route path="/orders" element={<OrdersList orders={orders} alignment={alignment} setAlignment={setAlignment} setOrders={setOrders} />} />
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
