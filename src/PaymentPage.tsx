import React, { useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { Button } from '@mui/material';

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
    sign?: string;
  }

interface PaymentPageProps {
  orders: { id: string, title: string; count: number; price: number; selectedOption?: string }[];
}

const PaymentPage: React.FC<PaymentPageProps> = () => {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const handlePaymentButtonClick = async () => {
    const apiUrl = "https://allpay.to/app/?show=getpayment&mode=api2";
    const api_login = "pp1002467";

    // Функция для вычисления подписи
    const getApiSignature = async (params: ApiParams, apikey: string) => {
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
    };

    // Создайте объект params для отправки
    const params: ApiParams = {
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

    try {
      // Вызовите функцию getApiSignature для вычисления подписи
      const signature = await getApiSignature(params, "C62B7D2FDA8F1C9B6281DD5D36C123BD");
      params['sign'] = signature;

      // Отправьте POST-запрос
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
          // Установите полученную ссылку в состояние и отобразите кнопку для открытия ссылки
          setPaymentUrl(paymentUrl);
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
  };

  const handleOpenPaymentUrl = () => {
    if (paymentUrl) {
      // Откройте ссылку в WebApp
      WebApp.openLink(paymentUrl);
    }
  };

  return (
    <div>
      <Button onClick={handlePaymentButtonClick}>Make Payment</Button>
      {paymentUrl && (
        <Button onClick={handleOpenPaymentUrl}>Open Payment URL</Button>
      )}
    </div>
  );
};

export default PaymentPage;
