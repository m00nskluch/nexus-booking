import { auth } from "@clerk/nextjs/server";
import { db } from "../../db";
import { bookings, services } from "../../db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Calendar, Clock, MapPin, ChevronRight, Plus } from "lucide-react";
import CancelBookingButton from "../../components/CancelBookingButton";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Please sign in to view your dashboard.</p>
      </div>
    );
  }

  const userBookings = await db
    .select({
      id: bookings.id,
      date: bookings.bookingDate,
      status: bookings.status,
      serviceName: services.name,
      servicePrice: services.price,
    })
    .from(bookings)
    .innerJoin(services, eq(bookings.serviceId, services.id))
    .where(eq(bookings.userId, userId))
    .orderBy(desc(bookings.createdAt));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight font-heading">
              My <span className="text-indigo-600">Dashboard</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your upcoming stays and experiences</p>
          </div>
          <Link 
            href="/" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>New Booking</span>
          </Link>
        </header>

        {userBookings.length === 0 ? (
          <div className="glass rounded-[2.5rem] p-16 text-center border border-white/20">
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">No reservations yet</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
              You haven't booked any experiences yet. Start your journey by exploring our top destinations.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center space-x-2 text-indigo-600 font-bold hover:underline"
            >
              <span>Explore Destinations</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="glass rounded-3xl p-6 border border-white/20 hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <MapPin className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                    booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                    booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-indigo-600 transition-colors">{booking.serviceName}</h3>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                    {new Date(booking.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                  </div>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                    {new Date(booking.date).toLocaleTimeString(undefined, { timeStyle: 'short' })}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  {booking.status !== 'cancelled' ? (
                    <CancelBookingButton bookingId={booking.id} />
                  ) : (
                    <span className="text-slate-400 text-sm italic">Reserva Cancelada</span>
                  )}
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    ${(booking.servicePrice / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
