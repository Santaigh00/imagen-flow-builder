
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';
import { Calendar, Mail, User, Bed, RefreshCw } from 'lucide-react';

interface Reserva {
  id: string;
  nombre: string;
  correo: string;
  fecha_entrada: string;
  fecha_salida: string;
  tipo_habitacion: string;
  estado: string;
  created_at: string;
}

export const ReservationsAdmin = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchReservas = async () => {
    try {
      const { data, error } = await supabase
        .from('reservas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error al cargar reservas:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las reservas",
          variant: "destructive"
        });
        return;
      }

      setReservas(data || []);
    } catch (error) {
      console.error('Error inesperado:', error);
      toast({
        title: "Error",
        description: "Error al conectar con la base de datos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateEstado = async (id: string, nuevoEstado: string) => {
    try {
      const { error } = await supabase
        .from('reservas')
        .update({ estado: nuevoEstado })
        .eq('id', id);

      if (error) {
        console.error('Error al actualizar estado:', error);
        toast({
          title: "Error",
          description: "No se pudo actualizar el estado",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Estado actualizado",
        description: `Reserva marcada como ${nuevoEstado}`,
      });

      fetchReservas(); // Recargar datos
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const getEstadoBadge = (estado: string) => {
    const variants = {
      pendiente: 'default',
      confirmada: 'default',
      cancelada: 'destructive',
      completada: 'default'
    } as const;

    return (
      <Badge variant={variants[estado as keyof typeof variants] || 'default'}>
        {estado}
      </Badge>
    );
  };

  const getTipoHabitacion = (tipo: string) => {
    const tipos = {
      individual: 'Individual - $80/noche',
      doble: 'Doble - $120/noche',
      suite: 'Suite Ejecutiva - $200/noche',
      presidencial: 'Suite Presidencial - $350/noche'
    } as const;
    
    return tipos[tipo as keyof typeof tipos] || tipo;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" />
        <span>Cargando reservas...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Panel de Reservas
            </CardTitle>
            <p className="text-gray-600 mt-1">
              Gestiona todas las reservas del hotel
            </p>
          </div>
          <Button onClick={fetchReservas} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
        </CardHeader>

        <CardContent>
          {reservas.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay reservas registradas</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Fechas</TableHead>
                  <TableHead>Habitación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservas.map((reserva) => (
                  <TableRow key={reserva.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{reserva.nombre}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{reserva.correo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Entrada: {new Date(reserva.fecha_entrada).toLocaleDateString()}</div>
                        <div>Salida: {new Date(reserva.fecha_salida).toLocaleDateString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{getTipoHabitacion(reserva.tipo_habitacion)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getEstadoBadge(reserva.estado)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {reserva.estado === 'pendiente' && (
                          <Button
                            size="sm"
                            onClick={() => updateEstado(reserva.id, 'confirmada')}
                            className="text-xs"
                          >
                            Confirmar
                          </Button>
                        )}
                        {(reserva.estado === 'pendiente' || reserva.estado === 'confirmada') && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateEstado(reserva.id, 'cancelada')}
                            className="text-xs"
                          >
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
