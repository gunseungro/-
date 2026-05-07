export interface AppContent {
  brand: {
    name: string;
    englishName: string;
    logo?: string;
  };
  hero: {
    slogan: string;
    subSlogan: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  pricing: {
    electronicBase: number;
    visitBase: number;
  };
  features: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
  }>;
  process: Array<{
    id: number;
    step: string;
    title: string;
    description: string;
    detail: string;
  }>;
  reviews: Array<{
    id: number;
    author: string;
    location: string;
    type: string;
    content: string;
    rating: number;
  }>;
}

export const INITIAL_CONTENT: AppContent = {
  brand: {
    name: "건승로",
    englishName: "Geonseung-ro",
  },
  hero: {
    slogan: "내 소중한 자산, 안전한 등기",
    subSlogan: "변호사가 직접 진행하는 신뢰할 수 있는 소유권이전등기 전문 에이전시",
    ctaPrimary: "등기 비용 계산하기",
    ctaSecondary: "1:1 무료 상담",
  },
  pricing: {
    electronicBase: 150000,
    visitBase: 302500,
  },
  features: [
    {
      id: 1,
      title: "합리적인 전자등기 비용",
      description: "전자등기 신청 시 소유권이전등기 보수료 15만원부터! 거품 없는 가격을 제안합니다.",
      icon: "Wallet",
    },
    {
      id: 2,
      title: "변호사 직접 수행",
      description: "대표변호사를 포함한 전문 변호사팀이 권리분석부터 접수까지 모든 업무를 총괄합니다.",
      icon: "ShieldCheck",
    },
    {
      id: 3,
      title: "철저한 보안 관리",
      description: "개인정보보호를 위해 개인 PC가 아닌 보안 서버 중심의 정기파쇄 시스템을 운영합니다.",
      icon: "Lock",
    },
    {
      id: 4,
      title: "24시간 AI 챗봇 상담",
      description: "휴일에도, 한밤중에도 궁금한 점이 생기면 언제든 답변해 드립니다.",
      icon: "Bot",
    },
  ],
  process: [
    {
      id: 1,
      step: "01",
      title: "소유권이전등기 신청",
      description: "담당 변호사가 거래 내용 및 권리관계를 직접 검토합니다.",
      detail: "안전하게 이전 절차를 시작합니다.",
    },
    {
      id: 2,
      step: "02",
      title: "잔금 납부",
      description: "부동산 거래 완료 후, 변호사와 사무장이 직접 방문하여 서류를 확인합니다.",
      detail: "서류 검토 및 현장 관리를 수행합니다.",
    },
    {
      id: 3,
      step: "03",
      title: "시·구청 방문",
      description: "취득세 신고부터 납부까지 정확하게 진행합니다.",
      detail: "공과금 납부 및 영수증을 확보합니다.",
    },
    {
      id: 4,
      step: "04",
      title: "등기소 방문 및 접수",
      description: "변호사의 꼼꼼한 검토 하에 등기소에 서류를 제출합니다.",
      detail: "실수 없는 접수가 가장 중요합니다.",
    },
    {
      id: 5,
      step: "05",
      title: "등기 완료 및 배송",
      description: "최종 등기권리증을 안전하게 발송해 드립니다.",
      detail: "배송까지 책임지겠습니다.",
    },
  ],
  reviews: [
    {
      id: 1,
      author: "한OO",
      location: "힐스테이트 ***",
      type: "소유권이전등기",
      content: "하나하나 차분히 설명해 주시고 서류부터 등기 완료까지 꼼꼼하게 챙겨주셔서 불안함 없이 모든 과정을 맡길 수 있었습니다.",
      rating: 5,
    },
    {
      id: 2,
      author: "김OO",
      location: "자이 ***",
      type: "증여등기",
      content: "변호사님이 직접 상담해 주셔서 믿음이 갔습니다. 복잡한 서류 절차도 알아서 다 해주셔서 너무 편했네요.",
      rating: 5,
    },
  ],
};
