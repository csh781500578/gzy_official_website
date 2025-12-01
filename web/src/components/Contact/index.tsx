import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Icon } from '@iconify/react';

const Contact: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const contactInfo = [
    {
      icon: 'mdi:map-marker',
      title: '工厂地址',
      content: '广东省佛山市顺德区工业园区',
      gradient: 'from-cyan-500 to-blue-500',
      color: '#06b6d4'
    },
    {
      icon: 'mdi:phone',
      title: '联系电话',
      content: ['0757-12345678', '138-0000-0000'],
      gradient: 'from-blue-500 to-purple-500',
      color: '#3b82f6'
    },
    {
      icon: 'mdi:email',
      title: '电子邮箱',
      content: 'contact@guangzhiyou.com',
      gradient: 'from-purple-500 to-pink-500',
      color: '#8b5cf6'
    },
    {
      icon: 'mdi:clock',
      title: '工作时间',
      content: '周一至周六 8:00-18:00',
      gradient: 'from-pink-500 to-cyan-500',
      color: '#ec4899'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 涟漪效果
  const createRipple = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples(prev => [...prev, { id, x, y }]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 1000);
  };

  // 爆炸粒子效果
  const createExplosion = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: centerX + (Math.random() - 0.5) * 200,
      y: centerY + (Math.random() - 0.5) * 200
    }));
    
    setParticles(newParticles);
    
    setTimeout(() => {
      setParticles([]);
    }, 1000);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 成功爆炸效果
      const successElement = document.querySelector('.success-explosion');
      if (successElement) {
        successElement.classList.add('animate-explosion');
      }
      
      message.success('感谢您的咨询！我们会尽快与您联系。');
      form.resetFields();
    } catch (error) {
      message.error('提交失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-slate-950 relative overflow-hidden">
      {/* 动态背景网格 */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            radial-gradient(circle, rgba(6, 182, 212, 0.2) 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 100px 100px',
          animation: 'grid-dance 12s ease-in-out infinite'
        }}
      />
      
      {/* 流动光束 */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: '2px',
            height: '100px',
            background: 'linear-gradient(to bottom, transparent, #06b6d4, transparent)',
            left: `${10 + i * 12}%`,
            top: '-100px',
            animation: `light-beam ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            boxShadow: '0 0 10px #06b6d4'
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        {/* 标题 */}
        <div 
          className="text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1.2s ease-out'
          }}
        >
          <h2 
            className="text-5xl md:text-6xl font-bold mb-6 relative inline-block"
            style={{
              background: 'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '400% 100%',
              animation: 'rainbow-flow 4s ease-in-out infinite'
            }}
          >
            联系我们
            <div 
              className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-xl -z-10"
              style={{ animation: 'title-aura 3s ease-in-out infinite' }}
            />
          </h2>
          <p className="text-cyan-400/80 text-lg mt-6">
            欢迎咨询合作，我们将竭诚为您服务
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* 联系信息 - 磁力吸附效果 */}
          <div>
            <h3 
              className="text-2xl font-bold mb-8 text-cyan-400 flex items-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 1s ease-out 0.3s'
              }}
            >
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 mr-3"></div>
              联系方式
            </h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-xl backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer overflow-hidden"
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0) rotateY(0deg)' : 'translateX(-50px) rotateY(-10deg)',
                    transition: `all 1s ease-out ${0.5 + index * 0.1}s`
                  }}
                  onClick={createRipple}
                >
                  {/* 磁力场效果 */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${info.color}20, transparent 70%)`,
                      animation: 'magnetic-field 3s ease-in-out infinite'
                    }}
                  />
                  
                  {/* 涟漪效果 */}
                  {ripples.map((ripple) => (
                    <div
                      key={ripple.id}
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        left: ripple.x - 25,
                        top: ripple.y - 25,
                        width: '50px',
                        height: '50px',
                        background: `radial-gradient(circle, ${info.color}40, transparent)`,
                        animation: 'ripple-expand 1s ease-out forwards'
                      }}
                    />
                  ))}
                  
                  <div className="relative flex items-start">
                    <div 
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${info.gradient} flex items-center justify-center mr-4 flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300`}
                      style={{ 
                        boxShadow: `0 0 20px ${info.color}`,
                        animation: 'icon-levitate 4s ease-in-out infinite'
                      }}
                    >
                      <Icon icon={info.icon} className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-2 text-base">{info.title}</h4>
                      {Array.isArray(info.content) ? (
                        info.content.map((item, itemIndex) => (
                          <p key={itemIndex} className="text-cyan-300/90 text-sm">{item}</p>
                        ))
                      ) : (
                        <p className="text-cyan-300/90 text-sm">{info.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 地图区域 - 扫描动画 */}
            <div 
              ref={mapRef}
              className="relative rounded-xl overflow-hidden backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s ease-out 1s'
              }}
            >
              <div className="h-64 flex items-center justify-center relative overflow-hidden">
                {/* 扫描线 */}
                <div 
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(6, 182, 212, 0.1) 3px, rgba(6, 182, 212, 0.1) 6px)',
                    animation: 'scan-lines 2s linear infinite'
                  }}
                />
                
                {/* 雷达扫描 */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(6, 182, 212, 0.3) 30deg, transparent 60deg)',
                    animation: 'radar-sweep 4s linear infinite',
                    transformOrigin: 'center'
                  }}
                />
                
                <div className="relative z-10 text-center">
                  <Icon icon="mdi:map" className="w-16 h-16 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-cyan-300/80 text-lg">地图位置</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 表单区域 */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
              transition: 'all 1s ease-out 0.6s'
            }}
          >
            <h3 className="text-2xl font-bold mb-8 text-cyan-400 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 mr-3"></div>
              在线咨询
            </h3>
            
            <div 
              className="relative p-8 rounded-xl backdrop-blur-md border border-cyan-500/20 overflow-hidden"
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                boxShadow: '0 0 40px rgba(6, 182, 212, 0.15)'
              }}
            >
              {/* 成功爆炸效果容器 */}
              <div className="success-explosion absolute inset-0 pointer-events-none opacity-0" />
              
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="space-y-6"
              >
                <Form.Item
                  name="name"
                  label={<span className="text-cyan-300 text-base">您的姓名</span>}
                  rules={[{ required: true, message: '请输入您的姓名' }]}
                >
                  <Input 
                    size="large"
                    placeholder="请输入您的姓名"
                    className="form-input"
                    style={{ backdropFilter: 'blur(10px)' }}
                    onFocus={(e) => {
                      e.target.parentElement?.classList.add('input-focused');
                    }}
                    onBlur={(e) => {
                      e.target.parentElement?.classList.remove('input-focused');
                    }}
                  />
                </Form.Item>
                
                <Form.Item
                  name="phone"
                  label={<span className="text-cyan-300 text-base">联系电话</span>}
                  rules={[{ required: true, message: '请输入您的联系电话' }]}
                >
                  <Input 
                    size="large"
                    placeholder="请输入您的联系电话"
                    className="form-input"
                    style={{ backdropFilter: 'blur(10px)' }}
                    onFocus={(e) => {
                      e.target.parentElement?.classList.add('input-focused');
                    }}
                    onBlur={(e) => {
                      e.target.parentElement?.classList.remove('input-focused');
                    }}
                  />
                </Form.Item>
                
                <Form.Item
                  name="email"
                  label={<span className="text-cyan-300 text-base">电子邮箱</span>}
                  rules={[{ type: 'email', message: '请输入正确的邮箱格式' }]}
                >
                  <Input 
                    size="large"
                    placeholder="请输入您的邮箱（选填）"
                    className="form-input"
                    style={{ backdropFilter: 'blur(10px)' }}
                    onFocus={(e) => {
                      e.target.parentElement?.classList.add('input-focused');
                    }}
                    onBlur={(e) => {
                      e.target.parentElement?.classList.remove('input-focused');
                    }}
                  />
                </Form.Item>
                
                <Form.Item
                  name="message"
                  label={<span className="text-cyan-300 text-base">咨询内容</span>}
                  rules={[{ required: true, message: '请描述您的需求或问题' }]}
                >
                  <Input.TextArea 
                    rows={5}
                    placeholder="请描述您的需求或问题"
                    className="form-input resize-none"
                    style={{ backdropFilter: 'blur(10px)' }}
                    onFocus={(e) => {
                      e.target.parentElement?.classList.add('input-focused');
                    }}
                    onBlur={(e) => {
                      e.target.parentElement?.classList.remove('input-focused');
                    }}
                  />
                </Form.Item>
                
                <Form.Item>
                  <Button 
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={loading}
                    className="submit-button relative overflow-hidden"
                    style={{ 
                      width: '100%',
                      height: '56px',
                      background: 'linear-gradient(45deg, #06b6d4, #3b82f6)',
                      border: 'none',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}
                    onClick={createExplosion}
                  >
                    <span className="relative z-10">
                      {loading ? '提交中...' : '提交咨询'}
                    </span>
                    
                    {/* 按钮发光效果 */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    />
                    
                    {/* 粒子爆炸 */}
                    {particles.map((particle) => (
                      <div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
                        style={{
                          left: particle.x,
                          top: particle.y,
                          animation: 'particle-explode 1s ease-out forwards'
                        }}
                      />
                    ))}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes grid-dance {
          0%, 100% { background-position: 0 0, 0 0, 0 0; }
          25% { background-position: 25px 25px, 25px 25px, 50px 50px; }
          50% { background-position: 50px 0, 50px 0, 100px 0; }
          75% { background-position: 25px -25px, 25px -25px, 50px -50px; }
        }
        @keyframes light-beam {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes rainbow-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes title-aura {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes magnetic-field {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes ripple-expand {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes icon-levitate {
          0%, 100% { transform: translateY(0) rotateZ(0deg); }
          50% { transform: translateY(-5px) rotateZ(5deg); }
        }
        @keyframes scan-lines {
          0% { background-position: 0 0; }
          100% { background-position: 6px 0; }
        }
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes particle-explode {
          0% { transform: scale(1) translate(0, 0); opacity: 1; }
          100% { 
            transform: scale(0) translate(var(--random-x, 50px), var(--random-y, 50px)); 
            opacity: 0; 
          }
        }
        @keyframes explosion {
          0% { transform: scale(1); opacity: 0; }
          50% { transform: scale(1.5); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        .form-input {
          background: rgba(15, 23, 42, 0.5) !important;
          border: 1px solid rgba(6, 182, 212, 0.3) !important;
          color: white !important;
          transition: all 0.3s ease !important;
        }
        
        .form-input:focus {
          border-color: #06b6d4 !important;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.3) !important;
        }
        
        .form-input::placeholder {
          color: rgba(156, 163, 175, 0.6) !important;
        }
        
        .input-focused {
          position: relative;
        }
        
        .input-focused::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          padding: 1px;
          background: linear-gradient(45deg, #06b6d4, #3b82f6);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          animation: border-glow 2s ease-in-out infinite;
        }
        
        @keyframes border-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .submit-button {
          position: relative;
          overflow: hidden;
        }
        
        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4);
        }
        
        .animate-explosion {
          background: radial-gradient(circle, rgba(6, 182, 212, 0.8), transparent);
          animation: explosion 1s ease-out forwards;
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};

export default Contact;
