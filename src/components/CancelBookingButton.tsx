"use client";

import { useTransition } from "react";
import { cancelBooking } from "../lib/actions";
import { XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CancelBookingButtonProps {
  bookingId: string;
}

export default function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    if (confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
      startTransition(async () => {
        const result = await cancelBooking(bookingId);
        if (result.success) {
          toast.success("Reserva cancelada", {
            description: "Tu reserva ha sido cancelada exitosamente."
          });
        } else {
          toast.error("Error al cancelar", {
            description: result.error || "Hubo un problema al cancelar la reserva."
          });
        }
      });
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isPending}
      className="flex items-center space-x-2 text-rose-500 hover:text-rose-600 font-bold transition-colors disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <XCircle className="w-4 h-4" />
      )}
      <span>Cancelar</span>
    </button>
  );
}
