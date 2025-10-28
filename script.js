(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bottomNav = document.querySelector('.bottom-nav');
  const navLinks = document.querySelectorAll('.bottom-nav a');
  const sections = [...document.querySelectorAll('main > .section')];
  function updateNavVisibility(){
    const y = window.scrollY || window.pageYOffset;
    if(y > 50){ bottomNav.classList.add('show'); } else { bottomNav.classList.remove('show'); }
  }
  updateNavVisibility();
  window.addEventListener('scroll', updateNavVisibility, {passive:true});
  const options = {root: null, rootMargin: '0px 0px -60% 0px', threshold: 0.4};
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id;
        navLinks.forEach(a=>{
          if(a.dataset.section === id){ a.classList.add('active'); a.setAttribute('aria-current','page'); }
          else { a.classList.remove('active'); a.removeAttribute('aria-current'); }
        });
      }
    })
  }, options) : null;
  if(io){ sections.forEach(s => io.observe(s)); }
  if(!prefersReduced && 'IntersectionObserver' in window){
    const revealEls = document.querySelectorAll('.reveal');
    const ro = new IntersectionObserver((entries, obs)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target);} });
    }, {threshold: 0.15, rootMargin: '0px 0px -10% 0px'});
    revealEls.forEach(el=>ro.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
  }
  const progress = document.querySelector('.progress');
  function setProgress(){
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = Math.max(0, Math.min(1, docHeight ? scrollTop / docHeight : 0));
    progress.style.width = (pct * 100).toFixed(2) + '%';
    progress.setAttribute('aria-valuenow', Math.round(pct*100));
  }
  setProgress();
  window.addEventListener('scroll', setProgress, {passive:true});
  window.addEventListener('resize', setProgress);
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  const hasCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if(!hasCoarse && dot && outline){
    let x = window.innerWidth/2, y = window.innerHeight/2; let tx = x, ty = y;
    function move(e){ x = e.clientX; y = e.clientY; dot.style.transform = `translate(${x}px, ${y}px)`; }
    function animate(){ tx += (x - tx) * 0.18; ty += (y - ty) * 0.18; outline.style.transform = `translate(${tx}px, ${ty}px)`; requestAnimationFrame(animate); }
    dot.style.transform = `translate(${x}px, ${y}px)`; animate();
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', ()=>{ dot.classList.remove('hidden'); outline.classList.remove('hidden');});
    window.addEventListener('mouseleave', ()=>{ dot.classList.add('hidden'); outline.classList.add('hidden');});
    window.addEventListener('mouseenter', ()=>{ dot.classList.remove('hidden'); outline.classList.remove('hidden');});
    const interactive = 'a, button, .btn, .card';
    document.addEventListener('pointerover', (e)=>{ if(e.target.closest(interactive)){ document.querySelectorAll('.cursor').forEach(c=>c.classList.add('hover')); outline.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--pink') || '#ff3ea5'; outline.style.background = 'rgba(255,62,165,.08)'; } }, true);
    document.addEventListener('pointerout', (e)=>{ if(e.target.closest(interactive)){ document.querySelectorAll('.cursor').forEach(c=>c.classList.remove('hover')); outline.style.borderColor = ''; outline.style.background = ''; } }, true);
  } else { document.querySelectorAll('.cursor').forEach(c=>c.style.display='none'); }
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Tab'){ document.body.classList.add('using-keyboard'); } });
})();
