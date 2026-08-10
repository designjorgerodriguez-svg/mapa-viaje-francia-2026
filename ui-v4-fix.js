(() => {
  /* Paleta semántica de categorías:
     azul = agua · verde = naturaleza · tierras = pueblos/patrimonio */
  const categoryColors={
    'Visita':'#8d6248',
    'Pueblo / costa':'#a06e4f',
    'Pueblo':'#b27b52',
    'Actividad':'#b09258',
    'Naturaleza':'#5f8d69',
    'Artesanía':'#98634f',
    'Gastronomía':'#b56d4b',
    'Pernocta':'#756a62',
    'Parking':'#66757b',
    'Playa con perro':'#4f91b8',
    'Baño interior':'#377fa7'
  };
  try{Object.assign(colors,categoryColors)}catch{}

  const markerIcons={
    'Visita':'landmark',
    'Pueblo / costa':'house',
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
  const lucideTag=name=>`<i data-lucide="${name}"></i>`;

  const style=document.createElement('style');
  style.id='travel-ui-v6-polish';
  style.textContent=`
    :root{
      --v6-bg:#1f3035;
      --v6-panel:#263a40;
      --v6-panel-deep:#213238;
      --v6-card:#30464d;
      --v6-card-2:#354e55;
      --v6-text:#fffdf9;
      --v6-soft:#edf0ed;
      --v6-muted:#c2cdca;
      --v6-line:rgba(255,255,255,.15);
      --v6-copper:#c1845b;
      --v6-copper-strong:#a96c45;
      --v6-copper-soft:#e2b28e;
      --v6-sand:#d8b77a;
      --v6-clay:#c98772;
      --v6-water:#62a6ca;
      --v6-nature:#73a57c;
    }

    html,body{background:var(--v6-bg)!important;color:var(--v6-text)!important}
    .sidebar{
      background:linear-gradient(180deg,#2a4147 0%,#23363c 100%)!important;
      border-right-color:rgba(255,255,255,.12)!important;
    }
    .sidebar h1{color:#fff!important;text-shadow:0 1px 0 rgba(0,0,0,.08)}
    .eyebrow{color:#d8b99e!important}
    .sub,.status{color:#c7d2d0!important}
    .legend{color:#aebdbb!important;border-top-color:rgba(255,255,255,.11)!important}

    /* Controles: neutros, sin competir con categorías */
    .tool{
      background:rgba(255,255,255,.095)!important;
      border-color:rgba(255,255,255,.14)!important;
      color:#fff!important;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.04)!important;
    }
    .tool:hover{background:rgba(255,255,255,.14)!important;border-color:rgba(255,255,255,.22)!important}
    .map-jump,.links a,.popup-actions a,.popup a{
      background:var(--v6-copper-strong)!important;
      color:#fff!important;
    }
    .links a.secondary,.popup-actions a.secondary,.popup a.secondary{
      background:rgba(255,255,255,.13)!important;
      color:#fff!important;
    }

    /* Tarjetas generales */
    .list{gap:10px!important}
    .place{
      background:rgba(255,255,255,.07)!important;
      border-color:rgba(255,255,255,.12)!important;
      border-radius:18px!important;
      box-shadow:0 5px 16px rgba(13,26,30,.09)!important;
    }
    .place:hover{background:rgba(255,255,255,.095)!important;border-color:rgba(255,255,255,.2)!important}
    .place.open{
      background:#324b52!important;
      border-color:rgba(216,183,122,.34)!important;
      box-shadow:0 14px 34px rgba(13,26,30,.16)!important;
    }
    .summary-title{color:#fff!important;font-weight:750!important}
    .summary-meta{color:#c5d0ce!important}
    .place-intro{color:#eef3f1!important}
    .card-chevron{background:rgba(255,255,255,.09)!important;color:#d9e1df!important}
    .place.open .card-chevron{background:rgba(193,132,91,.18)!important;color:#ffe7d4!important}

    /* Iconos de categoría: color limpio y reconocible */
    .cat-icon,.filter-icon{
      filter:none!important;
      background:var(--cat)!important;
      border:1px solid rgba(255,255,255,.24)!important;
      box-shadow:0 4px 12px rgba(15,28,31,.16),inset 0 1px 0 rgba(255,255,255,.13)!important;
    }
    .v4-map-marker{
      filter:none!important;
      border-color:rgba(255,255,255,.96)!important;
      box-shadow:0 5px 14px rgba(20,32,35,.24),inset 0 1px 0 rgba(255,255,255,.12)!important;
    }

    /* Resumen compacto: ya no usamos verde para perros */
    .mini-chip{
      background:rgba(255,255,255,.11)!important;
      color:#f8f9f7!important;
      border-color:rgba(255,255,255,.09)!important;
    }
    .mini-chip.dog{
      background:rgba(201,135,114,.19)!important;
      color:#ffe4da!important;
      border-color:rgba(201,135,114,.28)!important;
    }
    .mini-chip.warn{
      background:rgba(211,161,77,.22)!important;
      color:#ffe1aa!important;
      border-color:rgba(224,182,110,.3)!important;
    }

    /* Bloques importantes: más contraste y una banda lateral semántica */
    .info-card{
      position:relative;
      overflow:hidden;
      border-color:rgba(255,255,255,.13)!important;
      background:rgba(255,255,255,.065)!important;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.025)!important;
    }
    .info-card::before,.popup-info::before{
      content:'';position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:3px 0 0 3px;background:#c9d1cf;
    }
    .info-card.access{
      background:rgba(216,183,122,.14)!important;
      border-color:rgba(216,183,122,.26)!important;
    }
    .info-card.access::before,.popup-info.access::before{background:var(--v6-sand)}
    .info-card.access .info-card-head{color:#f1d5a0!important}
    .info-card.dog{
      background:rgba(201,135,114,.14)!important;
      border-color:rgba(201,135,114,.27)!important;
    }
    .info-card.dog::before,.popup-info.dog::before{background:var(--v6-clay)}
    .info-card.dog .info-card-head{color:#f1bca9!important}
    .info-card.warn{
      background:rgba(209,144,53,.22)!important;
      border-color:rgba(236,182,92,.38)!important;
      box-shadow:inset 0 0 0 1px rgba(255,204,122,.03)!important;
    }
    .info-card.warn::before,.popup-info.warn::before{background:#e4a649}
    .info-label{color:#f1e9df!important;font-weight:800!important}
    .info-card-value{color:#fff!important;font-weight:560!important}

    .detail-stack{gap:8px!important}
    .detail-row{
      background:rgba(255,255,255,.06)!important;
      border-color:rgba(255,255,255,.105)!important;
    }
    .detail-row:nth-child(1){
      background:rgba(226,178,142,.09)!important;
      border-color:rgba(226,178,142,.18)!important;
    }
    .detail-row:nth-child(1) .detail-icon{
      color:#f0c8a7!important;
      background:rgba(193,132,91,.17)!important;
    }
    .detail-row:nth-child(2) .detail-icon{
      color:#e2e7e5!important;
      background:rgba(255,255,255,.09)!important;
    }
    .detail-row.tip{
      background:rgba(210,151,73,.17)!important;
      border-color:rgba(224,179,104,.28)!important;
    }
    .detail-row.tip .detail-icon{
      color:#ffdaa0!important;
      background:rgba(210,151,73,.2)!important;
    }
    .detail-label{color:#d9e1df!important;font-weight:800!important}
    .detail-text{color:#fff!important}

    /* Menú de filtros: cobre cálido y más personalidad */
    .filter-fab{
      background:linear-gradient(135deg,#b77750,#9f6543)!important;
      border-color:rgba(255,230,211,.35)!important;
      color:#fff!important;
      box-shadow:0 9px 24px rgba(68,42,27,.22)!important;
    }
    .filter-fab:hover{background:linear-gradient(135deg,#c2865e,#aa6d48)!important}
    .filter-fab.has-filters{
      background:linear-gradient(135deg,#c98c61,#aa6842)!important;
      border-color:#e6b695!important;
    }
    .filter-fab .filter-state{
      color:#ffe5d4!important;
      border-left-color:rgba(255,255,255,.26)!important;
    }
    .filter-overlay{background:rgba(24,32,34,.78)!important}
    .filter-panel{
      background:#30383a!important;
      border-color:rgba(255,255,255,.15)!important;
      box-shadow:0 30px 80px rgba(15,21,22,.42)!important;
    }
    .filter-head{
      background:linear-gradient(135deg,rgba(193,132,91,.18),rgba(255,255,255,.015))!important;
      border-bottom-color:rgba(255,255,255,.11)!important;
    }
    .filter-title{color:#fff!important}
    .filter-subtitle{color:#d7cfca!important}
    .filter-option{
      background:rgba(255,255,255,.07)!important;
      border-color:rgba(255,255,255,.11)!important;
    }
    .filter-option:hover{background:rgba(255,255,255,.1)!important}
    .filter-option.selected{
      background:rgba(193,132,91,.19)!important;
      border-color:rgba(218,158,112,.5)!important;
      box-shadow:inset 3px 0 0 #c1845b!important;
    }
    .filter-option-name{color:#fff!important}
    .filter-option-count,.filter-summary{color:#cbd2cf!important}
    .filter-check{border-color:rgba(255,255,255,.25)!important;background:rgba(255,255,255,.055)!important}
    .filter-option.selected .filter-check{background:#b97950!important;border-color:#d89b71!important;color:#fff!important}
    .filter-actions{border-top-color:rgba(255,255,255,.11)!important;background:rgba(0,0,0,.06)!important}
    .filter-action.clear{background:rgba(255,255,255,.12)!important;color:#fff!important}
    .filter-action.apply{background:#b97950!important;color:#fff!important;box-shadow:0 5px 14px rgba(78,46,27,.18)!important}
    .filter-close{background:rgba(255,255,255,.09)!important;border-color:rgba(255,255,255,.14)!important;color:#fff!important}

    /* Popups */
    .leaflet-popup-content-wrapper{
      background:#2d4248!important;
      border-color:rgba(255,255,255,.17)!important;
      box-shadow:0 22px 55px rgba(17,31,36,.3)!important;
    }
    .leaflet-popup-tip{background:#2d4248!important}
    .popup h3{color:#fff!important}
    .popup .category{color:#d0d9d6!important}
    .popup .popup-desc{color:#f0f4f2!important}
    .popup-info{
      position:relative;
      overflow:hidden;
      background:rgba(255,255,255,.07)!important;
      border-color:rgba(255,255,255,.12)!important;
    }
    .popup-info.access{background:rgba(216,183,122,.15)!important;border-color:rgba(216,183,122,.27)!important}
    .popup-info.dog{background:rgba(201,135,114,.15)!important;border-color:rgba(201,135,114,.28)!important}
    .popup-info.warn{background:rgba(209,144,53,.23)!important;border-color:rgba(236,182,92,.38)!important}
    .popup-info-title{color:#f2e9df!important;font-weight:800!important}
    .popup-info-text{color:#fff!important}

    .popup-section{
      background:rgba(255,255,255,.06)!important;
      border-color:rgba(255,255,255,.1)!important;
    }
    .popup-section:nth-child(1){background:rgba(226,178,142,.09)!important;border-color:rgba(226,178,142,.18)!important}
    .popup-section:nth-child(1) .popup-section-icon{color:#f0c8a7!important;background:rgba(193,132,91,.17)!important}
    .popup-section:nth-child(2) .popup-section-icon{color:#e2e7e5!important;background:rgba(255,255,255,.09)!important}
    .popup-section.tip{background:rgba(210,151,73,.17)!important;border-color:rgba(224,179,104,.28)!important}
    .popup-section.tip .popup-section-icon{color:#ffdaa0!important;background:rgba(210,151,73,.2)!important}
    .popup-section-label{color:#d9e1df!important;font-weight:800!important}
    .popup-section-text{color:#fff!important}

    /* Botón de cerrar siempre visible */
    .leaflet-popup-close-button{
      z-index:40!important;
      width:32px!important;height:32px!important;line-height:29px!important;
      top:7px!important;right:7px!important;border-radius:999px!important;
      background:rgba(25,39,43,.92)!important;color:#fff!important;font-size:21px!important;text-align:center!important;
      backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
      border:1px solid rgba(255,255,255,.12)!important;
    }

    .leaflet-control-zoom a,.leaflet-control-layers{
      background:#2f4348!important;
      color:#fff!important;
      border-color:rgba(255,255,255,.13)!important;
    }
    .leaflet-control-layers-expanded{color:#fff!important}

    @media(max-width:760px){
      .sidebar{background:linear-gradient(180deg,#2a4147 0%,#23363c 100%)!important}
      .sheet-handle{background:linear-gradient(180deg,#2a4147 72%,rgba(42,65,71,.98))!important}
      .summary-title{font-size:15.3px!important}
      .summary-meta{color:#c7d2d0!important}

      /* Popup móvil: compacto, centrado y scroll interno */
      .leaflet-popup{max-width:calc(100vw - 22px)!important}
      .leaflet-popup-content-wrapper{max-height:66dvh!important;overflow:hidden!important;border-radius:18px!important}
      .leaflet-popup-content{
        width:min(326px,calc(100vw - 52px))!important;
        max-height:calc(66dvh - 18px)!important;
        overflow-y:auto!important;overflow-x:hidden!important;
        overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch!important;
        margin:11px 12px!important;padding:1px 5px 4px 0!important;
        scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.28) transparent;
      }
      .leaflet-popup-content::-webkit-scrollbar{width:4px}
      .leaflet-popup-content::-webkit-scrollbar-thumb{background:rgba(255,255,255,.28);border-radius:99px}
      .popup{width:100%!important;max-width:none!important}
      .popup-head{gap:9px!important;margin-bottom:8px!important;padding-right:31px!important}
      .popup-head .cat-icon{width:35px!important;height:35px!important}
      .popup-head .cat-icon .lucide{width:18px!important;height:18px!important}
      .popup h3{font-size:16.5px!important;line-height:1.2!important}
      .popup .category{font-size:9.5px!important;margin-top:3px!important}
      .popup .popup-desc{font-size:13px!important;line-height:1.46!important;margin-bottom:9px!important}
      .popup-info-grid{gap:6px!important;margin-bottom:6px!important}
      .popup-info{padding:8px 9px!important;border-radius:12px!important}
      .popup-info-title{font-size:9.5px!important;margin-bottom:4px!important}
      .popup-info-title .lucide{width:13px!important;height:13px!important}
      .popup-info-text{font-size:12.3px!important;line-height:1.4!important}
      .popup-sections{gap:5px!important;margin-top:6px!important}
      .popup-section{grid-template-columns:26px minmax(0,1fr)!important;gap:8px!important;padding:8px 9px!important;border-radius:12px!important}
      .popup-section-icon{width:26px!important;height:26px!important;border-radius:8px!important}
      .popup-section-icon .lucide{width:14px!important;height:14px!important}
      .popup-section-label{font-size:9.3px!important;margin-bottom:2px!important}
      .popup-section-text{font-size:12.2px!important;line-height:1.4!important}
      .popup-actions{gap:6px!important;margin-top:8px!important;padding-bottom:2px!important}
      .popup-actions a{font-size:11px!important;padding:7px 9px!important}

      .filter-panel{background:#30383a!important}
      .filter-head{background:linear-gradient(135deg,rgba(193,132,91,.22),rgba(255,255,255,.02))!important}
    }
  `;
  document.head.appendChild(style);

  /* Mantener contador de filtros sincronizado */
  updateFilterFab=function(){
    const fab=document.getElementById('filterFab');
    const state=document.getElementById('filterState');
    const n=selected.size;
    if(state)state.textContent=n===0?'Todos':`${n} activos`;
    if(fab)fab.classList.toggle('has-filters',n>0);
  };
  updateFilterFab();

  /* Actualizar marcadores con la nueva paleta aunque ya estuvieran renderizados */
  function refinedMarkerIcon(p){
    const c=categoryColors[p.category]||'#756a62';
    const name=markerIcons[p.category]||'map-pin';
    return L.divIcon({
      className:'',
      html:`<div class="v4-map-marker" style="width:36px;height:36px;border-radius:12px;display:grid;place-items:center;background:${c};color:#fff;border:1.5px solid rgba(255,255,255,.95)">${lucideTag(name)}</div>`,
      iconSize:[36,36],iconAnchor:[18,18],popupAnchor:[0,-19]
    });
  }
  try{
    markers.forEach((m,id)=>{
      const p=places.find(x=>x.id===id);
      if(!p)return;
      m.setIcon(refinedMarkerIcon(p));
      const pop=m.getPopup();
      if(pop){try{pop.setContent(popup(p))}catch{}}
    });
    renderPlaces();
  }catch{}

  function refreshLucideSoon(){
    const run=()=>{try{window.lucide&&window.lucide.createIcons({attrs:{'stroke-width':1.8}})}catch{}};
    requestAnimationFrame(run);setTimeout(run,500);setTimeout(run,1400);
  }
  refreshLucideSoon();

  /* En móvil, centrar horizontalmente el popup sin alterar el scroll vertical */
  if(typeof map!=='undefined'&&!map._travelPopupV6){
    map._travelPopupV6=true;
    map.on('popupopen',e=>{
      refreshLucideSoon();
      if(!window.matchMedia('(max-width:760px)').matches)return;
      const pop=e.popup;
      requestAnimationFrame(()=>{
        try{
          const latlng=pop.getLatLng();
          const point=map.latLngToContainerPoint(latlng);
          const size=map.getSize();
          const dx=point.x-(size.x/2);
          if(Math.abs(dx)>2)map.panBy([dx,0],{animate:true,duration:.18});
          const scroller=pop.getElement()?.querySelector('.leaflet-popup-content');
          if(scroller)scroller.scrollTop=0;
          setTimeout(()=>{try{pop._adjustPan()}catch{}},210);
        }catch{}
      });
    });
  }
})();