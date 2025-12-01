import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { Icon } from '@iconify/react';

const Banner: React.FC = React.memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  const backgroundSlides = [
    {
      gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: '精工细作，品质卓越',
      subtitle: '每一件产品都体现着我们对品质的执着追求'
    },
    {
      gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 75%, #94a3b8 100%)',
      image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: '先进设备，高效生产',
      subtitle: '现代化生产线确保产品质量与交期'
    },
    {
      gradient: 'linear-gradient(135deg, #334155 0%, #475569 25%, #64748b 50%, #94a3b8 75%, #cbd5e1 100%)',
      image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: '专业工艺，精密制造',
      subtitle: '多年行业经验，专注金属茶几半成品加工'
    },
    {
      gradient: 'linear-gradient(135deg, #475569 0%, #64748b 25%, #94a3b8 50%, #cbd5e1 75%, #e2e8f0 100%)',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: '智能制造，工业4.0',
      subtitle: '融合人工智能与传统工艺的智慧工厂'
    }
  ];

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // 检测移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Canvas就绪状态
  useEffect(() => {
    // 延迟启动Canvas动画
    if (isMobile) {
      setIsCanvasReady(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsCanvasReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // 粒子系统
  useEffect(() => {
    if (!isCanvasReady || isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true }); // 性能优化
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
    }> = [];

    // 桌面端粒子数量
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: ['#06b6d4', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 3)],
        life: Math.random()
      });
    }

    let animationFrame: number;
    let lastTime = 0;
    const fps = 40; // 桌面端40fps
    const interval = 1000 / fps;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - lastTime;

      if (elapsed < interval) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      lastTime = now - (elapsed % interval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // 更新位置
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += 0.01;

        // 边界检测
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // 绘制粒子
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = Math.sin(particle.life) * 0.5 + 0.5;
        ctx.fill();

        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) { // 减小连接距离
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - distance / 80)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      ctx.globalAlpha = 1;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isCanvasReady, isMobile]);

  // 鼠标跟踪
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (!isCanvasReady || isMobile) return;

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isCanvasReady, isMobile, handleMouseMove]);

  // 轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // 使用useMemo缓存样式计算
  const cursorLightStyle = useMemo(() => ({
    left: `${mousePosition.x}px`,
    top: `${mousePosition.y}px`,
    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
    transform: 'translate(-50%, -50%)',
    zIndex: 4
  }), [mousePosition.x, mousePosition.y]);

  const currentSlideData = useMemo(() => 
    backgroundSlides[currentSlide], 
    [currentSlide]
  );

  // 移动端简化版本 - 放在所有hooks之后
  if (isMobile) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 简单渐变背景 */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: currentSlideData.gradient,
            zIndex: 0
          }}
        >
          {currentSlideData.image && (
            <div className="absolute inset-0">
              <img
                src={currentSlideData.image}
                alt={currentSlideData.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/70 to-slate-900/85"></div>
            </div>
          )}
        </div>

        {/* 主要内容 */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            广之优
          </h1>
          <p className="text-lg sm:text-xl mb-3 text-cyan-300 font-medium">{currentSlideData.title}</p>
          <p className="text-sm sm:text-base mb-8 text-cyan-300/80 max-w-3xl mx-auto leading-relaxed px-4">{currentSlideData.subtitle}</p>
          
          <div className="flex flex-col gap-4">
            <Button
              size="large"
              className="!bg-gradient-to-r !from-cyan-500 !to-blue-500 !border-0 !text-white !font-semibold !h-12 !px-8 !text-base w-full"
              onClick={() => scrollToSection('products')}
            >
              <span className="flex items-center justify-center">
                <Icon icon="mdi:arrow-right" className="w-5 h-5 mr-2" />
                查看产品
              </span>
            </Button>
            
            <Button
              size="large"
              className="!bg-slate-700/50 !border-2 !border-cyan-500 !text-cyan-400 !font-semibold !h-12 !px-8 !text-base w-full"
              onClick={() => scrollToSection('contact')}
            >
              <span className="flex items-center justify-center">
                <Icon icon="mdi:phone" className="w-5 h-5 mr-2" />
                联系我们
              </span>
            </Button>
          </div>
        </div>

        {/* 轮播指示器 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {backgroundSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-cyan-400 w-8' : 'bg-cyan-400/30'
              }`}
              aria-label={`切换到第${index + 1}张`}
            />
          ))}
        </div>
      </section>
    );
  }

  return ( // 桌面端完整版
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas粒子背景 */}
      {isCanvasReady && <canvas ref={canvasRef} className="absolute inset-0 z-0" />}

      {/* 主背景渐变 */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: currentSlideData.gradient,
          zIndex: 0
        }}
      >
        {/* 真实图片背景 */}
        {currentSlideData.image && (
          <div className="absolute inset-0">
            <img
              src={currentSlideData.image}
              alt={currentSlideData.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* 深色遮罩层确保文字清晰 */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 41, 59, 0.78) 50%, rgba(51, 65, 85, 0.88) 100%)'
              }}
            />
            {/* 额外的渐变遮罩增强科技感 */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(6, 182, 212, 0.1) 100%)'
              }}
            />
          </div>
        )}
      </div>

      {/* 3D旋转几何图形 */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 10}%`,
              width: '100px',
              height: '100px',
              animation: `rotate3d ${5 + i * 2}s linear infinite`,
              opacity: 0.1
            }}
          >
            <div
              className="w-full h-full border-2 border-cyan-400"
              style={{
                transform: 'rotateX(45deg) rotateY(45deg)',
                transformStyle: 'preserve-3d'
              }}
            />
          </div>
        ))}
      </div>

      {/* 流星效果 */}
      {isCanvasReady && [...Array(2)].map((_, i) => ( // 减少到2个流星
        <div
          key={i}
          className="absolute w-1 h-32 bg-gradient-to-b from-cyan-400 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-100px',
            animation: `meteor ${3 + Math.random() * 2}s linear infinite`,
            animationDelay: `${i * 0.8}s`,
            transform: 'rotate(45deg)',
            zIndex: 3
          }}
        />
      ))}

      {/* 鼠标跟随光标 */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={cursorLightStyle}
      />

      {/* 数字雨效果 */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ zIndex: 5 }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-cyan-400 font-mono text-xs"
            style={{
              left: `${i * 5}%`,
              animation: `digitalRain ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            {Array.from({ length: 20 }, () => Math.floor(Math.random() * 2)).join('')}
          </div>
        ))}
      </div>

      {/* 波纹扩散 */}
      <div className="absolute inset-0" style={{ zIndex: 6 }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-500"
            style={{
              width: '200px',
              height: '200px',
              animation: `ripple ${3 + i}s ease-out infinite`,
              animationDelay: `${i * 1}s`
            }}
          />
        ))}
      </div>

      {/* 主内容 */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="relative">
          {/* 标题 - 故障效果 */}
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 relative glitch-text"
            data-text="广之优"
            style={{
              background: 'linear-gradient(to right, #06b6d4, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'glitch 3s infinite'
            }}
          >
            广之优
          </h1>

          {/* 副标题 - 打字机效果 */}
          <p
            className="text-2xl md:text-3xl lg:text-4xl mb-4 font-medium"
            style={{
              background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {currentSlideData.title}
          </p>

          {/* 描述 - 逐字闪烁 */}
          <p className="text-lg md:text-xl mb-12 text-cyan-300 max-w-3xl mx-auto leading-relaxed">
            {currentSlideData.subtitle}
          </p>

          {/* 按钮 */}
          <div className="flex gap-6 justify-center">
            <Button
              size="large"
              className="!bg-gradient-to-r !from-cyan-500 !to-blue-500 !border-0 !text-white !font-semibold !h-14 !px-10 !text-base relative overflow-hidden group"
              onClick={() => scrollToSection('products')}
              style={{
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)'
              }}
            >
              <span className="relative z-10 flex items-center">
                <Icon icon="mdi:arrow-right" className="w-5 h-5 mr-2" />
                查看产品
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>

            <Button
              size="large"
              className="!bg-transparent !border-2 !border-cyan-500 !text-cyan-400 !font-semibold !h-14 !px-10 !text-base relative overflow-hidden group"
              onClick={() => scrollToSection('contact')}
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
              }}
            >
              <span className="relative z-10 flex items-center">
                <Icon icon="mdi:phone" className="w-5 h-5 mr-2" />
                联系我们
              </span>
              <div className="absolute inset-0 bg-cyan-500/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>

      {/* 滚动提示 - 呼吸效果 */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('about')}
        style={{
          animation: 'float 3s ease-in-out infinite',
          zIndex: 10
        }}
      >
        <div className="relative">
          <Icon icon="mdi:chevron-down" className="w-8 h-8 text-cyan-400" />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              animation: 'pulse-ring 2s ease-out infinite',
              border: '2px solid rgba(6, 182, 212, 0.5)'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes rotate3d {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        @keyframes meteor {
          0% { transform: translateY(0) translateX(0) rotate(45deg); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(100vh) translateX(50vw) rotate(45deg); opacity: 0; }
        }

        @keyframes digitalRain {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        @keyframes ripple {
          0% { width: 50px; height: 50px; opacity: 1; }
          100% { width: 500px; height: 500px; opacity: 0; }
        }

        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); }
          91% { transform: translate(-2px, 2px); }
          92% { transform: translate(2px, -2px); }
          93% { transform: translate(-2px, 2px); }
          94% { transform: translate(2px, -2px); }
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: inherit;
          -webkit-background-clip: text;
          opacity: 0.8;
        }

        .glitch-text::before {
          animation: glitch-1 2.5s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-2px, -2px);
        }

        .glitch-text::after {
          animation: glitch-2 2.5s infinite;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          transform: translate(2px, 2px);
        }

        @keyframes glitch-1 {
          0%, 90%, 100% { transform: translate(0); }
          91% { transform: translate(-3px, 0); }
        }

        @keyframes glitch-2 {
          0%, 90%, 100% { transform: translate(0); }
          91% { transform: translate(3px, 0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-15px) translateX(-50%); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
});

Banner.displayName = 'Banner';
export default Banner;
