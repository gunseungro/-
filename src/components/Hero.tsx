import { motion } from "motion/react";
import { INITIAL_CONTENT } from "@/constants";
import { ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  const scrollToCalc = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-brand-navy">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.esdrop.com/d/f/NW8F30jIRc/rgrqhTpozA.jpg" 
          alt="Professional Background" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/80 to-brand-navy" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-blue/20 text-brand-blue font-bold text-sm border border-brand-blue/30">
            <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
            부동산 소유권이전등기 전문 에이전트
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
            {INITIAL_CONTENT.hero.slogan.split(',').map((part, i) => (
              <span key={i} className={cn("block", i === 0 ? "mb-2" : "")}>{part}</span>
            ))}
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
            {INITIAL_CONTENT.hero.subSlogan}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <button 
              onClick={scrollToCalc}
              className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-3 active:scale-95"
            >
              <ArrowRight className="w-5 h-5" />
              {INITIAL_CONTENT.hero.ctaPrimary}
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
              <MessageCircle className="w-5 h-5" />
              {INITIAL_CONTENT.hero.ctaSecondary}
            </button>
          </div>

          <div className="flex items-center gap-12 pt-12">
            <div className="space-y-1 text-center">
              <div className="text-3xl font-black text-white">150,000원~</div>
              <div className="text-sm text-slate-400">합리적인 전자등기 수수료</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="space-y-1 text-center">
              <div className="text-3xl font-black text-white">28만+</div>
              <div className="text-sm text-slate-400">누적 수임 실적 보유</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
