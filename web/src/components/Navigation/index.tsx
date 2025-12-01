import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const menuItems = [
    { label: '首页', href: '#home', icon: 'mdi:home' },
    { label: '企业介绍', href: '#about', icon: 'mdi:information' },
    { label: '产品展示', href: '#products', icon: 'mdi:cube' },
    { label: '生产实力', href: '#strength', icon: 'mdi:factory' },
    { label: '联系我们', href: '#contact', icon: 'mdi:phone' }
  ];

  // 背景粒子动画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; opacity: number }> = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'products', 'strength', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const rippleId = Date.now();
    setRipples(prev => [...prev, { 
      id: rippleId, 
      x: event.clientX - rect.left, 
      y: event.clientY - rect.top 
    }]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== rippleId));
    }, 800);

    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
      style={{
        background: isScrolled 
          ? 'rgba(2, 6, 23, 0.95)' 
          : 'rgba(2, 6, 23, 0.7)',
        backdropFilter: isScrolled ? 'blur(30px)' : 'blur(20px)',
        borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
        boxShadow: isScrolled 
          ? '0 10px 40px rgba(6, 182, 212, 0.2)' 
          : '0 5px 20px rgba(6, 182, 212, 0.1)'
      }}
    >
      {/* 粒子背景画布 */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ width: '100%', height: '100%' }}
      />

      {/* 顶部多层光束 */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div 
          className="h-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), transparent)',
            animation: 'shimmer 3s linear infinite'
          }}
        />
        <div 
          className="h-full absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), transparent)',
            animation: 'shimmer 4s linear infinite reverse'
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* 3D Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group perspective-1000" 
            onClick={() => scrollToSection('#home', { currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0 }) } } as any)}
          >
            <div className="relative preserve-3d">
              {/* 主Logo */}
              <div 
                className="relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)',
                  transform: 'rotateY(0deg)',
                  animation: 'float 3s ease-in-out infinite'
                }}
              >
                <span className="text-2xl font-bold text-white relative z-10">广</span>
                
                {/* 多层旋转光环 */}
                <div 
                  className="absolute -inset-3 rounded-xl opacity-60"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, rgba(6, 182, 212, 0.6), transparent)',
                    animation: 'rotate 2s linear infinite'
                  }}
                />
                <div 
                  className="absolute -inset-4 rounded-xl opacity-40"
                  style={{
                    background: 'conic-gradient(from 90deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
                    animation: 'rotate 3s linear infinite reverse'
                  }}
                />
                <div 
                  className="absolute -inset-5 rounded-xl opacity-30"
                  style={{
                    background: 'conic-gradient(from 180deg, transparent, rgba(139, 92, 246, 0.4), transparent)',
                    animation: 'rotate 4s linear infinite'
                  }}
                />
              </div>
            </div>
            
            <div className="transform transition-all duration-300 group-hover:translate-x-1">
              <h1 
                className="text-xl font-bold"
                style={{
                  background: 'linear-gradient(120deg, #06b6d4, #3b82f6, #06b6d4)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradient-shift 3s ease infinite'
                }}
              >
                广之优
              </h1>
              <p className="text-xs text-cyan-400/70 tracking-widest">
                GUANGZHIYOU
              </p>
            </div>
          </div>
          
          {/* 桌面端导航菜单 */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={index}
                  onClick={(e) => scrollToSection(item.href, e)}
                  className="relative px-6 py-2.5 rounded-lg font-medium transition-all duration-300 group overflow-hidden"
                  style={{
                    color: isActive ? '#06b6d4' : '#94a3b8',
                    background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent'
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    <Icon icon={item.icon} className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    {item.label}
                  </span>
                  
                  {/* 能量波纹效果 */}
                  {ripples
                    .filter(r => r.id)
                    .map(ripple => (
                      <span
                        key={ripple.id}
                        className="absolute rounded-full bg-cyan-400/30"
                        style={{
                          left: ripple.x,
                          top: ripple.y,
                          width: 0,
                          height: 0,
                          animation: 'ripple 0.8s ease-out forwards'
                        }}
                      />
                    ))}
                  
                  {/* 悬停光晕 */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15), transparent)',
                      boxShadow: '0 0 25px rgba(6, 182, 212, 0.4)'
                    }}
                  />
                  
                  {/* 活动光束连接 */}
                  {isActive && (
                    <>
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 1), transparent)',
                          animation: 'glow 2s ease-in-out infinite'
                        }}
                      />
                      <div 
                        className="absolute -bottom-2 left-1/2 w-2 h-2 rounded-full bg-cyan-400"
                        style={{
                          transform: 'translateX(-50%)',
                          boxShadow: '0 0 15px rgba(6, 182, 212, 0.8)',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }}
                      />
                    </>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: isMobileMenuOpen 
                ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))'
                : 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              boxShadow: isMobileMenuOpen ? '0 0 25px rgba(6, 182, 212, 0.5)' : 'none'
            }}
          >
            <Icon 
              icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"} 
              className="w-6 h-6 text-cyan-400 transition-transform duration-300"
              style={{ transform: isMobileMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }}
            />
          </button>
        </div>
        
        {/* 移动端菜单 - 炫酷展开 */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-700 ${
            isMobileMenuOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div 
            className="pb-4 space-y-2 pt-4 rounded-xl relative overflow-hidden"
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              boxShadow: '0 10px 40px rgba(6, 182, 212, 0.2)'
            }}
          >
            {/* 菜单背景光效 */}
            <div 
              className="absolute top-0 left-0 right-0 h-full opacity-20"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.3), transparent 70%)',
                animation: 'pulse 3s ease-in-out infinite'
              }}
            />
            
            {menuItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={index}
                  onClick={(e) => scrollToSection(item.href, e)}
                  className="relative block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 group overflow-hidden"
                  style={{
                    color: isActive ? '#06b6d4' : '#94a3b8',
                    background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                    animation: `slideInLeft 0.4s ease-out ${index * 0.1}s both`,
                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)'
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    <Icon icon={item.icon} className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-12" />
                    {item.label}
                  </span>
                  
                  {/* 左侧发光条 */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.8)' }}
                  />
                  
                  {/* 悬停背景波纹 */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.1), transparent)'
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-5px) rotateY(5deg); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 10px rgba(6, 182, 212, 0.5); }
          50% { opacity: 1; box-shadow: 0 0 20px rgba(6, 182, 212, 1); }
        }
        @keyframes ripple {
          to {
            width: 200px;
            height: 200px;
            margin: -100px 0 0 -100px;
            opacity: 0;
          }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
