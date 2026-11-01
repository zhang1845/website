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
  {name:'AIVideo',url:'https://github.com/zhang1845/AIVideo',label:'AI VIDEO STUDIO',title:'AIVideo，让视频有话可说',description:'从导入原片、AI 解说草稿到人工修改、中文配音与字幕，在本地完成视频解说创作。',image:'assets/projects/aivideo-home.webp',imageAlt:'AIVideo Studio 真实首页，展示创作入口、解说流程与模板',caption:'AIVIDEO STUDIO · PRODUCT INTERFACE',tags:['AI 视频解说','配音字幕','本地创作'],theme:'aivideo',detail:'导入原视频后，通过抽帧理解生成解说草稿，逐段核对并修改，再生成中文配音、字幕与 MP4。支持手写脚本、解说模板和音色选择。',note:'本地运行 · macOS / Windows · AI 草稿需配置模型服务'},
  {name:'personal-agent',url:'https://github.com/zhang1845/personal-agent',label:'PERSONAL AGENT',title:'我的 Agent，把日常安排在一起',description:'把日程、待办、项目资料与个人记忆放进一个工作台，通过对话整理安排，确认后执行。',image:'assets/projects/personal-agent.webp',imageAlt:'个人 Agent 真实工作台，展示日程、待办与工作台导航',caption:'PERSONAL AGENT · PRODUCT INTERFACE',tags:['个人 Agent','日程与待办','资料与记忆'],theme:'agent',detail:'在同一个工作台管理日程、任务、项目资料和记忆。明确指令可离线使用，复杂请求可接入模型，由助手生成操作草案，确认后再保存。',note:'本地运行 · macOS / Windows · 截图中的日程为演示数据'},
  {name:'veil-archive',displayName:'雾幕档案',url:'https://github.com/zhang1845/veil-archive',demoUrl:'https://myapp-demo-d5gu1lkeq44b2c5fb-1514835535.tcloudbaseapp.com/veil-archive/',label:'THE VEIL ARCHIVE',title:'雾幕档案，在迷局里寻找真相',description:'一个人的悬疑推理体验。选择身份、调查线索、核对证词，在层层秘密中还原真相。',image:'assets/projects/veil-archive.webp',imageAlt:'雾幕档案真实首页，展示雾夜悬疑主题与剧本档案入口',caption:'THE VEIL ARCHIVE · PRODUCT INTERFACE',tags:['单人推理','AI 剧本创作','互动叙事'],theme:'veil',detail:'基于 AI-Script-Game 改编的单人悬疑推理项目，包含剧本选择、角色阅读、搜证与终局结算，以及 AI 剧本创作工作台。',note:'网页版试玩 · 实时 AI 对话是否启用以试玩版本为准'},
  {name:'website',label:'PERSONAL WEBSITE',title:'一个属于自己的互联网角落',description:'个人博客网站，连接作品、文章与日常探索，支持分类搜索、深浅主题和响应式布局。',url:'https://github.com/zhang1845/website',kicker:'HELLO, WORLD.',preview:'张力夫.',subtitle:'AI 产品经理 · Agent · 工作流',symbol:'✳',caption:'DESIGN & DEVELOPMENT · 2026',tags:['JavaScript','响应式设计','个人网站'],theme:'personal'},
];
let projectIndex = 0;
let projectTimer = null;
let projectPointer = null;
let projectSwiped = false;
const projectCard = $('#project-card');
const projectDots = $('#project-dots');
const projectCarousel = $('#project-carousel');
projects.forEach((project,index)=>{
  const dot=document.createElement('button');
  dot.type='button';dot.dataset.index=index;dot.setAttribute('role','tab');dot.setAttribute('aria-label',`查看项目 ${index+1}：${project.name}`);
  projectDots.appendChild(dot);
});
function showProject(next,announce=true,animate=true){
  const previousIndex=projectIndex;
  projectIndex=(next+projects.length)%projects.length;
  const project=projects[projectIndex];
  projectCard.href=project.image || project.url;
  const sourceLink = $('#project-source');
  sourceLink.hidden = !project.image;
  sourceLink.href = project.url;
  $('#project-demo').hidden = !project.demoUrl;
  if(project.demoUrl) $('#project-demo').href = project.demoUrl;
  sourceLink.textContent = `${project.displayName || (project.name === 'personal-agent' ? '个人 Agent' : project.name)} · GitHub 源码 ↗`;
  projectCard.setAttribute('aria-label',`${project.title}，${project.image ? '查看产品页面截图' : '在 GitHub 查看项目'}`);
  const preview = project.image
    ? `<div class="project-preview product-preview theme-${escapeHTML(project.theme)}"><div class="mini-browser"><div class="mini-top"><span aria-hidden="true">● ● ●</span><span>${escapeHTML(project.name)} / PRODUCT</span></div><img class="product-screenshot" src="${escapeHTML(project.image)}" alt="${escapeHTML(project.imageAlt)}" width="1440" height="1000" decoding="async" draggable="false"></div><span class="preview-caption">${escapeHTML(project.caption)}</span></div>`
    : `<div class="project-preview theme-${escapeHTML(project.theme)}" aria-hidden="true"><div class="mini-browser"><div class="mini-top"><span>● ● ●</span><span>${escapeHTML(project.name)} / github</span></div><div class="mini-content"><div><span class="mini-kicker">${escapeHTML(project.kicker)}</span><strong>${escapeHTML(project.preview)}</strong><small>${escapeHTML(project.subtitle)}</small><span class="mini-button">EXPLORE ↗</span></div><div class="mini-sculpture">${escapeHTML(project.symbol)}</div></div></div><span class="preview-caption">${escapeHTML(project.caption)}</span></div>`;
  projectCard.innerHTML=`${preview}<div class="project-info"><div class="project-meta">${String(projectIndex+1).padStart(2,'0')} / ${escapeHTML(project.label)} <span>↗</span></div><h3>${escapeHTML(project.title)}</h3><p>${escapeHTML(project.description)}</p><div class="project-tags">${project.tags.map(tag=>`<span>${escapeHTML(tag)}</span>`).join('')}</div><span class="project-cta">${project.image ? '查看产品页面 ↗' : '查看项目源码 ↗'}</span></div>`;
  [...projectDots.children].forEach((dot,index)=>{const active=index===projectIndex;dot.classList.toggle('active',active);dot.setAttribute('aria-selected',String(active));dot.tabIndex=active?0:-1;});
  $('#project-status').textContent=`${String(projectIndex+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;
  if(announce) projectCarousel.setAttribute('aria-label',`GitHub 精选项目，第 ${projectIndex+1} 个，共 ${projects.length} 个`);
  if(animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    const forward=(projectIndex-previousIndex+projects.length)%projects.length;
    const offset=forward===projects.length-1?-18:18;
    projectCard.animate([{opacity:.15,transform:`translateX(${offset}px)`},{opacity:1,transform:'translateX(0)'}],{duration:520,easing:'cubic-bezier(.22,1,.36,1)'});
  }
}
function stopProjectTimer(){if(projectTimer){clearInterval(projectTimer);projectTimer=null;}}
function startProjectTimer(){stopProjectTimer();if(!document.hidden&&!$('#product-viewer').open&&!projectCarousel.matches(':hover')&&!projectCarousel.contains(document.activeElement)&&!matchMedia('(prefers-reduced-motion: reduce)').matches)projectTimer=setInterval(()=>showProject(projectIndex+1,false),6800);}
function moveProject(step){showProject(projectIndex+step);startProjectTimer();}
$('#project-prev').addEventListener('click',()=>moveProject(-1));
$('#project-next').addEventListener('click',()=>moveProject(1));
projectDots.addEventListener('click',event=>{const dot=event.target.closest('button');if(!dot)return;showProject(Number(dot.dataset.index));startProjectTimer();});
projectCarousel.addEventListener('mouseenter',stopProjectTimer);
projectCarousel.addEventListener('mouseleave',startProjectTimer);
projectCarousel.addEventListener('focusin',stopProjectTimer);
projectCarousel.addEventListener('focusout',event=>{if(!projectCarousel.contains(event.relatedTarget))startProjectTimer();});
projectCarousel.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();moveProject(-1);}if(event.key==='ArrowRight'){event.preventDefault();moveProject(1);}});
projectCard.draggable=false;
projectCard.addEventListener('dragstart',event=>event.preventDefault());
projectCarousel.addEventListener('pointerdown',event=>{
  if(event.button!==0||event.target.closest('.project-controls'))return;
  projectPointer={id:event.pointerId,x:event.clientX,y:event.clientY,distance:0,dragging:false};
  projectSwiped=false;
  stopProjectTimer();
});
projectCarousel.addEventListener('pointermove',event=>{
  if(!projectPointer||event.pointerId!==projectPointer.id)return;
  const dx=event.clientX-projectPointer.x;
  const dy=event.clientY-projectPointer.y;
  if(!projectPointer.dragging&&Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy)){
    projectPointer.dragging=true;
    try{projectCarousel.setPointerCapture?.(event.pointerId);}catch{}
  }
  if(!projectPointer.dragging)return;
  projectPointer.distance=dx;
  if(event.cancelable)event.preventDefault();
  const offset=Math.max(-90,Math.min(90,dx*.45));
  projectCard.style.transform=`translateX(${offset}px)`;
  projectCard.style.opacity=String(Math.max(.68,1-Math.abs(offset)/280));
});
function finishProjectDrag(event,cancelled=false){
  if(!projectPointer||event.pointerId!==projectPointer.id)return;
  const distance=projectPointer.distance;
  const wasDragging=projectPointer.dragging;
  projectPointer=null;
  projectCard.style.transform='';
  projectCard.style.opacity='';
  if(wasDragging&&Math.abs(distance)>48&&!cancelled){projectSwiped=true;moveProject(distance<0?1:-1);}
  else if(wasDragging&&!matchMedia('(prefers-reduced-motion: reduce)').matches)projectCard.animate([{transform:`translateX(${Math.max(-90,Math.min(90,distance*.45))}px)`},{transform:'translateX(0)'}],{duration:300,easing:'cubic-bezier(.22,1,.36,1)'});
  startProjectTimer();
}
projectCarousel.addEventListener('pointerup',event=>finishProjectDrag(event));
projectCarousel.addEventListener('pointercancel',event=>finishProjectDrag(event,true));
const productViewer = $('#product-viewer');
let productOpener = null;
projectCard.addEventListener('click',event=>{
  if(projectSwiped){event.preventDefault();projectSwiped=false;return;}
  const project = projects[projectIndex];
  if(!project.image)return;
  event.preventDefault();
  stopProjectTimer();
  productOpener = document.activeElement;
  $('#product-title').textContent = project.title;
  $('#product-description').textContent = project.detail;
  $('#product-note').textContent = project.note;
  $('#product-source').href = project.url;
  $('#product-demo').hidden = !project.demoUrl;
  if(project.demoUrl) $('#product-demo').href = project.demoUrl;
  $('#product-image').src = project.image;
  $('#product-image').alt = project.imageAlt;
  productViewer.showModal();
});
$('#product-close').addEventListener('click',()=>productViewer.close());
productViewer.addEventListener('click',event=>{
  if(event.target!==productViewer)return;
  const r=productViewer.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)productViewer.close();
});
productViewer.addEventListener('close',()=>{
  if(productOpener instanceof HTMLElement)productOpener.focus();
  if(!projectCarousel.matches(':hover')&&!projectCarousel.contains(document.activeElement))startProjectTimer();
});
document.addEventListener('visibilitychange',()=>document.hidden?stopProjectTimer():startProjectTimer());
showProject(0,false,false);startProjectTimer();
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
