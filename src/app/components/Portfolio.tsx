import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
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
  Send
} from 'lucide-react';

export function Portfolio() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
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

  // 프로젝트 카드 뒤집기 상태
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});

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

    const sections = [aboutRef, educationRef, experienceRef, projectsRef, researchRef, othersRef, skillsRef, contactRef];
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
        <div className="flex flex-col h-full max-w-md ml-auto w-full">
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
                  인문계
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
                  머신러닝 모델 개발 및 최적화, 데이터 전처리 및 시각화 작업에 참여하고 있습니다.
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
                  Qualcomm Institute의 현지 연구원 지도 아래 실제 공공 데이터를 수집·분석하여 머신러닝 모델을 설계 및 적용한 AI 기반 교통사고 예측 프로젝트를 수행했습니다.
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
              {[
                {
                  category: 'RESEARCH',
                  title: ['AI-Based Hourly Accident Prediction in NYC Using Weather Data'],
                  organization: 'Qualcomm Institute, UC San Diego',
                  period: '2024.07 - 2024.08',
                  description: 'NYC 교통사고 + 기상 데이터를 결합한 시계열 데이터셋 구축. <br> XGBoost vs Random Forest 성능 비교 분석, 최적 예측 모델 도출.',
                  detailedDescription: [
                    '배경: 뉴욕시 교통사고 예측을 위한 기상 데이터 활용 연구',
                    '데이터: NYC Motor Vehicle Collisions 데이터 + 기상청 날씨 데이터 (2018-2024)',
                    '방법론: 7단계 정기 시계열 데이터 전처리 파이프라인 구축',
                    '모델: XGBoost, Random Forest 앙상블 모델 학습 및 하이퍼파라미터 최적화',
                    '결과: XGBoost 모델 R²=0.782로 최우수 성능 달성',
                    '성과: 시간대별 사고 예측 정확도를 통한 교통 안전 정책 수립 기여'
                  ],
                  tags: ['Python', 'XGBoost', 'RandomForest', 'Preprocessing'],
                },
                {
                  category: '🏆 우수상',
                  title: ['중장년 맞춤형 AI 교육 추천 에이전트 \'다시, 봄\''],
                  organization: '연세대학교 미래 ICT 서울 지역사회 경험학습 공모전',
                  period: '2024.11 - 2024.12',
                  description: 'Ko-SRoBERTa + FAISS 벡터 DB + LangChain RAG 구조로 직군 경력 기반 AI 교육 추천. LLM 적합성 검증 단계 추가로 추천 신뢰도 강화.',
                  detailedDescription: [
                    '배경: 중장년층을 위한 AI 기반 재교육 프로그램 추천 시스템 개발',
                    '문제 정의: 디지털 전환기 중장년층의 재취업을 위한 맞춤형 교육 필요',
                    '기술 스택: Ko-SRoBERTa 임베딩 + FAISS 벡터 DB + LangChain RAG',
                    '핵심 기능: 사용자 직군/경력 기반 유사도 검색 → LLM 적합성 검증 → 맞춤 추천',
                    '차별점: 이중 검증(벡터 유사도 + LLM) 방식으로 추천 신뢰도 향상',
                    '성과: 연세대학교 미래 ICT 공모전 우수상 수상'
                  ],
                  tags: ['Python', 'LangChain', 'RAG', 'FAISS', '생성AI'],
                },
                {
                  category: '기업 프로젝트',
                  title: ['웹 소설 – 애니메이션 매체 전환(OSMU)의', '사용자 주요 흥미 포인트 도출'],
                  organization: 'STELLA&',
                  period: '2024.09 - 2024.12',
                  description: '웹 소설과 애니메이션 매체 간 전환 시 사용자 흥미 포인트를 분석하여 OSMU 전략 수립.',
                  detailedDescription: [
                    '배경: 웹 소설의 애니메이션 매체 전환(OSMU) 전략 수립을 위한 데이터 분석',
                    '목표: 웹 소설 → 애니메이션 전환 시 사용자 흥미 요소 규명',
                    '분석 대상: 네이버 웹소설/웹툰 리뷰 데이터, 애니메이션 시청 평가 데이터',
                    '분석 방법: 텍스트 마이닝, 감성 분석, 토픽 모델링을 통한 핵심 흥미 요소 추출',
                    '결과: 매체 전환 시 핵심 유지 요소(캐릭터 일관성, 스토리 구조) vs 변화 요소(시각 연출) 도출',
                    '활용: 데이터 기반 OSMU 콘텐츠 기획 및 제작 전략 수립'
                  ],
                  tags: ['Python', 'Data Analysis', 'OSMU', 'Content'],
                },
                {
                  category: '공모전 발표',
                  title: ['Plannie: GPT 기반 맞춤형 공부 일정 관리 앱'],
                  organization: '2024 경기 SW 페스타',
                  period: '2024.04 - 2024.11',
                  description: 'GPT few-shot learning + 프롬프트 엔지니어링으로 학습자 역량에 최적화된 맞춤형 계획 생성 AI 봇 구축.',
                  detailedDescription: [
                    '배경: 학습자 개인별 역량과 목표에 맞춘 학습 계획 자동 생성 앱 개발',
                    '핵심 기능: GPT-4 API + Few-shot Learning으로 학습자 맥락 기반 계획 생성',
                    '프롬프트 엔지니어링: 학습 목표, 가용 시간, 난이도 선호 반영 프롬프트 최적화',
                    'To-Do List 연동: Flutter 기반 모바일 앱과 GPT 봇 실시간 동기화',
                    '사용자 피드백: 계획 준수율 추적 → 재학습으로 추천 정확도 향상',
                    '발표: 2024 경기 SW 페스타 프로젝트 전시'
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
                    '배경: 디지털 소외계층을 위한 키오스크 사용 교육 플랫폼 개발',
                    '문제 정의: 고령층의 키오스크 이용 어려움 → 메타버스 가상 훈련 환경 제공',
                    'AI 추천 시스템: 코사인 유사도 + KNN 기반 사용자 맞춤 콘텐츠 추천',
                    'AR 공간 안내: AR Core를 활용한 실제 매장 내 키오스크 위치 안내',
                    '메타버스 환경: Unity 기반 가상 키오스크 체험 공간 구축',
                    '성과: 2023 한이음 ICT 멘토링 공모전 발표'
                  ],
                  tags: ['Python', 'ML', 'KNN', 'AR Core', 'Cosine Sim.'],
                },
              ].map((project, index) => {
                const isFlipped = flippedCards[index] || false;
                
                return (
                  <motion.div
                    key={index}
                    className="relative h-[450px]"
                    style={{ perspective: 1000 }}
                  >
                    <motion.div
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }))}
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* 앞면 */}
                      <div
                        className="w-full h-full"
                        style={{ 
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          position: isFlipped ? 'absolute' : 'relative',
                          inset: isFlipped ? 0 : 'auto'
                        }}
                      >
                        <Card className="p-6 bg-card hover:bg-card/80 transition-all group hover:shadow-xl h-full flex flex-col">
                          <div className="mb-4">
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
                          
                          <h4 className="text-base text-foreground font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
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
                          
                          <p className="text-xs text-muted-foreground mb-2">
                            {project.organization} · {project.period}
                          </p>
                          
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-grow">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags.map((tag, tagIndex) => (
                              <Badge 
                                key={tagIndex} 
                                className="bg-primary text-primary-foreground text-xs px-2 py-1 hover:bg-primary/90"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <p className="text-xs text-primary mt-4 text-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                            클릭하여 자세히 보기 →
                          </p>
                        </Card>
                      </div>

                      {/* 뒷면 */}
                      <div
                        className="w-full h-full absolute inset-0"
                        style={{ 
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)"
                        }}
                      >
                        <Card className="p-6 bg-primary/5 border-primary/30 h-full flex flex-col overflow-y-auto">
                          <div className="mb-4">
                            <h4 className="text-base text-primary font-bold mb-1">프로젝트 상세</h4>
                            <p className="text-xs text-muted-foreground">{project.period}</p>
                          </div>
                          
                          <div className="space-y-2 mb-4 flex-grow">
                            {project.detailedDescription?.map((detail, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className="text-primary text-xs mt-1">•</span>
                                <p className="text-xs text-foreground leading-relaxed">{detail}</p>
                              </div>
                            ))}
                          </div>

                          <p className="text-xs text-primary mt-auto text-center font-semibold">
                            클릭하여 돌아가기 ←
                          </p>
                        </Card>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
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
                    <p className="text-sm text-foreground font-semibold mb-2">
                      개인형 이동장치(PM) 사고 유형별 심각도에 영향을 미치는 연관 요인 분석: CCA 및 네트워크분석 접근
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      박진서, 박정민, 송민호, 김정화, 이소현
                    </p>
                    <p className="text-xs text-primary font-semibold mb-2">
                      지식경영연구, 한국지식경영학회, 2025
                    </p>
                  </div>

                  <div className="pl-4 border-l-2 border-primary/30">
                    <p className="text-sm text-foreground font-semibold mb-2">
                      날씨 데이터를 활용한 인공지능 알고리즘 기반 뉴욕시 시간별 교통사고 발생건수 예측 모델
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      허예찬, 박진서, 조은영, 정영균, 조석헌
                    </p>
                    <p className="text-xs text-primary font-semibold mb-2">
                      한국통신학회, 2024
                    </p>
                  </div>

                  <div className="pl-4 border-l-2 border-primary/30">
                    <p className="text-sm text-foreground font-semibold mb-2">
                      메타버스와 AI 추천서비스를 활용한 국내 대표 키오스크 사용서비스 안내 개발
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      최수현, 이민정, 박진서, 서연호, 문재현
                    </p>
                    <p className="text-xs text-primary font-semibold mb-2">
                      한국정보처리학회, 2023
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
                      2025 한국IT서비스학회 추계학술대회, 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Others */}
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-6">
                <h4 className="text-sm text-primary font-semibold tracking-wider">OTHERS</h4>
                <div className="h-px bg-primary/30 flex-1"></div>
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
                    최신 AI 연구 동향을 분석해 주간 카드뉴스 제작, 밈(Meme)을 활용한 릴스 콘텐츠 제작으로 
                    연구실 계정 도달률 강화. 친근한 AI 용어를 인포그래픽으로 재구성해 지식 전달 효율성 제고.
                  </p>

                  <div className="flex gap-6 mt-4">
                    <div>
                      <p className="text-xl text-primary font-bold">26.8만</p>
                      <p className="text-xs text-muted-foreground tracking-wider">TOTAL VIEWS</p>
                    </div>
                    <div>
                      <p className="text-xl text-primary font-bold">54</p>
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
                    React + TypeScript 기반 반응형 웹사이트 구축. Figma를 활용한 UI/UX 디자인부터 프론트엔드 개발, 
                    Vercel 배포까지 전 과정 담당. 연구실 소개, 프로젝트, 팀원, 논문 정보를 직관적으로 전달하는 
                    사용자 중심 인터페이스 설계.
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
                      <p className="text-xs text-primary font-semibold">
                        2023.04 - 2023.07
                      </p>
                    </div>
                    <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs">
                      봉사활동
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    초등학교 코딩 교육 봉사활동. 학생들에게 기초 프로그래밍 개념을 쉽고 재미있게 가르치며 SW 교육의 중요성을 전파.
                  </p>
                </Card>
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
                  최신 AI 연구 동향을 분석해 주간 카드뉴스 제작, 밈(Meme)을 활용한 릴스 콘텐츠 제작으로 
                  연구실 계정 도달률 강화. 친근한 AI 용어를 인포그래픽으로 재구성해 지식 전달 효율성 제고.
                </p>

                <div className="flex gap-6 mt-4">
                  <div>
                    <p className="text-xl text-primary font-bold">26.8만</p>
                    <p className="text-xs text-muted-foreground tracking-wider">TOTAL VIEWS</p>
                  </div>
                  <div>
                    <p className="text-xl text-primary font-bold">54</p>
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
                  React + TypeScript 기반 반응형 웹사이트 구축. Figma를 활용한 UI/UX 디자인부터 프론트엔드 개발, 
                  Vercel 배포까지 전 과정 담당. 연구실 소개, 프로젝트, 팀원, 논문 정보를 직관적으로 전달하는 
                  사용자 중심 인터페이스 설계.
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
                    <p className="text-xs text-primary font-semibold">
                      2023.04 - 2023.07
                    </p>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs">
                    봉사활동
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  초등학교 코딩 교육 봉사활동. 학생들에게 기초 프로그래밍 개념을 쉽고 재미있게 가르치며 SW 교육의 중요성을 전파.
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
                  {['Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'BERTopic', 'LangChain', 'OpenAI API'].map((skill, index) => (
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

              <Card className="p-6 bg-card mt-8">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-xs">
                      이름
                    </label>
                    <Input
                      id="name"
                      placeholder="홍길동"
                      className="bg-input-background text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-xs">
                      이메일
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      className="bg-input-background text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-xs">
                      메시지
                    </label>
                    <Textarea
                      id="message"
                      placeholder="메시지 내용을 입력하세요"
                      rows={4}
                      className="bg-input-background resize-none text-sm"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-accent text-primary-foreground text-sm">
                    <Send size={16} className="mr-2" />
                    메시지 전송
                  </Button>
                </form>
              </Card>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
