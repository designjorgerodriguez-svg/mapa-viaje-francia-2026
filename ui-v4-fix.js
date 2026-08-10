(() => {
  const categoryColors={
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
  try{Object.assign(colors,categoryColors)}catch{}

  const style=document.createElement('style');
  style.id='travel-ui-v7-bold-blue';
  style.textContent=`
    :root{
      --ui-blue:#0767F2;
      --ui-blue-dark:#0751C9;
      --ui-blue-deep:#073C99;
      --ui-blue-soft:#DCEBFF;
      --ui-ink:#13233A;
      --ui-muted:#607089;
      --ui-line:#D8E2F0;
      --ui-white:#FFFFFF;
      --ui-bg:#EEF4FC;
      --ui-warm:#FFB454;
      --ui-coral:#FF796B;
      --ui-purple:#8B5CF6;
    }

    html,body,button{font-family:'Manrope',ui-sans-serif,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important}
    html,body{background:var(--ui-bg)!important}

    /* Menú principal: azul fuerte, luminoso y con más presencia */
    .sidebar{
      background:linear-gradient(165deg,#0A6AF5 0%,#0759D9 52%,#0647B2 100%)!important;
      border-right:0!important;
      box-shadow:10px 0 35px rgba(10,67,151,.18)!important;
    }
    .eyebrow{color:#CFE2FF!important;font-size:11px!important;letter-spacing:.14em!important}
    .sidebar h1{color:#fff!important;font-size:30px!important;line-height:1.05!important;letter-spacing:-.045em!important;font-weight:800!important}
    .sub{color:#DCEAFF!important;font-size:14px!important;line-height:1.45!important}
    .status{color:#DCEAFF!important;font-size:12.5px!important}
    .legend{color:#C8DCFF!important;border-top-color:rgba(255,255,255,.18)!important;font-size:11.5px!important}

    .toolbar{gap:9px!important}
    .tool{
      min-height:42px!important;
      background:rgba(255,255,255,.15)!important;
      border:1px solid rgba(255,255,255,.24)!important;
      color:#fff!important;
      border-radius:13px!important;
      font-size:12.5px!important;
      font-weight:750!important;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.08)!important;
    }
    .tool:hover{background:rgba(255,255,255,.22)!important;border-color:rgba(255,255,255,.34)!important}

    /* Tarjetas: minimalistas, limpias y con texto mayor */
    .list{gap:10px!important}
    .place{
      background:rgba(255,255,255,.12)!important;
      border:1px solid rgba(255,255,255,.16)!important;
      border-radius:18px!important;
      box-shadow:none!important;
    }
    .place:hover{background:rgba(255,255,255,.17)!important;border-color:rgba(255,255,255,.25)!important}
    .place-summary{padding:13px!important;gap:11px!important}
    .summary-title{color:#fff!important;font-size:15.5px!important;font-weight:780!important;line-height:1.24!important;letter-spacing:-.02em!important}
    .summary-meta{color:#D6E6FF!important;font-size:11.5px!important;line-height:1.35!important;margin-top:4px!important}
    .mini-chip{background:rgba(255,255,255,.16)!important;color:#fff!important;border-color:rgba(255,255,255,.14)!important;font-size:10.5px!important}
    .mini-chip.dog{background:rgba(255,121,107,.2)!important;color:#FFF3F0!important;border-color:rgba(255,176,167,.28)!important}
    .mini-chip.warn{background:rgba(255,180,84,.25)!important;color:#FFF5DA!important;border-color:rgba(255,206,141,.34)!important}
    .card-chevron{background:rgba(255,255,255,.14)!important;color:#fff!important}

    .place.open{
      background:#F8FBFF!important;
      border-color:#fff!important;
      box-shadow:0 14px 35px rgba(5,49,118,.23)!important;
    }
    .place.open .summary-title{color:var(--ui-ink)!important}
    .place.open .summary-meta{color:#6A7A90!important}
    .place.open .mini-chip{background:#EDF3FC!important;color:#34455E!important;border-color:#DDE7F4!important}
    .place.open .mini-chip.dog{background:#FFF0ED!important;color:#A44D42!important;border-color:#FFD8D1!important}
    .place.open .mini-chip.warn{background:#FFF4DE!important;color:#946019!important;border-color:#FFE0A6!important}
    .place.open .card-chevron{background:#E6EEFA!important;color:#34516F!important}
    .place-intro{font-size:14.5px!important;line-height:1.62!important;color:#31435C!important}

    .info-grid{gap:9px!important}
    .info-card{border-radius:14px!important;padding:12px!important;background:#fff!important;border:1px solid var(--ui-line)!important}
    .info-card.access{background:#FFF8EA!important;border-color:#F4D9A6!important}
    .info-card.dog{background:#FFF1EE!important;border-color:#F3C1BA!important}
    .info-card.warn{background:#FFF1CF!important;border-color:#F0C66D!important}
    .info-card-head{color:#26364C!important}
    .info-label{color:#53647C!important;font-size:10.5px!important;font-weight:800!important}
    .info-card-value{color:#16263C!important;font-size:13.8px!important;line-height:1.5!important}

    .detail-stack{gap:8px!important}
    .detail-row{background:#F2F6FC!important;border-color:#DFE8F3!important;border-radius:14px!important;padding:12px!important}
    .detail-row:nth-child(1){background:#F4F0FF!important;border-color:#DED2FF!important}
    .detail-row:nth-child(1) .detail-icon{background:#E8DFFF!important;color:#6F43D6!important}
    .detail-row:nth-child(2){background:#EEF6FF!important;border-color:#D4E7FF!important}
    .detail-row:nth-child(2) .detail-icon{background:#DDEEFF!important;color:#1768C5!important}
    .detail-row.tip{background:#FFF4E8!important;border-color:#FFD7AD!important}
    .detail-row.tip .detail-icon{background:#FFE4C8!important;color:#CC6A13!important}
    .detail-label{color:#61728A!important;font-size:10.5px!important;font-weight:800!important}
    .detail-text{color:#1D3048!important;font-size:13.8px!important;line-height:1.52!important}

    .place-actions{border-top-color:#E1E9F3!important}
    .place-actions a,.place-actions button,.links a,.map-jump{background:var(--ui-blue)!important;color:#fff!important;border-radius:11px!important}
    .place-actions a.secondary,.links a.secondary{background:#E9EFF8!important;color:#35506E!important}

    /* Filtros: azul eléctrico, muy visible */
    .filter-fab{
      background:linear-gradient(135deg,#0A73FF,#075ADB)!important;
      border:1px solid rgba(255,255,255,.65)!important;
      color:#fff!important;
      box-shadow:0 10px 28px rgba(7,85,210,.32)!important;
      font-size:13px!important;
      min-height:44px!important;
    }
    .filter-fab:hover{background:linear-gradient(135deg,#1480FF,#0862E9)!important}
    .filter-fab.has-filters{background:linear-gradient(135deg,#005CEB,#0646B9)!important;border-color:#fff!important}
    .filter-fab .filter-state{color:#DDEAFF!important;border-left-color:rgba(255,255,255,.34)!important}

    .filter-overlay{background:rgba(8,32,72,.52)!important;backdrop-filter:blur(10px)!important;-webkit-backdrop-filter:blur(10px)!important}
    .filter-panel{
      background:linear-gradient(165deg,#0A6AF5 0%,#0755CC 100%)!important;
      border:1px solid rgba(255,255,255,.28)!important;
      border-radius:24px!important;
      box-shadow:0 32px 90px rgba(3,47,118,.34)!important;
    }
    .filter-head{background:rgba(255,255,255,.07)!important;border-bottom-color:rgba(255,255,255,.18)!important}
    .filter-title{color:#fff!important;font-size:23px!important;font-weight:800!important;letter-spacing:-.035em!important}
    .filter-subtitle{color:#DCEAFF!important;font-size:12px!important}
    .filter-close{background:rgba(255,255,255,.14)!important;border-color:rgba(255,255,255,.22)!important;color:#fff!important}
    .filter-list{gap:8px!important}
    .filter-option{
      background:rgba(255,255,255,.11)!important;
      border:1px solid rgba(255,255,255,.17)!important;
      border-radius:16px!important;
      padding:11px 12px!important;
    }
    .filter-option:hover{background:rgba(255,255,255,.16)!important}
    .filter-option.selected{background:#fff!important;border-color:#fff!important;box-shadow:0 8px 22px rgba(3,50,123,.18)!important}
    .filter-option-name{color:#fff!important;font-size:14.5px!important;font-weight:780!important}
    .filter-option-count{color:#D5E5FF!important;font-size:11.5px!important}
    .filter-option.selected .filter-option-name{color:#172A47!important}
    .filter-option.selected .filter-option-count{color:#6D7E94!important}
    .filter-check{border-color:rgba(255,255,255,.36)!important;background:rgba(255,255,255,.08)!important}
    .filter-option.selected .filter-check{background:var(--ui-blue)!important;border-color:var(--ui-blue)!important;color:#fff!important}
    .filter-summary{color:#DBE9FF!important;font-size:11.5px!important}
    .filter-actions{background:rgba(2,48,117,.2)!important;border-top-color:rgba(255,255,255,.17)!important}
    .filter-action{min-height:43px!important;font-size:13px!important;border-radius:12px!important}
    .filter-action.clear{background:rgba(255,255,255,.14)!important;color:#fff!important}
    .filter-action.apply{background:#fff!important;color:#0754C7!important;font-weight:800!important}

    /* Popups del mapa: blancos, visuales y con alto contraste */
    .leaflet-popup-content-wrapper{background:#fff!important;color:var(--ui-ink)!important;border:1px solid #DCE5F1!important;border-radius:20px!important;box-shadow:0 22px 55px rgba(20,45,82,.24)!important}
    .leaflet-popup-tip{background:#fff!important}
    .leaflet-popup-close-button{background:#EAF1FB!important;color:#25415F!important;border:1px solid #D7E3F1!important}
    .popup h3{color:#12243C!important;font-size:19px!important;font-weight:800!important}
    .popup .category{color:#61738C!important;font-size:10.5px!important}
    .popup .popup-desc{color:#334760!important;font-size:14px!important;line-height:1.58!important}
    .popup-info{background:#F5F8FC!important;border-color:#DEE7F2!important}
    .popup-info.access{background:#FFF7E9!important;border-color:#F3D8A5!important}
    .popup-info.dog{background:#FFF0ED!important;border-color:#F2C1B9!important}
    .popup-info.warn{background:#FFF1CE!important;border-color:#F0C66C!important}
    .popup-info-title{color:#56677F!important;font-weight:800!important}
    .popup-info-text{color:#182A42!important;font-size:13.3px!important}
    .popup-section{background:#F3F7FC!important;border-color:#E0E8F2!important}
    .popup-section:nth-child(1){background:#F4F0FF!important;border-color:#DFD4FF!important}
    .popup-section:nth-child(1) .popup-section-icon{background:#E8DFFF!important;color:#6E43D2!important}
    .popup-section:nth-child(2){background:#EEF6FF!important;border-color:#D5E7FF!important}
    .popup-section:nth-child(2) .popup-section-icon{background:#DDEEFF!important;color:#1769C5!important}
    .popup-section.tip{background:#FFF4E8!important;border-color:#FFD7AD!important}
    .popup-section.tip .popup-section-icon{background:#FFE4C8!important;color:#CC6A13!important}
    .popup-section-label{color:#61728A!important;font-weight:800!important}
    .popup-section-text{color:#213650!important;font-size:13.3px!important}
    .popup-actions a{background:var(--ui-blue)!important;color:#fff!important}
    .popup-actions a.secondary{background:#EAF0F8!important;color:#35516E!important}

    /* Controles Leaflet coherentes con el azul */
    .leaflet-control-zoom a,.leaflet-control-layers{background:#fff!important;color:#17416F!important;border-color:#D8E4F2!important}
    .leaflet-control-zoom,.leaflet-control-layers{box-shadow:0 7px 20px rgba(20,58,104,.18)!important}
    .leaflet-control-layers-expanded{color:#203A59!important}
    .gps-dot{background:#087CF3!important;box-shadow:0 0 0 5px rgba(8,124,243,.22)!important}

    /* Categorías: azul solo agua, verde solo naturaleza; resto vivos y variados */
    .cat-icon,.filter-icon{filter:none!important;background:var(--cat)!important;border:1px solid rgba(255,255,255,.35)!important;box-shadow:0 5px 13px rgba(20,38,68,.18)!important}
    .v4-map-marker{filter:none!important;border:2px solid #fff!important;box-shadow:0 6px 16px rgba(21,49,80,.25)!important}

    @media(max-width:760px){
      .sidebar{background:linear-gradient(165deg,#0A6AF5 0%,#0756D0 58%,#0647B2 100%)!important;box-shadow:0 -16px 42px rgba(4,57,137,.27)!important}
      .sheet-handle{background:linear-gradient(180deg,#0A68F0 72%,rgba(9,93,216,.98))!important}
      .grabber{background:rgba(255,255,255,.55)!important}
      .sidebar h1{font-size:26px!important}
      .sub{font-size:13.5px!important}
      .summary-title{font-size:15.5px!important}
      .summary-meta{font-size:11.5px!important}
      .filter-panel{border-radius:0!important}
      .filter-title{font-size:22px!important}
      .filter-option-name{font-size:14.5px!important}

      .leaflet-popup{max-width:calc(100vw - 22px)!important}
      .leaflet-popup-content-wrapper{max-height:66dvh!important;overflow:hidden!important;border-radius:18px!important}
      .leaflet-popup-content{width:min(326px,calc(100vw - 52px))!important;max-height:calc(66dvh - 18px)!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch!important;margin:11px 12px!important;padding:1px 5px 4px 0!important;scrollbar-width:thin;scrollbar-color:#B8C9DE transparent}
      .leaflet-popup-content::-webkit-scrollbar{width:4px}
      .leaflet-popup-content::-webkit-scrollbar-thumb{background:#B8C9DE;border-radius:99px}
      .popup{width:100%!important;max-width:none!important}
      .popup h3{font-size:17px!important}
      .popup .popup-desc{font-size:13.2px!important;line-height:1.48!important}
      .popup-info-text,.popup-section-text{font-size:12.5px!important}
    }
  `;
  document.head.appendChild(style);

  updateFilterFab=function(){
    const fab=document.getElementById('filterFab');
    const state=document.getElementById('filterState');
    const n=selected.size;
    if(state)state.textContent=n===0?'Todos':`${n} activos`;
    if(fab)fab.classList.toggle('has-filters',n>0);
  };
  updateFilterFab();

  function refresh(){
    try{window.lucide&&window.lucide.createIcons({attrs:{'stroke-width':1.85}})}catch{}
  }
  requestAnimationFrame(refresh);setTimeout(refresh,450);setTimeout(refresh,1400);

  if(typeof map!=='undefined'&&!map._travelPopupV7){
    map._travelPopupV7=true;
    map.on('popupopen',e=>{
      refresh();
      if(!window.matchMedia('(max-width:760px)').matches)return;
      const pop=e.popup;
      requestAnimationFrame(()=>{
        try{
          const point=map.latLngToContainerPoint(pop.getLatLng());
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

  /* Reaplicar la paleta a marcadores y tarjetas cuando Lucide termine de cargar */
  const repaint=()=>{
    try{
      Object.assign(colors,categoryColors);
      markers.forEach((m,id)=>{
        const p=places.find(x=>x.id===id);
        if(!p)return;
        const iconName={Visita:'landmark','Pueblo / costa':'house',Pueblo:'house',Actividad:'route',Naturaleza:'mountain-snow',Artesanía:'palette',Gastronomía:'utensils',Pernocta:'moon-star',Parking:'circle-parking','Playa con perro':'paw-print','Baño interior':'droplets'}[p.category]||'map-pin';
        m.setIcon(L.divIcon({className:'',html:`<div class="v4-map-marker" style="width:36px;height:36px;border-radius:12px;display:grid;place-items:center;background:${categoryColors[p.category]||'#64748B'};color:#fff"><i data-lucide="${iconName}"></i></div>`,iconSize:[36,36],iconAnchor:[18,18],popupAnchor:[0,-19]}));
      });
      renderPlaces();
      refresh();
    }catch{}
  };
  setTimeout(repaint,700);setTimeout(repaint,1700);
})();