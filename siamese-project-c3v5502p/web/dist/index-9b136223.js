import{r,R as h}from"./react-vendor-e0903072.js";import{I as v}from"./index-0251a7ce.js";import{j as n,a as t}from"./antd-vendor-155a62a3.js";const k=()=>{const d=r.useRef(null),[s,u]=r.useState(0),i="© 2024 广之优金属茶几生产加工工厂 版权所有",b=[{icon:"mdi:wechat",label:"微信",color:"#06b6d4"},{icon:"mdi:phone",label:"电话",color:"#3b82f6"},{icon:"mdi:email",label:"邮箱",color:"#8b5cf6"},{icon:"mdi:web",label:"官网",color:"#ec4899"}];return r.useEffect(()=>{const a=d.current;if(!a)return;const e=a.getContext("2d");if(!e)return;a.width=a.offsetWidth,a.height=a.offsetHeight;const c=[],g=()=>{c.push({x:Math.random()*a.width,y:-20,length:Math.random()*60+40,speed:Math.random()*3+2,opacity:Math.random()*.5+.5})};let p,m=0;const x=f=>{e.clearRect(0,0,a.width,a.height),f-m>2e3&&(g(),m=f),c.forEach((o,y)=>{o.y+=o.speed,o.x+=o.speed*.5;const l=e.createLinearGradient(o.x,o.y,o.x-o.length*.5,o.y-o.length);l.addColorStop(0,`rgba(6, 182, 212, ${o.opacity})`),l.addColorStop(1,"transparent"),e.strokeStyle=l,e.lineWidth=2,e.beginPath(),e.moveTo(o.x,o.y),e.lineTo(o.x-o.length*.5,o.y-o.length),e.stroke(),o.y>a.height+o.length&&c.splice(y,1)}),p=requestAnimationFrame(x)};return x(0),()=>cancelAnimationFrame(p)},[]),r.useEffect(()=>{let a;return s<i.length&&(a=setTimeout(()=>{u(e=>e+1)},50)),()=>clearTimeout(a)},[s,i.length]),n("footer",{className:"relative bg-slate-950 py-20 border-t border-cyan-500/20 overflow-hidden","data-loc":"src/components/Footer/index.tsx:103-448",children:[t("canvas",{ref:d,className:"absolute inset-0 pointer-events-none",style:{width:"100%",height:"100%"},"data-loc":"src/components/Footer/index.tsx:105-109"}),t("div",{className:"absolute inset-0 opacity-10",style:{backgroundImage:`
            linear-gradient(90deg, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
            linear-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px)
          `,backgroundSize:"100px 100px",animation:"circuit-move 30s linear infinite"},"data-loc":"src/components/Footer/index.tsx:112-122"}),t("div",{className:"absolute inset-0 opacity-5",style:{backgroundImage:`
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,backgroundSize:"20px 20px",animation:"circuit-move 20s linear infinite reverse"},"data-loc":"src/components/Footer/index.tsx:123-133"}),[...Array(8)].map((a,e)=>t("div",{className:"absolute w-2 h-2 rounded-full",style:{background:`radial-gradient(circle, ${["#06b6d4","#3b82f6","#8b5cf6"][e%3]}, transparent)`,top:`${Math.random()*100}%`,left:`${Math.random()*100}%`,animation:`particle-float ${3+e*.5}s ease-in-out infinite`,animationDelay:`${e*.3}s`,boxShadow:`0 0 20px ${["#06b6d4","#3b82f6","#8b5cf6"][e%3]}`},"data-loc":"src/components/Footer/index.tsx:137-148"},e)),t("div",{className:"absolute bottom-0 left-0 right-0 h-1",style:{background:"linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), transparent)",animation:"wave-scan 3s ease-in-out infinite"},"data-loc":"src/components/Footer/index.tsx:152-158"}),n("div",{className:"container mx-auto px-4 relative z-10","data-loc":"src/components/Footer/index.tsx:160-381",children:[n("div",{className:"flex items-center justify-center mb-16","data-loc":"src/components/Footer/index.tsx:162-181",children:[t("div",{className:"h-px w-32 bg-gradient-to-r from-transparent to-cyan-500 relative","data-loc":"src/components/Footer/index.tsx:163-167",children:t("div",{className:"absolute right-0 top-1/2 w-2 h-2 rounded-full bg-cyan-400 -translate-y-1/2",style:{boxShadow:"0 0 15px rgba(6, 182, 212, 1)",animation:"pulse 2s ease-in-out infinite"},"data-loc":"src/components/Footer/index.tsx:164-166"})}),n("div",{className:"mx-6 relative","data-loc":"src/components/Footer/index.tsx:168-175",children:[t("div",{className:"w-4 h-4 rounded-full bg-cyan-500",style:{boxShadow:"0 0 30px rgba(6, 182, 212, 1)",animation:"pulse 1.5s ease-in-out infinite"},"data-loc":"src/components/Footer/index.tsx:169-171"}),t("div",{className:"absolute inset-0 w-8 h-8 rounded-full border border-cyan-400/50 -m-2",style:{animation:"expand 2s ease-out infinite"},"data-loc":"src/components/Footer/index.tsx:172-174"})]}),t("div",{className:"h-px w-32 bg-gradient-to-l from-transparent to-cyan-500 relative","data-loc":"src/components/Footer/index.tsx:176-180",children:t("div",{className:"absolute left-0 top-1/2 w-2 h-2 rounded-full bg-cyan-400 -translate-y-1/2",style:{boxShadow:"0 0 15px rgba(6, 182, 212, 1)",animation:"pulse 2s ease-in-out infinite",animationDelay:"0.5s"},"data-loc":"src/components/Footer/index.tsx:177-179"})})]}),n("div",{className:"text-center mb-12","data-loc":"src/components/Footer/index.tsx:184-235",children:[t("div",{className:"flex items-center justify-center mb-6","data-loc":"src/components/Footer/index.tsx:185-218",children:t("div",{className:"relative preserve-3d group","data-loc":"src/components/Footer/index.tsx:186-217",children:n("div",{className:"relative w-20 h-20 rounded-2xl flex items-center justify-center",style:{background:"linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)",boxShadow:"0 0 40px rgba(6, 182, 212, 0.6)",animation:"float-3d 4s ease-in-out infinite"},"data-loc":"src/components/Footer/index.tsx:188-216",children:[t("span",{className:"text-4xl font-bold text-white relative z-10","data-loc":"src/components/Footer/index.tsx:196-196",children:"广"}),[0,120,240].map((a,e)=>t("div",{className:"absolute -inset-4 rounded-2xl",style:{background:`conic-gradient(from ${a}deg, transparent 0%, rgba(${e===0?"6, 182, 212":e===1?"59, 130, 246":"139, 92, 246"}, 0.6) 50%, transparent 100%)`,animation:`rotate-3d ${2+e}s linear infinite ${e%2===0?"":"reverse"}`,opacity:.6-e*.1},"data-loc":"src/components/Footer/index.tsx:200-208"},e)),t("div",{className:"absolute -inset-6 rounded-2xl border-2 border-cyan-400/30",style:{animation:"pulse-ring 2s ease-out infinite"},"data-loc":"src/components/Footer/index.tsx:212-215"})]})})}),t("h3",{className:"text-4xl font-bold mb-4",style:{background:"linear-gradient(120deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)",backgroundSize:"200% 100%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"gradient-flow 3s ease infinite"},"data-loc":"src/components/Footer/index.tsx:220-231",children:"广之优金属茶几工厂"}),t("p",{className:"text-cyan-400/80 text-lg max-w-2xl mx-auto leading-relaxed","data-loc":"src/components/Footer/index.tsx:232-234",children:"专业生产金属类半成品茶几 | 质量保证 | 诚信经营"})]}),t("div",{className:"flex justify-center space-x-8 mb-12","data-loc":"src/components/Footer/index.tsx:238-309",children:b.map((a,e)=>t("div",{className:"group relative perspective-1000",style:{animation:`fadeInUp 0.6s ease-out ${e*.15}s both`},"data-loc":"src/components/Footer/index.tsx:240-307",children:n("div",{className:"relative w-14 h-14 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-500 preserve-3d",style:{background:"rgba(6, 182, 212, 0.1)",border:"1px solid rgba(6, 182, 212, 0.3)",transformStyle:"preserve-3d"},"data-loc":"src/components/Footer/index.tsx:247-306",children:[t(v,{icon:a.icon,className:"w-7 h-7 text-cyan-400 relative z-10 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12","data-loc":"src/components/Footer/index.tsx:255-258"}),t("div",{className:"absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500",style:{background:`radial-gradient(circle, ${a.color}33, transparent)`,boxShadow:`0 0 30px ${a.color}`,transform:"translateZ(-20px)"},"data-loc":"src/components/Footer/index.tsx:261-268"}),n("div",{className:"absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300","data-loc":"src/components/Footer/index.tsx:271-287",children:[t("div",{className:"absolute top-0 left-1/2 w-px h-full",style:{background:`linear-gradient(transparent, ${a.color}, transparent)`,animation:"electric-flow 1s ease-in-out infinite"},"data-loc":"src/components/Footer/index.tsx:272-278"}),t("div",{className:"absolute left-0 top-1/2 w-full h-px",style:{background:`linear-gradient(to right, transparent, ${a.color}, transparent)`,animation:"electric-flow 1s ease-in-out infinite",animationDelay:"0.5s"},"data-loc":"src/components/Footer/index.tsx:279-286"})]}),n("div",{className:"absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none",style:{background:"rgba(15, 23, 42, 0.95)",backdropFilter:"blur(10px)",border:`1px solid ${a.color}`,color:a.color,boxShadow:`0 0 20px ${a.color}66`},"data-loc":"src/components/Footer/index.tsx:290-305",children:[a.label,t("div",{className:"absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent",style:{borderTopColor:a.color},"data-loc":"src/components/Footer/index.tsx:301-304"})]})]})},e))}),n("div",{className:"relative h-px mb-12","data-loc":"src/components/Footer/index.tsx:312-318",children:[t("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent","data-loc":"src/components/Footer/index.tsx:313-313"}),t("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent",style:{animation:"pulse-line 3s ease-in-out infinite"},"data-loc":"src/components/Footer/index.tsx:314-317"})]}),n("div",{className:"text-center space-y-4","data-loc":"src/components/Footer/index.tsx:321-352",children:[t("p",{className:"text-cyan-400/90 text-base font-medium","data-loc":"src/components/Footer/index.tsx:322-336",children:i.split("").map((a,e)=>t("span",{className:"inline-block",style:{opacity:e<s?1:0,transform:e<s?"translateY(0)":"translateY(10px)",transition:"all 0.3s ease-out"},"data-loc":"src/components/Footer/index.tsx:324-334",children:a},e))}),t("div",{className:"flex items-center justify-center space-x-6 text-cyan-500/70 text-sm","data-loc":"src/components/Footer/index.tsx:338-351",children:["粤ICP备XXXXXXXX号","隐私政策","使用条款"].map((a,e)=>n(h.Fragment,{"data-loc":"src/components/Footer/index.tsx:340-349",children:[e>0&&t("span",{className:"text-cyan-600/40","data-loc":"src/components/Footer/index.tsx:341-341",children:"|"}),n("span",{className:"hover:text-cyan-400 cursor-pointer transition-all duration-300 relative group",style:{animation:`fadeIn 0.8s ease-out ${1+e*.2}s both`},"data-loc":"src/components/Footer/index.tsx:342-348",children:[a,t("span",{className:"absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300","data-loc":"src/components/Footer/index.tsx:347-347"})]})]},e))})]}),t("div",{className:"flex items-center justify-center mt-10 space-x-3","data-loc":"src/components/Footer/index.tsx:355-380",children:[...Array(7)].map((a,e)=>n("div",{className:"relative",style:{animation:`fadeIn 1s ease-out ${1.5+e*.1}s both`},"data-loc":"src/components/Footer/index.tsx:357-378",children:[t("div",{className:"w-2 h-2 rounded-full",style:{background:["#06b6d4","#3b82f6","#8b5cf6"][e%3],boxShadow:`0 0 15px ${["#06b6d4","#3b82f6","#8b5cf6"][e%3]}`,animation:`blink-stagger ${1.5+e*.2}s ease-in-out infinite`},"data-loc":"src/components/Footer/index.tsx:362-369"}),t("div",{className:"absolute inset-0 rounded-full -m-2",style:{background:`radial-gradient(circle, ${["#06b6d4","#3b82f6","#8b5cf6"][e%3]}66, transparent)`,animation:`pulse-glow ${2+e*.2}s ease-in-out infinite`},"data-loc":"src/components/Footer/index.tsx:371-377"})]},e))})]}),t("style",{"data-loc":"src/components/Footer/index.tsx:383-447",children:`
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
      `})]})};export{k as default};
