import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../db";
import { bookings, services, users } from "../../db/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { 
  LayoutDashboard, 
  CreditCard, 
  CalendarCheck, 
  ArrowUpRight, 
  Search,
  Filter
} from "lucide-react";

const ADMIN_EMAIL = "te.mande.linck@gmail.com";

export default async function AdminDashboard() {
  const user = await currentUser();

  // Redirect to home if not authorized
  if (!user || user.emailAddresses[0].emailAddress !== ADMIN_EMAIL) {
    redirect("/");
  }

  const allBookings = await db
    .select({
      id: bookings.id,
      date: bookings.bookingDate,
      status: bookings.status,
      serviceName: services.name,
      servicePrice: services.price,
      userName: users.name,
      userEmail: users.email,
    })
    .from(bookings)
    .innerJoin(services, eq(bookings.serviceId, services.id))
    .innerJoin(users, eq(bookings.userId, users.id))
    .orderBy(desc(bookings.createdAt));

  const totalBookings = allBookings.length;
  const totalRevenue = allBookings
    .filter(b => b.status === 'confirmed')
    .reduce((acc, b) => acc + b.servicePrice, 0);

  const confirmedCount = allBookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = allBookings.filter(b => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Panel de Administración</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white font-heading tracking-tight">
            Nexus <span className="text-indigo-600">Control Center</span>
          </h1>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Ingresos Totales", value: `$${(totalRevenue / 100).toLocaleString()}`, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
            { label: "Reservas Totales", value: totalBookings, icon: CalendarCheck, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
            { label: "Confirmadas", value: confirmedCount, icon: ArrowUpRight, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { label: "Pendientes", value: pendingCount, icon: Filter, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
          ].map((stat, i) => (
            <div key={i} className="glass p-6 rounded-3xl border border-white/20 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Data Table */}
        <div className="glass rounded-[2.5rem] border border-white/20 shadow-xl overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-bold">Gestión de Reservas</h2>
            <div className="flex space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar reserva..." 
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <th className="px-8 py-5">Cliente</th>
                  <th className="px-8 py-5">Servicio</th>
                  <th className="px-8 py-5">Fecha</th>
                  <th className="px-8 py-5">Precio</th>
                  <th className="px-8 py-5 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {allBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-sm">
                          {booking.userName?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{booking.userName}</p>
                          <p className="text-slate-500 text-xs">{booking.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-medium text-slate-700 dark:text-slate-300 text-sm">
                      {booking.serviceName}
                    </td>
                    <td className="px-8 py-6 text-slate-500 dark:text-slate-400 text-sm">
                      <div className="flex flex-col">
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">{new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-bold text-slate-900 dark:text-white text-sm">
                      ${(booking.servicePrice / 100).toFixed(2)}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
