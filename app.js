const profile = {
  name: '张力夫',
  email: 'zhanglifu0917@163.com',
  xiaohongshu: 'https://www.xiaohongshu.com/user/profile/682c8969000000000d00aeee'
};
// 在此编辑文章。id 须保持唯一，body 中每一项为一个自然段。
const articles = [
  {id:'how-to-use-skill',category:'AI产品',date:'2026.10.19',title:'Skill到底怎么用？',summary:'Skill 不是更长的提示词，而是把一件事的完整经验和 SOP 变成可重复调用的文件。',art:'notes',symbol:'AI',source:'小红书原创',externalUrl:'https://www.xiaohongshu.com/explore/6ac6589a000000001a021b0e?xsec_token=ABedx2PRFUgnbB-2O2Qni8QgEUkENVbT2yYPGtxZsRpbc%3D&xsec_source=pc_user'},
  {id:'agent-evaluation',category:'公众号',date:'2026.10.18',title:'Agent做出来以后怎么知道它真的好用',summary:'从结果与过程两类评测出发，聊聊怎样判断 Agent 的交付是否真的可靠、可用。',art:'',symbol:'✳',source:'微信公众号',externalUrl:'https://mp.weixin.qq.com/s/oQNpGCdIedQ4dJ_KQ5f90w'},
  {id:'context-engineering',category:'公众号',date:'2026.10.13',title:'为什么你的 AI 总是“降智”？一文讲透上下文工程的五层架构',summary:'拆解上下文工程的五层架构，理解怎样为大模型提供准确、高密度的输入环境。',art:'design',symbol:'▧',source:'微信公众号',externalUrl:'https://mp.weixin.qq.com/s/iB57TpV_o5uPW_VNyqa5wA'},
  {id:'ai-capabilities',category:'公众号',date:'2026.10.12',title:'现在的AI，到底强到了什么地步？（普通人能用它做什么）',summary:'从文字、代码到完整工作流，盘点普通人今天可以怎样把 AI 变成实用的工作助手。',art:'life',symbol:'◉',source:'微信公众号',externalUrl:'https://mp.weixin.qq.com/s/r8ogTmOgvjg2k0wd__nYwQ'},
  {id:'ai-data-safety',category:'公众号',date:'2026.09.27',title:'AI 安全：你发给 ChatGPT、DeepSeek、豆包的数据，后来都去了哪里？',summary:'从日常使用场景出发，梳理发送给 AI 的数据可能如何流转，以及应当注意的隐私边界。',art:'notes',symbol:'〰',source:'微信公众号',externalUrl:'https://mp.weixin.qq.com/s/hcgnvLZwQNycY_Syoxj0pw'}
];
const $ = s => document.querySelector(s);
const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const projects = [
  {name:'website',label:'PERSONAL WEBSITE',title:'一个属于自己的互联网角落',description:'个人博客网站，连接作品、文章与日常探索，支持分类搜索、深浅主题和响应式布局。',url:'https://github.com/zhang1845/website',kicker:'HELLO, WORLD.',preview:'张力夫.',subtitle:'AI 产品经理 · Agent · 工作流',symbol:'✳',caption:'DESIGN & DEVELOPMENT · 2026',tags:['JavaScript','响应式设计','个人网站'],theme:'personal'},
  {name:'teleprompter-local',label:'LOCAL TELEPROMPTER',title:'从容提词器，让镜头表达更自然',description:'一款在本地运行的中文提词工具，支持镜像、调速、倒计时和本地录音。',url:'https://github.com/zhang1845/teleprompter-local',kicker:'READY / RECORD',preview:'从容',subtitle:'提词 · 调速 · 本地录音',symbol:'▶',caption:'VIDEO TOOL · LOCAL FIRST',tags:['HTML','本地工具','视频创作'],theme:'prompter'},
  {name:'comparison-ai',label:'MULTI-MODEL ARENA',title:'五席，让五个模型同时回答',description:'输入一条问题，让五个模型并排作答，在同一个界面里快速比较不同模型的思路。',url:'https://github.com/zhang1845/comparison-ai',kicker:'ONE QUESTION / FIVE ANSWERS',preview:'五席',subtitle:'多模型 · 并排对比 · 快速判断',symbol:'⑤',caption:'AI PRODUCT · TYPESCRIPT',tags:['TypeScript','AI 产品','模型对比'],theme:'comparison'},
  {name:'huya',label:'LIVE LANDING PAGE',title:'虎牙直播主题互动落地页',description:'使用 HTML、CSS、JavaScript、GSAP 和 Swiper 构建的响应式直播主题页面。',url:'https://github.com/zhang1845/huya',kicker:'LIVE / NOW',preview:'虎牙',subtitle:'直播 · 动效 · 响应式页面',symbol:'◉',caption:'MOTION & INTERACTION · 2026',tags:['CSS','GSAP','Swiper'],theme:'live'}
];
let projectIndex = 0;
let projectTimer = null;
let pointerStart = null;
let projectSwiped = false;
const projectCard = $('#project-card');
const projectDots = $('#project-dots');
const projectCarousel = $('#project-carousel');
projects.forEach((project,index)=>{
  const dot=document.createElement('button');
  dot.type='button';dot.dataset.index=index;dot.setAttribute('role','tab');dot.setAttribute('aria-label',`查看项目 ${index+1}：${project.name}`);
  projectDots.appendChild(dot);
});
function showProject(next,announce=true){
  projectIndex=(next+projects.length)%projects.length;
  const project=projects[projectIndex];
  projectCard.href=project.url;
  projectCard.setAttribute('aria-label',`${project.title}，在 GitHub 查看项目`);
  projectCard.innerHTML=`<div class="project-preview theme-${escapeHTML(project.theme)}" aria-hidden="true"><div class="mini-browser"><div class="mini-top"><span>● ● ●</span><span>${escapeHTML(project.name)} / github</span></div><div class="mini-content"><div><span class="mini-kicker">${escapeHTML(project.kicker)}</span><strong>${escapeHTML(project.preview)}</strong><small>${escapeHTML(project.subtitle)}</small><span class="mini-button">EXPLORE ↗</span></div><div class="mini-sculpture">${escapeHTML(project.symbol)}</div></div></div><span class="preview-caption">${escapeHTML(project.caption)}</span></div><div class="project-info"><div class="project-meta">${String(projectIndex+1).padStart(2,'0')} / ${escapeHTML(project.label)} <span>↗</span></div><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.description)}</p><div class="project-tags">${project.tags.map(tag=>`<span>${escapeHTML(tag)}</span>`).join('')}</div><span class="project-cta">查看项目源码 ↗</span></div>`;
  [...projectDots.children].forEach((dot,index)=>{const active=index===projectIndex;dot.classList.toggle('active',active);dot.setAttribute('aria-selected',String(active));dot.tabIndex=active?0:-1;});
  $('#project-status').textContent=`${String(projectIndex+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;
  if(announce) projectCarousel.setAttribute('aria-label',`GitHub 精选项目，第 ${projectIndex+1} 个，共 ${projects.length} 个`);
}
function stopProjectTimer(){if(projectTimer){clearInterval(projectTimer);projectTimer=null;}}
function startProjectTimer(){stopProjectTimer();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)projectTimer=setInterval(()=>showProject(projectIndex+1,false),5500);}
function moveProject(step){showProject(projectIndex+step);startProjectTimer();}
$('#project-prev').addEventListener('click',()=>moveProject(-1));
$('#project-next').addEventListener('click',()=>moveProject(1));
projectDots.addEventListener('click',event=>{const dot=event.target.closest('button');if(!dot)return;showProject(Number(dot.dataset.index));startProjectTimer();});
projectCarousel.addEventListener('mouseenter',stopProjectTimer);
projectCarousel.addEventListener('mouseleave',startProjectTimer);
projectCarousel.addEventListener('focusin',stopProjectTimer);
projectCarousel.addEventListener('focusout',event=>{if(!projectCarousel.contains(event.relatedTarget))startProjectTimer();});
projectCarousel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();moveProject(-1);}if(event.key==='ArrowRight'){event.preventDefault();moveProject(1);}});
projectCarousel.addEventListener('pointerdown',event=>{pointerStart=event.clientX;projectSwiped=false;});
projectCarousel.addEventListener('pointerup',event=>{if(pointerStart===null)return;const distance=event.clientX-pointerStart;pointerStart=null;if(Math.abs(distance)>50){projectSwiped=true;moveProject(distance<0?1:-1);}});
projectCarousel.addEventListener('pointercancel',()=>{pointerStart=null;projectSwiped=false;});
projectCard.addEventListener('click',event=>{if(projectSwiped){event.preventDefault();projectSwiped=false;}});
document.addEventListener('visibilitychange',()=>document.hidden?stopProjectTimer():startProjectTimer());
showProject(0,false);startProjectTimer();
let category = '全部';
function render(){
  const query = $('#search').value.trim().toLowerCase();
  const visible = articles.filter(a => (category === '全部' || a.category === category) && (a.title+a.summary+a.category).toLowerCase().includes(query));
  $('#posts').innerHTML = visible.map(a => {
    const external = Boolean(a.externalUrl);
    const href = external ? escapeHTML(a.externalUrl) : `#article/${encodeURIComponent(a.id)}`;
    const target = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    const source = external ? escapeHTML(a.source || '外部文章') : '示例文章';
    return `<article class="post"><div class="post-art ${escapeHTML(a.art)}" aria-hidden="true">${escapeHTML(a.symbol)}</div><a href="${href}"${target}><div class="meta"><span>${escapeHTML(a.category)}</span>${escapeHTML(a.date)} · ${source}</div><h3>${escapeHTML(a.title)}</h3><p>${escapeHTML(a.summary)}</p></a><a class="arrow" href="${href}"${target} aria-label="阅读${escapeHTML(a.title)}">↗</a></article>`;
  }).join('');
  $('#empty').hidden = visible.length > 0;
}
document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click',()=>{
  category = button.dataset.category;
  document.querySelectorAll('[data-category]').forEach(b => {b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  render();
}));
$('#search').addEventListener('input',render);
const reader = $('#reader');
let opener = null;
function route(){
  const article = articles.find(a => '#article/'+encodeURIComponent(a.id) === location.hash);
  if(!article){if(reader.open)reader.close();return;}
  $('#article').innerHTML = `<div class="meta">${escapeHTML(article.category)} / ${escapeHTML(article.date)}</div><h2 id="article-title">${escapeHTML(article.title)}</h2>${article.body.map(p=>`<p>${escapeHTML(p)}</p>`).join('')}<p class="sample">示例文章，用于展示阅读效果。可替换为你的原创内容。</p>`;
  if(!reader.open){opener=document.activeElement;reader.showModal();}
}
$('#close').addEventListener('click',()=>reader.close());
reader.addEventListener('close',()=>{if(location.hash.startsWith('#article/'))history.replaceState(null,'','#journal');if(opener instanceof HTMLElement)opener.focus();});
reader.addEventListener('click',event=>{if(event.target!==reader)return;const r=reader.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)reader.close();});
window.addEventListener('hashchange',route);
try{document.body.classList.toggle('dark',localStorage.getItem('personal-blog-theme')==='dark');}catch{}
$('#theme').setAttribute('aria-pressed', String(document.body.classList.contains('dark')));
$('#theme').addEventListener('click',()=>{const dark=document.body.classList.toggle('dark');$('#theme').setAttribute('aria-pressed',String(dark));try{localStorage.setItem('personal-blog-theme',dark?'dark':'light');}catch{}});
if(profile.email){$('#email-link').href='mailto:'+profile.email;$('#email-link').hidden=false;}
$('.filters small').textContent=String(articles.length).padStart(2,'0');
$('#year').textContent=new Date().getFullYear();
render();route();
