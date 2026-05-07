import { useState, useEffect } from "react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { INITIAL_CONTENT } from "@/constants";
import { Check, ChevronDown, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Calculator() {
  const [price, setPrice] = useState<number>(550000000);
  const [propertyType, setPropertyType] = useState<"apartment" | "villa">("apartment");
  const [isAdjusted, setIsAdjusted] = useState<boolean>(false);
  const [area, setArea] = useState<"85under" | "85over">("85under");
  const [houseCount, setHouseCount] = useState<number>(1);
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    // Simplified calculation logic based on standard Korean rates seen in images
    
    // 1. Acquisition Tax Rate (Simplified)
    let taxRate = 0.01; // 1% for 1 house <= 600m
    if (price > 900000000) taxRate = 0.03;
    else if (price > 600000000) taxRate = 0.02;

    if (houseCount === 2 && isAdjusted) taxRate = 0.08;
    else if (houseCount >= 3) taxRate = 0.12;

    const acquisitionTax = Math.floor(price * taxRate);
    const educationTax = Math.floor(acquisitionTax * 0.1);
    const ruralTax = area === "85over" ? Math.floor(acquisitionTax * 0.1) : 0; // Simplified
    
    // 2. Fees
    const applicationFee = 15000;
    
    // 3. Stamp Duty (Steps)
    let stampDuty = 150000;
    if (price > 1000000000) stampDuty = 350000;
    else if (price < 50000000) stampDuty = 0;

    // 4. Bond (Discounted buy/sell) - Simplified
    const bondPrice = Math.floor(price * 0.000889); // Placeholder calculation similar to image

    const electronicFee = INITIAL_CONTENT.pricing.electronicBase;
    const visitFee = INITIAL_CONTENT.pricing.visitBase;

    setResults({
      acquisitionTax,
      educationTax,
      ruralTax,
      applicationFee,
      stampDuty,
      bondPrice,
      electronicFee,
      visitFee,
      totalElectronic: acquisitionTax + educationTax + ruralTax + applicationFee + stampDuty + bondPrice + electronicFee,
      totalVisit: acquisitionTax + educationTax + ruralTax + applicationFee + stampDuty + bondPrice + visitFee,
    });
  };

  useEffect(() => {
    calculate();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden relative" id="calculator">
      <div className="absolute top-0 left-0 w-full h-2 bg-brand-navy" />
      
      <div className="text-center mb-10">
        <h2 className="text-2xl font-black bg-brand-navy text-white inline-block px-8 py-3 rounded-full mb-4 shadow-lg shadow-brand-navy/20">등기예상비용 계산기</h2>
        <p className="text-slate-500 text-sm font-medium">부동산 등기 공과금, 채권, 보수료까지 실시간으로 확인해보세요!</p>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Input Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-navy flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-blue" /> 부동산 종류
            </label>
            <div className="flex gap-2">
              <button 
                onClick={() => setPropertyType("apartment")}
                className={`flex-1 py-4 rounded-xl font-bold transition-all ${propertyType === "apartment" ? "bg-brand-navy text-white shadow-xl shadow-brand-navy/20" : "bg-slate-50 text-slate-400 border border-transparent hover:bg-slate-100"}`}
              >
                아파트
              </button>
              <button 
                onClick={() => setPropertyType("villa")}
                className={`flex-1 py-4 rounded-xl font-bold transition-all ${propertyType === "villa" ? "bg-brand-navy text-white shadow-xl shadow-brand-navy/20" : "bg-slate-50 text-slate-400 border border-transparent hover:bg-slate-100"}`}
              >
                빌라/상가
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-navy flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-blue" /> 조정지역여부
            </label>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsAdjusted(true)}
                className={`flex-1 py-4 rounded-xl font-bold transition-all ${isAdjusted ? "bg-brand-navy text-white shadow-xl shadow-brand-navy/20" : "bg-slate-50 text-slate-400 border border-transparent hover:bg-slate-100"}`}
              >
                조정지역
              </button>
              <button 
                onClick={() => setIsAdjusted(false)}
                className={`flex-1 py-4 rounded-xl font-bold transition-all ${!isAdjusted ? "bg-brand-navy text-white shadow-xl shadow-brand-navy/20" : "bg-slate-50 text-slate-400 border border-transparent hover:bg-slate-100"}`}
              >
                비조정지역
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-blue" /> 전용면적
            </label>
            <div className="flex gap-2">
              <button 
                onClick={() => setArea("85under")}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${area === "85under" ? "bg-white border-2 border-brand-blue text-brand-blue shadow-sm" : "bg-slate-50 text-slate-400 border border-transparent"}`}
              >
                85㎡ 이하
              </button>
              <button 
                onClick={() => setArea("85over")}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${area === "85over" ? "bg-white border-2 border-brand-blue text-brand-blue shadow-sm" : "bg-slate-50 text-slate-400 border border-transparent"}`}
              >
                85㎡ 초과
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-blue" /> 보유주택수
            </label>
            <div className="grid grid-cols-4 gap-1">
              {[1, 2, 3, 4].map((num) => (
                <button 
                  key={num}
                  onClick={() => setHouseCount(num)}
                  className={`py-2 rounded-lg font-medium transition-all text-sm ${houseCount === num ? "bg-white border-2 border-brand-blue text-brand-blue" : "bg-slate-50 text-slate-400 border border-transparent"}`}
                >
                  {num}주택{num === 4 && "+"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2 py-4">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-brand-blue" /> 거래금액
          </label>
          <div className="relative">
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full pl-6 pr-12 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none font-bold text-xl text-right"
              placeholder="거래금액을 입력하세요"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-slate-500">원</span>
          </div>
        </div>

        <button 
          onClick={calculate}
          className="w-full py-4 bg-brand-navy text-white rounded-xl font-bold text-lg hover:bg-brand-blue transition-all shadow-lg active:scale-95"
        >
          계산하기
        </button>

        {/* Results Section */}
        <AnimatePresence>
          {results && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 bg-white rounded-2xl p-6 md:p-8 space-y-6 shadow-sm border border-slate-100 relative"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-bold text-xl text-brand-navy flex items-center gap-2">공과금 <ChevronDown className="w-5 h-5" /></h3>
              </div>
              
              <div className="space-y-4 text-sm md:text-base">
                <div className="flex justify-between items-center text-slate-600">
                  <span>취득세 <span className="text-xs text-red-500">(1.0%)</span></span>
                  <span className="font-bold text-slate-900">{formatCurrency(results.acquisitionTax)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>지방교육세 <span className="text-xs text-red-500">(0.1%)</span></span>
                  <span className="font-bold text-slate-900">{formatCurrency(results.educationTax)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>농어촌특별세</span>
                  <span className="font-bold text-slate-900">{formatCurrency(results.ruralTax)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>등기신청수수료(증지+경유표)</span>
                  <span className="font-bold text-slate-900">{formatCurrency(results.applicationFee)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>인지대</span>
                  <span className="font-bold text-slate-900">{formatCurrency(results.stampDuty)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="flex items-center gap-1">* 국민주택1종채권(즉시매도) <Info className="w-3 h-3" /></span>
                  <span className="font-bold text-slate-900">{formatCurrency(results.bondPrice)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t font-semibold">
                  <span>* 보수료</span>
                  <div className="text-right">
                    <div className="text-brand-blue"><span className="text-xs">전자등기</span> {formatCurrency(results.electronicFee)}~</div>
                    <div className="text-slate-400"><span className="text-xs">방문등기</span> {formatCurrency(results.visitFee)}~</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                  <h4 className="font-black text-2xl text-slate-900">총 금액</h4>
                  <div className="text-right">
                    <div className="flex items-baseline gap-2 justify-end">
                      <span className="text-brand-blue font-bold text-sm">전자등기</span>
                      <span className="font-black text-3xl text-brand-blue">{formatCurrency(results.totalElectronic)}~</span>
                    </div>
                    <div className="flex items-baseline gap-2 justify-end opacity-50">
                      <span className="text-slate-900 font-bold text-sm">방문(대면)등기</span>
                      <span className="font-black text-2xl text-slate-900">{formatCurrency(results.totalVisit)}~</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <button className="py-4 bg-brand-blue text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110">
                  전자등기 신청하기
                </button>
                <button className="py-4 bg-brand-navy text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110">
                  방문(대면) 등기 신청하기
                </button>
              </div>
              <button className="w-full py-4 bg-slate-100 text-slate-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200">
                <Info className="w-5 h-5 bg-brand-blue rounded-full text-white p-1" />
                전자등기가 무엇인가요?
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
