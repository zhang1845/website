const profile = {
  name: '张力夫',
  email: 'zhanglifu0917@163.com',
  xiaohongshu: 'https://www.xiaohongshu.com/user/profile/682c8969000000000d00aeee'
};
// 在此编辑文章。id 须保持唯一，body 中每一项为一个自然段。
const articles = [
  {id:'how-to-use-skill',category:'AI产品',date:'2026.10.19',title:'Skill到底怎么用？',summary:'Skill 不是更长的提示词，而是把一件事的完整经验和 SOP 变成可重复调用的文件。',art:'notes',symbol:'AI',source:'小红书原创',externalUrl:'https://www.xiaohongshu.com/explore/6ac6589a000000001a021b0e?xsec_token=ABedx2PRFUgnbB-2O2Qni8QgEUkENVbT2yYPGtxZsRpbc%3D&xsec_source=pc_user'},
  {id:'attention',category:'思考',date:'2026.10.12',title:'把注意力，放回那些微小的事情',summary:'在匆忙的日常里，重新练习观察。那些容易被忽略的瞬间，也值得被认真对待。',art:'',symbol:'✳',body:['一天里有很多时刻不会留下记录。窗边的一束光，翻过一半的书，还有一杯渐渐变凉的茶。把目光停在这些地方，时间似乎也有了更清晰的轮廓。','记录可以从一件很小的事开始。今天看见了什么，哪句话让自己停了一下，哪一个问题还想继续追问。无需急着得到完整的答案。','给注意力留一点空白，就像给书页留一道边。偶尔写下几句话，过些时候再看，也许会发现新的线索。']},
  {id:'white-space',category:'设计',date:'2026.10.08',title:'留白，是一种温柔的表达',summary:'关于页面里的呼吸感，以及为什么有时候，少一点会更好。',art:'design',symbol:'▧',body:['页面上每一处空白，都在改变阅读的节奏。标题与正文之间的距离，让读者有时间换一口气；段落之间的间隔，让新的想法获得自己的位置。','设计一个页面时，可以先放入最必要的内容。看清它们的关系，再决定字号、间距和颜色。每添一个元素，都问问自己，它给阅读带来了什么。','留白也有尺度。太松会让相关的信息彼此分离，太紧会让重点挤在一起。在不同宽度里读一遍，往往能找到更自然的平衡。']},
  {id:'weekend',category:'生活',date:'2026.10.03',title:'一个不设计划的周末',summary:'散步、翻书、喝一杯咖啡。让生活偶尔离开待办清单。',art:'life',symbol:'◉',body:['试着给周末留出一段没有安排的时间。出门前不用选好目的地，沿着一条平时很少走的路，看看街角正在发生什么。','也可以留在家里，翻开一本搁置已久的书。读几页，停一会儿，不必给这次阅读设置进度。','忙碌的时候，我们习惯为每一小时找到用途。偶尔允许时间自然流过，或许能更清楚地知道，自己真正愿意把它花在哪里。']},
  {id:'own-blog',category:'思考',date:'2026.09.26',title:'为什么还需要一个自己的博客',summary:'给想法一个安静的住处，让零散的记录慢慢连接起来。',art:'notes',symbol:'〰',body:['一个个人博客可以很小。几篇文章，一段介绍，一个持续更新的角落，已经足以承载一个人的兴趣。','独立整理文字，让人有机会重新决定内容之间的关系。过去的一个问题，可以在新的文章里得到补充；一段零散笔记，也可能慢慢长成一篇完整的记录。','从第一篇开始就好。选择一个想留下的念头，用自己的语言写清楚。网站可以逐步完善，文字也可以随着理解的变化继续修订。']}
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
