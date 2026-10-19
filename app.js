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
