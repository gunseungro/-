import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "motion/react";
import { INITIAL_CONTENT } from "@/constants";

const formSchema = z.object({
  name: z.string().min(2, "이름을 입력해주세요"),
  phone: z.string().min(10, "연락처를 정확히 입력해주세요"),
  type: z.string().min(1, "등기 종류를 선택해주세요"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function InquiryForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    alert("상담 신청이 완료되었습니다. 담당자가 곧 연락드리겠습니다.");
  };

  return (
    <section id="inquiry" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="relative">
              <h2 className="text-4xl font-black text-brand-navy mb-4">빠르고 친절하게<br/>상담해 드립니다</h2>
              <p className="text-slate-500 text-lg">궁금하신 점이 있다면 언제든 편하게 남겨주세요.<br/>전문 상담원이 30분 내로 답변해 드립니다.</p>
            </div>

            <div className="space-y-6">
              {[
                { icon: MapPin, text: "서울특별시 서초구 반포대로 00, 0층" },
                { icon: Phone, text: "1588-XXXX (상담시간: 09:00 - 18:00)" },
                { icon: Mail, text: "help@geonseungro.co.kr" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-slate-600 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="p-8 bg-brand-light rounded-[32px] border border-brand-blue/10">
              <h4 className="font-bold text-brand-navy mb-2">실시간 카카오톡 상담</h4>
              <p className="text-sm text-slate-500 mb-6">전문 변호사와 실시간으로 대화하며 궁금증을 해결하세요.</p>
              <button className="w-full py-4 bg-[#FEE500] text-[#191919] rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-95 transition-all">
                카카오톡으로 시작하기
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 bg-white rounded-[40px] shadow-2xl border border-slate-100"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">성함</label>
                <input 
                  {...register("name")}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-blue outline-none" 
                  placeholder="성함을 입력하세요"
                />
                {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">연락처</label>
                <input 
                  {...register("phone")}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-blue outline-none" 
                  placeholder="예) 010-0000-0000"
                />
                {errors.phone && <p className="text-xs text-red-500 ml-1">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">등기 종류</label>
                <select 
                  {...register("type")}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-blue outline-none appearance-none"
                >
                  <option value="">등기 종류를 선택하세요</option>
                  <option value="buy">매매 (소유권이전)</option>
                  <option value="give">증여 / 상속</option>
                  <option value="loan">근저당 설정</option>
                  <option value="other">기타 문의</option>
                </select>
                {errors.type && <p className="text-xs text-red-500 ml-1">{errors.type.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">문의 내용 (선택)</label>
                <textarea 
                  {...register("message")}
                  rows={4}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-blue outline-none resize-none" 
                  placeholder="궁금하신 내용을 남겨주세요"
                />
              </div>

              <button className="w-full py-5 bg-brand-navy text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:bg-brand-blue active:scale-95 transition-all">
                상담 신청하기 <Send className="w-5 h-5" />
              </button>
              
              <p className="text-[10px] text-center text-slate-400">
                본 정보는 상담 목적으로만 사용되며, 동의 없이 제3자에게 제공되지 않습니다.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="py-24 bg-brand-navy text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <img 
          src="asset_3.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-10 mix-blend-overlay grayscale"
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20 text-white">
          <div className="space-y-4">
            <h2 className="text-4xl font-black">실제 후기로 만나는 건승로</h2>
            <p className="opacity-60 text-lg">이용자들이 직접 경험 후 남긴 후기를 만나보세요.</p>
          </div>
          <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-bold hover:bg-white hover:text-brand-navy transition-all">전체보기 &rarr;</button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {INITIAL_CONTENT.reviews.map((review) => (
            <motion.div
              key={review.id}
               whileHover={{ y: -10 }}
               className="p-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-[40px] space-y-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">😊</div>
                  <div>
                    <h4 className="font-bold text-xl">{review.author} <span className="text-sm font-normal opacity-50 ml-2">| {review.location}</span></h4>
                    <p className="text-brand-blue text-sm font-bold">{review.type}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
              </div>
              <p className="text-lg leading-relaxed opacity-80">"{review.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
