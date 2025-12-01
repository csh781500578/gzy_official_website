import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

const Footer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visibleChars, setVisibleChars] = useState(0);
  const copyrightText = '© 2024 广之优金属茶几生产加工工厂 版权所有';

  const socialLinks = [
    { icon: 'mdi:wechat', label: '微信', color: '#06b6d4' },
    { icon: 'mdi:phone', label: '电话', color: '#3b82f6' },
    { icon: 'mdi:email', label: '邮箱', color: '#8b5cf6' },
    { icon: 'mdi:web', label: '官网', color: '#ec4899' }
  ];

  // 流星雨效果
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    interface Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }

    const meteors: Meteor[] = [];
    
    const createMeteor = () => {
      meteors.push({
        x: Math.random() * canvas.width,
        y: -20,
        length: Math.random() * 60 + 40,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.5
      });
    };

    let animationId: number;
    let lastMeteorTime = 0;

    const animate = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 创建流星
      if (currentTime - lastMeteorTime > 2000) {
        createMeteor();
        lastMeteorTime = currentTime;
      }

      // 绘制流星
      meteors.forEach((meteor, index) => {
        meteor.y += meteor.speed;
        meteor.x += meteor.speed * 0.5;

        const gradient = ctx.createLinearGradient(
          meteor.x, meteor.y,
          meteor.x - meteor.length * 0.5, meteor.y - meteor.length
        );
        gradient.addColorStop(0, `rgba(6, 182, 212, ${meteor.opacity})`);
        gradient.addColorStop(1, 'transparent');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.length * 0.5, meteor.y - meteor.length);
        ctx.stroke();

        // 移除屏幕外的流星
        if (meteor.y > canvas.height + meteor.length) {
          meteors.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate(0);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // 版权文字逐字显现
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (visibleChars < copyrightText.length) {
      timeout = setTimeout(() => {
        setVisibleChars(prev => prev + 1);
      }, 50);
    }
    return () => clearTimeout(timeout);
  }, [visibleChars, copyrightText.length]);

  return (
    <footer className="relative bg-slate-950 py-20 border-t border-cyan-500/20 overflow-hidden">
      {/* 流星雨画布 */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* 多层电路板背景 */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
            linear-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          animation: 'circuit-move 30s linear infinite'
        }}
      />
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          animation: 'circuit-move 20s linear infinite reverse'
        }}
      />
      
      {/* 发光粒子群 */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `radial-gradient(circle, ${['#06b6d4', '#3b82f6', '#8b5cf6'][i % 3]}, transparent)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `particle-float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            boxShadow: `0 0 20px ${['#06b6d4', '#3b82f6', '#8b5cf6'][i % 3]}`
          }}
        />
      ))}
      
      {/* 页面底部光波扫描 */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), transparent)',
          animation: 'wave-scan 3s ease-in-out infinite'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* 顶部装饰线 */}
        <div className="flex items-center justify-center mb-16">
          <div className="h-px w-32 bg-gradient-to-r from-transparent to-cyan-500 relative">
            <div className="absolute right-0 top-1/2 w-2 h-2 rounded-full bg-cyan-400 -translate-y-1/2"
              style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 1)', animation: 'pulse 2s ease-in-out infinite' }}
            />
          </div>
          <div className="mx-6 relative">
            <div className="w-4 h-4 rounded-full bg-cyan-500" 
              style={{ boxShadow: '0 0 30px rgba(6, 182, 212, 1)', animation: 'pulse 1.5s ease-in-out infinite' }}
            />
            <div className="absolute inset-0 w-8 h-8 rounded-full border border-cyan-400/50 -m-2"
              style={{ animation: 'expand 2s ease-out infinite' }}
            />
          </div>
          <div className="h-px w-32 bg-gradient-to-l from-transparent to-cyan-500 relative">
            <div className="absolute left-0 top-1/2 w-2 h-2 rounded-full bg-cyan-400 -translate-y-1/2"
              style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 1)', animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.5s' }}
            />
          </div>
        </div>
        
        {/* Logo区域 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative preserve-3d group">
              {/* 3D Logo */}
              <div 
                className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)',
                  boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)',
                  animation: 'float-3d 4s ease-in-out infinite'
                }}
              >
                <span className="text-4xl font-bold text-white relative z-10">广</span>
                
                {/* 多层3D旋转光环 */}
                {[0, 120, 240].map((rotation, i) => (
                  <div
                    key={i}
                    className="absolute -inset-4 rounded-2xl"
                    style={{
                      background: `conic-gradient(from ${rotation}deg, transparent 0%, rgba(${i === 0 ? '6, 182, 212' : i === 1 ? '59, 130, 246' : '139, 92, 246'}, 0.6) 50%, transparent 100%)`,
                      animation: `rotate-3d ${2 + i}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
                      opacity: 0.6 - i * 0.1
                    }}
                  />
                ))}
                
                {/* 脉冲光环 */}
                <div 
                  className="absolute -inset-6 rounded-2xl border-2 border-cyan-400/30"
                  style={{ animation: 'pulse-ring 2s ease-out infinite' }}
                />
              </div>
            </div>
          </div>
          
          <h3 
            className="text-4xl font-bold mb-4"
            style={{
              background: 'linear-gradient(120deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient-flow 3s ease infinite'
            }}
          >
            广之优金属茶几工厂
          </h3>
          <p className="text-cyan-400/80 text-lg max-w-2xl mx-auto leading-relaxed">
            专业生产金属类半成品茶几 | 质量保证 | 诚信经营
          </p>
        </div>
        
        {/* 3D社交媒体图标 */}
        <div className="flex justify-center space-x-8 mb-12">
          {socialLinks.map((link, index) => (
            <div
              key={index}
              className="group relative perspective-1000"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-500 preserve-3d"
                style={{
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <Icon 
                  icon={link.icon} 
                  className="w-7 h-7 text-cyan-400 relative z-10 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" 
                />
                
                {/* 3D悬停效果 */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle, ${link.color}33, transparent)`,
                    boxShadow: `0 0 30px ${link.color}`,
                    transform: 'translateZ(-20px)'
                  }}
                />
                
                {/* 电流效果 */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="absolute top-0 left-1/2 w-px h-full"
                    style={{
                      background: `linear-gradient(transparent, ${link.color}, transparent)`,
                      animation: 'electric-flow 1s ease-in-out infinite'
                    }}
                  />
                  <div 
                    className="absolute left-0 top-1/2 w-full h-px"
                    style={{
                      background: `linear-gradient(to right, transparent, ${link.color}, transparent)`,
                      animation: 'electric-flow 1s ease-in-out infinite',
                      animationDelay: '0.5s'
                    }}
                  />
                </div>
                
                {/* 工具提示 */}
                <div 
                  className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                  style={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${link.color}`,
                    color: link.color,
                    boxShadow: `0 0 20px ${link.color}66`
                  }}
                >
                  {link.label}
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                    style={{ borderTopColor: link.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 呼吸分隔线 */}
        <div className="relative h-px mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            style={{ animation: 'pulse-line 3s ease-in-out infinite' }}
          />
        </div>
        
        {/* 版权信息 - 逐字显现 */}
        <div className="text-center space-y-4">
          <p className="text-cyan-400/90 text-base font-medium">
            {copyrightText.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  opacity: i < visibleChars ? 1 : 0,
                  transform: i < visibleChars ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.3s ease-out'
                }}
              >
                {char}
              </span>
            ))}
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-cyan-500/70 text-sm">
            {['粤ICP备XXXXXXXX号', '隐私政策', '使用条款'].map((text, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-cyan-600/40">|</span>}
                <span 
                  className="hover:text-cyan-400 cursor-pointer transition-all duration-300 relative group"
                  style={{ animation: `fadeIn 0.8s ease-out ${1 + i * 0.2}s both` }}
                >
                  {text}
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* 底部装饰灯组 */}
        <div className="flex items-center justify-center mt-10 space-x-3">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="relative"
              style={{ animation: `fadeIn 1s ease-out ${1.5 + i * 0.1}s both` }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: ['#06b6d4', '#3b82f6', '#8b5cf6'][i % 3],
                  boxShadow: `0 0 15px ${['#06b6d4', '#3b82f6', '#8b5cf6'][i % 3]}`,
                  animation: `blink-stagger ${1.5 + i * 0.2}s ease-in-out infinite`
                }}
              />
              {/* 光晕 */}
              <div
                className="absolute inset-0 rounded-full -m-2"
                style={{
                  background: `radial-gradient(circle, ${['#06b6d4', '#3b82f6', '#8b5cf6'][i % 3]}66, transparent)`,
                  animation: `pulse-glow ${2 + i * 0.2}s ease-in-out infinite`
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes circuit-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }
        @keyframes wave-scan {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(20px, -20px); opacity: 1; }
        }
        @keyframes expand {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes float-3d {
          0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg); }
          33% { transform: translateY(-10px) rotateX(5deg) rotateY(-5deg); }
          66% { transform: translateY(5px) rotateX(-5deg) rotateY(5deg); }
        }
        @keyframes rotate-3d {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes electric-flow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.3; transform: scaleX(0.8); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes blink-stagger {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
