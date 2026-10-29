document.documentElement.classList.add('js');
const bg=document.querySelector('.burger'),ln=document.querySelector('.links');
bg.onclick=()=>{const o=ln.classList.toggle('show');bg.setAttribute('aria-expanded',o)};ln.querySelectorAll('a').forEach(a=>a.onclick=()=>ln.classList.remove('show'));
// neon letters
const h=document.querySelector('h1.neon'),cols=['#39ff78','#00c8ff','#ff2bd6','#fff200','#ff8a00','#b14bff'];
h.innerHTML=h.textContent.split(' ').map(w=>'<span style="white-space:nowrap">'+[...w].map(c=>'<span class="ch">'+c+'</span>').join('')+'</span>').join(' ');
const lite=e=>{if(!e.classList||!e.classList.contains('ch'))return;const c=cols[Math.random()*cols.length|0];e.classList.add('lit');e.style.color=c;e.style.textShadow=`0 0 8px ${c},0 0 22px ${c}`;clearTimeout(e._t);requestAnimationFrame(()=>e.classList.remove('lit'));e._t=setTimeout(()=>{e.style.color='';e.style.textShadow=''},900)};
h.addEventListener('mouseover',e=>lite(e.target));h.addEventListener('touchmove',e=>{const t=e.touches[0];lite(document.elementFromPoint(t.clientX,t.clientY))},{passive:true});
// hero fade (always runs, incl. Reduce Motion)
const fi=[...document.querySelectorAll('.fader img')];let k=0;
fi.slice(1).forEach(i=>{i.loading='eager'});
setInterval(()=>{fi[k].classList.remove('on');k=(k+1)%fi.length;fi[k].classList.add('on')},3800);
// reveals with safe fallback
const rv=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver' in window){rv.forEach(r=>{if(r.getBoundingClientRect().top>innerHeight)r.classList.add('pending')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('pending');e.target.classList.add('lit');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});rv.forEach(r=>io.observe(r));
setTimeout(()=>rv.forEach(r=>r.classList.remove('pending')),4000);}
// lightbox
const lb=document.querySelector('.lb'),li=lb.querySelector('img'),gs=[...document.querySelectorAll('.gi')];let n=0;
const show=i=>{n=(i+gs.length)%gs.length;li.src=gs[n].href;li.alt=gs[n].querySelector('img').alt};
const open=i=>{show(i);lb.hidden=false;requestAnimationFrame(()=>lb.classList.add('open'));document.body.style.overflow='hidden'};
const close=()=>{lb.classList.remove('open');setTimeout(()=>lb.hidden=true,300);document.body.style.overflow=''};
gs.forEach((g,i)=>g.onclick=e=>{e.preventDefault();open(i)});
lb.querySelector('.lb-x').onclick=close;lb.querySelector('.lb-p').onclick=()=>show(n-1);lb.querySelector('.lb-n').onclick=()=>show(n+1);
lb.onclick=e=>{if(e.target===lb)close()};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(n-1);if(e.key==='ArrowRight')show(n+1)});
let sx=0;lb.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40)show(n+(d<0?1:-1))});
// enquiry -> WhatsApp
document.getElementById('enq').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);
const t=`Hi Sports Simulator Singapore, I'd like to enquire about a booking.\nName: ${f.get('name')}\nCompany: ${f.get('company')}\nDate: ${f.get('date')}\nVenue: ${f.get('venue')}\nEvent: ${f.get('type')}\nGuests: ${f.get('guests')}\n${f.get('msg')}`;
window.open('https://wa.me/6593423910?text='+encodeURIComponent(t),'_blank')};
