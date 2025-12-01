import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Icon } from '@iconify/react';

const Strength: React.FC = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [isMobile, setIsMobile] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const [showFacilities, setShowFacilities] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: 5000, suffix: '+㎡', label: '生产厂房面积', color: '#06b6d4', icon: 'mdi:factory' },
    { value: 50, suffix: '+台', label: '生产设备', color: '#3b82f6', icon: 'mdi:cog' },
    { value: 100, suffix: '+人', label: '专业员工', color: '#8b5cf6', icon: 'mdi:account-group' },
    { value: 10000, suffix: '+件/月', label: '月产能', color: '#ec4899', icon: 'mdi:chart-line' }
  ];

  const capabilities = [
    {
      icon: 'mdi:cog',
      title: '先进设备',
      gradient: 'from-cyan-500 to-blue-500',
      items: [
        '数控切割机、激光切割机等精密加工设备',
        '自动化焊接生产线，保证焊接质量稳定',
        '表面处理设备，提供多种表面处理工艺',
        '质量检测设备，确保产品符合标准'
      ]
    },
    {
      icon: 'mdi:shield-check',
      title: '质量控制',
      gradient: 'from-purple-500 to-pink-500',
      items: [
        'ISO质量管理体系认证，规范生产流程',
        '原材料严格把关，确保材料质量',
        '生产过程全程监控，及时发现问题',
        '成品检验严格，不合格产品不出厂'
      ]
    }
  ];

  const facilities = [
    { icon: 'mdi:factory', title: '生产车间', gradient: 'from-cyan-400 to-blue-500' },
    { icon: 'mdi:cog', title: '加工设备', gradient: 'from-blue-500 to-purple-500' },
    { icon: 'mdi:package-variant', title: '仓储物流', gradient: 'from-purple-500 to-pink-500' }
  ];

  // 检测移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // 移动端分批延迟加载
        if (isMobile) {
          setTimeout(() => setShowCapabilities(true), 400);
          setTimeout(() => setShowFacilities(true), 800);
        } else {
          setShowCapabilities(true);
          setShowFacilities(true);
        }
      }
    });
  }, [isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      handleIntersection,
      { threshold: isMobile ? 0.05 : 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection, isMobile]);

  // 数字滚动计数效果 - 移动端禁用
  useEffect(() => {
    if (isVisible) {
      if (isMobile) {
        // 移动端直接显示最终值
        setAnimatedStats(stats.map(stat => stat.value));
      } else {
        // 桌面端使用滚动动画
        stats.forEach((stat, index) => {
          let startValue = 0;
          const endValue = stat.value;
          const duration = 2000;
          const increment = endValue / (duration / 50);
          
          const timer = setInterval(() => {
            startValue += increment;
            if (startValue >= endValue) {
              startValue = endValue;
              clearInterval(timer);
            }
            setAnimatedStats(prev => {
              const newStats = [...prev];
              newStats[index] = Math.floor(startValue);
              return newStats;
            });
          }, 50);
        });
      }
    }
  }, [isVisible, isMobile]);

  // 缓存数据
  const statsData = useMemo(() => stats, []);
  const capabilitiesData = useMemo(() => capabilities, []);
  const facilitiesData = useMemo(() => facilities, []);

  return (
    <section id="strength" ref={sectionRef} className="py-16 md:py-20 bg-slate-950 relative overflow-hidden">
      {/* 背景装饰 - 移动端完全禁用 */}
      {!isMobile && (
        <>
          {/* 电路板脉冲背景 */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              animation: 'circuit-pulse 8s linear infinite'
            }}
          />
          
          {/* 流动能量线 - 减少数量 */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5"
              style={{
                background: `linear-gradient(90deg, transparent, #06b6d4, transparent)`,
                width: `${30 + Math.random() * 40}%`,
                top: `${20 + i * 25}%`,
                left: `-50%`,
                animation: `energy-flow ${5 + Math.random() * 2}s linear infinite`,
                animationDelay: `${i * 1}s`,
                boxShadow: '0 0 10px #06b6d4'
              }}
            />
          ))}
        </>
      )}
      
      <div className="container mx-auto px-4">
        {/* 标题 */}
        <div 
          className={`text-center mb-12 md:mb-16 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 relative inline-block"
            style={{
              background: 'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            生产实力
            {!isMobile && (
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-xl -z-10" />
            )}
          </h2>
          <p className="text-cyan-400/80 text-sm sm:text-base md:text-lg px-4">
            先进设备 · 专业团队 · 严格品控
          </p>
        </div>
        
        {/* 数据展示 - 移动端简化版 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 md:mb-20">
          {statsData.map((stat, index) => (
            <div 
              key={index} 
              className={`relative transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{
                transitionDelay: isMobile ? '0ms' : `${index * 200}ms`
              }}
            >
              <div 
                className={`relative p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl ${
                  isMobile ? '' : 'group hover:scale-105 transition-transform duration-500'
                }`}
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  boxShadow: isMobile ? 'none' : '0 10px 30px rgba(6, 182, 212, 0.1)'
                }}
              >
                {/* 移动端简化图标 */}
                {isMobile ? (
                  <div className="flex items-center justify-center mb-3">
                    <Icon 
                      icon={stat.icon} 
                      className="w-8 h-8"
                      style={{ color: stat.color }}
                    />
                  </div>
                ) : (
                  /* 桌面端圆形进度环 */
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="40" fill="none" stroke={stat.color} strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={isVisible ? 0 : 2 * Math.PI * 40}
                        style={{
                          filter: `drop-shadow(0 0 10px ${stat.color})`,
                          transition: 'stroke-dashoffset 2s ease-out 0.5s'
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon icon={stat.icon} className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                )}
                
                {/* 数据显示 */}
                <div className="text-center">
                  <div 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2"
                    style={{
                      color: stat.color,
                      textShadow: isMobile ? 'none' : `0 0 20px ${stat.color}`
                    }}
                  >
                    {animatedStats[index].toLocaleString()}{stat.suffix}
                  </div>
                  <p className="text-cyan-300/80 text-xs sm:text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 生产能力卡片 - 延迟加载 */}
        {showCapabilities && (
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 mb-16 md:mb-20">
            {capabilitiesData.map((capability, index) => (
              <div 
                key={index} 
                className={`relative rounded-xl md:rounded-2xl overflow-hidden transition-opacity duration-500 ${
                  isMobile ? '' : 'group hover:shadow-2xl'
                }`}
                style={{
                  opacity: showCapabilities ? 1 : 0,
                  transitionDelay: isMobile ? '0ms' : `${index * 300}ms`
                }}
              >
                <div 
                  className="relative p-6 md:p-8"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(6, 182, 212, 0.2)'
                  }}
                >
                  {/* 标题区域 */}
                  <div className="flex items-center mb-6 md:mb-8">
                    <div 
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center mr-4 md:mr-6`}
                      style={{ 
                        boxShadow: isMobile ? 'none' : '0 10px 30px rgba(6, 182, 212, 0.4)'
                      }}
                    >
                      <Icon icon={capability.icon} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    
                    <h3 
                      className="text-lg sm:text-xl md:text-2xl font-bold text-white"
                      style={{
                        textShadow: isMobile ? 'none' : '0 0 15px rgba(6, 182, 212, 0.6)'
                      }}
                    >
                      {capability.title}
                    </h3>
                  </div>
                  
                  {/* 功能列表 */}
                  <ul className="space-y-3 md:space-y-4">
                    {capability.items.map((item, itemIndex) => (
                      <li 
                        key={itemIndex} 
                        className={`flex items-start ${isMobile ? '' : 'group-hover:translate-x-2 transition-transform duration-300'}`}
                      >
                        <div 
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mr-3 md:mr-4 mt-0.5 flex-shrink-0"
                          style={{ 
                            boxShadow: isMobile ? 'none' : '0 0 10px rgba(6, 182, 212, 0.8)'
                          }}
                        >
                          <Icon icon="mdi:check" className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-cyan-300/90 text-sm sm:text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* 设施展示 - 延迟加载 */}
        {showFacilities && (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {facilitiesData.map((facility, index) => (
              <div 
                key={index}
                className={`relative rounded-xl md:rounded-2xl overflow-hidden transition-opacity duration-500 ${
                  isMobile ? '' : 'group hover:scale-105'
                }`}
                style={{
                  opacity: showFacilities ? 1 : 0,
                  transitionDelay: isMobile ? '0ms' : `${index * 200}ms`
                }}
              >
                <div 
                  className="relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(6, 182, 212, 0.2)'
                  }}
                >
                  {/* 图标区域 */}
                  <div 
                    className="h-40 sm:h-48 md:h-56 flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${facility.gradient.replace('from-', '').replace('to-', '').split(' ')[0]}20, ${facility.gradient.split(' ').pop()}20)`
                    }}
                  >
                    <Icon 
                      icon={facility.icon} 
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-cyan-400 relative z-10"
                      style={{ 
                        filter: isMobile ? 'none' : 'drop-shadow(0 0 20px #06b6d4)'
                      }}
                    />
                  </div>
                  
                  {/* 标题 */}
                  <div className="p-4 md:p-6 text-center">
                    <h4 
                      className="font-bold text-white text-base sm:text-lg md:text-xl"
                      style={{
                        textShadow: isMobile ? 'none' : '0 0 15px rgba(6, 182, 212, 0.6)'
                      }}
                    >
                      {facility.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 动画样式 - 仅桌面端 */}
      {!isMobile && (
        <style>{`
          @keyframes circuit-pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.3; }
          }
          @keyframes energy-flow {
            0% { transform: translateX(0); }
            100% { transform: translateX(100vw); }
          }
        `}</style>
      )}
    </section>
  );
});

Strength.displayName = 'Strength';
export default Strength;
