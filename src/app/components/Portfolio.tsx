import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { AnimatedSkill } from './AnimatedSkill';
import { 
  Github, 
  Linkedin, 
  Mail, 
  GraduationCap, 
  Award, 
  Target,
  Code2, 
  Database, 
  BarChart3, 
  Brain, 
  GitBranch, 
  Presentation,
  ExternalLink,
  Phone,
  MapPin,
  Send,
  X
} from 'lucide-react';

export function Portfolio() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const courseworkRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const othersRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 타이핑 효과
  const [displayedText, setDisplayedText] = useState('');
  const [displayedSubtext, setDisplayedSubtext] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = 'Jinseo Park';
  const fullSubtext = 'Data Analyst';

  // 프로젝트 모달 상태
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projectsData = [
    {
      category: 'RESEARCH',
      title: ['AI-Based Hourly Accident Prediction in NYC Using Weather Data'],
      organization: 'Qualcomm Institute, UC San Diego',
      period: '2024.07 - 2024.08',
      description: 'NYC 교통사고 + 기상 데이터를 결합한 7단계 정기 시계열 데이터셋 구축. XGBoost vs Random Forest 성능 비교 분석, 최적 예측 모델 도출.',
      detailedDescription: [
        '배경 및 문제 정의:\n- 뉴욕시는 세계 최고 수준의 교통량으로 인해 매년 20만 건 이상의 교통사고 발생\n- 기존 연구는 사고 위치나 시간 정보만 활용\n- 주요 사고 유발 요인인 날씨 데이터를 결합한 시간별(Hourly) 예측 연구 부족',
        '데이터:\n- NYC Open Data의 NYC Motor Vehicle Collisions (2012.07~2019.12)\n- Visual Crossing의 Total Weather Data (시간 단위 기상 데이터 23개 특성)\n- 두 데이터셋 결합하여 Constructed Feature Dataset(CFD) 생성\n- 12개 독립변수, 1개 종속변수(시간별 교통사고 건수)',
        '방법론 - 7단계 정기 시계열 데이터 전처리 파이프라인:\n- 시간별 사고 건수 집계 (Crash Date + Hour → Hourly Car Accidents)\n- COVID 영향 기간(2020년~) 데이터 제거\n- 관련성 낮은 변수 제거 (FeelsLike, CloudCover, SolarRadiation 등)\n- 주중/주말 구분 변수(Weekday) 추가\n- Icon 특성 전처리 (밤/낮, 구름 상태 → Clear 통합)\n- CFD 생성 및 Min-Max 정규화 적용 → CFDN 생성\n- 2012~2018년 학습 / 2019년 테스트 분할',
        '모델:\n- Random Forest Regression(RFR) vs. XGBoost 비교\n- 하이퍼파라미터 최적화 수행',
        '결과:\n- CFD 기반 XGBoost 모델이 최우수 성능 달성 (R²=0.782, RMSE=6.586)\n- RMSE 6.586은 실제 시간별 사고 최댓값(75건)의 약 9% 수준\n- 표준편차(14.11)보다 낮은 오차율 달성',
        '의의:\n- 시간대별 사고 예측 정확도 향상\n- 교통 안전 정책 수립 지원\n- 비반복적 교통 혼잡 완화에 기여'
      ],
      tags: ['Python', 'XGBoost', 'RandomForest', 'Preprocessing', 'KNIME'],
    },
    {
      category: '🏆 우수상',
      title: ['중장년 맞춤형 AI 교육 추천 에이전트 \"다시, 봄\"'],
      organization: '연세대학교 미래 ICT 서울 지역사회 경험학습 공모전',
      period: '2025.11 - 2025.12',
      description: 'Ko-SRoBERTa + FAISS 벡터 DB + LangChain RAG 구조로 직군 경력 기반 AI 교육 추천. LLM 적합성 검증 단계 추가로 추천 신뢰도 강화.',
      detailedDescription: [
        '배경 및 문제 정의:\n- 초고령화 시대, 중장년층이 최대 경제활동 인구 집단으로 부상\n- AI 활용 역량 부재로 인한 생산성 격차 → 고용 위기\n- AI 교육 콘텐츠는 다수 존재하나 분산·파편화\n- 직무 경험과 수준에 맞는 맞춤형 교육 추천 서비스 부재',
        '시스템 구조 - 5단계 파이프라인:\n- 데이터 수집: 고용24, 서울50플러스, STEP 등 공공·민간 교육 플랫폼에서 강의 데이터 수집\n- 임베딩: 한국어 문맥 이해 특화 모델 Ko-SRoBERTa 기반 임베딩\n- 벡터 DB 구축: FAISS 기반 벡터 DB 구축\n- RAG 챗봇: LangChain 기반, 단계형 대화로 사용자 정보 수집 후 LLM이 프로필 생성 및 검색 쿼리 변환\n- 적합성 검증: LLM 기반 적합성 검증 모듈로 직무 연관성·난이도 기준 강의 추천',
        '기술적 차별점:\n- 이중 검증 시스템: 벡터 유사도 검색 + LLM 기반 적합성 검증\n- 추천 신뢰도 향상\n- 할루시네이션 최소화를 위한 프롬프트 엔지니어링 적용',
        '배포:\n- Flask 웹 애플리케이션으로 전체 파이프라인 배포\n- 강의명 클릭 시 신청 페이지 자동 연결',
        '기대 효과:\n- 개인: 직무 경험 반영 AI 교육 추천으로 재취업 경쟁력 강화\n- 기업: AI 역량 갖춘 중장년 인력 효과적 매칭\n- 사회: 교육-일자리 연계를 통한 고용 선순환 기반 마련',
        '성과:\n- 연세대학교 미래 ICT 서울 지역사회 경험학습 공모전 우수상 수상'
      ],
      tags: ['Python', 'LangChain', 'RAG', 'FAISS', 'OpenAI API'],
    },
    {
      category: '기업 프로젝트',
      title: ['웹 소설 – 애니메이션 매체 전환(OSMU)의', '사용자 주요 흥미 포인트 도출'],
      organization: 'STELLA&',
      period: '2025.09 - 2025.12',
      description: '웹 소설과 애니메이션 매체 간 전환 시 사용자 흥미 포인트를 분석하여 OSMU 전략 수립.',
      detailedDescription: [
        '배경 및 문제 정의:\n- 웹소설 IP 기반 애니메이션화 증가 추세\n- 장르별 성공 요인 판단이 제작진의 경험·감각에 의존\n- STELLA&: 웹소설을 숏폼·미드폼·롱폼으로 영상화하는 B2B 기업\n- 시청자가 어떤 포인트에서 흥미를 느끼는지 정량적 근거 필요',
        '분석 1 - 판타지 장르 주요 시청 경험 요인 분석:\n- 대상: 이세계 전생물 애니메이션 3개 작품, LAFTEL 리뷰 총 4,200건\n- 파이프라인: 텍스트 전처리 → BERTopic 토픽 모델링 → BERT 하이브리드 감성 분석 → 네트워크 분석\n- 6개 주요 토픽 도출:\n  · 캐릭터 팬덤 및 애정\n  · 조연 서사 및 인물관계도\n  · 전투 쾌감 및 긴장감\n  · 제작 품질 및 만족도 저하\n  · 장르적 호불호 및 스토리라인\n  · 정서적 몰입 및 서사적 감동',
        '분석 2 - 회차별 시청자 리뷰 감성 분석:\n- 대상: LAFTEL <나 혼자만 레벨업> 자막판 리뷰 총 706건\n- 방법: KoELECTRA 기반 딥러닝 감성 분석 수행\n- 회차별 감성 점수(0~1) 시계열 그래프화\n- 최고점: 12화 (0.78) - 압도적 액션 퀄리티\n- 최저점: 7화 (0.43) - 총집편 편성으로 인한 배신감',
        '비즈니스 인사이트 제공:\n- 총집편 편성 불만 → 흐름 단절 리스크\n- 전개 템포 아쉬움 → 시청 지속 시간 감소\n- 원작과의 괴리 → 원작 팬덤 반발\n- 구체적 현상과 시청자 반응, 비즈니스 리스크 매핑',
        '활용:\n- 데이터 기반 OSMU 콘텐츠 기획 및 제작 전략 수립\n- 장르별 핵심 만족 요인 및 회피 요인 파악\n- 제작 단계별 리스크 사전 예측'
      ],
      tags: ['Python', 'Data Analysis', 'OSMU', 'Text Mining', 'Topic Modeling'],
    },
    {
      category: '공모전 발표',
      title: ['Plannie: GPT 기반 맞춤형 공부 일정 관리 앱'],
      organization: '2024 경기 SW 페스타',
      period: '2024.04 - 2024.11',
      description: 'GPT few-shot learning + 프롬프트 엔지니어링으로 학습자 역량에 최적화된 맞춤형 계획 생성 AI 봇 구축.',
      detailedDescription: [
        '배경 및 문제 정의:\n- 기존 일정 관리 앱은 단순 알림·캘린더 기능에 그침\n- 학습자의 개별 학습 패턴이나 목표를 반영한 맞춤형 지원 부재\n- 학생들이 학습 목표·달성 현황을 스스로 추적하는 데 많은 시간 소비',
        '핵심 기능:\n- GPT Chatbot: 시험 일정·범위 입력 시 맞춤형 학습 계획 자동 생성\n- 개인화 목표 설정: Few-shot Prompt로 개별 학습 패턴 반영\n- 캘린더 + To-Do List: 월별 일정 확인 및 학습 수행 진도 추적\n- 알림 & 리마인더: 학습 목표 달성 지원',
        '시스템 구조:\n- Client(프론트엔드) → GitHub → AWS EC2 → Node.js → MongoDB / Amazon RDS\n- GPT 모델 파인튜닝으로 학생 학습 대화 데이터 기반 효과적 학습 관리 지원',
        '기존 앱과의 차별점:\n- 단순 알림이 아닌 GPT 기반 맞춤형 학습 계획 제안\n- 학습 패턴 반영한 목표 설정\n- To-Do List + 달성 진도 자동 추적',
        '기대 효과:\n- 개인 요구에 맞는 일정·방법 제공으로 학습 효율성 향상\n- 직관적 UI/UX로 학습 계획 손쉽게 관리\n- 향후 온라인 강의 플랫폼 연계·공부 타이머 앱 연동 등 확장 가능',
        '발표:\n- 2024 경기 SW 페스타 프로젝트 전시'
      ],
      tags: ['Python', 'OpenAI API', 'Few-shot', 'Prompt Eng.'],
    },
    {
      category: '공모전 발표',
      title: ['메타버스와 AI 추천 서비스 기반', '키오스크 안내 서비스'],
      organization: '2023 한이음 ICT 멘토링 공모전',
      period: '2023.04 - 2023.11',
      description: '디지털 실버계층 대상 키오스크 접근성 향상 서비스. 코사인 유사도 + KNN 기반 콘텐츠 AI 추천, AR Core 기반 공간 안내 구현.',
      detailedDescription: [
        '배경 및 문제 정의:\n- 디지털 소외계층을 위한 키오스크 사용 교육 플랫폼 개발 필요\n- 고령층의 키오스크 이용 어려움 문제 해결',
        '핵심 기능:\n- 메타버스 가상 훈련 환경 제공\n- Unity 기반 가상 키오스크 체험 공간 구축',
        'AI 추천 시스템:\n- 코사인 유사도 + KNN 기반 사용자 맞춤 콘텐츠 추천\n- 개인화된 학습 경로 제공',
        'AR 공간 안내:\n- AR Core를 활용한 실제 매장 내 키오스크 위치 안내\n- 실시간 길찾기 지원',
        '성과:\n- 2023 한이음 ICT 멘토링 공모전 발표'
      ],
      tags: ['Python', 'ML', 'KNN', 'AR Core', 'Cosine Sim.'],
    },
  ];

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullSubtext.length) {
          setDisplayedSubtext(fullSubtext.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 80);
      return () => clearInterval(typingInterval);
    }, fullText.length * 100);

    return () => clearTimeout(timer);
  }, []);

  // 스크롤 진행도
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 마우스 위치 추적
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const navLinks = [
    { name: 'ABOUT', ref: aboutRef },
    { name: 'EDUCATION', ref: educationRef },
    { name: 'EXPERIENCE', ref: experienceRef },
    { name: 'PROJECTS', ref: projectsRef },
    { name: 'COURSEWORK', ref: courseworkRef },
    { name: 'RESEARCH', ref: researchRef },
    { name: 'OTHERS', ref: othersRef },
    { name: 'SKILLS', ref: skillsRef },
    { name: 'CONTACT', ref: contactRef },
  ];

  const [activeSection, setActiveSection] = useState('ABOUT');

  useEffect(() => {
    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = [aboutRef, educationRef, experienceRef, projectsRef, courseworkRef, researchRef, othersRef, skillsRef, contactRef];
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-background">
      {/* 배경 그라디언트 애니메이션 */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.05), transparent 40%)`
        }}
      />
      
      {/* 스크롤 진행도 바 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Left Side - Fixed */}
      <div className="w-[40%] lg:w-[33.333%] h-screen flex flex-col justify-start pt-24 p-8 lg:p-12 fixed left-0 top-0">
        <div className="flex flex-col h-full max-w-md w-full" style={{ marginLeft: '15%' }}>
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl text-foreground">
              {displayedText}
              {isTypingComplete && ' '}
              <span className="animate-blink">|</span>
            </h1>
            <h2 className="text-lg lg:text-xl text-primary">
              {displayedSubtext}
            </h2>
          </div>

          <nav className="space-y-3 mt-12">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.ref)}
                className={`block transition-all text-xs tracking-widest text-left pl-4 py-2 border-l-2 ${
                  activeSection === link.name 
                    ? 'text-primary text-base border-primary' 
                    : 'text-muted-foreground hover:text-primary border-transparent hover:border-muted-foreground/30'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="flex gap-4 mt-auto pb-8">
            <a
              href="https://linkedin.com/in/jinseo-park-583027323"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:j2nseo@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Right Side - Scrollable */}
      <div className="ml-[40%] lg:ml-[33.333%] w-3/5 lg:w-2/3 p-8 lg:p-12 pt-16 space-y-24 scroll-smooth overflow-y-auto h-screen" ref={scrollContainerRef}>
        <div className="max-w-3xl mx-auto space-y-24">
          {/* About Section */}
          <motion.section 
            ref={aboutRef}
            data-section="ABOUT"
            className="pt-24 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-foreground text-xl">
                안녕하세요, <span className="text-primary font-semibold">데이터를 기반으로 문제를 해결</span>하는 박진서입니다.
              </p>
              
              <p>
                저는 <span className="font-semibold">경영정보학 · 산업시스템공학</span> 이중전공으로 데이터를 다각도로 바라보는 시각을 길렀습니다.
              </p>
              
              <p>
                <span className="font-semibold">QI AI 개발 프로그램에 참여하여 Qualcomm Institute, UC San Diego</span>에서 AI 기반 교통사고 예측 연구를 진행하며 실제 공공 데이터를 분석하고 머신러닝 모델을 적용하는 연구 경험을 쌓았습니다.
              </p>
              
              <p>
                이후 <span className="font-semibold">경기대학교 산업시스템공학과 데이터 분석 연구실</span>에 학부 연구원으로 합류해 현재도 데이터로 사회 문제를 해결하는 연구를 이어가고 있습니다.
              </p>
            </div>

            <div>
              <h4 className="text-base text-primary font-semibold mb-4">관심 분야</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Data Analysis', 'Machine Learning', 'E-Commerce', 'Generative AI', 'Text Mining'].map((interest, index) => (
                  <Card key={index} className="p-4 bg-card hover:bg-card/80 hover:border-primary/50 transition-all text-center">
                    <span className="text-sm text-foreground">{interest}</span>
                  </Card>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section 
            ref={educationRef}
            data-section="EDUCATION"
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h3 className="text-2xl text-primary font-semibold">Education</h3>
            </div>
            
            <div className="space-y-12">
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-xs text-primary font-semibold">2021.03 — 2026.08 (졸업 예정)</span>
                </div>
                <h4 className="text-lg text-foreground font-bold mb-2">경기대학교</h4>
                <p className="text-sm text-muted-foreground mb-1 leading-relaxed">
                  경영정보전공, B.A.
                </p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  산업시스템공학전공, B.E.
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-xs text-primary font-semibold">2018.03 — 2021.02 (졸업)</span>
                </div>
                <h4 className="text-lg text-foreground font-bold mb-2">화홍고등학교</h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  문계
                </p>
              </div>
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section 
            ref={experienceRef}
            data-section="EXPERIENCE"
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h3 className="text-2xl text-primary font-semibold">Experience</h3>
            </div>
            
            <div className="space-y-12">
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-xs text-primary font-semibold">2025.01 — PRESENT</span>
                </div>
                <h4 className="text-lg text-foreground mb-2">학부 연구원 · <span className="font-bold">경기대학교 산업시스템공학과 데이터 분석 연구실</span></h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  데이터 분석 기법을 활용하여 사회 문제를 해결하는 연구를 수행하고 있습니다.<br />
                  머신러닝 모델 개발 및 최적화, 텍스트 마이닝, 데이터 전처리 및 시각화 작업에 참여하고 있습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">Python</Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">Machine Learning</Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">Data Analysis</Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">Research</Badge>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-xs text-primary font-semibold">2024.07 — 2024.08</span>
                </div>
                <h4 className="text-lg text-foreground mb-2">Undergraduate Research Student · <span className="font-bold">Qualcomm Institute, UC San Diego</span></h4>
                <p className="text-sm text-foreground mb-1">
                  2024 Summer AI Development Program (Advisor: Seokheon Cho, Ph.D.)
                </p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Qualcomm Institute의 현지 연구원 지도 아래 실제 공공 데이터를 수집·분석하여 머신러닝 모델을 설계 및 적용한 AI 기반 교통사고 예측<br />
                  프로젝트를 수행했습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">Python</Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">AI</Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">Public Data</Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">Predictive Modeling</Badge>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section 
            ref={projectsRef}
            data-section="PROJECTS"
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h3 className="text-2xl text-primary font-semibold">Projects</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {projectsData.map((project, index) => (
                <Card key={index} className="p-6 bg-card hover:bg-card/80 transition-all group hover:shadow-xl h-[460px] flex flex-col">
                  <div className="mb-3">
                    <Badge 
                      variant="outline" 
                      className={`text-xs font-semibold ${
                        project.category.includes('🏆') 
                          ? 'border-yellow-500 text-yellow-600 bg-yellow-50' 
                          : 'border-primary/30 text-primary bg-primary/5'
                      }`}
                    >
                      {project.category}
                    </Badge>
                  </div>
                  
                  <h4 className="text-base text-foreground font-bold mb-3 leading-snug min-h-[48px]">
                    {Array.isArray(project.title) ? (
                      <>
                        {project.title.map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < project.title.length - 1 && <br />}
                          </span>
                        ))}
                      </>
                    ) : (
                      project.title
                    )}
                  </h4>
                  
                  <p className="text-xs text-muted-foreground mb-1">
                    {project.organization}
                  </p>
                  
                  <p className="text-xs text-muted-foreground mb-3">
                    {project.period}
                  </p>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4 min-h-[60px]">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        className="bg-primary text-primary-foreground text-xs px-2 py-1 hover:bg-primary/90 h-fit"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    onClick={() => setSelectedProject(index)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm mt-auto"
                  >
                    Read more →
                  </Button>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* 프로젝트 상세 모달 */}
          <AnimatePresence>
            {selectedProject !== null && (
              <motion.div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={24} />
                  </button>

                  <div className="mb-6">
                    <Badge 
                      variant="outline" 
                      className={`text-xs font-semibold mb-3 ${
                        projectsData[selectedProject].category.includes('🏆') 
                          ? 'border-yellow-500 text-yellow-600 bg-yellow-50' 
                          : 'border-primary/30 text-primary bg-primary/5'
                      }`}
                    >
                      {projectsData[selectedProject].category}
                    </Badge>
                    
                    <h3 className="text-2xl text-foreground font-bold mb-3 leading-snug">
                      {Array.isArray(projectsData[selectedProject].title) ? (
                        <>
                          {projectsData[selectedProject].title.map((line, i) => (
                            <span key={i}>
                              {line}
                              {i < projectsData[selectedProject].title.length - 1 && <br />}
                            </span>
                          ))}
                        </>
                      ) : (
                        projectsData[selectedProject].title
                      )}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {projectsData[selectedProject].organization} · {projectsData[selectedProject].period}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {projectsData[selectedProject].tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          className="bg-primary text-primary-foreground text-xs px-2.5 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 space-y-4">
                    {projectsData[selectedProject].detailedDescription?.map((detail, i) => {
                      // 제목과 내용 분리
                      const parts = detail.split(':');
                      const hasTitle = parts.length > 1;
                      const title = hasTitle ? parts[0].trim() : '';
                      const content = hasTitle ? parts.slice(1).join(':').trim() : detail;

                      // 줄바꿈으로 분리하여 각 라인 처리
                      const lines = content.split('\n').filter(line => line.trim());

                      return (
                        <div key={i} className="space-y-2">
                          {hasTitle && (
                            <h4 className="text-sm font-bold text-primary">{title}</h4>
                          )}
                          <div className="pl-3 border-l-2 border-primary/20 space-y-1">
                            {lines.map((line, lineIndex) => {
                              const trimmedLine = line.trim();
                              // '-'로 시작하는 경우 불릿 포인트로 처리
                              if (trimmedLine.startsWith('-')) {
                                const bulletContent = trimmedLine.substring(1).trim();
                                // '·'로 시작하는 하위 항목 처리
                                if (bulletContent.startsWith('·')) {
                                  return (
                                    <p key={lineIndex} className="text-sm text-foreground leading-relaxed pl-4">
                                      {bulletContent}
                                    </p>
                                  );
                                }
                                return (
                                  <p key={lineIndex} className="text-sm text-foreground leading-relaxed">
                                    • {bulletContent}
                                  </p>
                                );
                              }
                              // 일반 텍스트
                              return (
                                <p key={lineIndex} className="text-sm text-foreground leading-relaxed">
                                  {trimmedLine}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Coursework Section */}
          <motion.section 
            ref={courseworkRef}
            data-section="COURSEWORK"
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h3 className="text-2xl text-primary font-semibold">Coursework</h3>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 bg-card hover:bg-card/80 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-base text-foreground font-bold mb-1">시뮬레이션 기반 경기대학교 후문 교통혼잡 문제 완화</h4>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-primary font-semibold">
                        2025-1 | 산업경영공학종합설계
                      </p>
                      <a
                        href="https://www.notion.so/cf06c346606c4014bde77f363050ccba?source=copy_link#32f69c56cd2280c295e7e88b77e6cca7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                        title="프로젝트 보기"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs">
                    Simulation
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  SUMO(교통 시뮬레이션 툴)를 활용해 경기대학교 후문 사거리의 교통 혼잡 문제를 정량적으로 분석했습니다.<br />
                  <br />
                  현장 조사와 수원교통정보센터 데이터를 기반으로 추가 도로 건설 및 가변 신호등 도입 시나리오를 설계하고,<br />
                  두 방안 병행 적용 시 <span className="text-foreground font-semibold">평균 대기시간 79.5% 단축</span> 효과를 시뮬레이션으로 입증했습니다.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    SUMO
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    Traffic Simulation
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    Data Analysis
                  </Badge>
                </div>
              </Card>

              <Card className="p-6 bg-card hover:bg-card/80 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-base text-foreground font-bold mb-1">일회용컵 반납기 최적 위치 선정</h4>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-primary font-semibold">
                        2023-2 | 머신러닝의 이해
                      </p>
                      <a
                        href="https://www.notion.so/c6649139191b4f2f9f0cade31ccbc788?source=copy_link#32f69c56cd2280c4bcc4f7f3fcf349c1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                        title="프로젝트 보기"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs">
                    Machine Learning
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  수원시 내 일회용컵 반납기의 최적 설치 위치를 데이터 기반으로 도출했습니다.<br />
                  <br />
                  수원시 버스정류장·지하철·카페 위치 데이터와 유동인구 데이터를 결합하여 전처리하고,<br />
                  <span className="text-foreground font-semibold">K-means 클러스터링</span> 알고리즘을 적용했습니다.<br />
                  <br />
                  Elbow Method로 최적 군집 수를 결정하고, 구글 맵으로 검증해<br />
                  유동인구가 많고 카페가 밀집한 지점을 최종 설치 위치로 제안했습니다.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    K-means
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    Clustering
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    Python
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    Data Analysis
                  </Badge>
                </div>
              </Card>

              <Card className="p-6 bg-card hover:bg-card/80 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base text-foreground font-bold mb-1">풀무원 주문-납품 통합 데이터베이스 시스템 설계</h4>
                    <p className="text-xs text-primary font-semibold mb-1">
                      2024-1 | 데이터베이스 관리
                    </p>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs">
                    Database
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  풀무원을 고객사로 선정해 주문-납품 통합 <span className="text-foreground font-semibold">ODS(Ordering Delivery System)</span>를 설계했습니다.<br />
                  <br />
                  풀무원 영업본부 실무 담당자와 2차례 킥오프 미팅을 진행해 요구사항을 분석하고,<br />
                  자체공장(ODM)과 외부제조업체(OEM)를 자동으로 구분하는 주문 분리 기능과<br />
                  표기오류 제품을 자동 폐기 처리하는 납품 분류 기능을 설계했습니다.<br />
                  <br />
                  ERD 개념적 설계부터 Toad 기반 물리적 설계, MySQL DDL/DML 작성 및<br />
                  응용 프로세스 프로토타입 구현까지 DB 설계 전 과정을 수행했습니다.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    MySQL
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    ERD
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    DDL/DML
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    ODS
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    Database Design
                  </Badge>
                </div>
              </Card>
            </div>
          </motion.section>

          {/* Research Section */}
          <motion.section 
            ref={researchRef}
            data-section="RESEARCH"
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h3 className="text-2xl text-primary font-semibold">Research</h3>
            </div>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-sm text-primary font-semibold mb-4">Publications</h4>
                <div className="space-y-6">
                  <div className="pl-4 border-l-2 border-primary/30">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-sm text-foreground font-semibold">
                        개인형 이동장치(PM) 사고 유형별 심각도에 영향을 미치는 연관 요인 분석: CCA 및 네트워크분석 접근
                      </p>
                      <a
                        href="https://www.dbpia.co.kr/pdf/cpViewer?nodeId=NODE12515292"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                        title="논문 보기"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      박진서, 박정민, 송민호, 김정화, 이소현
                    </p>
                    <p className="text-xs text-primary font-semibold mb-2">
                      지식경영연구, 한국지식경영학회, 2025.09
                    </p>
                  </div>

                  <div className="pl-4 border-l-2 border-primary/30">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-sm text-foreground font-semibold">
                        날씨 데이터를 활용한 인공지능 알고리즘 기반 뉴욕시 시간별 교통사고 발생건수 예측 모델
                      </p>
                      <a
                        href="https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12035102"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                        title="논문 보기"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      허예찬, 박진서, 조은영, 정영균, 조석헌
                    </p>
                    <p className="text-xs text-primary font-semibold mb-2">
                      한국통신학회, 2024.11
                    </p>
                  </div>

                  <div className="pl-4 border-l-2 border-primary/30">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-sm text-foreground font-semibold">
                        메타버스와 AI 추천서비스를 활용한 국내 대표 키오스크 사용서비스 안내 개발
                      </p>
                      <a
                        href="https://kiss.kstudy.com/Detail/Ar?key=4059488"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                        title="논문 보기"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      최수현, 이민정, 박진서, 서연호, 문재현
                    </p>
                    <p className="text-xs text-primary font-semibold mb-2">
                      한국정보처리학회, 2023.11
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-primary font-semibold mb-4">Conference Presentations</h4>
                <div className="space-y-6">
                  <div className="pl-4 border-l-2 border-primary/30">
                    <p className="text-sm text-foreground font-semibold mb-2">
                      BERTopic 모델링 기반 속성 맞춤형 도슨트 AI 서비스
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      박진서, 박정민, 송민호, 이소현
                    </p>
                    <p className="text-xs text-primary font-semibold mb-2">
                      2025 한국IT서비스학회 추계학술대회, 2025.11
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Others Section */}
          <motion.section 
            ref={othersRef}
            data-section="OTHERS"
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h3 className="text-2xl text-primary font-semibold">Others</h3>
            </div>

            <div className="space-y-4">
              <Card className="p-6 bg-card hover:bg-card/80 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base text-foreground font-bold mb-1">연구실 연합 SNS 채널 운영</h4>
                    <a 
                      href="https://www.instagram.com/soda_yoonity" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      @soda_yoonity (Instagram)
                    </a>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs">
                    콘텐츠
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  최신 AI 연구 동향을 분석해 주간 카드뉴스 제작, 밈(Meme)을 활용한 릴스 콘텐츠 제작으로 연구실 계정 도달률 강화<br />
                  친근한 AI 용어를 인포그래픽으로 재구성해 지식 전달 효율성 제고
                </p>

                <div className="flex gap-6 mt-4">
                  <div>
                    <p className="text-xl text-primary font-bold">26.8만</p>
                    <p className="text-xs text-muted-foreground tracking-wider">TOTAL VIEWS</p>
                  </div>
                  <div>
                    <p className="text-xl text-primary font-bold">80</p>
                    <p className="text-xs text-muted-foreground tracking-wider">POSTS</p>
                  </div>
                  <div>
                    <p className="text-xl text-primary font-bold">112</p>
                    <p className="text-xs text-muted-foreground tracking-wider">FOLLOWERS</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card hover:bg-card/80 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base text-foreground font-bold mb-1">연구실 홈페이지 제작</h4>
                    <a 
                      href="https://sodalab-site.onrender.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      sodalab-site.onrender.com
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs">
                    웹 개발
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  React + TypeScript 기반 반응형 웹사이트 구축<br />
                  Figma를 활용한 UI/UX 디자인부터 프론트엔드 개발, 배포까지 전 과정 담당<br />
                  연구실 소개, 프로젝트, 팀원, 논문 정보를 직관적으로 전달하는 사용자 중심 인터페이스 설계
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    React
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    TypeScript
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    Figma
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                    Vercel
                  </Badge>
                </div>
              </Card>

              <Card className="p-6 bg-card hover:bg-card/80 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base text-foreground font-bold mb-1">2023 코드클럽 SW 교육 기부단</h4>
                    <p className="text-xs text-primary font-semibold mb-1">
                      2023.04 - 2023.07
                    </p>
                    <a 
                      href="https://www.instagram.com/codeclub_mission/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      @codeclub_mission (Instagram)
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs">
                    봉사활동
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  초등학교 코딩 교육 봉사활동<br />
                  코딩 수업 커리큘럼을 직접 구성하여 학생들에게 기초 프로그래밍 개념을 쉽고 재미있게 가르치며 SW 교육의 중요성을 전파
                </p>
              </Card>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section 
            ref={skillsRef}
            data-section="SKILLS"
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h3 className="text-2xl text-primary font-semibold">Skills</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PROGRAMMING LANGUAGES */}
              <Card className="p-6 bg-card">
                <h4 className="text-xs text-primary font-semibold mb-4 tracking-wider">PROGRAMMING LANGUAGES</h4>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'R'].map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="bg-muted text-foreground text-sm px-4 py-2 font-normal hover:bg-muted/80"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* TOOLS & PLATFORMS */}
              <Card className="p-6 bg-card">
                <h4 className="text-xs text-primary font-semibold mb-4 tracking-wider">TOOLS & PLATFORMS</h4>
                <div className="flex flex-wrap gap-2">
                  {['KNIME', 'Figma', 'Jupyter'].map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="bg-muted text-foreground text-sm px-4 py-2 font-normal hover:bg-muted/80"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* LIBRARIES & FRAMEWORKS */}
              <Card className="p-6 bg-card">
                <h4 className="text-xs text-primary font-semibold mb-4 tracking-wider">LIBRARIES & FRAMEWORKS</h4>
                <div className="flex flex-wrap gap-2">
                  {['Pandas', 'NumPy', 'Scikit-learn', 'BERTopic', 'LangChain', 'OpenAI API'].map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="bg-muted text-foreground text-sm px-4 py-2 font-normal hover:bg-muted/80"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* ANALYTICS */}
              <Card className="p-6 bg-card">
                <h4 className="text-xs text-primary font-semibold mb-4 tracking-wider">ANALYTICS</h4>
                <div className="flex flex-wrap gap-2">
                  {['머신러닝', '네트워크 분석', '토픽 모델링', 'RAG', '데이터 전처리', 'EDA'].map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="bg-muted text-foreground text-sm px-4 py-2 font-normal hover:bg-muted/80"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* LANGUAGE SKILLS */}
              <Card className="p-6 bg-card md:col-span-2">
                <h4 className="text-xs text-primary font-semibold mb-4 tracking-wider">LANGUAGE SKILLS</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant="secondary"
                    className="bg-muted text-foreground text-sm px-4 py-2 font-normal hover:bg-muted/80"
                  >
                    영어 - OPIc IH (Intermediate High)
                  </Badge>
                  <Badge 
                    variant="secondary"
                    className="bg-muted text-foreground text-sm px-4 py-2 font-normal hover:bg-muted/80"
                  >
                    한국어 - Native
                  </Badge>
                </div>
              </Card>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section 
            ref={contactRef}
            data-section="CONTACT"
            className="pb-24 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h3 className="text-2xl text-primary font-semibold">Contact</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-primary" size={20} />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <a href="mailto:j2nseo@gmail.com" className="text-sm text-foreground hover:text-primary">
                      j2nseo@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="text-primary" size={20} />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <a href="tel:+821040254831" className="text-sm text-foreground hover:text-primary">
                      010-4025-4831
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="text-primary" size={20} />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm text-foreground">수원, 대한민국</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}