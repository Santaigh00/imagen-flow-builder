
import React from 'react';
import { Hero } from '../components/Hero';
import { ReservationForm } from '../components/ReservationForm';
import { Features } from '../components/Features';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Hero />
      <Features />
      <ReservationForm />
    </div>
  );
};

export default Index;
