(() => {
  /*
   * Iconos SVG embebidos.
   * Se usan los trazos de Lucide directamente para que la interfaz no dependa
   * de un CDN, de createIcons() ni de una segunda pasada sobre el DOM.
   */
  const ICONS = {
    landmark:'<path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>',
    house:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    route:'<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    mountain:'<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
    palette:'<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',
    utensils:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    moon:'<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',
    'circle-parking':'<circle cx="12" cy="12" r="10"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>',
    'paw-print':'<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>',
    droplets:'<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
    ticket:'<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
    sparkles:'<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',
    clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    lightbulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    'chevron-down':'<path d="m6 9 6 6 6-6"/>',
    'chevron-up':'<path d="m18 15-6-6-6 6"/>',
    navigation:'<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
    'book-open':'<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0 0 22 17V5a2 2 0 0 0-1.999-2L16 3.002A5 5 0 0 0 12 5a5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 1.999 2H8a5 5 0 0 1 4 2 5 5 0 0 1 4-2z"/>',
    'map-pin':'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    'locate-fixed':'<line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/>',
    scan:'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>',
    download:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    'list-filter':'<path d="M2 5h20"/><path d="M6 12h12"/><path d="M9 19h6"/>',
    x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    check:'<path d="M20 6 9 17l-5-5"/>'
  };

  const categoryIcons = {
    'Visita':'landmark',
    'Pueblo / costa':'house',
    'Pueblo':'house',
    'Actividad':'route',
    'Naturaleza':'mountain',
    'Artesanía':'palette',
    'Gastronomía':'utensils',
    'Pernocta':'moon',
    'Parking':'circle-parking',
    'Playa con perro':'paw-print',
    'Baño interior':'droplets'
  };

  const categoryColors = {
    'Visita':'#7C3AED',
    'Pueblo / costa':'#F97316',
    'Pueblo':'#D97706',
    'Actividad':'#E11D8A',
    'Naturaleza':'#22A65A',
    'Artesanía':'#DB5E80',
    'Gastronomía':'#F59E0B',
    'Pernocta':'#8B5CF6',
    'Parking':'#64748B',
    'Playa con perro':'#087CF3',
    'Baño interior':'#00A7E8'
  };

  function iconEl(name, cls=''){
    const body=ICONS[name]||ICONS['map-pin'];
    const className=`lucide lucide-${name}${cls?` ${cls}`:''}`;
    return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }

  const categoryIconName=category=>categoryIcons[category]||'map-pin';
  const isUncertain=(text='')=>/⚠️|no confirmado|consultar|no he encontrado|no especifica|preguntar|confirmar|comprobar allí/i.test(text);
  const isPaid=(text='')=>/\d+(?:[,.]\d+)?\s*€|\bde pago\b|\bpago\b|\btarifa\b/i.test(text);
  const dogsNeedAttention=(text='')=>isUncertain(text)||/prohib|no admit|no se admit|no permitido|sin perros/i.test(text);
  const accessNeedsAttention=(text='')=>isUncertain(text)||isPaid(text);

  function compactAccess(text=''){
    const price=text.match(/\d+(?:[,.]\d+)?\s*€/);
    const free=/gratis|gratuit|acceso libre|gratuito|entrada libre/i.test(text);
    const paid=isPaid(text);
    if(free&&paid)return price?`Gratis · ${price[0]} opc.`:'Gratis · extras';
    if(free)return'Gratis';
    if(price)return price[0];
    if(paid)return'De pago';
    return'Consultar';
  }

  function compactDogs(text=''){
    if(isUncertain(text))return'Consultar';
    if(/prohib|no admit|no se admit|no permitido|sin perros/i.test(text))return'No';
    if(/sí|admitid|bienvenid|aceptad|tolerad|autorizad/i.test(text)){
      return /con correa|condiciones|zona|sector|horario|temporada|excepto|solo|únicamente/i.test(text)?'Sí, condiciones':'Sí';
    }
    return'Consultar';
  }

  function shortHighlights(text=''){
    const parts=text.split('·').map(s=>s.trim()).filter(Boolean);
    let out=parts.length?parts.slice(0,2).join(' · '):text.trim();
    if(out.length>56)out=out.slice(0,53).trimEnd()+'…';
    return out||'Ver detalles';
  }

  function modernCategoryIcon(category,cls='cat-icon'){
    return `<span class="${cls}" style="--cat:${categoryColors[category]||'#7C3AED'}">${iconEl(categoryIconName(category))}</span>`;
  }

  function fold({group,type,iconName,label,summary,detail,attention=false}){
    return `<details class="popup-fold ${type}${attention?' attention':''}" name="${group}">
      <summary class="popup-fold-toggle">
        <span class="popup-fold-icon">${iconEl(iconName)}</span>
        <span class="popup-fold-copy"><span class="popup-fold-label">${label}</span><span class="popup-fold-summary">${summary}</span></span>
        <span class="popup-fold-chevron">${iconEl('chevron-down')}</span>
      </summary>
      <div class="popup-fold-body"><div class="popup-fold-detail">${detail}</div></div>
    </details>`;
  }

  function modernPopup(p){
    const group=`popup-${String(p.id).replace(/[^a-z0-9_-]/gi,'')}`;
    return `<div class="popup popup-clean">
      <div class="popup-clean-head">${modernCategoryIcon(p.category)}<div class="popup-clean-title"><h3>${p.name}</h3><div class="category">${p.category}</div></div></div>
      <div class="popup-clean-body">
        <div class="popup-quicklist">
          ${fold({group,type:'access',iconName:'ticket',label:'Entrada / precio',summary:compactAccess(p.access),detail:p.access,attention:accessNeedsAttention(p.access)})}
          ${fold({group,type:'dogs',iconName:'paw-print',label:'Perros',summary:compactDogs(p.dogs),detail:p.dogs,attention:dogsNeedAttention(p.dogs)})}
          ${fold({group,type:'highlights',iconName:'sparkles',label:'Qué merece la pena',summary:shortHighlights(p.highlights),detail:`<p>${p.desc}</p><p><strong>Destacados:</strong> ${p.highlights}</p>`})}
          ${fold({group,type:'time',iconName:'clock',label:'Tiempo recomendado',summary:p.time,detail:`Reserva aproximadamente <strong>${p.time}</strong> para disfrutarlo con calma.`})}
          ${fold({group,type:'tip',iconName:'lightbulb',label:'Consejo',summary:'Ver consejo práctico',detail:p.tip})}
        </div>
        <div class="popup-actions popup-clean-actions"><a href="${gmaps(p)}" target="_blank" rel="noopener">${iconEl('navigation')} Google Maps</a><a class="secondary" href="${p.source}" target="_blank" rel="noopener">${iconEl('book-open')} Fuente</a></div>
      </div>
    </div>`;
  }

  function markerIcon(p){
    return L.divIcon({
      className:'',
      html:`<div class="map-marker-clean" style="--marker:${categoryColors[p.category]||'#7C3AED'}">${iconEl(categoryIconName(p.category))}</div>`,
      iconSize:[38,38],iconAnchor:[19,19],popupAnchor:[0,-20]
    });
  }

  /* Los iconos ya vienen renderizados como SVG. Se conserva la función para
     que los eventos existentes puedan llamarla sin hacer trabajo extra. */
  function renderIcons(){}

  function upgradeStaticControls(){
    const locate=document.getElementById('locate');
    const fit=document.getElementById('fit');
    const install=document.getElementById('installApp');
    const fab=document.getElementById('filterFab');
    const close=document.getElementById('filterClose');
    const down=document.getElementById('sheetDown');
    const up=document.getElementById('sheetUp');

    if(locate)locate.innerHTML=`${iconEl('locate-fixed')}Mi ubicación`;
    if(fit)fit.innerHTML=`${iconEl('scan')}Ver visibles`;
    if(install)install.innerHTML=`${iconEl('download')}Instalar`;
    if(fab){
      const oldIcon=fab.querySelector('svg, i[data-lucide]');
      if(oldIcon)oldIcon.outerHTML=iconEl('list-filter');
    }
    if(close)close.innerHTML=iconEl('x');
    if(down)down.innerHTML=iconEl('chevron-down');
    if(up)up.innerHTML=iconEl('chevron-up');
  }

  function decoratePopup(pop){
    const root=pop?.getElement?.();
    if(!root)return;
    const close=root.querySelector('.leaflet-popup-close-button');
    if(close&&!close.dataset.designed){
      close.dataset.designed='1';
      close.innerHTML=iconEl('x');
      close.setAttribute('aria-label','Cerrar ficha');
    }
    root.querySelectorAll('details.popup-fold').forEach(detail=>{
      if(detail.dataset.bound)return;
      detail.dataset.bound='1';
      detail.addEventListener('toggle',()=>{
        if(detail.open){
          root.querySelectorAll('details.popup-fold[open]').forEach(other=>{if(other!==detail)other.open=false});
        }
        setTimeout(()=>{try{pop.update();pop._adjustPan()}catch{}},260);
      });
    });
  }

  function installUI(){
    try{Object.assign(colors,categoryColors)}catch{}
    iconHtml=modernCategoryIcon;
    popup=modernPopup;

    renderPlaces=function(){
      list.innerHTML='';
      places.filter(visible).forEach(p=>{
        const el=document.createElement('article');
        el.className='place';
        const dogShort=compactDogs(p.dogs);
        const accessShort=compactAccess(p.access);
        const accessAlert=accessNeedsAttention(p.access);
        const dogAlert=dogsNeedAttention(p.dogs);

        el.innerHTML=`<button class="place-summary" type="button" aria-expanded="false">
          ${modernCategoryIcon(p.category)}
          <span class="summary-copy">
            <span class="summary-title">${p.name}</span>
            <span class="summary-meta">${p.category} · ${p.time}</span>
            <span class="summary-chips">
              <span class="mini-chip${accessAlert?' attention':''}">${iconEl('ticket')} ${accessShort}</span>
              <span class="mini-chip${dogAlert?' attention':''}">${iconEl('paw-print')} ${dogShort}</span>
            </span>
          </span>
          <span class="card-chevron">${iconEl('chevron-down')}</span>
        </button>
        <div class="place-body">
          <p class="place-intro">${p.desc}</p>
          <div class="info-grid">
            <div class="info-card${accessAlert?' attention':''}"><div class="info-card-head">${iconEl('ticket')}<span class="info-label">Entrada / precio</span></div><div class="info-card-value">${p.access}</div></div>
            <div class="info-card${dogAlert?' attention':''}"><div class="info-card-head">${iconEl('paw-print')}<span class="info-label">Perros</span></div><div class="info-card-value">${p.dogs}</div></div>
          </div>
          <div class="detail-stack">
            <div class="detail-row"><span class="detail-icon">${iconEl('sparkles')}</span><div><span class="detail-label">Qué merece la pena</span><div class="detail-text">${p.highlights}</div></div></div>
            <div class="detail-row"><span class="detail-icon">${iconEl('clock')}</span><div><span class="detail-label">Tiempo recomendado</span><div class="detail-text">${p.time}</div></div></div>
            <div class="detail-row"><span class="detail-icon">${iconEl('lightbulb')}</span><div><span class="detail-label">Consejo</span><div class="detail-text">${p.tip}</div></div></div>
          </div>
          <div class="place-actions links"><button class="map-jump" type="button">${iconEl('map-pin')} Ver en el mapa</button><a href="${gmaps(p)}" target="_blank" rel="noopener">${iconEl('navigation')} Google Maps</a><a class="secondary" href="${p.source}" target="_blank" rel="noopener">${iconEl('book-open')} Fuente</a></div>
        </div>`;

        const summary=el.querySelector('.place-summary');
        summary.addEventListener('click',()=>{
          const opening=!el.classList.contains('open');
          if(opening)closeOtherCards(el);
          el.classList.toggle('open',opening);
          summary.setAttribute('aria-expanded',String(opening));
          if(opening)setTimeout(()=>el.scrollIntoView({block:'nearest',behavior:'smooth'}),80);
        });

        el.querySelector('.map-jump').addEventListener('click',()=>{
          map.closePopup();
          const go=()=>{map.invalidateSize();map.setView([p.lat,p.lng],14,{animate:true})};
          if(mobile()){setSheet('collapsed');setTimeout(go,320)}else go();
        });
        list.appendChild(el);
      });

      markers.forEach((m,id)=>{
        const p=places.find(x=>x.id===id);
        visible(p)?(!map.hasLayer(m)&&m.addTo(map)):map.removeLayer(m);
      });
      updateFilterFab();
    };

    renderFilterMenu=function(){
      filterMenu.innerHTML='';
      cats.forEach(c=>{
        const count=places.filter(p=>p.category===c).length;
        const b=document.createElement('button');
        b.type='button';
        b.className='filter-option'+(draftSelected.has(c)?' selected':'');
        b.innerHTML=`${modernCategoryIcon(c,'filter-icon')}<span class="filter-option-copy"><span class="filter-option-name">${c}</span><span class="filter-option-count">${count} ${count===1?'lugar':'lugares'}</span></span><span class="filter-check">${iconEl('check')}</span>`;
        b.addEventListener('click',()=>{draftSelected.has(c)?draftSelected.delete(c):draftSelected.add(c);renderFilterMenu()});
        filterMenu.appendChild(b);
      });
      const count=draftSelected.size===0?places.length:places.filter(p=>draftSelected.has(p.category)).length;
      filterSummary.textContent=draftSelected.size===0?`Mostrando todos los lugares (${places.length}).`:`${draftSelected.size} tipos seleccionados · ${count} lugares visibles.`;
    };

    places.forEach(p=>{
      const marker=markers.get(p.id);
      if(!marker)return;
      marker.setIcon(markerIcon(p));
      marker.unbindPopup();
      marker.bindPopup(modernPopup(p),{maxWidth:440,autoPanPadding:[18,18],closeButton:true});
    });

    if(!map._cleanPopupHandler){
      map._cleanPopupHandler=true;
      map.on('popupopen',e=>requestAnimationFrame(()=>decoratePopup(e.popup)));
    }

    upgradeStaticControls();
    renderPlaces();
    updateFilterFab();
  }

  installUI();
})();