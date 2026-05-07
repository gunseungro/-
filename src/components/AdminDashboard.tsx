import { useState } from "react";
import { AppContent, INITIAL_CONTENT } from "@/constants";
import { Save, RefreshCcw, Home, Layout, FileText, Settings, X, Plus } from "lucide-react";

export function AdminDashboard({ onUpdate, onClose }: { onUpdate: (data: AppContent) => void, onClose: () => void }) {
  const [data, setData] = useState<AppContent>(INITIAL_CONTENT);

  const handleSave = () => {
    onUpdate(data);
    alert("변경사항이 임시 저장되었습니다. (브라우저를 새로고침하면 초기화됩니다)");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-brand-navy overflow-hidden flex">
      {/* Sidebar */}
      <div className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/5 flex flex-col p-6 text-white shrink-0">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-brand-blue rounded flex items-center justify-center font-bold">A</div>
          <span className="font-black text-xl tracking-tight">건승로 관리자</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { icon: Home, label: "개요", active: true },
            { icon: Layout, label: "랜딩페이지 관리" },
            { icon: FileText, label: "게시글 관리" },
            { icon: Settings, label: "설정" },
          ].map((item) => (
            <button 
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active ? "bg-brand-blue text-white shadow-lg" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-bold">{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={onClose}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white transition-all bg-white/5 rounded-xl"
        >
          <X className="w-5 h-5" /> <span>대시보드 닫기</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div>
              <h2 className="text-2xl font-black text-brand-navy">콘텐츠 관리</h2>
              <p className="text-slate-500 text-sm">실시간으로 웹사이트의 텍스트와 설정을 변경하세요.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setData(INITIAL_CONTENT)}
                className="flex items-center gap-2 px-6 py-2 border border-slate-200 rounded-full text-slate-500 font-bold hover:bg-slate-50"
              >
                <RefreshCcw className="w-4 h-4" /> 초기화
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-8 py-2 bg-brand-blue text-white rounded-full font-bold shadow-lg shadow-brand-blue/30 hover:brightness-110"
              >
                <Save className="w-4 h-4" /> 저장하기
              </button>
            </div>
          </div>

          <div className="grid gap-8">
            {/* Hero Section Edit */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-lg font-black text-brand-navy border-b pb-4">메인 히어로 섹션</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400">메인 슬로건</label>
                  <input 
                    value={data.hero.slogan}
                    onChange={(e) => setData({...data, hero: {...data.hero, slogan: e.target.value}})}
                    className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:ring-2 focus:ring-brand-blue outline-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400">서브 슬로건</label>
                  <textarea 
                    value={data.hero.subSlogan}
                    onChange={(e) => setData({...data, hero: {...data.hero, subSlogan: e.target.value}})}
                    className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:ring-2 focus:ring-brand-blue outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Features Management */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-black text-brand-navy">주요 특징 관리</h3>
                <button className="text-brand-blue font-bold text-sm flex items-center gap-1 hover:underline">
                  <Plus className="w-4 h-4" /> 항목 추가
                </button>
              </div>
              <div className="grid gap-4">
                {data.features.map((feature, idx) => (
                  <div key={feature.id} className="p-6 bg-slate-50 rounded-2xl flex items-center gap-6 border border-slate-100 group">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-bold text-brand-blue shadow-sm shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input 
                        value={feature.title}
                        onChange={(e) => {
                          const newFeatures = [...data.features];
                          newFeatures[idx].title = e.target.value;
                          setData({...data, features: newFeatures});
                        }}
                        className="w-full bg-transparent font-bold text-brand-navy outline-none border-b border-transparent focus:border-brand-blue"
                      />
                      <input 
                        value={feature.description}
                        onChange={(e) => {
                          const newFeatures = [...data.features];
                          newFeatures[idx].description = e.target.value;
                          setData({...data, features: newFeatures});
                        }}
                        className="w-full bg-transparent text-sm text-slate-500 outline-none border-b border-transparent focus:border-brand-blue"
                      />
                    </div>
                    <button className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Edit */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
               <h3 className="text-lg font-black text-brand-navy border-b pb-4">수수료 기초값 설정</h3>
               <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-400">전자등기 기본 보수료 (원)</label>
                   <input 
                     type="number"
                     value={data.pricing.electronicBase}
                     onChange={(e) => setData({...data, pricing: {...data.pricing, electronicBase: Number(e.target.value)}})}
                     className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:ring-2 focus:ring-brand-blue outline-none font-bold"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-400">방문등기 기본 보수료 (원)</label>
                   <input 
                     type="number"
                     value={data.pricing.visitBase}
                     onChange={(e) => setData({...data, pricing: {...data.pricing, visitBase: Number(e.target.value)}})}
                     className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:ring-2 focus:ring-brand-blue outline-none font-bold"
                   />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
