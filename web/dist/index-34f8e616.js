import{r as o}from"./react-vendor-e0903072.js";import{a as s,j as h,F as H}from"./antd-vendor-155a62a3.js";const q=()=>{const[l,F]=o.useState({x:0,y:0}),[p,Y]=o.useState(0),[$,C]=o.useState(!0),g=o.useRef(null),r=o.useRef([]),[i,P]=o.useState(!1),[a,y]=o.useState(!1),[v,R]=o.useState(!1);o.useEffect(()=>{const e=()=>{P(window.innerWidth<768)};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),o.useEffect(()=>{if("connection"in navigator){const e=navigator.connection;if(e){const n=e.effectiveType;R(n==="2g"||n==="slow-2g")}}},[]),o.useEffect(()=>{if(i||v){y(!1);return}const e=setTimeout(()=>{y(!0)},2e3);return()=>clearTimeout(e)},[i,v]);const f=o.useCallback(e=>{F({x:e.clientX,y:e.clientY}),r.current.push({x:e.clientX,y:e.clientY,opacity:1}),r.current.length>10&&r.current.shift()},[]);o.useEffect(()=>{if(!(i||!a))return window.addEventListener("mousemove",f),()=>window.removeEventListener("mousemove",f)},[i,a,f]);const m=o.useCallback(()=>{const e=document.documentElement.scrollHeight-window.innerHeight,n=window.scrollY/e*100;Y(n)},[]);o.useEffect(()=>(window.addEventListener("scroll",m),()=>window.removeEventListener("scroll",m)),[m]),o.useEffect(()=>{const e=setTimeout(()=>{C(!1)},1500);return()=>clearTimeout(e)},[]),o.useEffect(()=>{if(!a)return;const e=g.current;if(!e)return;const n=e.getContext("2d");if(!n)return;e.width=window.innerWidth,e.height=window.innerHeight;const x=[],j=30;for(let c=0;c<j;c++)x.push({x:Math.random()*e.width,y:Math.random()*e.height,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,size:Math.random()*2+1,opacity:Math.random()*.5+.2});let u,E=0;const k=1e3/45,b=()=>{const c=Date.now(),N=c-E;if(N<k){u=requestAnimationFrame(b);return}E=c-N%k,n.clearRect(0,0,e.width,e.height),x.forEach((t,z)=>{t.x+=t.vx,t.y+=t.vy,(t.x<0||t.x>e.width)&&(t.vx*=-1),(t.y<0||t.y>e.height)&&(t.vy*=-1),n.beginPath(),n.arc(t.x,t.y,t.size,0,Math.PI*2),n.fillStyle=`rgba(6, 182, 212, ${t.opacity})`,n.fill(),x.forEach((d,A)=>{if(z!==A){const M=t.x-d.x,S=t.y-d.y,L=Math.sqrt(M*M+S*S),T=120;L<T&&(n.beginPath(),n.moveTo(t.x,t.y),n.lineTo(d.x,d.y),n.strokeStyle=`rgba(6, 182, 212, ${.1*(1-L/T)})`,n.lineWidth=1,n.stroke())}})}),r.current.forEach((t,z)=>{t.opacity-=.05,t.opacity>0&&(n.beginPath(),n.arc(t.x,t.y,3,0,Math.PI*2),n.fillStyle=`rgba(59, 130, 246, ${t.opacity})`,n.fill())}),r.current=r.current.filter(t=>t.opacity>0),u=requestAnimationFrame(b)};b();const G=()=>{e.width=window.innerWidth,e.height=window.innerHeight};return window.addEventListener("resize",G),()=>{cancelAnimationFrame(u),window.removeEventListener("resize",G)}},[a]);const W=o.useMemo(()=>({left:`${l.x}px`,top:`${l.y}px`,width:"40px",height:"40px",background:"radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",transform:"translate(-50%, -50%)",transition:"width 0.3s, height 0.3s",filter:"blur(8px)"}),[l.x,l.y]),w=o.useMemo(()=>({width:`${p}%`}),[p]);return i?s("div",{className:"fixed top-0 left-0 w-full h-1 bg-slate-800 z-50","data-loc":"src/components/GlobalEffects/index.tsx:225-227",children:s("div",{className:"h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300",style:w,"data-loc":"src/components/GlobalEffects/index.tsx:226-226"})}):h(H,{children:[$&&!i&&a&&s("div",{className:"fixed inset-0 z-[9999] flex items-center justify-center",style:{background:"linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",animation:"fadeOut 0.5s ease-out 2s forwards"},"data-loc":"src/components/GlobalEffects/index.tsx:235-291",children:h("div",{className:"relative","data-loc":"src/components/GlobalEffects/index.tsx:243-290",children:[s("div",{className:"w-32 h-32 rounded-2xl flex items-center justify-center mb-6",style:{background:"linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)",boxShadow:"0 0 60px rgba(6, 182, 212, 0.8)",animation:"logoExpand 1s ease-out"},"data-loc":"src/components/GlobalEffects/index.tsx:244-253",children:s("span",{className:"text-6xl font-bold text-white","data-loc":"src/components/GlobalEffects/index.tsx:252-252",children:"广"})}),s("div",{className:"absolute -bottom-4 left-0 right-0 h-1",style:{background:"linear-gradient(90deg, transparent, #06b6d4, transparent)",animation:"scanLine 1.5s ease-in-out infinite"},"data-loc":"src/components/GlobalEffects/index.tsx:256-262"}),h("div",{className:"text-center mt-8",style:{animation:"textAppear 0.8s ease-out 0.5s both"},"data-loc":"src/components/GlobalEffects/index.tsx:265-280",children:[s("h2",{className:"text-3xl font-bold mb-2",style:{background:"linear-gradient(to right, #06b6d4, #3b82f6, #8b5cf6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},"data-loc":"src/components/GlobalEffects/index.tsx:269-278",children:"广之优"}),s("p",{className:"text-cyan-400/70","data-loc":"src/components/GlobalEffects/index.tsx:279-279",children:"加载中..."})]}),s("div",{className:"absolute inset-0 -m-8 rounded-full",style:{background:"conic-gradient(from 0deg, transparent 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)",animation:"rotate 2s linear infinite"},"data-loc":"src/components/GlobalEffects/index.tsx:283-289"})]})}),s("canvas",{ref:g,className:`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${a?"opacity-25":"opacity-0"}`,"data-loc":"src/components/GlobalEffects/index.tsx:295-298"}),a&&s("div",{className:"fixed pointer-events-none z-50 rounded-full",style:W,"data-loc":"src/components/GlobalEffects/index.tsx:302-305"}),s("div",{className:"fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none","data-loc":"src/components/GlobalEffects/index.tsx:309-323",children:s("div",{className:"h-full transition-all duration-300",style:w,"data-loc":"src/components/GlobalEffects/index.tsx:310-322",children:s("div",{className:"absolute right-0 top-0 w-2 h-2 -mt-0.5 rounded-full",style:{background:"#06b6d4",boxShadow:"0 0 10px rgba(6, 182, 212, 1)",animation:"pulse 1.5s ease-in-out infinite"},"data-loc":"src/components/GlobalEffects/index.tsx:314-321"})})}),s("div",{className:"fixed inset-0 pointer-events-none z-10",style:{background:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.03) 2px, rgba(6, 182, 212, 0.03) 4px)",animation:"scanDown 10s linear infinite"},"data-loc":"src/components/GlobalEffects/index.tsx:326-332"}),s("div",{className:"fixed top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyan-500/30 pointer-events-none z-50","data-loc":"src/components/GlobalEffects/index.tsx:335-335"}),s("div",{className:"fixed top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-cyan-500/30 pointer-events-none z-50","data-loc":"src/components/GlobalEffects/index.tsx:336-336"}),s("div",{className:"fixed bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-cyan-500/30 pointer-events-none z-50","data-loc":"src/components/GlobalEffects/index.tsx:337-337"}),s("div",{className:"fixed bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyan-500/30 pointer-events-none z-50","data-loc":"src/components/GlobalEffects/index.tsx:338-338"}),s("style",{"data-loc":"src/components/GlobalEffects/index.tsx:340-386",children:`
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
      `})]})};export{q as default};
