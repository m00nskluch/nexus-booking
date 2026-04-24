"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] selection:bg-indigo-500/30 font-sans">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        
        <motion.div 
          className="relative z-10 text-center px-4 max-w-5xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl font-heading tracking-tight"
            variants={itemVariants}
          >
            Experience the <span className="text-indigo-400">Nexus</span> of Travel
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Unlock exclusive stays and curated adventures in over 150 countries. Your journey starts with a single click.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-3xl md:rounded-full flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 shadow-2xl max-w-4xl mx-auto border border-white/20"
            variants={itemVariants}
          >
            <div className="flex-1 w-full px-6 flex flex-col items-start border-r border-slate-200 dark:border-slate-800 last:border-0">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Location</span>
              <input type="text" placeholder="Where to?" className="bg-transparent w-full outline-none text-slate-900 dark:text-white font-medium placeholder:text-slate-400" />
            </div>
            <div className="flex-1 w-full px-6 flex flex-col items-start border-r border-slate-200 dark:border-slate-800 last:border-0">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Check In</span>
              <input type="date" className="bg-transparent w-full outline-none text-slate-900 dark:text-white font-medium" />
            </div>
            <div className="flex-1 w-full px-6 flex flex-col items-start border-r border-slate-200 dark:border-slate-800 last:border-0">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Guests</span>
              <select className="bg-transparent w-full outline-none text-slate-900 dark:text-white font-medium">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>
            <button className="w-full md:w-auto bg-indigo-600 text-white px-10 py-4 rounded-2xl md:rounded-full font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95">
              Search
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24">
          {[
            { label: "Active Listings", value: "500k+" },
            { label: "Countries", value: "150+" },
            { label: "Happy Travelers", value: "12M+" },
            { label: "User Rating", value: "4.9/5" }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl font-bold text-indigo-600 mb-1">{stat.value}</div>
              <div className="text-slate-500 dark:text-slate-400 font-medium uppercase text-[10px] tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          className="flex justify-between items-end mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-heading tracking-tight">Top Destinations</h2>
            <p className="text-slate-500 dark:text-slate-400">Hand-picked locations for your next escape</p>
          </div>
          <button className="text-indigo-600 font-bold hover:underline">View All</button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Santorini, Greece", price: "$299", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop" },
            { name: "Kyoto, Japan", price: "$180", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop" },
            { name: "Bali, Indonesia", price: "$120", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop" }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              className="group relative rounded-3xl overflow-hidden cursor-pointer h-[450px] shadow-lg hover:shadow-2xl transition-all border border-slate-200 dark:border-slate-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 font-heading">{item.name}</h3>
                    <div className="flex items-center text-slate-300 text-sm">
                      <span className="text-yellow-400 mr-1">★</span> 4.9 (2.4k reviews)
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white font-bold border border-white/20">
                    From {item.price}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div 
          className="max-w-7xl mx-auto bg-slate-900 dark:bg-indigo-950 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center text-white border border-white/10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600 opacity-30 blur-[120px]"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500 opacity-20 blur-[120px]"></div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10 leading-tight font-heading">Ready to start your<br />next adventure?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto relative z-10">
            Join thousands of travelers who book their perfect stays with Nexus. Sign up today and get 15% off your first booking.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 relative z-10">
            <button className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-500/40 hover:scale-105 transition-all active:scale-95">
              Get Started Now
            </button>
            <button className="bg-white/5 backdrop-blur-sm text-white border border-white/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Contact Sales
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">N</div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">Nexus<span className="text-indigo-600">Booking</span></span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs">
              Making travel accessible and unforgettable for everyone, everywhere.
            </p>
            <div className="flex space-x-4">
              {['FB', 'TW', 'IG', 'LI'].map(s => (
                <div key={s} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-indigo-600 hover:text-white transition-all shadow-sm">{s}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-[10px] text-slate-900 dark:text-white">Product</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">API Docs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-[10px] text-slate-900 dark:text-white">Company</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase tracking-widest text-[10px] text-slate-900 dark:text-white">Legal</h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} Nexus Booking Inc. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
