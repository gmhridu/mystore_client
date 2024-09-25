import Checkout from '@/pages/ShoppingView/Checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const CheckOutWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout/>
    </Elements>
  );
};

export default CheckOutWrapper;