import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현에서는 이메일 전송 로직이 필요합니다
    alert('메시지가 전송되었습니다! (데모 버전)');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl text-foreground mb-4">연락처</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            프로젝트 협업이나 채용 관련 문의는 언제든지 환영합니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <h3 className="text-2xl text-primary mb-6">연락 정보</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">이메일</p>
                    <a href="mailto:your.email@example.com" className="text-foreground hover:text-primary">
                      your.email@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">전화번호</p>
                    <a href="tel:+821012345678" className="text-foreground hover:text-primary">
                      010-1234-5678
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">위치</p>
                    <p className="text-foreground">서울, 대한민국</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card">
              <h3 className="text-xl text-foreground mb-4">소셜 미디어</h3>
              <div className="space-y-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-lg">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-lg">LinkedIn</span>
                </a>
                <a
                  href="https://blog.example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-lg">기술 블로그</span>
                </a>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-card">
            <h3 className="text-2xl text-foreground mb-6">메시지 보내기</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">
                  이름
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="홍길동"
                  required
                  className="bg-input-background"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  이메일
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                  className="bg-input-background"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 text-sm">
                  제목
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="문의 제목"
                  required
                  className="bg-input-background"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm">
                  메시지
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="메시지 내용을 입력하세요"
                  rows={6}
                  required
                  className="bg-input-background resize-none"
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-accent text-primary-foreground">
                <Send size={18} className="mr-2" />
                메시지 전송
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
