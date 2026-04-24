"use client";

import { useState, useTransition } from "react";
import { createBooking } from "../lib/actions";
import { Calendar, Clock, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  price: number;
}

interface BookingFormProps {
  services: Service[];
}

export default function BookingForm({ services }: BookingFormProps) {
  const [selectedService, setSelectedService] = useState(services[0]?.id || "");
  const [bookingDate, setBookingDate] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !bookingDate) return;

    startTransition(async () => {
      const result = await createBooking(selectedService, new Date(bookingDate));
      
      if (result.success) {
        toast.success("¡Reserva confirmada!", {
          description: "Tu experiencia Nexus ha sido reservada con éxito."
        });
        setBookingDate("");
      } else {
        toast.error("Error al reservar", {
          description: result.error || "Hubo un problema al procesar tu reserva."
        });
      }
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form 
        onSubmit={handleSubmit}
        className="glass p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/20 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Nueva Reserva</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Reserva tu experiencia Nexus hoy mismo</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Service Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                <Clock className="w-3 h-3 mr-2" /> Servicio
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-slate-900 dark:text-white appearance-none cursor-pointer"
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} — ${(service.price / 100).toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                <Calendar className="w-3 h-3 mr-2" /> Fecha y Hora
              </label>
              <input
                type="datetime-local"
                required
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-slate-900 dark:text-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending || !bookingDate}
              className="w-full bg-indigo-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-lg mt-4"
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Confirmando...</span>
                </>
              ) : (
                <>
                  <span>Confirmar Reservación</span>
                  <Sparkles className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      
      <p className="text-center text-slate-400 text-xs mt-6">
        Al confirmar, aceptas nuestros términos de servicio y política de privacidad.
      </p>
    </div>
  );
}
