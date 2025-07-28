import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';

const ReservationModal = () => {
    const [date, setDate] = useState();

    const handleReservationSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "¡Reserva solicitada!",
            description: "Pronto recibirás una confirmación. ¡Gracias por elegir MIKUNA!",
        });
        // Aquí podrías cerrar el modal si tuvieras acceso al estado `open`
    };

    return (
        <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
                <DialogTitle className="font-serif text-2xl text-stone-800">Reservar una mesa</DialogTitle>
                <DialogDescription>
                    Completa los detalles para asegurar tu visita.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleReservationSubmit}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nombre</Label>
                        <Input id="name" placeholder="Tu nombre completo" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="guests" className="text-right">Personas</Label>
                        <Input id="guests" type="number" min="1" max="10" placeholder="2" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Fecha</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className="col-span-3 justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Elige una fecha</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">Hora</Label>
                        <Input id="time" type="time" className="col-span-3" required />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="btn-primary w-full">Confirmar Reserva</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default ReservationModal;