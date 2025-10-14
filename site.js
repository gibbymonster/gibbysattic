// site.js - small client helpers for gibby's attic
(function(){
  // simple scroll-to for nav anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  // keyboard shortcuts: 1 gjuice, 2 fidgets, 3 skrappyz
  window.addEventListener('keydown', (ev)=>{
    if(ev.key === '1') window.location = 'gjuice.html';
    if(ev.key === '2') window.location = 'fidgets.html';
    if(ev.key === '3') window.location = 'skrappyz.html';
  });
})();