import{r}from"./react-vendor-e0903072.js";import{I as h}from"./index-0251a7ce.js";import{b as c,j as n,a as e,I as p,B as E,m as v}from"./antd-vendor-155a62a3.js";const R=()=>{const[u]=c.useForm(),[b,g]=r.useState(!1),[s,C]=r.useState(!1),[k,f]=r.useState([]),[w,y]=r.useState([]),m=r.useRef(null),N=r.useRef(null),I=[{icon:"mdi:map-marker",title:"工厂地址",content:"广东省佛山市顺德区工业园区",gradient:"from-cyan-500 to-blue-500",color:"#06b6d4"},{icon:"mdi:phone",title:"联系电话",content:["0757-12345678","138-0000-0000"],gradient:"from-blue-500 to-purple-500",color:"#3b82f6"},{icon:"mdi:email",title:"电子邮箱",content:"contact@guangzhiyou.com",gradient:"from-purple-500 to-pink-500",color:"#8b5cf6"},{icon:"mdi:clock",title:"工作时间",content:"周一至周六 8:00-18:00",gradient:"from-pink-500 to-cyan-500",color:"#ec4899"}];r.useEffect(()=>{const t=new IntersectionObserver(([a])=>{a.isIntersecting&&C(!0)},{threshold:.3});return m.current&&t.observe(m.current),()=>t.disconnect()},[]);const z=t=>{const a=t.currentTarget.getBoundingClientRect(),o=t.clientX-a.left,i=t.clientY-a.top,l=Date.now();f(d=>[...d,{id:l,x:o,y:i}]),setTimeout(()=>{f(d=>d.filter(x=>x.id!==l))},1e3)},F=t=>{const a=t.currentTarget.getBoundingClientRect(),o=a.width/2,i=a.height/2,l=Array.from({length:20},(d,x)=>({id:Date.now()+x,x:o+(Math.random()-.5)*200,y:i+(Math.random()-.5)*200}));y(l),setTimeout(()=>{y([])},1e3)},Y=async t=>{g(!0);try{await new Promise(o=>setTimeout(o,2e3));const a=document.querySelector(".success-explosion");a&&a.classList.add("animate-explosion"),v.success("感谢您的咨询！我们会尽快与您联系。"),u.resetFields()}catch{v.error("提交失败，请稍后重试")}finally{g(!1)}};return n("section",{id:"contact",ref:m,className:"py-20 bg-slate-950 relative overflow-hidden","data-loc":"src/components/Contact/index.tsx:117-557",children:[e("div",{className:"absolute inset-0 opacity-20",style:{backgroundImage:`
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            radial-gradient(circle, rgba(6, 182, 212, 0.2) 2px, transparent 2px)
          `,backgroundSize:"50px 50px, 50px 50px, 100px 100px",animation:"grid-dance 12s ease-in-out infinite"},"data-loc":"src/components/Contact/index.tsx:119-130"}),[...Array(8)].map((t,a)=>e("div",{className:"absolute",style:{width:"2px",height:"100px",background:"linear-gradient(to bottom, transparent, #06b6d4, transparent)",left:`${10+a*12}%`,top:"-100px",animation:`light-beam ${3+Math.random()*2}s ease-in-out infinite`,animationDelay:`${a*.5}s`,boxShadow:"0 0 10px #06b6d4"},"data-loc":"src/components/Contact/index.tsx:134-147"},a)),n("div",{className:"container mx-auto px-4 relative z-10","data-loc":"src/components/Contact/index.tsx:150-447",children:[n("div",{className:"text-center mb-16",style:{opacity:s?1:0,transform:s?"translateY(0)":"translateY(30px)",transition:"all 1.2s ease-out"},"data-loc":"src/components/Contact/index.tsx:152-179",children:[n("h2",{className:"text-5xl md:text-6xl font-bold mb-6 relative inline-block",style:{background:"linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundSize:"400% 100%",animation:"rainbow-flow 4s ease-in-out infinite"},"data-loc":"src/components/Contact/index.tsx:160-175",children:["联系我们",e("div",{className:"absolute -inset-2 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 blur-xl -z-10",style:{animation:"title-aura 3s ease-in-out infinite"},"data-loc":"src/components/Contact/index.tsx:171-174"})]}),e("p",{className:"text-cyan-400/80 text-lg mt-6","data-loc":"src/components/Contact/index.tsx:176-178",children:"欢迎咨询合作，我们将竭诚为您服务"})]}),n("div",{className:"grid lg:grid-cols-2 gap-12","data-loc":"src/components/Contact/index.tsx:181-446",children:[n("div",{"data-loc":"src/components/Contact/index.tsx:183-296",children:[n("h3",{className:"text-2xl font-bold mb-8 text-cyan-400 flex items-center",style:{opacity:s?1:0,transform:s?"translateX(0)":"translateX(-30px)",transition:"all 1s ease-out 0.3s"},"data-loc":"src/components/Contact/index.tsx:184-194",children:[e("div",{className:"w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 mr-3","data-loc":"src/components/Contact/index.tsx:192-192"}),"联系方式"]}),e("div",{className:"space-y-6 mb-8","data-loc":"src/components/Contact/index.tsx:196-257",children:I.map((t,a)=>n("div",{className:"group relative p-6 rounded-xl backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer overflow-hidden",style:{background:"rgba(15, 23, 42, 0.6)",opacity:s?1:0,transform:s?"translateX(0) rotateY(0deg)":"translateX(-50px) rotateY(-10deg)",transition:`all 1s ease-out ${.5+a*.1}s`},onClick:z,"data-loc":"src/components/Contact/index.tsx:198-255",children:[e("div",{className:"absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",style:{background:`radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${t.color}20, transparent 70%)`,animation:"magnetic-field 3s ease-in-out infinite"},"data-loc":"src/components/Contact/index.tsx:210-216"}),k.map(o=>e("div",{className:"absolute rounded-full pointer-events-none",style:{left:o.x-25,top:o.y-25,width:"50px",height:"50px",background:`radial-gradient(circle, ${t.color}40, transparent)`,animation:"ripple-expand 1s ease-out forwards"},"data-loc":"src/components/Contact/index.tsx:220-231"},o.id)),n("div",{className:"relative flex items-start","data-loc":"src/components/Contact/index.tsx:234-254",children:[e("div",{className:`w-12 h-12 rounded-lg bg-gradient-to-br ${t.gradient} flex items-center justify-center mr-4 flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300`,style:{boxShadow:`0 0 20px ${t.color}`,animation:"icon-levitate 4s ease-in-out infinite"},"data-loc":"src/components/Contact/index.tsx:235-243",children:e(h,{icon:t.icon,className:"w-6 h-6 text-white","data-loc":"src/components/Contact/index.tsx:242-242"})}),n("div",{className:"flex-1","data-loc":"src/components/Contact/index.tsx:244-253",children:[e("h4",{className:"font-bold text-white mb-2 text-base","data-loc":"src/components/Contact/index.tsx:245-245",children:t.title}),Array.isArray(t.content)?t.content.map((o,i)=>e("p",{className:"text-cyan-300/90 text-sm","data-loc":"src/components/Contact/index.tsx:248-248",children:o},i)):e("p",{className:"text-cyan-300/90 text-sm","data-loc":"src/components/Contact/index.tsx:251-251",children:t.content})]})]})]},a))}),e("div",{ref:N,className:"relative rounded-xl overflow-hidden backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group",style:{background:"rgba(15, 23, 42, 0.6)",opacity:s?1:0,transform:s?"translateY(0)":"translateY(30px)",transition:"all 1s ease-out 1s"},"data-loc":"src/components/Contact/index.tsx:260-295",children:n("div",{className:"h-64 flex items-center justify-center relative overflow-hidden","data-loc":"src/components/Contact/index.tsx:270-294",children:[e("div",{className:"absolute inset-0 opacity-50",style:{background:"repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(6, 182, 212, 0.1) 3px, rgba(6, 182, 212, 0.1) 6px)",animation:"scan-lines 2s linear infinite"},"data-loc":"src/components/Contact/index.tsx:272-278"}),e("div",{className:"absolute inset-0 opacity-30",style:{background:"conic-gradient(from 0deg, transparent 0deg, rgba(6, 182, 212, 0.3) 30deg, transparent 60deg)",animation:"radar-sweep 4s linear infinite",transformOrigin:"center"},"data-loc":"src/components/Contact/index.tsx:281-288"}),n("div",{className:"relative z-10 text-center","data-loc":"src/components/Contact/index.tsx:290-293",children:[e(h,{icon:"mdi:map",className:"w-16 h-16 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300","data-loc":"src/components/Contact/index.tsx:291-291"}),e("p",{className:"text-cyan-300/80 text-lg","data-loc":"src/components/Contact/index.tsx:292-292",children:"地图位置"})]})]})})]}),n("div",{style:{opacity:s?1:0,transform:s?"translateX(0)":"translateX(50px)",transition:"all 1s ease-out 0.6s"},"data-loc":"src/components/Contact/index.tsx:299-445",children:[n("h3",{className:"text-2xl font-bold mb-8 text-cyan-400 flex items-center","data-loc":"src/components/Contact/index.tsx:306-309",children:[e("div",{className:"w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 mr-3","data-loc":"src/components/Contact/index.tsx:307-307"}),"在线咨询"]}),n("div",{className:"relative p-8 rounded-xl backdrop-blur-md border border-cyan-500/20 overflow-hidden",style:{background:"rgba(15, 23, 42, 0.6)",boxShadow:"0 0 40px rgba(6, 182, 212, 0.15)"},"data-loc":"src/components/Contact/index.tsx:311-444",children:[e("div",{className:"success-explosion absolute inset-0 pointer-events-none opacity-0","data-loc":"src/components/Contact/index.tsx:319-319"}),n(c,{form:u,layout:"vertical",onFinish:Y,className:"space-y-6","data-loc":"src/components/Contact/index.tsx:321-443",children:[e(c.Item,{name:"name",label:e("span",{className:"text-cyan-300 text-base","data-loc":"src/components/Contact/index.tsx:329-329",children:"您的姓名"}),rules:[{required:!0,message:"请输入您的姓名"}],"data-loc":"src/components/Contact/index.tsx:327-344",children:e(p,{size:"large",placeholder:"请输入您的姓名",className:"form-input",style:{backdropFilter:"blur(10px)"},onFocus:t=>{t.target.parentElement?.classList.add("input-focused")},onBlur:t=>{t.target.parentElement?.classList.remove("input-focused")},"data-loc":"src/components/Contact/index.tsx:332-343"})}),e(c.Item,{name:"phone",label:e("span",{className:"text-cyan-300 text-base","data-loc":"src/components/Contact/index.tsx:348-348",children:"联系电话"}),rules:[{required:!0,message:"请输入您的联系电话"}],"data-loc":"src/components/Contact/index.tsx:346-363",children:e(p,{size:"large",placeholder:"请输入您的联系电话",className:"form-input",style:{backdropFilter:"blur(10px)"},onFocus:t=>{t.target.parentElement?.classList.add("input-focused")},onBlur:t=>{t.target.parentElement?.classList.remove("input-focused")},"data-loc":"src/components/Contact/index.tsx:351-362"})}),e(c.Item,{name:"email",label:e("span",{className:"text-cyan-300 text-base","data-loc":"src/components/Contact/index.tsx:367-367",children:"电子邮箱"}),rules:[{type:"email",message:"请输入正确的邮箱格式"}],"data-loc":"src/components/Contact/index.tsx:365-382",children:e(p,{size:"large",placeholder:"请输入您的邮箱（选填）",className:"form-input",style:{backdropFilter:"blur(10px)"},onFocus:t=>{t.target.parentElement?.classList.add("input-focused")},onBlur:t=>{t.target.parentElement?.classList.remove("input-focused")},"data-loc":"src/components/Contact/index.tsx:370-381"})}),e(c.Item,{name:"message",label:e("span",{className:"text-cyan-300 text-base","data-loc":"src/components/Contact/index.tsx:386-386",children:"咨询内容"}),rules:[{required:!0,message:"请描述您的需求或问题"}],"data-loc":"src/components/Contact/index.tsx:384-401",children:e(p.TextArea,{rows:5,placeholder:"请描述您的需求或问题",className:"form-input resize-none",style:{backdropFilter:"blur(10px)"},onFocus:t=>{t.target.parentElement?.classList.add("input-focused")},onBlur:t=>{t.target.parentElement?.classList.remove("input-focused")},"data-loc":"src/components/Contact/index.tsx:389-400"})}),e(c.Item,{"data-loc":"src/components/Contact/index.tsx:403-442",children:n(E,{type:"primary",size:"large",htmlType:"submit",loading:b,className:"submit-button relative overflow-hidden",style:{width:"100%",height:"56px",background:"linear-gradient(45deg, #06b6d4, #3b82f6)",border:"none",fontSize:"18px",fontWeight:"600"},onClick:F,"data-loc":"src/components/Contact/index.tsx:404-441",children:[e("span",{className:"relative z-10","data-loc":"src/components/Contact/index.tsx:420-422",children:b?"提交中...":"提交咨询"}),e("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000","data-loc":"src/components/Contact/index.tsx:425-427"}),w.map(t=>e("div",{className:"absolute w-1 h-1 bg-white rounded-full pointer-events-none",style:{left:t.x,top:t.y,animation:"particle-explode 1s ease-out forwards"},"data-loc":"src/components/Contact/index.tsx:431-439"},t.id))]})})]})]})]})]})]}),e("style",{"data-loc":"src/components/Contact/index.tsx:449-556",children:`
        @keyframes grid-dance {
          0%, 100% { background-position: 0 0, 0 0, 0 0; }
          25% { background-position: 25px 25px, 25px 25px, 50px 50px; }
          50% { background-position: 50px 0, 50px 0, 100px 0; }
          75% { background-position: 25px -25px, 25px -25px, 50px -50px; }
        }
        @keyframes light-beam {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes rainbow-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes title-aura {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes magnetic-field {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes ripple-expand {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes icon-levitate {
          0%, 100% { transform: translateY(0) rotateZ(0deg); }
          50% { transform: translateY(-5px) rotateZ(5deg); }
        }
        @keyframes scan-lines {
          0% { background-position: 0 0; }
          100% { background-position: 6px 0; }
        }
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes particle-explode {
          0% { transform: scale(1) translate(0, 0); opacity: 1; }
          100% { 
            transform: scale(0) translate(var(--random-x, 50px), var(--random-y, 50px)); 
            opacity: 0; 
          }
        }
        @keyframes explosion {
          0% { transform: scale(1); opacity: 0; }
          50% { transform: scale(1.5); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        .form-input {
          background: rgba(15, 23, 42, 0.5) !important;
          border: 1px solid rgba(6, 182, 212, 0.3) !important;
          color: white !important;
          transition: all 0.3s ease !important;
        }
        
        .form-input:focus {
          border-color: #06b6d4 !important;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.3) !important;
        }
        
        .form-input::placeholder {
          color: rgba(156, 163, 175, 0.6) !important;
        }
        
        .input-focused {
          position: relative;
        }
        
        .input-focused::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          padding: 1px;
          background: linear-gradient(45deg, #06b6d4, #3b82f6);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          animation: border-glow 2s ease-in-out infinite;
        }
        
        @keyframes border-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .submit-button {
          position: relative;
          overflow: hidden;
        }
        
        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4);
        }
        
        .animate-explosion {
          background: radial-gradient(circle, rgba(6, 182, 212, 0.8), transparent);
          animation: explosion 1s ease-out forwards;
          opacity: 1 !important;
        }
      `})]})};export{R as default};
