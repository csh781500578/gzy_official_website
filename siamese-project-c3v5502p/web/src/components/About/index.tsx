import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Icon } from '@iconify/react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showStats, setShowStats] = useState(false);

  // 检测移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 企业优势特色
  const features = [
    {
      icon: 'mdi:shield-check',
      title: '质量保证',
      description: 'ISO 9001质量管理体系认证，严格把控每道工序，确保产品质量稳定可靠'
    },
    {
      icon: 'mdi:lightning-bolt',
      title: '高效生产',
      description: '5条现代化生产线，月产能10000+件，先进设备配合精细工艺保证交期'
    },
    {
      icon: 'mdi:account-group',
      title: '专业团队',
      description: '85名专业员工，15年行业平均经验，提供专业技术支持和定制服务'
    }
  ];

  // 企业实力数据
  const companyStats = [
    { number: '2018', unit: '年', label: '企业成立', icon: 'mdi:calendar-star' },
    { number: '8600', unit: '㎡', label: '厂房面积', icon: 'mdi:factory' },
    { number: '5', unit: '条', label: '生产线', icon: 'mdi:cog' },
    { number: '85', unit: '人', label: '专业员工', icon: 'mdi:account-group' },
    { number: '120000', unit: '件', label: '年产能', icon: 'mdi:chart-line' },
    { number: '300', unit: '+', label: '合作客户', icon: 'mdi:handshake' }
  ];

  // 企业风采展示
  const galleryImages = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'mdi:factory',
      iconSize: 'w-24 h-24',
      title: '现代化厂房',
      description: '8600㎡标准化生产基地，布局合理，环境优美',
      details: '• 现代化钢结构厂房\n• 完善的消防安全设施\n• 绿色环保生产环境'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'mdi:cog-outline',
      iconSize: 'w-24 h-24',
      title: '智能生产车间',
      description: '5条现代化生产线，智能化程度高，生产效率领先',
      details: '• 数控切割设备\n• 自动化焊接生产线\n• 智能质检系统'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'mdi:shield-check',
      iconSize: 'w-24 h-24',
      title: '质检中心',
      description: '严格的质量控制体系，多道检测工序确保产品品质',
      details: '• ISO 9001认证体系\n• 专业质检设备\n• 全程质量追溯'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'mdi:warehouse',
      iconSize: 'w-24 h-24',
      title: '仓储物流',
      description: '完善的仓储管理体系，高效的物流配送网络',
      details: '• 智能仓储管理\n• 覆盖全国配送\n• 准时交付保障'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'mdi:account-tie',
      iconSize: 'w-24 h-24',
      title: '研发团队',
      description: '专业的技术研发团队，持续创新产品设计',
      details: '• 15年行业经验\n• 产品设计创新\n• 定制化解决方案'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: 'mdi:trophy',
      iconSize: 'w-24 h-24',
      title: '企业荣誉',
      description: '多项行业认证和荣誉，客户信赖的品质保证',
      details: '• 高新技术企业\n• 质量诚信企业\n• 行业优秀供应商'
    }
  ];

  // 使用useCallback缓存回调函数
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // 移动端延迟加载企业风采，桌面端立即加载
        if (isMobile) {
          setTimeout(() => setShowStats(true), 500); // 移动端延迟500ms显示统计数据
          setTimeout(() => setShowGallery(true), 800);
        } else {
          setShowStats(true); // 桌面端立即显示
          setShowGallery(true);
        }
      }
    });
  }, [isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      handleIntersection,
      { threshold: isMobile ? 0.1 : 0.3 } // 移动端降低阈值，提前触发
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection, isMobile]);

  // 使用useMemo缓存渲染数据
  const featuresData = useMemo(() => features, []);
  const statsData = useMemo(() => companyStats, []);
  const galleryData = useMemo(() => galleryImages, []);

  const handleImageClick = useCallback((index: number) => {
    setSelectedImage(prev => prev === index ? null : index);
  }, []);

  // 移动端动画类名 - 简化或禁用
  const getAnimationClass = useCallback((baseClass: string, delay = 0) => {
    if (isMobile) {
      // 移动端使用简单的淡入效果
      return `transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`;
    }
    // 桌面端使用完整动画
    return `${baseClass} ${delay > 0 ? `delay-${delay}` : ''}`;
  }, [isMobile, isVisible]);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-slate-800 relative overflow-hidden">
      {/* 背景装饰 - 移动端禁用 */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        {/* 标题 */}
        <div className={`text-center mb-16 ${getAnimationClass('transition-all duration-800')}`}>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative inline-block"
            style={{
              background: 'linear-gradient(to right, #06b6d4, #3b82f6, #8b5cf6)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            企业介绍
            {!isMobile && (
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-lg -z-10 animate-pulse-glow"></div>
            )}
          </h2>
          <p className="text-cyan-400/80 text-sm sm:text-base md:text-lg px-4">
            专业制造 · 品质保证 · 服务至上
          </p>
        </div>
        
        {/* 企业基本信息 */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20">
          <div className={`space-y-6 md:space-y-8 ${getAnimationClass('transition-all duration-800 delay-200', 200)}`}>
            <h3 
              className="text-xl sm:text-2xl font-bold mb-6 text-white flex items-center"
              style={{ textShadow: '0 0 15px rgba(6, 182, 212, 0.6)' }}
            >
              <Icon icon="mdi:information" className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
              关于广之优
            </h3>
            
            <div className="space-y-4 md:space-y-6">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center">
                  <div className="w-2 h-6 bg-blue-500 mr-3"></div>
                  企业概况
                </h4>
                <p className="text-sm sm:text-base text-cyan-300/90 leading-relaxed pl-5">
                  广之优成立于2018年，是一家专业从事金属类半成品茶几生产加工的现代化工厂。公司位于广东省佛山市顺德区，拥有8600平方米标准化生产基地，配备5条现代化生产线，专业员工85人，年产能达12万件。
                </p>
              </div>
              
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center">
                  <div className="w-2 h-6 bg-blue-500 mr-3"></div>
                  核心业务
                </h4>
                <p className="text-sm sm:text-base text-cyan-300/90 leading-relaxed pl-5">
                  公司主营金属茶几框架、支架的精密加工与制造，产品涵盖圆形、方形、异形等多种规格，材质包括不锈钢、碳钢、铝合金等。产品广泛应用于家具制造、酒店装饰、办公环境等领域，服务客户遍布全国。
                </p>
              </div>
              
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center">
                  <div className="w-2 h-6 bg-blue-500 mr-3"></div>
                  企业使命
                </h4>
                <p className="text-sm sm:text-base text-cyan-300/90 leading-relaxed pl-5">
                  致力于成为金属茶几半成品行业的领军企业，以精湛工艺、可靠品质为客户创造价值，推动行业技术进步和标准提升。秉承"质量第一、客户至上、持续创新、共赢发展"的经营理念。
                </p>
              </div>
            </div>
          </div>
          
          {/* 企业实力数据 */}
          <div className={getAnimationClass('transition-all duration-800 delay-400', 400)}>
            <h3 
              className="text-xl sm:text-2xl font-bold mb-6 text-white flex items-center"
              style={{ textShadow: '0 0 15px rgba(6, 182, 212, 0.6)' }}
            >
              <Icon icon="mdi:chart-line" className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
              企业实力
            </h3>
            
            {showStats && (
            <div className={`grid grid-cols-2 gap-4 md:gap-6 ${isMobile ? 'animate-fade-in' : ''}`}>
              {statsData.map((stat, index) => (
                <div 
                  key={index}
                  className={`bg-slate-700/50 p-4 md:p-6 rounded-xl backdrop-blur-md border border-cyan-500/20 ${
                    isMobile ? '' : 'hover:border-cyan-500/40 transition-all duration-300 group'
                  }`}
                  style={{
                    background: 'rgba(51, 65, 85, 0.6)',
                    boxShadow: isMobile ? 'none' : '0 4px 20px rgba(6, 182, 212, 0.1)'
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon 
                      icon={stat.icon} 
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 ${
                        isMobile ? '' : 'group-hover:scale-110 transition-transform duration-300'
                      }`}
                    />
                    <span className="text-xl sm:text-2xl font-bold text-white">{stat.number}{stat.unit}</span>
                  </div>
                  <p className="text-cyan-300/80 text-xs sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
            )}
            
            {/* 企业愿景 */}
            {showStats && (
            <div className={`mt-6 md:mt-8 p-4 md:p-6 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-md border border-cyan-500/20 ${
              isMobile ? 'animate-fade-in-delayed' : ''
            }`}>
              <h4 className="text-base sm:text-lg font-semibold text-cyan-400 mb-3 flex items-center">
                <Icon icon="mdi:lightbulb" className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                发展愿景
              </h4>
              <p className="text-cyan-300/90 text-xs sm:text-sm leading-relaxed">
                成为中国领先的金属家具配件制造企业，通过技术创新和服务升级，为全球客户提供更优质的产品和解决方案。
              </p>
            </div>
            )}
          </div>
        </div>
        
        {/* 企业风采画廊 - 延迟加载 */}
        {showGallery && (
          <div className={`mb-20 ${getAnimationClass('transition-all duration-800 delay-600', 600)}`}>
            <h3 
              className="text-xl sm:text-2xl font-bold mb-8 md:mb-12 text-center text-white flex items-center justify-center"
              style={{ textShadow: '0 0 15px rgba(6, 182, 212, 0.6)' }}
            >
              <Icon icon="mdi:image-multiple" className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
              企业风采
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {galleryData.map((image, index) => (
                <div
                  key={index}
                  className={`group relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                    isMobile ? '' : 'hover:-translate-y-1'
                  }`}
                  onClick={() => handleImageClick(index)}
                >
                  <div className="relative overflow-hidden h-48 sm:h-56 md:h-72 lg:h-80 bg-slate-700">
                    {/* 真实图片背景 */}
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* 深色遮罩层 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/60"></div>
                    
                    {/* 图标悬浮层 - 仅在未展开详情时显示 */}
                    {selectedImage !== index && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon icon={image.icon} className={`${image.iconSize} text-white opacity-60 drop-shadow-lg ${isMobile ? '' : 'group-hover:scale-110 group-hover:rotate-3'} transition-all duration-500`} />
                      </div>
                    )}
                    
                    {/* 悬停详情 - 移动端点击显示 */}
                    <div className={`absolute inset-0 ${
                      isMobile ? (selectedImage === index ? 'opacity-100' : 'opacity-0') : 'opacity-0 group-hover:opacity-100'
                    } transition-opacity duration-300 flex items-end`}>
                      <div className="p-4 md:p-6 w-full bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent">
                        <h4 className="font-bold text-white text-base sm:text-lg md:text-xl mb-2 flex items-center">
                          <Icon icon={image.icon} className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          {image.title}
                        </h4>
                        <p className="text-cyan-300 text-xs sm:text-sm mb-2 md:mb-3">{image.description}</p>
                        <div className="text-gray-300 text-xs whitespace-pre-line">
                          <span className="text-cyan-300/80">{image.details}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 放大图标 - 仅桌面端 */}
                    {!isMobile && (
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-cyan-500/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Icon icon="mdi:magnify-plus" className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* 标题区域 */}
                  <div className="p-3 md:p-4 bg-slate-800/80 backdrop-blur-sm">
                    <h4 className="font-bold text-white text-sm sm:text-base md:text-lg mb-1">{image.title}</h4>
                    <p className="text-cyan-300/80 text-xs sm:text-sm">{image.description}</p>
                  </div>
                  
                  {/* 选中边框 */}
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-cyan-500/20 border-2 md:border-4 border-cyan-500 rounded-xl md:rounded-2xl transition-all duration-300">
                      <Icon icon="mdi:check-circle" className="absolute top-2 left-2 md:top-4 md:left-4 w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 企业优势 */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br from-slate-700 to-slate-800 p-6 md:p-8 rounded-xl md:rounded-2xl ${
                isMobile ? '' : 'hover:from-slate-600 hover:to-slate-700 hover:transform hover:-translate-y-2 hover:shadow-2xl'
              } transition-all duration-300 group relative overflow-hidden`}
              style={{
                opacity: isVisible ? 1 : 0,
                transitionDelay: isMobile ? '0ms' : `${1400 + index * 200}ms`
              }}
            >
              {/* 背景装饰 - 移动端禁用 */}
              {!isMobile && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              )}
              
              <div className="relative z-10">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 mx-auto ${
                  isMobile ? '' : 'group-hover:scale-110 group-hover:rotate-6'
                } transition-all duration-300 shadow-lg`}>
                  <Icon icon={feature.icon} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className={`text-base sm:text-lg md:text-xl font-bold mb-3 md:mb-4 text-center text-white ${
                  isMobile ? '' : 'group-hover:text-cyan-300'
                } transition-colors duration-300`}>
                  {feature.title}
                </h4>
                <p className="text-cyan-300/90 text-center leading-relaxed text-xs sm:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {!isMobile && (
        <style>{`
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
      )}

      {isMobile && (
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.4s ease-in;
          }
          .animate-fade-in-delayed {
            animation: fade-in 0.4s ease-in 0.2s both;
          }
        `}</style>
      )}
    </section>
  );
};

export default React.memo(About);
