import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Calendar, Info } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const ORBIT_ITEMS = [
  { id: 1, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200&h=200", name: "Bahor Salati", price: "45,000" },
  { id: 2, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=200&h=200", name: "Italyancha Pizza", price: "85,000" },
  { id: 3, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200&h=200", name: "Sog'lom Bowl", price: "60,000" },
  { id: 4, img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=200&h=200", name: "Gril Go'shti", price: "120,000" },
];

const DOCK_POINTS = [
  { x: -180, y: -180 }, // Top Left
  { x: 180, y: -180 },  // Top Right
  { x: -180, y: 180 },  // Bottom Left
  { x: 180, y: 180 },   // Bottom Right
];

export default function Hero() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const [isCtaShaking, setIsCtaShaking] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const orbitAngle = useRef(0);
  const [rotation, setRotation] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isHovered && !isDocked) {
      interval = setInterval(() => {
        setRotation(prev => (prev + 0.3) % 360);
      }, 16);
    }
    return () => clearInterval(interval);
  }, [isHovered, isDocked]);

  useEffect(() => {
    if (isHovered) {
      setIsDocked(true);
    } else if (isDocked) {
      const timer = setTimeout(() => {
        setIsDocked(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isHovered, isDocked]);

  const handleCtaClick = () => {
    setIsCtaShaking(true);
    setShowTooltip(true);
    setTimeout(() => {
      setIsCtaShaking(false);
      setTimeout(() => setShowTooltip(false), 2000);
    }, 500);
  };

  return (
    <section ref={containerRef} className="relative min-h-[1200px] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-chocolate pt-60 pb-32">
      {/* Editorial dotted background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none editorial-dots"></div>
      
      {/* Background steam effect */}
      <div className="absolute inset-0 opacity-20">
         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.1, 0.3, 0.1],
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold rounded-full blur-[120px]"
         />
      </div>

      <motion.div style={{ opacity, scale }} className="relative z-20 flex flex-col items-center w-full mt-32">
        {/* Central Logo and Name */}
        <div 
          className="relative mb-24 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center flex flex-col items-center"
          >
            {/* Logo Container (Rohat Logo) */}
            <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border-4 border-gold/40 flex items-center justify-center mb-12 relative overflow-hidden bg-chocolate shadow-[0_0_120px_rgba(212,175,55,0.4)] p-4">
              <div className="w-full h-full border border-gold/30 rounded-full flex items-center justify-center overflow-hidden relative bg-black/40">
                {/* Logo Image */}
                <img 
                  src="https://images.unsplash.com/photo-1594950117006-2580ecae2f7a?auto=format&fit=crop&q=80&w=1000&h=1000" 
                  alt="" 
                  className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                />
                {/* Central Text 'ROHAT' - Styled */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                   <span className="font-serif text-5xl md:text-8xl text-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.8)] gold-glow select-none tracking-widest uppercase">Rohat</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate/80 via-transparent to-transparent z-0" />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-4 border-gold/50 border-dashed rounded-full"
              />
            </div>

            <div className="z-30">
              <h1 className="text-7xl md:text-[140px] font-serif text-gold tracking-tighter uppercase gold-glow drop-shadow-2xl mb-4 leading-none select-none">
                Rohat
              </h1>
              <p className="text-gold/60 font-sans tracking-[0.8em] uppercase text-xs md:text-base text-center font-light">
                Gastronomik Rohat Markazi
              </p>
            </div>
          </motion.div>

          {/* Orbiting Elements with Docking Logic - Even larger radius for vertical space */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {ORBIT_ITEMS.map((item, idx) => {
              const dockPoint = {
                x: DOCK_POINTS[idx].x * 2.1,
                y: DOCK_POINTS[idx].y * 2.0
              };
              const isMoving = isDocked;
              // Adjusted orbit to prevent top clipping
              const radiusX = 460;
              const radiusY = 380;

              return (
                <motion.div
                  key={item.id}
                  className="absolute pointer-events-auto group/food"
                  animate={{ 
                    x: isMoving ? dockPoint.x : Math.cos(((rotation + idx * 90) * Math.PI) / 180) * radiusX,
                    y: isMoving ? dockPoint.y : Math.sin(((rotation + idx * 90) * Math.PI) / 180) * radiusY,
                    scale: isMoving ? 1.15 : 1
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 35, 
                    damping: 25,
                    mass: 1.2
                  }}
                  data-food-hover
                >
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative z-10"
                    >
                      <img 
                        src={item.img} 
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className={`w-28 h-28 md:w-48 md:h-48 rounded-full object-cover border-4 border-gold bg-chocolate shadow-2xl transition-all duration-700 ${isMoving ? 'border-gold brightness-110 shadow-[0_0_50px_rgba(212,175,55,0.5)]' : 'border-gold/30'}`}
                      />
                      
                      {/* Info Overlay (Visible on Hover or Dock) */}
                      <AnimatePresence>
                        {isMoving && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute -bottom-24 left-1/2 -translate-x-1/2 bg-chocolate shadow-[0_0_50px_rgba(0,0,0,0.8)] border-2 border-gold p-4 rounded-2xl min-w-[180px] text-center z-50 pointer-events-none"
                          >
                            <p className="text-gold font-serif text-lg font-bold whitespace-nowrap drop-shadow-md">{item.name}</p>
                            <div className="h-px bg-gold/20 my-1 mx-4" />
                            <p className="text-white/90 font-mono text-sm">{item.price} UZS</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>



        {/* Juicy CTA Button */}
        <div className="relative mt-12">
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gold text-chocolate px-4 py-2 rounded-lg shadow-lg z-50 whitespace-nowrap font-bold text-sm"
              >
                Olovda pishmoqda... Tez kunda ochiladi! 🔥
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gold" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className={`relative group ${isCtaShaking ? 'shake-animation' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
          >
            <div className="absolute inset-0 bg-gold/5 rounded-full blur-xl group-hover:bg-gold/20 transition-all duration-500" />
            
            <button 
              onClick={handleCtaClick}
              className="px-12 py-5 bg-white/5 backdrop-blur-xl border-2 border-gold/40 text-gold rounded-full font-serif text-xl tracking-widest uppercase relative overflow-hidden group/btn cursor-pointer ember-glow active:ember-glow transition-all"
            >
              <div className="shimmer-overlay group-hover/btn:block hidden" />
              <span className="relative z-10 flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                Joy Band Qilish
              </span>
            </button>
            <p className="text-[10px] text-gold/40 text-center uppercase tracking-widest mt-4">Xos bandlov xizmati</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative corners */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-gold/30" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-gold/30" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-gold/30" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-gold/30" />
    </section>
  );
}
