import React, { useEffect, Suspense, lazy, useState } from 'react';
import Navigation from '@/components/Navigation';
import Banner from '@/components/Banner';

// 懒加载非关键组件
const About = lazy(() => import('@/components/About'));
const Products = lazy(() => import('@/components/Products'));
const Strength = lazy(() => import('@/components/Strength'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));
const GlobalEffects = lazy(() => import('@/components/GlobalEffects'));

// 加载占位组件
const LoadingPlaceholder: React.FC<{ height?: string }> = ({ height = 'min-h-screen' }) => (
  <div className={`${height} bg-slate-800 flex items-center justify-center`}>
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-cyan-400">加载中...</p>
    </div>
  </div>
);

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [loadSecondary, setLoadSecondary] = useState(false);

  // 检测移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // 设置平滑滚动
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // 移动端延迟加载次要内容
    const timer = setTimeout(() => {
      setLoadSecondary(true);
    }, isMobile ? 1500 : 500); // 移动端延迟更长

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      clearTimeout(timer);
    };
  }, [isMobile]);

  return (
    <div className="bg-slate-950 text-gray-100 overflow-x-hidden relative">
      {/* 全局动效系统 - 移动端优先级最低 */}
      {loadSecondary && (
        <Suspense fallback={null}>
        <GlobalEffects />
      </Suspense>
      )}
      
      {/* 页面内容 - 关键内容立即加载 */}
      <Navigation />
      <Banner />
      
      {/* 非关键内容懒加载 */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <About />
      </Suspense>
      
      {loadSecondary && (
        <Suspense fallback={<LoadingPlaceholder />}>
        <Products />
      </Suspense>
      )}
      
      {loadSecondary && (
        <Suspense fallback={<LoadingPlaceholder />}>
        <Strength />
      </Suspense>
      )}
      
      {loadSecondary && (
        <Suspense fallback={<LoadingPlaceholder />}>
        <Contact />
      </Suspense>
      )}
      
      {loadSecondary && (
        <Suspense fallback={<LoadingPlaceholder height="h-auto" />}>
        <Footer />
      </Suspense>
      )}
    </div>
  );
};

export default Home;
