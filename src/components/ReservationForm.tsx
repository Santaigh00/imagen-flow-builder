
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, User, Mail, Bed } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

export const ReservationForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    fechaEntrada: '',
    fechaSalida: '',
    tipoHabitacion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { nombre, correo, fechaEntrada, fechaSalida, tipoHabitacion } = formData;
    
    if (!nombre.trim()) {
      toast({
        title: "Error de validación",
        description: "El nombre es requerido",
        variant: "destructive"
      });
      return false;
    }
    
    if (!correo.trim() || !correo.includes('@')) {
      toast({
        title: "Error de validación", 
        description: "Ingresa un correo válido",
        variant: "destructive"
      });
      return false;
    }
    
    if (!fechaEntrada || !fechaSalida) {
      toast({
        title: "Error de validación",
        description: "Las fechas son requeridas",
        variant: "destructive"
      });
      return false;
    }
    
    if (new Date(fechaEntrada) >= new Date(fechaSalida)) {
      toast({
        title: "Error de validación",
        description: "La fecha de salida debe ser posterior a la de entrada",
        variant: "destructive"
      });
      return false;
    }
    
    if (!tipoHabitacion) {
      toast({
        title: "Error de validación",
        description: "Selecciona un tipo de habitación",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simular envío de datos
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Datos de reserva:', formData);
    
    toast({
      title: "¡Reserva recibida!",
      description: `Gracias ${formData.nombre}, tu reserva ha sido procesada exitosamente. Te contactaremos pronto.`,
      duration: 5000
    });
    
    // Limpiar formulario
    setFormData({
      nombre: '',
      correo: '',
      fechaEntrada: '',
      fechaSalida: '',
      tipoHabitacion: ''
    });
    
    setIsSubmitting(false);
  };

  return (
    <section id="reservation-form" className="py-20 px-4 bg-gradient-to-r from-blue-50 to-amber-50">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-amber-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-center">
              Reserva tu Habitación
            </CardTitle>
            <p className="text-center text-blue-100 mt-2">
              Completa el formulario para garantizar tu estadía
            </p>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-lg font-medium flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Nombre Completo
                </Label>
                <Input
                  id="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  placeholder="Ingresa tu nombre completo"
                  className="text-lg p-3 border-2 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Correo */}
              <div className="space-y-2">
                <Label htmlFor="correo" className="text-lg font-medium flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Correo Electrónico
                </Label>
                <Input
                  id="correo"
                  type="email"
                  value={formData.correo}
                  onChange={(e) => handleInputChange('correo', e.target.value)}
                  placeholder="tu@email.com"
                  className="text-lg p-3 border-2 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Fechas */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fechaEntrada" className="text-lg font-medium flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Fecha de Entrada
                  </Label>
                  <Input
                    id="fechaEntrada"
                    type="date"
                    value={formData.fechaEntrada}
                    onChange={(e) => handleInputChange('fechaEntrada', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="text-lg p-3 border-2 focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fechaSalida" className="text-lg font-medium flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Fecha de Salida
                  </Label>
                  <Input
                    id="fechaSalida"
                    type="date"
                    value={formData.fechaSalida}
                    onChange={(e) => handleInputChange('fechaSalida', e.target.value)}
                    min={formData.fechaEntrada || new Date().toISOString().split('T')[0]}
                    className="text-lg p-3 border-2 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Tipo de Habitación */}
              <div className="space-y-2">
                <Label className="text-lg font-medium flex items-center gap-2">
                  <Bed className="w-5 h-5 text-blue-600" />
                  Tipo de Habitación
                </Label>
                <Select value={formData.tipoHabitacion} onValueChange={(value) => handleInputChange('tipoHabitacion', value)}>
                  <SelectTrigger className="text-lg p-3 border-2 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="Selecciona el tipo de habitación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Habitación Individual - $80/noche</SelectItem>
                    <SelectItem value="doble">Habitación Doble - $120/noche</SelectItem>
                    <SelectItem value="suite">Suite Ejecutiva - $200/noche</SelectItem>
                    <SelectItem value="presidencial">Suite Presidencial - $350/noche</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Botón de Envío */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-700 hover:to-amber-700 text-white text-lg py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? 'Procesando Reserva...' : 'Confirmar Reserva'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
