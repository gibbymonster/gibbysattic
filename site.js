// site.js - store helpers: open order form, modal confirmation, auto-gallery loader
(function(){
  const ORDER_FORMS = {
    "gjuice": "https://docs.google.com/forms/d/e/1FAIpQLSenEaR4NDrqLE2WAWRP1WN1-SSdjXcht8umSJEUQ0XiA33g3A/viewform",
    "fidgets": "https://forms.gle/suPbACCX7XJqPbJV7",
    "skrappyz": "https://forms.gle/PdLezZz296LhkVvc9"
  };

  function showOrderModal(productId, info){
    const back = document.getElementById('modal-back');
    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-desc');
    const formBtn = document.getElementById('modal-open-form');
    const cancel = document.getElementById('modal-cancel');
    title.textContent = info.title;
    desc.textContent = info.desc;
    formBtn.onclick = function(){ window.open(ORDER_FORMS[productId],'_blank','noopener,noreferrer'); closeModal(); };
    cancel.onclick = closeModal;
    back.style.display = 'flex';
  }
  function closeModal(){ document.getElementById('modal-back').style.display = 'none'; }

  document.addEventListener('click', function(e){
    const btn = e.target.closest('[data-product]');
    if(!btn) return;
    const pid = btn.getAttribute('data-product');
    const info = {
      gjuice: {title:'g juice - order', desc:'order g juice packs. fill the order form and gibby will process payments and shipping.'},
      fidgets: {title:'fidgets - order', desc:'order a gibby fidget. choose model and options in the order form.'},
      skrappyz: {title:'skrappyz - order', desc:'submit your skrappy for production. use the form to place an order or commission a plush.'}
    }[pid] || {title:pid, desc:'order form'};
    showOrderModal(pid, info);
  });

  function loadAutoGalleries(){
    document.querySelectorAll('.auto-gallery').forEach(function(container){
      const prefix = container.getAttribute('data-prefix') || '';
      fetch('assets/manifest.json').then(r=>r.json()).then(manifest=>{
        const items = manifest.filter(n=> n.startsWith(prefix)).slice(0,50);
        if(items.length===0) throw 'no items';
        container.innerHTML = items.map(i=> `<div class="thumb"><img src="assets/${i}" alt="${i}"></div>`).join('');
      }).catch(err=>{
        container.innerHTML = '<div class="thumb">drop images into assets/ and create assets/manifest.json</div>';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    loadAutoGalleries();
    window.addEventListener('keydown', (ev)=>{
      if(ev.key==='1') document.querySelector('[data-product="gjuice"]')?.click();
      if(ev.key==='2') document.querySelector('[data-product="fidgets"]')?.click();
      if(ev.key==='3') document.querySelector('[data-product="skrappyz"]')?.click();
    });
  });
})();