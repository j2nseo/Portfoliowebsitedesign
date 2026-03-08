import { Link } from 'react-router';

export function Hero() {
  const navLinks = [
    { name: 'ABOUT', path: '/about' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'SKILLS', path: '/skills' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <section className="min-h-screen flex items-center px-8 sm:px-12 lg:px-16 py-12">
      <div className="w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left Side */}
        <div className="space-y-16">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl text-foreground">
              Jinseo Park
            </h1>
            <h2 className="text-2xl sm:text-3xl text-primary">
              Data Analyst
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              데이터를 통해 비즈니스 인사이트를 발견하고, 
              의미 있는 가치를 창출합니다.
            </p>
          </div>

          <nav className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-muted-foreground hover:text-primary transition-colors text-sm tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side */}
        <div className="space-y-6 text-muted-foreground leading-relaxed lg:pt-0">
          <p>
            데이터 분석을 전문으로 하며, Python, SQL, R을 활용한 데이터 처리 및 
            분석에 능숙합니다. 복잡한 데이터에서 패턴을 찾아내고 이를 비즈니스 
            의사결정에 활용하는 것을 좋아합니다.
          </p>
          
          <p>
            현재 <span className="text-foreground">머신러닝 모델 구축</span>과 
            <span className="text-foreground"> 데이터 시각화</span>를 통해 
            데이터 기반 인사이트를 제공하는 작업을 하고 있습니다. 
            Tableau, Power BI를 활용한 대시보드 구축 경험이 있으며, 
            통계적 방법론을 활용한 A/B 테스트 및 예측 모델링을 수행합니다.
          </p>
          
          <p>
            이전에는 다양한 데이터 분석 프로젝트를 진행했으며, 
            <span className="text-foreground"> 고객 이탈 예측</span>, 
            <span className="text-foreground"> 추천 시스템</span>, 
            <span className="text-foreground"> 시계열 분석</span> 등의 
            프로젝트를 성공적으로 완료했습니다. 데이터 엔지니어링과 
            비즈니스 인텔리전스 분야에도 관심이 많습니다.
          </p>
          
          <p>
            업무 외에는 최신 데이터 분석 기법과 머신러닝 알고리즘을 학습하며, 
            Kaggle 대회에 참여하거나 기술 블로그를 통해 지식을 공유하고 있습니다. 
            데이터로 세상을 더 나은 곳으로 만드는 데 기여하고 싶습니다.
          </p>
        </div>
      </div>
    </section>
  );
}