import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from './ui/badge';

export function Projects() {
  const projects = [
    {
      title: '고객 이탈 예측 모델',
      description: '머신러닝을 활용하여 고객 이탈 가능성을 예측하고, 이탈 방지 전략을 수립했습니다. Random Forest와 XGBoost 모델을 비교 분석하여 85% 이상의 정확도를 달성했습니다.',
      tags: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
      image: 'data analytics machine learning',
    },
    {
      title: '매출 데이터 대시보드',
      description: 'Tableau를 활용하여 실시간 매출 데이터를 시각화하는 대시보드를 구축했습니다. 경영진의 의사결정에 필요한 핵심 지표를 한눈에 파악할 수 있도록 설계했습니다.',
      tags: ['Tableau', 'SQL', 'ETL', 'Business Intelligence'],
      image: 'business dashboard analytics',
    },
    {
      title: '소셜 미디어 감성 분석',
      description: '자연어 처리 기법을 활용하여 소셜 미디어 데이터의 감성을 분석했습니다. 브랜드 평판을 모니터링하고 고객 피드백을 정량화하여 마케팅 전략 수립에 기여했습니다.',
      tags: ['Python', 'NLP', 'BERT', 'Twitter API'],
      image: 'social media sentiment analysis',
    },
    {
      title: 'A/B 테스트 분석 프레임워크',
      description: '웹사이트 개선을 위한 A/B 테스트 프레임워크를 구축하고, 통계적 유의성을 검증하여 전환율 개선에 기여했습니다. 베이지안 분석을 통해 더 빠른 의사결정이 가능하도록 했습니다.',
      tags: ['R', 'Statistics', 'Hypothesis Testing', 'Bayesian Analysis'],
      image: 'ab testing statistics',
    },
    {
      title: '추천 시스템 개발',
      description: '협업 필터링과 콘텐츠 기반 필터링을 결합한 하이브리드 추천 시스템을 개발했습니다. 사용자 만족도를 향상시키고 클릭률을 20% 증가시켰습니다.',
      tags: ['Python', 'Collaborative Filtering', 'Matrix Factorization', 'Deep Learning'],
      image: 'recommendation system algorithm',
    },
    {
      title: '시계열 예측 분석',
      description: 'ARIMA, Prophet 등 다양한 시계열 모델을 활용하여 수요 예측 시스템을 구축했습니다. 재고 최적화 및 비용 절감에 기여했습니다.',
      tags: ['Python', 'Time Series', 'Prophet', 'ARIMA'],
      image: 'time series forecasting chart',
    },
  ];

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl text-foreground mb-4">프로젝트</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            데이터 분석 및 머신러닝 프로젝트 포트폴리오
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden bg-card hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-6xl opacity-20">📊</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl text-foreground mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 flex-1 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="bg-secondary text-secondary-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1 border-primary text-primary hover:bg-secondary">
                    <Github size={16} className="mr-2" />
                    코드
                  </Button>
                  <Button size="sm" className="flex-1 bg-primary hover:bg-accent text-primary-foreground">
                    <ExternalLink size={16} className="mr-2" />
                    상세보기
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
