import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

const MENU_ITEMS = [
  {
    id: 1,
    title: "Shohona Palov",
    description: "Devzira guruchi, sarhil go'sht va maxsus ziravorlar bilan pishirilgan haqiqiy san'at asari.",
    price: 120000,
    video: "https://images.unsplash.com/photo-1626777553732-48f1f16fbc75?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      { img: "https://images.unsplash.com/photo-1551460417-ee1851088d92?auto=format&fit=crop&q=80&w=100&h=100&seed=carrot", x: -200, y: -100 },
      { img: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&q=80&w=100&h=100&seed=meat", x: 200, y: -150 },
      { img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=100&h=100&seed=garlic", x: 0, y: -200 },
    ]
  },
  {
    id: 2,
    title: "Uyg'ur Lag'moni",
    description: "Qo'lda cho'zilgan xamir, yangi uzilgan ko'katlar va qayla bilan taqdim etiladi.",
    price: 65000,
    video: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      { img: "https://images.unsplash.com/photo-1594968207135-e6593466f272?auto=format&fit=crop&q=80&w=100&h=100&seed=noodles", x: -150, y: -50 },
      { img: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=100&h=100&seed=veggies", x: 150, y: -100 },
    ]
  }
];

function AnimatedPrice({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentCount = Math.floor(progress * end);
        setDisplayValue(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-gold font-bold tabular-nums text-2xl">
      {displayValue.toLocaleString()} UZS
    </span>
  );
}

export default function LiveMenu() {
  return (
    <div className="bg-chocolate py-24 px-4 overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none editorial-dots"></div>
      
      <div className="max-w-6xl mx-auto space-y-32 relative z-10">
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-[0.4em] text-xs mb-4 opacity-60">Bizning Tanlovimiz</p>
          <h2 className="text-4xl md:text-6xl font-serif text-gold mb-4">Jonli Menyu</h2>
          <div className="w-24 h-0.5 bg-gold/30 mx-auto" />
        </div>

        {MENU_ITEMS.map((item, idx) => (
          <MenuItemCard key={item.id} item={item} reverse={idx % 2 !== 0} />
        ))}
      </div>
    </div>
  );
}

function MenuItemCard({ item, reverse }: any) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
    >
      {/* Visual Section */}
      <div className="relative w-full md:w-1/2 aspect-video group glass-card p-2" data-food-hover>
        <div className="absolute inset-0 bg-gold/5 rounded-2xl overflow-hidden m-2">
          <img 
            src={item.video} 
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-30 heatwave"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-chocolate via-transparent to-transparent opacity-80" />
        </div>

        {/* Floating Ingredients Assemblage */}
        {item.ingredients.map((ing: any, i: number) => {
          const y = useTransform(scrollYProgress, [0, 0.6, 1], [ing.y / 2, 0, 0], { clamp: true });
          const x = useTransform(scrollYProgress, [0, 0.6, 1], [ing.x / 2, 0, 0], { clamp: true });
          const rotate = useTransform(scrollYProgress, [0, 1], [ing.x / 4, 0]);
          const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 1]);

          return (
            <motion.img 
              key={i}
              src={ing.img}
              referrerPolicy="no-referrer"
              style={{ x, y, rotate, opacity }}
              className="absolute w-12 h-12 md:w-20 md:h-20 rounded-full border border-gold/40 bg-chocolate z-20 shadow-xl pointer-events-none heatwave"
              alt="Ingredient"
            />
          );
        })}
      </div>

      {/* Content Section */}
      <motion.div 
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 space-y-6"
      >
        <p className="text-gold/40 font-mono text-xs uppercase tracking-widest">Kategoriya: Taomlar</p>
        <h3 className="text-3xl md:text-5xl font-serif text-cream leading-tight">{item.title}</h3>
        <p className="text-cream/50 text-lg leading-relaxed font-light">
          {item.description}
        </p>
        <div className="flex items-center justify-between pt-6 border-t border-gold/20">
          <AnimatedPrice value={item.price} />
          <div className="flex gap-1.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold/20" />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
