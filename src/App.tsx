import { useState, useEffect } from "react";
import { Header, Features, ProcessGuide, Footer } from "@/components/MainLayout";
import Hero from "@/components/Hero";
import Calculator from "@/components/Calculator";
import { InquiryForm, Reviews } from "@/components/ReviewsAndInquiry";
import { AdminDashboard } from "@/components/AdminDashboard";
import { INITIAL_CONTENT, AppContent } from "@/constants";
import { MessageCircle, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [content, setContent] = useState<AppContent>(INITIAL_CONTENT);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 1000);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative font-sans selection:bg-brand-blue selection:text-white">
      <Header />
      
      <main>
        <Hero />
        
        {/* Floating Admin Button - For Demo Purpose */}
        <button 
          onClick={() => setIsAdminOpen(true)}
          className="fixed bottom-24 right-6 z-40 bg-brand-navy text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border-4 border-white hover:bg-brand-blue transition-all group scale-90"
        >
          <span className="absolute -left-28 bg-brand-navy text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            콘텐츠 관리자 모드
          </span>
          👨‍💻
        </button>

        <section className="py-24">
          <div className="container mx-auto px-6">
            <Features />
          </div>
        </section>

        <ProcessGuide />

        <section className="py-24 md:py-32 bg-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--brand-blue)_0%,_transparent_100%)] opacity-[0.03] pointer-events-none" />
          <div className="container mx-auto px-6">
            <Calculator />
          </div>
        </section>

        <Reviews />
        
        <InquiryForm />
      </main>

      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 transition-all"
            >
              <ArrowUp className="w-5 h-5 text-slate-400" />
            </motion.button>
          )}
        </AnimatePresence>
        
        <button className="w-14 h-14 bg-[#FEE500] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
           <MessageCircle className="w-6 h-6 text-[#191919]" />
        </button>
      </div>

      <AnimatePresence>
        {isAdminOpen && (
          <AdminDashboard 
            onUpdate={(newData) => setContent(newData)} 
            onClose={() => setIsAdminOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

