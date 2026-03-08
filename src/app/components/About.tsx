import { Card } from './ui/card';
import { GraduationCap, Award, Target } from 'lucide-react';

export function About() {
  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl text-foreground mb-4">소개</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            데이터 기반 의사결정을 위해 끊임없이 학습하고 성장하는 분석가입니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 bg-card hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <h3 className="text-2xl text-primary">저에 대해</h3>
              <p className="text-muted-foreground leading-relaxed">
                복잡한 데이터에서 의미 있는 패턴을 찾아내고, 이를 비즈니스 의사결정에 활용하는 것을 좋아합니다.
                Python, SQL, R을 활용한 데이터 분석과 시각화에 능숙하며, 머신러닝 모델 구축 경험이 있습니다.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                데이터 엔지니어링, 데이터 사이언티스트, 비즈니스 애널리스트 등 
                데이터와 관련된 다양한 직무에 관심을 가지고 있습니다.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="mb-2">학력</h4>
                  <p className="text-muted-foreground">
                    데이터 사이언스 전공<br />
                    통계학 부전공
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Award className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="mb-2">자격증</h4>
                  <p className="text-muted-foreground">
                    SQL 전문가 (SQLD)<br />
                    데이터분석 전문가 (ADP) 준비중
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Target className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="mb-2">관심 분야</h4>
                  <p className="text-muted-foreground">
                    데이터 분석 · 머신러닝<br />
                    비즈니스 인텔리전스 · 데이터 시각화
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-card">
          <h3 className="text-2xl text-primary mb-6">주요 역량</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '데이터 분석', desc: 'Python, R, SQL을 활용한 데이터 처리 및 분석' },
              { title: '시각화', desc: 'Tableau, Power BI, Matplotlib을 통한 인사이트 전달' },
              { title: '머신러닝', desc: 'Scikit-learn, TensorFlow 기반 예측 모델 구축' },
              { title: '통계 분석', desc: 'A/B 테스트, 회귀분석 등 통계적 방법론 적용' },
              { title: '데이터베이스', desc: 'SQL, NoSQL 데이터베이스 설계 및 쿼리 최적화' },
              { title: '커뮤니케이션', desc: '비즈니스 관점에서 데이터 인사이트 전달' },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
