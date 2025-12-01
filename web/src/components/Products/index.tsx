import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { Button } from 'antd';

const Products: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 产品数据 - 移动端和桌面端使用不同尺寸的图片
  const products = [
    {
      id: 1,
      name: '现代简约风格茶几',
      category: '简约系列',
      material: '不锈钢+钢化玻璃',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      mobileImageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75',
      features: ['防锈处理', '承重强', '易清洁']
    },
    {
      id: 2,
      name: '工业风金属茶几',
      category: '工业风系列',
      material: '铁艺+实木',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      mobileImageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75',
      features: ['复古设计', '稳固耐用', '个性时尚']
    },
    {
      id: 3,
      name: '北欧风茶几',
      category: '北欧系列',
      material: '金属+大理石',
      imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      mobileImageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75',
      features: ['轻量化', '美观大方', '多场景适用']
    },
    {
      id: 4,
      name: '轻奢风茶几',
      category: '轻奢系列',
      material: '不锈钢+玻璃',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      mobileImageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75',
      features: ['经典设计', '百搭风格', '质量保证']
    },
    {
      id: 5,
      name: '创意设计茶几',
      category: '创意系列',
      material: '不锈钢+亚克力',
      imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      mobileImageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75',
      features: ['简约大气', '耐用稳固', '商务首选']
    },
    {
      id: 6,
      name: '多功能茶几',
      category: '功能系列',
      material: '金属+木质',
      imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      mobileImageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75',
      features: ['创新设计', '独特造型', '彰显品味']
    }
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

  // 使用IntersectionObserver检测组件可见性
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // 移动端分批加载图片
        if (isMobile) {
          // 先加载前3张
          setTimeout(() => setLoadedImages([0, 1, 2]), 100);
          // 再加载后3张
          setTimeout(() => setLoadedImages([0, 1, 2, 3, 4, 5]), 600);
        } else {
          // 桌面端立即加载全部
          setLoadedImages([0, 1, 2, 3, 4, 5]);
        }
      }
    });
  }, [isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      handleIntersection,
      { threshold: isMobile ? 0.05 : 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [handleIntersection, isMobile]);

  // 缓存产品数据
  const productsData = useMemo(() => products, []);

  // 获取动画类名
  const getAnimationClass = useCallback((index: number) => {
    if (isMobile) {
      // 移动端使用简单淡入
      return loadedImages.includes(index) ? 'opacity-100' : 'opacity-0';
    }
    // 桌面端使用完整动画
    return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
  }, [isMobile, isVisible, loadedImages]);

  return (
    <section id="products" ref={sectionRef} className="py-16 md:py-20 bg-slate-900 relative overflow-hidden">
      {/* 背景装饰 - 移动端禁用 */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* 标题 */}
        <div className={`text-center mb-12 md:mb-16 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 relative inline-block"
            style={{
              background: 'linear-gradient(to right, #06b6d4, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            产品展示
            {!isMobile && (
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-lg -z-10"></div>
            )}
          </h2>
          <p className="text-cyan-400/80 text-sm sm:text-base md:text-lg px-4">
            专业加工 · 品质优良 · 款式多样
          </p>
        </div>

        {/* 产品网格 - 移动端单列，桌面端三列 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {productsData.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-500 ${getAnimationClass(index)}`}
              style={{
                transitionDelay: isMobile ? '0ms' : `${index * 150}ms`
              }}
            >
              {/* 产品卡片 */}
              <div className={`relative h-72 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden ${
                isMobile ? 'shadow-lg' : 'shadow-xl hover:shadow-2xl group cursor-pointer'
              } bg-slate-800`}>
                {/* 产品图片 - 分批加载 */}
                {loadedImages.includes(index) && (
                  <>
                    <img
                      src={isMobile ? product.mobileImageUrl : product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover ${
                        isMobile ? '' : 'transition-transform duration-700 group-hover:scale-110'
                      }`}
                    />
                    
                    {/* 深色渐变遮罩 - 移动端简化 */}
                    <div className={`absolute inset-0 ${
                      isMobile 
                        ? 'bg-gradient-to-t from-slate-900/95 to-slate-900/40' 
                        : 'bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent'
                    }`}></div>
                  </>
                )}
                
                {/* 加载占位符 */}
                {!loadedImages.includes(index) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* 产品信息 */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyan-400 text-xs sm:text-sm font-medium bg-slate-800/60 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-cyan-300/80 text-xs sm:text-sm mb-3">{product.material}</p>
                  
                  {/* 特性标签 */}
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-slate-700/60 backdrop-blur-sm text-cyan-300 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 查看详情按钮 - 仅桌面端悬停显示 */}
                {!isMobile && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button className="bg-cyan-500/90 hover:bg-cyan-500 backdrop-blur-sm text-white px-3 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-colors duration-300 text-sm">
                      <Icon icon="mdi:eye" className="w-4 h-4" />
                      查看详情
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 底部按钮 */}
        <div className={`text-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            size="large"
            className={`!bg-gradient-to-r !from-cyan-500 !to-blue-500 !border-0 !text-white !font-semibold ${
              isMobile ? '!h-12 !px-8 w-full sm:w-auto' : '!h-14 !px-12'
            } relative overflow-hidden group`}
            style={{
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Icon icon="mdi:arrow-right" className="w-5 h-5" />
              查看更多产品
            </span>
            {!isMobile && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Products);
