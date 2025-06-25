
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Wifi, Car, Utensils, Waves, Dumbbell, Shield } from 'lucide-react';

const features = [
  {
    icon: Wifi,
    title: 'WiFi Gratuito',
    description: 'Conexión de alta velocidad en todas las áreas'
  },
  {
    icon: Car,
    title: 'Estacionamiento',
    description: 'Parking gratuito para huéspedes'
  },
  {
    icon: Utensils,
    title: 'Restaurante',
    description: 'Cocina gourmet con chef especializado'
  },
  {
    icon: Waves,
    title: 'Piscina',
    description: 'Piscina climatizada con vista panorámica'
  },
  {
    icon: Dumbbell,
    title: 'Gimnasio',
    description: 'Centro de fitness completamente equipado'
  },
  {
    icon: Shield,
    title: 'Seguridad 24/7',
    description: 'Vigilancia y recepción las 24 horas'
  }
];

export const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Servicios y Comodidades
          </h2>
          <p className="text-xl text-gray-600">
            Todo lo que necesitas para una experiencia inolvidable
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
