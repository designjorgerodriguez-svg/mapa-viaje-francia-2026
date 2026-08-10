(() => {
  const icon=name=>`<i data-lucide="${name}"></i>`;
  const isWarning=(text='')=>/⚠️|no confirmado|consultar|no he encontrado|no especifica|preguntar/i.test(text);

  function accessSummary(text=''){
    const price=text.match(/\d+(?:[,.]\d+)?\s*€/);
    if(/gratis|gratuit|acceso libre|gratuito/i.test(text))return price?`Gratis · ${price[0]}`:'Gratis';
    if(price)return price[0];
    if(isWarning(text))return'Consultar';
    if(/de pago|pago/i.test(text))return'De pago';
    return'Consultar';
  }

  function dogSummary(text=''){
    if(isWarning(text))return'Consultar';
    const yes=/sí|admitid|bienvenid|aceptad|tolerad|autorizad/i.test(text);
    const limited=/condiciones|con correa|fuera de|zona|sector|horario|verano|temporada|excepto|solo|únicamente/i.test(text);
    if(yes&&limited)return'Sí, con condiciones';
    if(yes)return'Sí';
    if(/prohib/i.test(text))return'No';
    return'Consultar';
  }

  function shortHighlights(text=''){
    const parts=text.split('·').map(s=>s.trim()).filter(Boolean);
    let out=parts.length?parts.slice(0,2).join(' · '):text.trim();
    if(out.length>54)out=out.slice(0,51).trimEnd()+'…';
    return out||'Ver detalles';
  }

  function fold({group,type,iconName,label,summary,detail,warning=false}){
    return `<details class="popup-fold ${type}${warning?' warning':''}" name="${group}">
      <summary class="popup-fold-toggle">
        <span class="popup-fold-icon">${icon(iconName)}</span>
        <span class="popup-fold-copy">
          <span class="popup-fold-label">${label}</span>
          <span class="popup-fold-summary">${summary}</span>
        </span>
        <span class="popup-fold-chevron">${icon('chevron-down')}</span>
      </summary>
      <div class="popup-fold-body"><div class="popup-fold-detail">${detail}</div></div>
    </details>`;
  }

  function popupV12(p){
    const group=`popup-${String(p.id).replace(/[^a-z0-9_-]/gi,'')}`;
    return `<div class="popup popup-v12">
      <div class="popup-head popup-v12-head">
        ${iconHtml(p.category)}
        <div class="popup-v12-title"><h3>${p.name}</h3><div class="category">${p.category}</div></div>
      </div>
      <div class="popup-v12-body">
        <div class="popup-quicklist">
          ${fold({group,type:'access',iconName:'ticket',label:'Entrada',summary:accessSummary(p.access),detail:p.access,warning:isWarning(p.access)})}
          ${fold({group,type:'dogs',iconName:'paw-print',label:'Perros',summary:dogSummary(p.dogs),detail:p.dogs,warning:isWarning(p.dogs)})}
          ${fold({group,type:'highlights',iconName:'sparkles',label:'Qué merece la pena',summary:shortHighlights(p.highlights),detail:`<p>${p.desc}</p><p><strong>Destacados:</strong> ${p.highlights}</p>`})}
          ${fold({group,type:'time',iconName:'clock-3',label:'Tiempo recomendado',summary:p.time,detail:`Reserva aproximadamente <strong>${p.time}</strong> para disfrutarlo con calma.`})}
          ${fold({group,type:'tip',iconName:'lightbulb',label:'Consejo',summary:'Ver consejo práctico',detail:p.tip})}
        </div>
        <div class="popup-actions popup-v12-actions">
          <a href="${gmaps(p)}" target="_blank" rel="noopener">${icon('navigation')} Google Maps</a>
          <a class="secondary" href="${p.source}" target="_blank" rel="noopener">${icon('book-open')} Fuente</a>
        </div>
      </div>
    </div>`;
  }

  function sealLucide(){
    document.querySelectorAll('svg[data-lucide]').forEach(svg=>svg.removeAttribute('data-lucide'));
  }

  function hardenLucide(){
    if(!window.lucide||window.lucide.__travelSafe)return;
    const original=window.lucide.createIcons.bind(window.lucide);
    window.lucide.createIcons=(...args)=>{
      const result=original(...args);
      requestAnimationFrame(sealLucide);
      return result;
    };
    window.lucide.__travelSafe=true;
  }

  function renderIcons(){
    hardenLucide();
    try{window.lucide?.createIcons({attrs:{'stroke-width':1.8}})}catch{}
    requestAnimationFrame(sealLucide);
  }

  function decoratePopup(pop){
    const root=pop?.getElement?.();
    if(!root)return;

    const close=root.querySelector('.leaflet-popup-close-button');
    if(close&&!close.dataset.designed){
      close.dataset.designed='1';
      close.innerHTML=icon('x');
      close.setAttribute('aria-label','Cerrar ficha');
    }

    root.querySelectorAll('details.popup-fold').forEach(detail=>{
      if(detail.dataset.bound)return;
      detail.dataset.bound='1';
      detail.addEventListener('toggle',()=>{
        if(detail.open){
          root.querySelectorAll('details.popup-fold[open]').forEach(other=>{
            if(other!==detail)other.open=false;
          });
        }
        try{pop.update()}catch{}
        setTimeout(()=>{
          try{pop.update();pop._adjustPan()}catch{}
        },320);
      });
    });

    renderIcons();
  }

  try{popup=popupV12}catch{}
  try{
    markers.forEach((m,id)=>{
      const p=places.find(x=>x.id===id);
      if(!p)return;
      m.unbindPopup();
      m.bindPopup(popupV12(p),{maxWidth:440,autoPanPadding:[18,18],closeButton:true});
    });
  }catch{}

  if(typeof map!=='undefined'&&!map._popupAccordionV12){
    map._popupAccordionV12=true;
    map.on('popupopen',e=>{
      requestAnimationFrame(()=>decoratePopup(e.popup));
      setTimeout(()=>decoratePopup(e.popup),60);
      if(window.matchMedia('(max-width:760px)').matches){
        setTimeout(()=>{
          const scroller=e.popup.getElement()?.querySelector('.leaflet-popup-content');
          if(scroller)scroller.scrollTop=0;
        },80);
      }
    });
  }

  renderIcons();
})();