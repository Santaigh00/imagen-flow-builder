
import React from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const scrollToReservation = () => {
    const element = document.getElementById('reservation-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Hotel <span className="text-amber-400">Elegance</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Experimenta el lujo y la comodidad en cada momento de tu estadía
        </p>
        <Button 
          onClick={scrollToReservation}
          size="lg"
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          Reservar Ahora
        </Button>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white opacity-70" />
      </div>
    </section>
  );
};
