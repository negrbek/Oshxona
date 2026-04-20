import { motion } from 'motion/react';
import { Send, Phone, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-black/20 text-gold py-16 px-4 border-t border-white/5">
      {/* Coming Soon Ribbon Refined */}
      <div className="absolute top-0 left-0 w-full overflow-hidden h-8 bg-gold/5 flex items-center">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className="text-[10px] uppercase tracking-[0.5em] opacity-30 px-12">
              Sulton Oshxonasi Gastronomiyasi • Exclusive Dining Experience • Sulton Oshxonasi Gastronomiyasi
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 mt-8">
        <div className="flex gap-16">
          {/* Telegram */}
          <div className="blur-sm select-none opacity-40 group cursor-help transition-opacity hover:opacity-60">
            <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Telegram Aloqa</p>
            <p className="font-mono text-sm">@sulton_oshxonasi_admin</p>
          </div>

          {/* Phone */}
          <div className="blur-sm select-none opacity-40 group cursor-help transition-opacity hover:opacity-60">
            <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Telefon Raqami</p>
            <p className="font-mono text-sm">+998 (90) 000-00-00</p>
          </div>
        </div>

        <div className="text-center md:text-right">
          <div className="inline-block px-4 py-2 border border-gold/30 rounded text-[10px] uppercase tracking-[0.2em] text-gold animate-pulse">
            Xodimlarimiz bilan tez orada bog'lanasiz
          </div>
          <p className="mt-4 text-[9px] text-gold/20 uppercase tracking-widest">
            © 2026 Sulton Oshxonasi. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
