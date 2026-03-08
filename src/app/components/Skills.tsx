import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Code2, Database, BarChart3, Brain, GitBranch, Presentation } from 'lucide-react';

export function Skills() {
  const skillCategories = [
    {
      category: '프로그래밍',
      icon: Code2,
      skills: [
        { name: 'Python', level: 90 },
        { name: 'R', level: 80 },
        { name: 'SQL', level: 85 },
        { name: 'JavaScript', level: 65 },
      ],
    },
    {
      category: '데이터베이스',
      icon: Database,
      skills: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'MySQL', level: 80 },
        { name: 'MongoDB', level: 70 },
        { name: 'Redis', level: 60 },
      ],
    },
    {
      category: '데이터 시각화',
      icon: BarChart3,
      skills: [
        { name: 'Tableau', level: 85 },
        { name: 'Power BI', level: 75 },
        { name: 'Matplotlib/Seaborn', level: 90 },
        { name: 'Plotly', level: 80 },
      ],
    },
    {
      category: '머신러닝',
      icon: Brain,
      skills: [
        { name: 'Scikit-learn', level: 85 },
        { name: 'TensorFlow', level: 75 },
        { name: 'PyTorch', level: 70 },
        { name: 'XGBoost', level: 80 },
      ],
    },
    {
      category: '버전 관리 & 협업',
      icon: GitBranch,
      skills: [
        { name: 'Git/GitHub', level: 85 },
        { name: 'Docker', level: 70 },
        { name: 'Jupyter Notebook', level: 90 },
        { name: 'Notion', level: 85 },
      ],
    },
    {
      category: '커뮤니케이션',
      icon: Presentation,
      skills: [
        { name: '데이터 스토리텔링', level: 85 },
        { name: '프레젠테이션', level: 80 },
        { name: '기술 문서 작성', level: 85 },
        { name: '협업 & 팀워크', level: 90 },
      ],
    },
  ];

  const tools = [
    'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch',
    'Tableau', 'Power BI', 'Excel', 'Google Analytics',
    'Jupyter', 'VS Code', 'Git', 'Docker', 'AWS', 'GCP',
    'Apache Spark', 'Airflow', 'dbt', 'Snowflake'
  ];

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl text-foreground mb-4">스킬</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            데이터 분석 및 개발에 활용하는 기술 스택
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="p-6 bg-card hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl text-foreground">{category.category}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <h3 className="text-2xl text-primary mb-6 text-center">사용 가능한 도구 & 기술</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-card border border-border rounded-lg text-sm hover:border-primary hover:shadow-md transition-all"
              >
                {tool}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
