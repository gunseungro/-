import { useState, useEffect } from "react";
import { INITIAL_CONTENT } from "@/constants";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronRight, Phone, MessageSquare } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "서비스 소개", href: "#features" },
    { name: "등기 절차", href: "#process" },
    { name: "수수료 안내", href: "#calculator" },
    { name: "고객지원", href: "#inquiry" },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-brand-navy/90 backdrop-blur-xl h-16 border-b border-white/10" 
        : "bg-transparent h-24"
    )}>
      <nav className="container mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
            isScrolled ? "bg-white text-brand-navy" : "bg-brand-blue text-white"
          )}>
            <span className="font-black text-xl leading-none">건</span>
          </div>
          <span className={cn(
            "text-2xl font-black tracking-tighter transition-colors",
            isScrolled || window.innerWidth < 768 ? "text-white" : "text-white"
          )}>건승로</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href} 
                className={cn(
                  "font-bold text-sm transition-colors uppercase tracking-wider",
                  isScrolled ? "text-slate-200 hover:text-white" : "text-slate-200 hover:text-white"
                )}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <a 
              href="#calculator"
              className="px-6 py-2.5 bg-brand-blue text-white rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-brand-blue/20"
            >
              예상비용 계산 &rarr;
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
             className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <ul className="container mx-auto px-6 py-8 space-y-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold text-brand-navy flex items-center justify-between"
                  >
                    {item.name} <ChevronRight className="text-slate-300" />
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <button className="w-full bg-brand-navy text-white py-4 rounded-xl font-bold text-lg">
                  1:1 상담 신청
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Features() {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy opacity-20" />
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="section-title text-brand-navy">왜 건승로를 선택해야 할까요?</h2>
          <p className="text-slate-500 text-lg">기존 입찰 플랫폼이나 은행 소개 대리인과는 차원이 다른, <span className="text-brand-navy font-bold text-base underline decoration-brand-blue/30 decoration-4 underline-offset-4">로펌이 직접 책임지는</span> 전문 등기 서비스를 경험하세요.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {INITIAL_CONTENT.features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[32px] bg-slate-50 border border-transparent hover:border-brand-navy/10 hover:bg-white hover:shadow-2xl transition-all group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-navy group-hover:text-white transition-colors">
                 <div className="font-bold text-lg">{String.fromCharCode(65 + idx)}</div>
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessGuide() {
  return (
    <section id="process" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-brand-navy mb-2">부동산 등기 5단계 핵심 절차</h2>
            <p className="text-slate-500 font-medium">안전하고 확실한 등기 프로세스입니다.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-navy/5 -translate-y-1/2 hidden md:block" />
          
          {INITIAL_CONTENT.process.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative z-10 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all"
            >
              <div className="w-16 h-16 bg-slate-50 text-brand-navy rounded-full flex items-center justify-center font-black text-2xl mb-6 group-hover:bg-brand-navy group-hover:text-white transition-colors shadow-inner">
                {step.step}
              </div>
              <h3 className="font-bold text-brand-navy mb-2 line-clamp-1">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              <div className="mt-4 pt-4 border-t w-full text-brand-navy font-bold text-[10px]">
                자세히 보기 &rarr;
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-brand-navy font-bold">건</span>
              </div>
              <span className="text-2xl font-black">건승로</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              건승로는 법무법인이 직접 운영하는 부동산 등기 전문 에이전트 서비스입니다. 28만 세대 이상의 풍부한 실적과 노하우로 소중한 가치를 지켜드립니다.
            </p>
            <div className="flex gap-4">
               <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors cursor-pointer">
                 <Phone className="w-4 h-4" />
               </div>
               <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors cursor-pointer">
                 <MessageSquare className="w-4 h-4" />
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-lg">서비스</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white">소유권이전등기</a></li>
              <li><a href="#" className="hover:text-white">증여 / 상속 등기</a></li>
              <li><a href="#" className="hover:text-white">근저당권 설정</a></li>
              <li><a href="#" className="hover:text-white">신탁등기</a></li>
            </ul>
          </div>

          <div className="space-y-6">
             <h4 className="font-bold text-lg">정보</h4>
             <ul className="space-y-3 text-slate-400 text-sm">
               <li><a href="#" className="hover:text-white">이용약관</a></li>
               <li><a href="#" className="hover:text-white text-brand-blue font-bold">개인정보처리방침</a></li>
               <li><a href="#" className="hover:text-white">윤리강령</a></li>
               <li><a href="#" className="hover:text-white">사이트맵</a></li>
             </ul>
          </div>

          <div className="space-y-6">
             <h4 className="font-bold text-lg">고객지원</h4>
             <div className="space-y-4">
                <div className="text-2xl font-black text-brand-blue">1588-XXXX</div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  평일: 09:00 - 18:00<br/>
                  (점심시간: 12:00 - 13:00)<br/>
                  토/일/공휴일 휴무 (카톡상담 가능)
                </p>
             </div>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] md:text-xs text-center md:text-left">
          <div>
            주식회사 건승로 | 대표자: 홍길동 | 사업자등록번호: 000-00-00000 | 서울특별시 서초구 반포대로 00<br/>
            Copyright &copy; 2024 GEONSEUNG-RO. All rights reserved.
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            System Securely Managed
          </div>
        </div>
      </div>
    </footer>
  );
}
