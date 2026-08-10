(() => {
  const LUCIDE_SRC = 'https://unpkg.com/lucide@1.27.0/dist/umd/lucide.js';

  const categoryIcons = {
    'Visita':'landmark',
    'Pueblo / costa':'waves',
    'Pueblo':'house',
    'Actividad':'route',
    'Naturaleza':'mountain-snow',
    'Artesanía':'palette',
    'Gastronomía':'utensils',
    'Pernocta':'moon-star',
    'Parking':'circle-parking',
    'Playa con perro':'paw-print',
    'Baño interior':'droplets'
  };

  const iconEl = (name, cls='') => `<i data-lucide="${name}"${cls ? ` class="${cls}"` : ''}></i>`;
  const categoryIconName = c => categoryIcons[c] || 'map-pin';

  function installStyles(){
    if(document.getElementById('travel-theme-v4')) return;
    const style = document.createElement('style');
    style.id = 'travel-theme-v4';
    style.textContent = `
      :root{
        --v4-bg:#1b2b31;
        --v4-panel:#263b42;
        --v4-card:#2d454d;
        --v4-card-soft:#304a52;
        --v4-elevated:#365159;
        --v4-text:#f6f8f8;
        --v4-soft:#d7e0e1;
        --v4-muted:#9fb0b3;
        --v4-line:rgba(255,255,255,.105);
        --v4-accent:#89b9b2;
        --v4-accent-strong:#5d9d96;
        --v4-blue:#7ca9c8;
        --v4-green:#8fbea4;
        --v4-amber:#d2af77;
      }
      html,body{background:var(--v4-bg)!important;color:var(--v4-text)!important}
      .sidebar{background:linear-gradient(180deg,#294149 0%,#23383f 100%)!important}

      /* Lucide */
      .lucide{display:block;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
      .tool .lucide,.filter-fab .lucide{width:17px;height:17px}
      .sheet-arrow .lucide{width:22px;height:22px}

      /* List cards */
      .list{gap:9px!important}
      .place{
        background:rgba(255,255,255,.045)!important;
        border:1px solid var(--v4-line)!important;
        border-radius:18px!important;
        box-shadow:none!important;
        overflow:hidden;
      }
      .place:hover{background:rgba(255,255,255,.062)!important;border-color:rgba(255,255,255,.17)!important}
      .place.open{background:var(--v4-card)!important;border-color:rgba(137,185,178,.42)!important;box-shadow:0 12px 28px rgba(17,30,35,.15)!important}
      .place-summary{padding:13px!important;gap:11px!important;align-items:flex-start!important}
      .summary-title{font-size:15px!important;font-weight:720!important;line-height:1.25!important;letter-spacing:-.018em!important}
      .summary-meta{font-size:11.5px!important;line-height:1.35!important;margin-top:4px!important;color:var(--v4-muted)!important}
      .summary-chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
      .mini-chip{display:inline-flex;align-items:center;gap:5px;border-radius:999px;padding:5px 7px;font-size:10.5px;font-weight:650;line-height:1;background:rgba(255,255,255,.07);color:#dfe6e7;border:1px solid rgba(255,255,255,.055)}
      .mini-chip .lucide{width:12px;height:12px}
      .mini-chip.dog{background:rgba(99,157,125,.16);color:#c2e0cf;border-color:rgba(143,190,164,.17)}
      .mini-chip.warn{background:rgba(191,143,69,.16);color:#ead1a4;border-color:rgba(210,175,119,.18)}
      .cat-icon,.filter-icon{border-radius:12px!important;box-shadow:none!important;background:color-mix(in srgb,var(--cat) 80%,#40545a 20%)!important;border:1px solid rgba(255,255,255,.14)}
      .cat-icon{width:36px!important;height:36px!important}
      .filter-icon{width:42px!important;height:42px!important}
      .cat-icon .lucide{width:19px;height:19px}
      .filter-icon .lucide{width:21px;height:21px}
      .card-chevron{width:29px!important;height:29px!important;margin-top:3px;background:rgba(255,255,255,.055)!important;color:#a6b4b6!important}
      .card-chevron .lucide{width:16px;height:16px}
      .place.open .card-chevron{color:#f5f8f8!important;background:rgba(137,185,178,.16)!important}

      .place-body{padding:2px 14px 15px!important}
      .place-intro{font-size:14px!important;line-height:1.62!important;color:var(--v4-soft)!important;margin:2px 0 13px!important}
      .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0 0 9px}
      .info-card{border:1px solid var(--v4-line);border-radius:14px;padding:11px 11px 12px;background:rgba(255,255,255,.045)}
      .info-card.access{background:rgba(92,145,180,.11);border-color:rgba(124,169,200,.17)}
      .info-card.dog{background:rgba(99,157,125,.13);border-color:rgba(143,190,164,.17)}
      .info-card.warn{background:rgba(190,141,66,.13);border-color:rgba(210,175,119,.2)}
      .info-card-head{display:flex;align-items:center;gap:7px;margin-bottom:7px;color:#eff4f4}
      .info-card-head .lucide{width:16px;height:16px}
      .info-label{font-size:10.5px;text-transform:uppercase;letter-spacing:.075em;font-weight:780;color:#aebdbf}
      .info-card-value{font-size:13.5px;line-height:1.5;color:#edf2f2;font-weight:520}

      .detail-stack{display:grid;gap:7px;margin-top:8px}
      .detail-row{display:grid;grid-template-columns:31px minmax(0,1fr);gap:10px;padding:11px 11px;border-radius:14px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.065)}
      .detail-row.tip{background:rgba(137,185,178,.08);border-color:rgba(137,185,178,.16)}
      .detail-icon{width:31px;height:31px;display:grid;place-items:center;border-radius:10px;background:rgba(255,255,255,.07);color:#c6d5d6}
      .detail-icon .lucide{width:17px;height:17px}
      .detail-row.tip .detail-icon{color:#b9d8d3;background:rgba(137,185,178,.12)}
      .detail-label{display:block;font-size:10.5px;text-transform:uppercase;letter-spacing:.07em;font-weight:780;color:#9eafb1;margin:1px 0 4px}
      .detail-text{font-size:13.5px;line-height:1.52;color:#e2e9e9}
      .place-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,.08)}
      .place-actions a,.place-actions button{display:inline-flex;align-items:center;gap:6px;min-height:37px;font-size:11.5px!important;padding:8px 10px!important;border-radius:11px!important}
      .place-actions .lucide{width:14px;height:14px}

      /* Leaflet popup */
      .leaflet-popup-content-wrapper{background:#294149!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:20px!important;box-shadow:0 22px 55px rgba(17,31,36,.3)!important}
      .leaflet-popup-tip{background:#294149!important}
      .leaflet-popup-content{margin:17px!important}
      .leaflet-popup-close-button{font-size:23px!important;color:#a9b8ba!important;right:7px!important;top:6px!important}
      .popup{width:min(390px,76vw)!important}
      .popup-head{display:grid;grid-template-columns:auto minmax(0,1fr);gap:11px;align-items:center;padding-right:28px;margin-bottom:11px}
      .popup-head .cat-icon{width:39px!important;height:39px!important}
      .popup-head .cat-icon .lucide{width:20px;height:20px}
      .popup h3{display:block!important;font-size:18px!important;line-height:1.22!important;letter-spacing:-.025em!important;margin:0!important;font-weight:750!important}
      .popup .category{font-size:10.5px!important;line-height:1.2!important;margin:4px 0 0!important;color:#a2b4b6!important;letter-spacing:.08em!important}
      .popup .popup-desc{font-size:14px!important;line-height:1.58!important;color:#dce5e5!important;margin:0 0 12px!important}
      .popup-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0 0 8px}
      .popup-info{padding:11px;border-radius:14px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.045)}
      .popup-info.access{background:rgba(92,145,180,.11);border-color:rgba(124,169,200,.18)}
      .popup-info.dog{background:rgba(99,157,125,.13);border-color:rgba(143,190,164,.18)}
      .popup-info.warn{background:rgba(190,141,66,.14);border-color:rgba(210,175,119,.2)}
      .popup-info-title{display:flex;align-items:center;gap:6px;font-size:10.5px;text-transform:uppercase;letter-spacing:.065em;font-weight:780;color:#b5c4c5;margin-bottom:6px}
      .popup-info-title .lucide{width:15px;height:15px}
      .popup-info-text{font-size:13px;line-height:1.48;color:#f0f4f4}
      .popup-sections{display:grid;gap:7px;margin-top:8px}
      .popup-section{display:grid;grid-template-columns:29px minmax(0,1fr);gap:9px;padding:10px;border-radius:13px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06)}
      .popup-section.tip{background:rgba(137,185,178,.08);border-color:rgba(137,185,178,.15)}
      .popup-section-icon{width:29px;height:29px;border-radius:9px;display:grid;place-items:center;background:rgba(255,255,255,.065);color:#c7d5d6}
      .popup-section-icon .lucide{width:16px;height:16px}
      .popup-section-label{display:block;font-size:10px;letter-spacing:.065em;text-transform:uppercase;font-weight:780;color:#9eafb1;margin-bottom:3px}
      .popup-section-text{font-size:13px;line-height:1.48;color:#e6ecec}
      .popup-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:11px}
      .popup-actions a{display:inline-flex!important;align-items:center;gap:6px;font-size:12px!important;padding:8px 10px!important;border-radius:10px!important;margin:0!important}
      .popup-actions .lucide{width:14px;height:14px}

      /* Filters */
      .filter-option-name{font-size:14px!important}
      .filter-option-count{font-size:11px!important}
      .filter-check .lucide{width:15px;height:15px}
      .filter-fab{background:rgba(41,65,73,.95)!important;border-color:rgba(255,255,255,.14)!important}
      .filter-fab.has-filters{background:rgba(75,121,116,.96)!important;border-color:rgba(137,185,178,.45)!important}

      @media(max-width:760px){
        .sidebar h1{font-size:23px!important}
        .sub{font-size:13px!important}
        .summary-title{font-size:15px!important}
        .summary-meta{font-size:11.5px!important}
        .mini-chip{font-size:10.5px!important;padding:5px 7px!important}
        .place-summary{padding:12px!important}
        .place-body{padding:2px 12px 14px!important}
        .place-intro{font-size:14px!important;line-height:1.62!important}
        .info-grid{grid-template-columns:1fr!important}
        .info-card-value,.detail-text{font-size:13.5px!important}
        .detail-label,.info-label{font-size:10.5px!important}
        .filter-option-name{font-size:14px!important}
        .filter-option-count{font-size:11px!important}
        .popup{width:min(350px,84vw)!important}
        .leaflet-popup-content{margin:15px!important}
        .popup h3{font-size:17px!important}
        .popup .popup-desc{font-size:13.5px!important;line-height:1.58!important}
        .popup-info-grid{grid-template-columns:1fr!important}
        .popup-info-text,.popup-section-text{font-size:13px!important}
        .popup-info-title,.popup-section-label{font-size:10.5px!important}
        .popup-actions a{font-size:12px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function isWarning(text=''){
    return /⚠️|no confirmado|consultar|no he encontrado|no especifica|preguntar/i.test(text);
  }

  function compactDogsV4(t=''){
    if(/prohib/i.test(t)) return 'No';
    if(isWarning(t)) return 'Consultar';
    if(/sí|admitid|bienvenid|aceptad|tolerad/i.test(t)) return 'Sí';
    return 'Consultar';
  }

  function compactAccessV4(t=''){
    const price=t.match(/\d+(?:[,.]\d+)?\s*€/);
    if(/gratis|gratuit|acceso libre/i.test(t)) return price?`Gratis / ${price[0]}`:'Gratis';
    if(price) return price[0];
    if(/de pago|pago/i.test(t)) return 'De pago';
    return 'Consultar';
  }

  function refreshLucide(){
    if(!window.lucide) return;
    requestAnimationFrame(()=>{
      try{window.lucide.createIcons({attrs:{'stroke-width':1.8}})}catch(e){}
    });
  }

  function modernCategoryIcon(c, cls='cat-icon'){
    return `<span class="${cls}" style="--cat:${colors[c]||'#5f9f98'}">${iconEl(categoryIconName(c))}</span>`;
  }

  function modernPopup(p){
    const dogWarn=isWarning(p.dogs), accessWarn=isWarning(p.access);
    return `<div class="popup">
      <div class="popup-head">${modernCategoryIcon(p.category)}<div><h3>${p.name}</h3><div class="category">${p.category}</div></div></div>
      <p class="popup-desc">${p.desc}</p>
      <div class="popup-info-grid">
        <div class="popup-info access ${accessWarn?'warn':''}"><div class="popup-info-title">${iconEl('ticket')} Entrada / precio</div><div class="popup-info-text">${p.access}</div></div>
        <div class="popup-info dog ${dogWarn?'warn':''}"><div class="popup-info-title">${iconEl('paw-print')} Perros</div><div class="popup-info-text">${p.dogs}</div></div>
      </div>
      <div class="popup-sections">
        <div class="popup-section"><span class="popup-section-icon">${iconEl('sparkles')}</span><div><span class="popup-section-label">Qué merece la pena</span><div class="popup-section-text">${p.highlights}</div></div></div>
        <div class="popup-section"><span class="popup-section-icon">${iconEl('clock')}</span><div><span class="popup-section-label">Tiempo recomendado</span><div class="popup-section-text">${p.time}</div></div></div>
        <div class="popup-section tip"><span class="popup-section-icon">${iconEl('lightbulb')}</span><div><span class="popup-section-label">Consejo</span><div class="popup-section-text">${p.tip}</div></div></div>
      </div>
      <div class="popup-actions"><a href="${gmaps(p)}" target="_blank" rel="noopener">${iconEl('navigation')} Google Maps</a><a class="secondary" href="${p.source}" target="_blank" rel="noopener">${iconEl('book-open')} Fuente</a></div>
    </div>`;
  }

  function modernMarkerIcon(p){
    return L.divIcon({
      className:'',
      html:`<div class="v4-map-marker" style="width:36px;height:36px;border-radius:12px;display:grid;place-items:center;background:${colors[p.category]||'#5f9f98'};color:#fff;border:1.5px solid rgba(255,255,255,.9);box-shadow:0 5px 14px rgba(28,45,50,.26),inset 0 0 0 1px rgba(255,255,255,.12)">${iconEl(categoryIconName(p.category))}</div>`,
      iconSize:[36,36],iconAnchor:[18,18],popupAnchor:[0,-19]
    });
  }

  function upgradeStaticControls(){
    const locate=document.getElementById('locate');
    const fit=document.getElementById('fit');
    const install=document.getElementById('installApp');
    const filterFab=document.getElementById('filterFab');
    const close=document.getElementById('filterClose');
    const down=document.getElementById('sheetDown');
    const up=document.getElementById('sheetUp');
    if(locate) locate.innerHTML=`${iconEl('locate-fixed')}Mi ubicación`;
    if(fit) fit.innerHTML=`${iconEl('scan')}Ver visibles`;
    if(install) install.innerHTML=`${iconEl('download')}Instalar`;
    if(filterFab) filterFab.innerHTML=`${iconEl('list-filter')}<span>Filtros</span><span class="filter-state" id="filterState">${selected.size===0?'Todos':selected.size+' activos'}</span>`;
    if(close) close.innerHTML=iconEl('x');
    if(down) down.innerHTML=iconEl('chevron-down');
    if(up) up.innerHTML=iconEl('chevron-up');
  }

  function installAppOverrides(){
    iconHtml = modernCategoryIcon;
    popup = modernPopup;

    renderPlaces = function(){
      list.innerHTML='';
      places.filter(visible).forEach(p=>{
        const el=document.createElement('article');
        el.className='place';
        const dogShort=compactDogsV4(p.dogs), accessShort=compactAccessV4(p.access);
        const dogWarn=dogShort==='Consultar';
        el.innerHTML=`<button class="place-summary" type="button" aria-expanded="false">
          ${modernCategoryIcon(p.category)}
          <span class="summary-copy">
            <span class="summary-title">${p.name}</span>
            <span class="summary-meta">${p.category} · ${p.time}</span>
            <span class="summary-chips">
              <span class="mini-chip">${iconEl('ticket')} ${accessShort}</span>
              <span class="mini-chip ${dogWarn?'warn':'dog'}">${iconEl('paw-print')} ${dogShort}</span>
            </span>
          </span>
          <span class="card-chevron">${iconEl('chevron-down')}</span>
        </button>
        <div class="place-body">
          <p class="place-intro">${p.desc}</p>
          <div class="info-grid">
            <div class="info-card access ${isWarning(p.access)?'warn':''}"><div class="info-card-head">${iconEl('ticket')}<span class="info-label">Entrada / precio</span></div><div class="info-card-value">${p.access}</div></div>
            <div class="info-card dog ${isWarning(p.dogs)?'warn':''}"><div class="info-card-head">${iconEl('paw-print')}<span class="info-label">Perros</span></div><div class="info-card-value">${p.dogs}</div></div>
          </div>
          <div class="detail-stack">
            <div class="detail-row"><span class="detail-icon">${iconEl('sparkles')}</span><div><span class="detail-label">Qué merece la pena</span><div class="detail-text">${p.highlights}</div></div></div>
            <div class="detail-row"><span class="detail-icon">${iconEl('clock')}</span><div><span class="detail-label">Tiempo recomendado</span><div class="detail-text">${p.time}</div></div></div>
            <div class="detail-row tip"><span class="detail-icon">${iconEl('lightbulb')}</span><div><span class="detail-label">Consejo</span><div class="detail-text">${p.tip}</div></div></div>
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
          refreshLucide();
        });
        el.querySelector('.map-jump').addEventListener('click',()=>{
          map.closePopup();
          const goToPoint=()=>{map.invalidateSize();map.setView([p.lat,p.lng],14,{animate:true})};
          if(mobile()){setSheet('collapsed');setTimeout(goToPoint,320)}else goToPoint();
        });
        list.appendChild(el);
      });
      markers.forEach((m,id)=>{
        const p=places.find(x=>x.id===id);
        visible(p)?(!map.hasLayer(m)&&m.addTo(map)):map.removeLayer(m);
      });
      updateFilterFab();
      refreshLucide();
    };

    renderFilterMenu = function(){
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
      const visibleCount=draftSelected.size===0?places.length:places.filter(p=>draftSelected.has(p.category)).length;
      filterSummary.textContent=draftSelected.size===0?`Mostrando todos los lugares (${places.length}).`:`${draftSelected.size} tipos seleccionados · ${visibleCount} lugares visibles.`;
      refreshLucide();
    };

    places.forEach(p=>{
      const m=markers.get(p.id);
      if(!m) return;
      m.setIcon(modernMarkerIcon(p));
      m.unbindPopup();
      m.bindPopup(modernPopup(p),{maxWidth:430});
      m.on('popupopen',()=>refreshLucide());
    });

    upgradeStaticControls();
    renderPlaces();
    updateFilterFab();
    refreshLucide();
    map.on('moveend zoomend',()=>refreshLucide());
  }

  function boot(){
    installStyles();
    if(window.lucide){installAppOverrides();return;}
    const script=document.createElement('script');
    script.src=LUCIDE_SRC;
    script.async=true;
    script.onload=installAppOverrides;
    script.onerror=()=>console.warn('No se pudo cargar Lucide; se mantiene la interfaz base.');
    document.head.appendChild(script);
  }

  boot();
})();