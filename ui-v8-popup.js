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
        <span class="popup-fold-copy"><span class="popup-fold-label">${label}</span><span class="popup-fold-summary">${summary}</span></span>
        <span class="popup-fold-chevron">${icon('chevron-down')}</span>
      </summary>
      <div class="popup-fold-body"><div class="popup-fold-detail">${detail}</div></div>
    </details>`;
  }

  function popupV10(p){
    const group=`popup-${String(p.id).replace(/[^a-z0-9_-]/gi,'')}`;
    return `<div class="popup popup-v10">
      <div class="popup-head popup-v10-head">${iconHtml(p.category)}<div class="popup-v10-title"><h3>${p.name}</h3><div class="category">${p.category}</div></div></div>
      <div class="popup-v10-body">
        <div class="popup-quicklist">
          ${fold({group,type:'access',iconName:'ticket',label:'Entrada',summary:accessSummary(p.access),detail:p.access,warning:isWarning(p.access)})}
          ${fold({group,type:'dogs',iconName:'paw-print',label:'Perros',summary:dogSummary(p.dogs),detail:p.dogs,warning:isWarning(p.dogs)})}
          ${fold({group,type:'highlights',iconName:'sparkles',label:'Qué merece la pena',summary:shortHighlights(p.highlights),detail:`<p>${p.desc}</p><p><strong>Destacados:</strong> ${p.highlights}</p>`})}
          ${fold({group,type:'time',iconName:'clock-3',label:'Tiempo recomendado',summary:p.time,detail:`Reserva aproximadamente <strong>${p.time}</strong> para disfrutarlo con calma.`})}
          ${fold({group,type:'tip',iconName:'lightbulb',label:'Consejo',summary:'Ver consejo práctico',detail:p.tip})}
        </div>
        <div class="popup-actions popup-v10-actions"><a href="${gmaps(p)}" target="_blank" rel="noopener">${icon('navigation')} Google Maps</a><a class="secondary" href="${p.source}" target="_blank" rel="noopener">${icon('book-open')} Fuente</a></div>
      </div>
    </div>`;
  }

  document.getElementById('travel-ui-v8-popup')?.remove();
  document.getElementById('travel-ui-v9-popup')?.remove();
  const style=document.createElement('style');
  style.id='travel-ui-v10-popup';
  style.textContent=`
    .leaflet-popup-content-wrapper{background:#F7FAFF!important;border:0!important;border-radius:22px!important;overflow:hidden!important;box-shadow:0 24px 64px rgba(13,49,111,.3)!important}
    .leaflet-popup-tip{background:#F7FAFF!important}.leaflet-popup-content{margin:0!important;padding:0!important}.popup-v10{width:min(392px,78vw)!important;color:#14243C!important}
    .popup-v10-head{margin:0!important;padding:17px 54px 16px 15px!important;display:grid!important;grid-template-columns:auto minmax(0,1fr)!important;gap:11px!important;align-items:center!important;background:linear-gradient(135deg,#0B82FF 0%,#0767F2 55%,#0849B8 100%)!important;position:relative;overflow:hidden}
    .popup-v10-head:after{content:'';position:absolute;right:-34px;bottom:-57px;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,.1);pointer-events:none}
    .popup-v10-head .cat-icon{width:42px!important;height:42px!important;border-radius:13px!important;border:1.5px solid rgba(255,255,255,.75)!important;box-shadow:0 7px 18px rgba(0,31,94,.2)!important;position:relative;z-index:1}.popup-v10-head .cat-icon .lucide{width:21px!important;height:21px!important}.popup-v10-title{min-width:0;position:relative;z-index:1}
    .popup-v10-head h3{margin:0!important;color:#fff!important;font-size:20px!important;line-height:1.16!important;font-weight:800!important;letter-spacing:-.032em!important}.popup-v10-head .category{margin:5px 0 0!important;color:#D9E9FF!important;font-size:11px!important;line-height:1.2!important;font-weight:750!important;text-transform:uppercase!important;letter-spacing:.065em!important}.popup-v10-body{padding:11px 11px 12px;background:#F7FAFF}.popup-quicklist{display:grid;gap:7px}
    .leaflet-popup-close-button{z-index:60!important;top:11px!important;right:11px!important;width:34px!important;height:34px!important;padding:0!important;display:grid!important;place-items:center!important;border-radius:999px!important;background:rgba(255,255,255,.17)!important;border:1px solid rgba(255,255,255,.38)!important;color:#fff!important;font-size:0!important;line-height:1!important;box-shadow:0 5px 16px rgba(2,39,103,.16)!important;backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);transition:background .16s,transform .16s!important}.leaflet-popup-close-button:active{transform:scale(.91)}.leaflet-popup-close-button .lucide{width:18px!important;height:18px!important;stroke-width:2.35!important}
    details.popup-fold{--fold:#64748B;border:1px solid #DCE6F3;border-radius:14px;background:#fff;overflow:hidden;box-shadow:0 2px 7px rgba(24,58,105,.04);transition:border-color .22s,box-shadow .22s,transform .22s,background .22s}details.popup-fold.access{--fold:#E8A018}details.popup-fold.dogs{--fold:#F06D61}details.popup-fold.highlights{--fold:#8B5CF6}details.popup-fold.time{--fold:#596B86}details.popup-fold.tip{--fold:#F59E0B}details.popup-fold.warning{--fold:#E38B13}
    .popup-fold-toggle{list-style:none;width:100%;min-height:55px;color:#14243C;cursor:pointer;text-align:left;display:grid;grid-template-columns:35px minmax(0,1fr) 27px;align-items:center;gap:10px;padding:8px 10px;-webkit-tap-highlight-color:transparent;touch-action:manipulation;user-select:none}.popup-fold-toggle::-webkit-details-marker{display:none}.popup-fold-toggle::marker{display:none;content:''}
    .popup-fold-icon{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:color-mix(in srgb,var(--fold) 13%,white 87%);color:var(--fold);transition:background .22s,color .22s,transform .22s}.popup-fold-icon .lucide{width:18px;height:18px;stroke-width:2.05}.popup-fold-copy{min-width:0;display:block}.popup-fold-label{display:block;font-size:11px;line-height:1.1;text-transform:uppercase;letter-spacing:.06em;font-weight:800;color:#718096;margin-bottom:3px;transition:color .22s}.popup-fold-summary{display:block;font-size:16px;line-height:1.25;font-weight:790;color:#16263E;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .22s}.popup-fold-chevron{width:27px;height:27px;border-radius:999px;display:grid;place-items:center;color:#708199;background:#F0F5FB;transition:transform .32s cubic-bezier(.2,.8,.2,1),background .22s,color .22s}.popup-fold-chevron .lucide{width:16px;height:16px}
    details.popup-fold[open]{background:linear-gradient(135deg,#0B82FF 0%,#075DD9 100%)!important;border-color:#0863E1!important;box-shadow:0 11px 26px rgba(7,91,213,.25)!important;transform:translateY(-1px)}details.popup-fold[open] .popup-fold-icon{background:rgba(255,255,255,.18)!important;color:#fff!important;transform:scale(1.03)}details.popup-fold[open] .popup-fold-label{color:#CFE3FF!important}details.popup-fold[open] .popup-fold-summary{color:#fff!important}details.popup-fold[open] .popup-fold-chevron{transform:rotate(180deg);background:rgba(255,255,255,.18)!important;color:#fff!important}
    .popup-fold-body{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .32s cubic-bezier(.2,.82,.2,1),opacity .2s}.popup-fold-body>*{overflow:hidden}details.popup-fold[open] .popup-fold-body{grid-template-rows:1fr;opacity:1}.popup-fold-detail{margin:0 11px 11px 55px;padding:10px 0 2px;border-top:1px solid rgba(255,255,255,.24);font-size:14.5px;line-height:1.52;color:#F4F8FF}.popup-fold-detail p{margin:0 0 8px}.popup-fold-detail p:last-child{margin-bottom:0}.popup-fold-detail strong{color:#fff}
    .popup-v10-actions{display:grid!important;grid-template-columns:1fr auto!important;gap:7px!important;margin-top:9px!important}.popup-v10-actions a{min-height:39px!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;margin:0!important;padding:8px 11px!important;border-radius:12px!important;font-size:12.5px!important;font-weight:780!important;background:#0767F2!important;color:#fff!important;box-shadow:0 6px 15px rgba(7,103,242,.17)!important}.popup-v10-actions a.secondary{background:#E8EEF7!important;color:#314159!important;box-shadow:none!important}.popup-v10-actions .lucide{width:15px!important;height:15px!important}
    @media(max-width:760px){.leaflet-popup{max-width:calc(100vw - 20px)!important}.leaflet-popup-content-wrapper{max-height:67dvh!important;border-radius:20px!important}.leaflet-popup-content{width:min(344px,calc(100vw - 38px))!important;max-height:67dvh!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch!important;scrollbar-width:thin;scrollbar-color:#B7C7DD transparent}.leaflet-popup-content::-webkit-scrollbar{width:4px}.leaflet-popup-content::-webkit-scrollbar-thumb{background:#B7C7DD;border-radius:99px}.popup-v10{width:100%!important;max-width:none!important}.popup-v10-head{padding:14px 49px 13px 12px!important;gap:9px!important}.popup-v10-head .cat-icon{width:38px!important;height:38px!important;border-radius:12px!important}.popup-v10-head .cat-icon .lucide{width:19px!important;height:19px!important}.popup-v10-head h3{font-size:18.5px!important;line-height:1.17!important}.popup-v10-head .category{font-size:10px!important;margin-top:4px!important}.popup-v10-body{padding:9px!important}.popup-quicklist{gap:6px!important}details.popup-fold{border-radius:13px!important}.popup-fold-toggle{min-height:51px!important;grid-template-columns:31px minmax(0,1fr) 24px!important;gap:8px!important;padding:7px 8px!important}.popup-fold-icon{width:30px!important;height:30px!important;border-radius:9px!important}.popup-fold-icon .lucide{width:16px!important;height:16px!important}.popup-fold-label{font-size:10px!important;margin-bottom:2px!important}.popup-fold-summary{font-size:15.2px!important;line-height:1.22!important}.popup-fold-chevron{width:24px!important;height:24px!important}.popup-fold-chevron .lucide{width:14px!important;height:14px!important}.popup-fold-detail{margin:0 8px 9px 47px!important;padding-top:8px!important;font-size:13.7px!important;line-height:1.48!important}.popup-v10-actions{margin-top:7px!important}.popup-v10-actions a{min-height:37px!important;font-size:11.5px!important;padding:7px 9px!important}.leaflet-popup-close-button{top:9px!important;right:9px!important;width:32px!important;height:32px!important}}
  `;
  document.head.appendChild(style);

  function sealLucide(){document.querySelectorAll('svg[data-lucide]').forEach(svg=>svg.removeAttribute('data-lucide'))}
  function hardenLucide(){
    if(!window.lucide||window.lucide.__travelSafe)return;
    const original=window.lucide.createIcons.bind(window.lucide);
    window.lucide.createIcons=(...args)=>{const result=original(...args);requestAnimationFrame(sealLucide);return result};
    window.lucide.__travelSafe=true;
    try{window.lucide.createIcons({attrs:{'stroke-width':1.8}})}catch{}
  }
  hardenLucide();

  function decoratePopup(pop){
    const root=pop?.getElement?.();if(!root)return;
    const close=root.querySelector('.leaflet-popup-close-button');
    if(close&&!close.dataset.designed){close.dataset.designed='1';close.innerHTML=icon('x');close.setAttribute('aria-label','Cerrar ficha')}
    try{window.lucide?.createIcons({attrs:{'stroke-width':1.8}})}catch{}
    root.querySelectorAll('details.popup-fold').forEach(detail=>{
      if(detail.dataset.bound)return;detail.dataset.bound='1';
      detail.addEventListener('toggle',()=>{
        if(detail.open){root.querySelectorAll('details.popup-fold[open]').forEach(other=>{if(other!==detail)other.open=false})}
      });
    });
    sealLucide();
  }

  try{popup=popupV10}catch{}
  try{markers.forEach((m,id)=>{const p=places.find(x=>x.id===id);if(!p)return;m.unbindPopup();m.bindPopup(popupV10(p),{maxWidth:440,autoPanPadding:[18,18],closeButton:true})})}catch{}

  if(typeof map!=='undefined'&&!map._popupAccordionV10){
    map._popupAccordionV10=true;
    map.on('popupopen',e=>{requestAnimationFrame(()=>decoratePopup(e.popup));setTimeout(()=>decoratePopup(e.popup),60)});
  }
  setTimeout(hardenLucide,100);setTimeout(sealLucide,300);
})();