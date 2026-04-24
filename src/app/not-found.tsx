import Link from "next/link";
import { Compass, MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#020617] p-6 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full"></div>

      <div className="glass p-12 md:p-20 rounded-[3rem] text-center max-w-2xl border border-white/20 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl shadow-indigo-500/20 rotate-12 animate-bounce">
          <Compass className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 font-heading tracking-tight">
          4<span className="text-indigo-600">0</span>4
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">
          Parece que te has perdido...
        </h2>
        
        <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-md mx-auto leading-relaxed">
          Incluso los mejores viajeros pierden el rumbo. La página que buscas no existe o ha sido movida a un nuevo destino.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center space-x-3 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 group"
        >
          <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Inicio</span>
        </Link>
        
        <div className="mt-12 flex justify-center space-x-8 text-slate-400 text-sm font-medium uppercase tracking-widest">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Destinos</Link>
          <Link href="/" className="hover:text-indigo-600 transition-colors">Soporte</Link>
          <Link href="/" className="hover:text-indigo-600 transition-colors">Nexus+</Link>
        </div>
      </div>
    </div>
  );
}
