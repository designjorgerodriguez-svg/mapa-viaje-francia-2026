(() => {
  const icon = name => `<i data-lucide="${name}"></i>`;

  function isWarning(text=''){
    return /⚠️|no confirmado|consultar|no he encontrado|no especifica|preguntar/i.test(text);
  }

  function accessSummary(text=''){
    const price=text.match(/\d+(?:[,.]\d+)?\s*€/);
    if(/gratis|gratuit|acceso libre|gratuito/i.test(text)) return price?`Gratis · ${price[0]}`:'Gratis';
    if(price) return price[0];
    if(isWarning(text)) return 'Consultar';
    if(/de pago|pago/i.test(text)) return 'De pago';
    return 'Consultar';
  }

  function dogSummary(text=''){
    if(isWarning(text)) return 'Consultar';
    const allows=/sí|admitid|bienvenid|aceptad|tolerad|autorizad/i.test(text);
    const restricted=/condiciones|con correa|fuera de|zona|sector|horario|verano|temporada|excepto|solo|únicamente/i.test(text);
    if(allows && restricted) return 'Sí, con condiciones';
    if(allows) return 'Sí';
    if(/prohib/i.test(text)) return 'No';
    return 'Consultar';
  }

  function shortHighlights(text=''){
    const parts=text.split('·').map(s=>s.trim()).filter(Boolean);
    let out=parts.length?parts.slice(0,2).join(' · '):text.trim();
    if(out.length>52) out=out.slice(0,49).trimEnd()+'…';
    return out || 'Ver detalles';
  }

  function fold({id,type,iconName,label,summary,detail,warning=false}){
    return `<div class="popup-fold ${type}${warning?' warning':''}" data-fold>
      <button class="popup-fold-toggle" type="button" aria-expanded="false" aria-controls="${id}">
        <span class="popup-fold-icon">${icon(iconName)}</span>
        <span class="popup-fold-copy"><span class="popup-fold-label">${label}</span><span class="popup-fold-summary">${summary}</span></span>
        <span class="popup-fold-chevron">${icon('chevron-down')}</span>
      </button>
      <div class="popup-fold-body" id="${id}"><div class="popup-fold-inner"><div class="popup-fold-detail">${detail}</div></div></div>
    </div>`;
  }

  function popupV8(p){
    const base=`popup-${String(p.id).replace(/[^a-z0-9_-]/gi,'')}`;
    return `<div class="popup popup-v8">
      <div class="popup-head popup-v8-head">${iconHtml(p.category)}<div><h3>${p.name}</h3><div class="category">${p.category}</div></div></div>
      <div class="popup-quicklist">
        ${fold({id:`${base}-access`,type:'access',iconName:'ticket',label:'Entrada',summary:accessSummary(p.access),detail:p.access,warning:isWarning(p.access)})}
        ${fold({id:`${base}-dogs`,type:'dogs',iconName:'paw-print',label:'Perros',summary:dogSummary(p.dogs),detail:p.dogs,warning:isWarning(p.dogs)})}
        ${fold({id:`${base}-highlights`,type:'highlights',iconName:'sparkles',label:'Qué merece la pena',summary:shortHighlights(p.highlights),detail:`<p>${p.desc}</p><p><strong>Destacados:</strong> ${p.highlights}</p>`})}
        ${fold({id:`${base}-time`,type:'time',iconName:'clock-3',label:'Tiempo recomendado',summary:p.time,detail:`Calcula aproximadamente <strong>${p.time}</strong> para disfrutarlo sin prisas.`})}
        ${fold({id:`${base}-tip`,type:'tip',iconName:'lightbulb',label:'Consejo',summary:'Ver consejo práctico',detail:p.tip})}
      </div>
      <div class="popup-actions popup-v8-actions"><a href="${gmaps(p)}" target="_blank" rel="noopener">${icon('navigation')} Google Maps</a><a class="secondary" href="${p.source}" target="_blank" rel="noopener">${icon('book-open')} Fuente</a></div>
    </div>`;
  }

  const style=document.createElement('style');
  style.id='travel-ui-v8-popup';
  style.textContent=`
    .popup-v8{width:min(390px,76vw)!important}
    .popup-v8-head{margin-bottom:10px!important}
    .popup-v8-head h3{font-size:19px!important;line-height:1.18!important;font-weight:800!important;color:#13233A!important}
    .popup-v8-head .category{font-size:11px!important;color:#61718A!important;margin-top:4px!important}
    .popup-quicklist{display:grid;gap:7px;margin-top:5px}

    .popup-fold{
      --fold:#64748B;--fold-soft:#F4F6F8;
      border:1px solid #DCE5F1;border-radius:14px;background:#fff;overflow:hidden;
      transition:border-color .2s ease,box-shadow .2s ease,background .2s ease,transform .2s ease;
    }
    .popup-fold.access{--fold:#E6A118;--fold-soft:#FFF8E9}
    .popup-fold.dogs{--fold:#F06F62;--fold-soft:#FFF1EF}
    .popup-fold.highlights{--fold:#8B5CF6;--fold-soft:#F5F1FF}
    .popup-fold.time{--fold:#64748B;--fold-soft:#F4F7FA}
    .popup-fold.tip{--fold:#F59E0B;--fold-soft:#FFF7E6}
    .popup-fold.warning{--fold:#E09116;--fold-soft:#FFF4DE}
    .popup-fold.open{background:var(--fold-soft);border-color:color-mix(in srgb,var(--fold) 35%,#DCE5F1 65%);box-shadow:0 6px 18px rgba(19,35,58,.07);transform:translateY(-1px)}

    .popup-fold-toggle{
      width:100%;min-height:54px;border:0;background:transparent;color:#13233A;cursor:pointer;text-align:left;
      display:grid;grid-template-columns:34px minmax(0,1fr) 24px;align-items:center;gap:10px;padding:8px 10px;
    }
    .popup-fold-toggle:active{background:rgba(19,35,58,.025)}
    .popup-fold-icon{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:color-mix(in srgb,var(--fold) 13%,white 87%);color:var(--fold)}
    .popup-fold-icon .lucide{width:17px;height:17px;stroke-width:2}
    .popup-fold-copy{min-width:0;display:block}
    .popup-fold-label{display:block;font-size:10.5px;line-height:1.15;text-transform:uppercase;letter-spacing:.065em;font-weight:800;color:#718096;margin-bottom:3px}
    .popup-fold-summary{display:block;font-size:15px;line-height:1.28;font-weight:780;color:#17243A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .popup-fold-chevron{width:24px;height:24px;border-radius:999px;display:grid;place-items:center;color:#8090A5;background:#F2F6FB;transition:transform .28s cubic-bezier(.2,.8,.2,1),background .2s,color .2s}
    .popup-fold-chevron .lucide{width:15px;height:15px}
    .popup-fold.open .popup-fold-chevron{transform:rotate(180deg);background:color-mix(in srgb,var(--fold) 14%,white 86%);color:var(--fold)}

    .popup-fold-body{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .3s cubic-bezier(.2,.8,.2,1),opacity .2s ease}
    .popup-fold.open .popup-fold-body{grid-template-rows:1fr;opacity:1}
    .popup-fold-inner{overflow:hidden}
    .popup-fold-detail{margin:0 10px 10px 54px;padding-top:9px;border-top:1px solid color-mix(in srgb,var(--fold) 18%,#DCE5F1 82%);font-size:14px;line-height:1.52;color:#35445A}
    .popup-fold-detail p{margin:0 0 7px}.popup-fold-detail p:last-child{margin-bottom:0}.popup-fold-detail strong{color:#17243A}
    .popup-v8-actions{margin-top:9px!important}
    .popup-v8-actions a{font-size:12.5px!important;font-weight:750!important;padding:8px 11px!important}

    @media(max-width:760px){
      .popup-v8{width:100%!important}
      .popup-v8-head{margin-bottom:8px!important}
      .popup-v8-head h3{font-size:18px!important;line-height:1.18!important}
      .popup-v8-head .category{font-size:10.5px!important}
      .popup-quicklist{gap:6px!important}
      .popup-fold{border-radius:13px!important}
      .popup-fold-toggle{min-height:49px!important;grid-template-columns:31px minmax(0,1fr) 22px!important;gap:8px!important;padding:7px 8px!important}
      .popup-fold-icon{width:29px!important;height:29px!important;border-radius:9px!important}
      .popup-fold-icon .lucide{width:15px!important;height:15px!important}
      .popup-fold-label{font-size:10px!important;margin-bottom:2px!important}
      .popup-fold-summary{font-size:14.5px!important;line-height:1.23!important}
      .popup-fold-detail{margin:0 8px 9px 47px!important;padding-top:8px!important;font-size:13.5px!important;line-height:1.48!important}
      .popup-v8-actions{margin-top:7px!important}
      .popup-v8-actions a{font-size:11.5px!important;padding:7px 9px!important}
    }
  `;
  document.head.appendChild(style);

  function refreshIcons(){
    requestAnimationFrame(()=>{try{window.lucide&&window.lucide.createIcons({attrs:{'stroke-width':1.8}})}catch{}});
  }

  function bindAccordion(pop){
    const root=pop?.getElement?.();
    if(!root || root.dataset.popupV8Bound==='1') return;
    root.dataset.popupV8Bound='1';
    root.querySelectorAll('.popup-fold-toggle').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const item=btn.closest('.popup-fold');
        const wasOpen=item.classList.contains('open');
        root.querySelectorAll('.popup-fold.open').forEach(other=>{
          if(other===item)return;
          other.classList.remove('open');
          other.querySelector('.popup-fold-toggle')?.setAttribute('aria-expanded','false');
        });
        item.classList.toggle('open',!wasOpen);
        btn.setAttribute('aria-expanded',String(!wasOpen));
        refreshIcons();
        try{pop.update()}catch{}
        setTimeout(()=>{try{pop.update();pop._adjustPan()}catch{}},320);
      });
    });
  }

  try{popup=popupV8}catch{}

  try{
    markers.forEach((m,id)=>{
      const p=places.find(x=>x.id===id);
      if(!p)return;
      m.unbindPopup();
      m.bindPopup(popupV8(p),{maxWidth:430,autoPanPadding:[18,18]});
    });
  }catch{}

  if(typeof map!=='undefined'&&!map._popupAccordionV8){
    map._popupAccordionV8=true;
    map.on('popupopen',e=>{
      refreshIcons();
      setTimeout(()=>bindAccordion(e.popup),0);
    });
  }

  refreshIcons();
})();