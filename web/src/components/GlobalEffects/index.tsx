import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const GlobalEffects: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorTrailRef = useRef<Array<{ x: number; y: number; opacity: number }>>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [enableEffects, setEnableEffects] = useState(false);
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  // 检测移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 检测网络速度
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        // 2g或slow-2g视为慢速网络
        setIsSlowNetwork(effectiveType === '2g' || effectiveType === 'slow-2g');
      }
    }
  }, []);

  // 延迟启用动效，优先加载内容
  useEffect(() => {
    // 移动端或慢速网络完全禁用动效
    if (isMobile || isSlowNetwork) {
      setEnableEffects(false);
      return;
    }

    const timer = setTimeout(() => {
      setEnableEffects(true);
    }, 2000); // 桌面端延迟2秒启用动效
    return () => clearTimeout(timer);
  }, [isMobile, isSlowNetwork]);

  // 鼠标跟随效果
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    // 添加光标轨迹点
    cursorTrailRef.current.push({ x: e.clientX, y: e.clientY, opacity: 1 });
    if (cursorTrailRef.current.length > 10) cursorTrailRef.current.shift();
  }, []);

  useEffect(() => {
    // 移动端不启用鼠标跟随
    if (isMobile || !enableEffects) return;

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, enableEffects, handleMouseMove]);

  // 滚动进度
  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 启动动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 减少启动动画时间
    return () => clearTimeout(timer);
  }, []);

  // 粒子系统动画
  useEffect(() => {
    // 未启用动效时不渲染
    if (!enableEffects) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // 仅桌面端创建粒子
    const particleCount = 30; // 桌面端减少到30个
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    let animationFrame: number;
    let lastTime = 0;
    const fps = 45; // 桌面端固定45fps
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

      // 更新和绘制粒子
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // 边界检测
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // 绘制粒子
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`;
        ctx.fill();

        // 绘制连接线
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxDistance = 120; // 桌面端连接距离
            if (distance < maxDistance) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (1 - distance / maxDistance)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      // 绘制鼠标轨迹
      cursorTrailRef.current.forEach((point, index) => {
        point.opacity -= 0.05;
        if (point.opacity > 0) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${point.opacity})`;
          ctx.fill();
        }
      });

      // 清理透明度为0的轨迹点
      cursorTrailRef.current = cursorTrailRef.current.filter(p => p.opacity > 0);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [enableEffects]);

  // 使用useMemo缓存样式计算
  const cursorStyle = useMemo(() => ({
    left: `${mousePosition.x}px`,
    top: `${mousePosition.y}px`,
    width: '40px',
    height: '40px',
    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.3s, height 0.3s',
    filter: 'blur(8px)'
  }), [mousePosition.x, mousePosition.y]);

  const progressBarStyle = useMemo(() => ({
    width: `${scrollProgress}%`
  }), [scrollProgress]);

  // 移动端完全不渲染复杂效果
  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300" style={progressBarStyle}></div>
      </div>
    );
  }

  return (
    <>
      {/* 启动加载动画 */}
      {isLoading && !isMobile && enableEffects && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)',
            animation: 'fadeOut 0.5s ease-out 2s forwards'
          }}
        >
          {/* Logo动画 */}
          <div className="relative">
            <div 
              className="w-32 h-32 rounded-2xl flex items-center justify-center mb-6"
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
                boxShadow: '0 0 60px rgba(6, 182, 212, 0.8)',
                animation: 'logoExpand 1s ease-out'
              }}
            >
              <span className="text-6xl font-bold text-white">广</span>
            </div>
            
            {/* 扫描线 */}
            <div 
              className="absolute -bottom-4 left-0 right-0 h-1"
              style={{
                background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
                animation: 'scanLine 1.5s ease-in-out infinite'
              }}
            />
            
            {/* 文字 */}
            <div 
              className="text-center mt-8"
              style={{ animation: 'textAppear 0.8s ease-out 0.5s both' }}
            >
              <h2 
                className="text-3xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(to right, #06b6d4, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                广之优
              </h2>
              <p className="text-cyan-400/70">加载中...</p>
            </div>
            
            {/* 旋转光环 */}
            <div 
              className="absolute inset-0 -m-8 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)',
                animation: 'rotate 2s linear infinite'
              }}
            />
          </div>
        </div>
      )}

      {/* 背景粒子画布 */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${!enableEffects ? 'opacity-0' : 'opacity-25'}`}
      />

      {/* 鼠标跟随发光圆 - 仅桌面端显示 */}
      {enableEffects && (
      <div
        className="fixed pointer-events-none z-50 rounded-full"
        style={cursorStyle}
      />
      )}

      {/* 滚动进度指示器 */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none">
        <div 
          className="h-full transition-all duration-300"
          style={progressBarStyle}
        >
          <div 
            className="absolute right-0 top-0 w-2 h-2 -mt-0.5 rounded-full"
            style={{
              background: '#06b6d4',
              boxShadow: '0 0 10px rgba(6, 182, 212, 1)',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      {/* 全局扫描线效果 */}
      <div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.03) 2px, rgba(6, 182, 212, 0.03) 4px)',
          animation: 'scanDown 10s linear infinite'
        }}
      />

      {/* 角落装饰 */}
      <div className="fixed top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyan-500/30 pointer-events-none z-50" />
      <div className="fixed top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-cyan-500/30 pointer-events-none z-50" />
      <div className="fixed bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-cyan-500/30 pointer-events-none z-50" />
      <div className="fixed bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyan-500/30 pointer-events-none z-50" />

      <style>{`
        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
        @keyframes logoExpand {
          0% {
            transform: scale(0.5) rotate(-180deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.1) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes scanLine {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
        @keyframes textAppear {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scanDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }
      `}</style>
    </>
  );
};

export default GlobalEffects;
