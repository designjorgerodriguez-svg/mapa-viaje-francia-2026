(() => {
  const style=document.createElement('style');
  style.id='travel-ui-v5-refinement';
  style.textContent=`
    :root{
      --v5-text:#fbfdfd;
      --v5-soft:#e5eded;
      --v5-muted:#b8c7c9;
      --v5-line:rgba(255,255,255,.14);
      --v5-blue:#91b8d0;
      --v5-green:#9bc8ae;
      --v5-amber:#dfbd82;
    }

    /* Más contraste general */
    .sidebar h1,.summary-title,.filter-title,.filter-option-name{color:var(--v5-text)!important}
    .sub,.status,.summary-meta,.filter-option-count,.filter-summary,.legend{color:var(--v5-muted)!important}
    .place{background:rgba(255,255,255,.06)!important;border-color:rgba(255,255,255,.115)!important}
    .place:hover{background:rgba(255,255,255,.082)!important;border-color:rgba(255,255,255,.19)!important}
    .place.open{background:#314c54!important;border-color:rgba(143,190,183,.52)!important}
    .place-intro{color:var(--v5-soft)!important}

    /* Fichas desplegadas: secciones más diferenciadas */
    .info-card{border-color:var(--v5-line)!important}
    .info-card.access{background:rgba(110,158,194,.17)!important;border-color:rgba(145,184,208,.26)!important}
    .info-card.dog{background:rgba(106,169,135,.18)!important;border-color:rgba(155,200,174,.27)!important}
    .info-card.warn{background:rgba(191,145,72,.20)!important;border-color:rgba(223,189,130,.30)!important}
    .info-label{color:#d2dfe0!important}
    .info-card-value{color:#f8fbfb!important}

    .detail-row{background:rgba(255,255,255,.052)!important;border-color:rgba(255,255,255,.09)!important}
    .detail-row:nth-child(1){background:rgba(109,151,186,.105)!important;border-color:rgba(145,184,208,.18)!important}
    .detail-row:nth-child(1) .detail-icon{color:#cbe1ee!important;background:rgba(145,184,208,.13)!important}
    .detail-row:nth-child(2){background:rgba(255,255,255,.058)!important}
    .detail-row.tip{background:rgba(194,153,83,.115)!important;border-color:rgba(223,189,130,.20)!important}
    .detail-row.tip .detail-icon{color:#f0d9ad!important;background:rgba(223,189,130,.12)!important}
    .detail-label{color:#c2d0d2!important}
    .detail-text{color:#f0f5f5!important}

    .mini-chip{background:rgba(255,255,255,.095)!important;color:#f2f6f6!important;border-color:rgba(255,255,255,.08)!important}
    .mini-chip.dog{background:rgba(106,169,135,.19)!important;color:#d7ecdf!important;border-color:rgba(155,200,174,.20)!important}
    .mini-chip.warn{background:rgba(191,145,72,.20)!important;color:#f0d6a8!important;border-color:rgba(223,189,130,.22)!important}

    /* Menú de filtros */
    .filter-panel{background:#243c44!important;border-color:rgba(255,255,255,.15)!important}
    .filter-head,.filter-actions{border-color:rgba(255,255,255,.11)!important}
    .filter-subtitle{color:#b9c9cb!important}
    .filter-option{background:rgba(255,255,255,.065)!important;border-color:rgba(255,255,255,.11)!important}
    .filter-option:hover{background:rgba(255,255,255,.09)!important}
    .filter-option.selected{background:rgba(103,158,151,.24)!important;border-color:rgba(143,190,183,.48)!important}
    .filter-check{border-color:rgba(255,255,255,.24)!important}
    .filter-action.clear{background:rgba(255,255,255,.11)!important;color:#f4f7f7!important}
    .filter-action.apply{background:#609f98!important;color:white!important}
    .tool{border-color:rgba(255,255,255,.13)!important;background:rgba(255,255,255,.085)!important;color:#f7fafa!important}

    /* Popup del mapa: más contraste y bloques más visuales */
    .leaflet-popup-content-wrapper{background:#274149!important;border-color:rgba(255,255,255,.16)!important}
    .leaflet-popup-tip{background:#274149!important}
    .popup h3{color:#fff!important}
    .popup .category{color:#bdd0d2!important}
    .popup .popup-desc{color:#edf3f3!important}
    .popup-info{border-color:rgba(255,255,255,.11)!important}
    .popup-info.access{background:rgba(108,157,193,.18)!important;border-color:rgba(145,184,208,.25)!important}
    .popup-info.dog{background:rgba(105,168,134,.19)!important;border-color:rgba(155,200,174,.26)!important}
    .popup-info.warn{background:rgba(191,145,72,.21)!important;border-color:rgba(223,189,130,.29)!important}
    .popup-info-title{color:#d2dfe0!important}
    .popup-info-text{color:#fbfdfd!important}
    .popup-section{background:rgba(255,255,255,.052)!important;border-color:rgba(255,255,255,.09)!important}
    .popup-section:nth-child(1){background:rgba(109,151,186,.105)!important;border-color:rgba(145,184,208,.17)!important}
    .popup-section:nth-child(1) .popup-section-icon{color:#cee3ef!important;background:rgba(145,184,208,.13)!important}
    .popup-section.tip{background:rgba(194,153,83,.115)!important;border-color:rgba(223,189,130,.20)!important}
    .popup-section.tip .popup-section-icon{color:#f1dbae!important;background:rgba(223,189,130,.12)!important}
    .popup-section-label{color:#c2d0d2!important}
    .popup-section-text{color:#f1f5f5!important}
    .popup-actions a.secondary{background:rgba(255,255,255,.12)!important;color:#f4f7f7!important}

    /* El botón de cerrar queda siempre visible */
    .leaflet-popup-close-button{
      z-index:40!important;
      width:32px!important;
      height:32px!important;
      line-height:29px!important;
      top:7px!important;
      right:7px!important;
      border-radius:999px!important;
      background:rgba(22,40,46,.86)!important;
      color:#fff!important;
      font-size:21px!important;
      text-align:center!important;
      backdrop-filter:blur(6px);
      -webkit-backdrop-filter:blur(6px);
    }

    @media(max-width:760px){
      /* Popup móvil: centrado horizontalmente, menos alto y con scroll propio */
      .leaflet-popup{max-width:calc(100vw - 22px)!important}
      .leaflet-popup-content-wrapper{
        max-height:66dvh!important;
        overflow:hidden!important;
        border-radius:18px!important;
      }
      .leaflet-popup-content{
        width:min(326px,calc(100vw - 52px))!important;
        max-height:calc(66dvh - 18px)!important;
        overflow-y:auto!important;
        overflow-x:hidden!important;
        overscroll-behavior:contain!important;
        -webkit-overflow-scrolling:touch!important;
        margin:11px 12px!important;
        padding:1px 5px 4px 0!important;
        scrollbar-width:thin;
        scrollbar-color:rgba(255,255,255,.22) transparent;
      }
      .leaflet-popup-content::-webkit-scrollbar{width:4px}
      .leaflet-popup-content::-webkit-scrollbar-thumb{background:rgba(255,255,255,.22);border-radius:99px}
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

      /* Lista móvil: contraste un poco mayor sin hacerla pesada */
      .place-summary{padding:12px 11px!important}
      .place-intro{color:#edf3f3!important}
      .info-card-value,.detail-text{color:#f7fafa!important}
    }
  `;
  document.head.appendChild(style);

  /* Mantener contador de filtros sincronizado */
  updateFilterFab = function(){
    const fab=document.getElementById('filterFab');
    const state=document.getElementById('filterState');
    const n=selected.size;
    if(state) state.textContent=n===0?'Todos':`${n} activos`;
    if(fab) fab.classList.toggle('has-filters',n>0);
  };
  updateFilterFab();

  /* En móvil, al abrir un popup centramos SOLO su eje horizontal.
     Leaflet sigue gestionando automáticamente el desplazamiento vertical. */
  if(typeof map!=='undefined' && !map._travelPopupV5){
    map._travelPopupV5=true;
    map.on('popupopen',e=>{
      if(!window.matchMedia('(max-width:760px)').matches) return;
      const popup=e.popup;
      requestAnimationFrame(()=>{
        try{
          const latlng=popup.getLatLng();
          const point=map.latLngToContainerPoint(latlng);
          const size=map.getSize();
          const dx=point.x-(size.x/2);
          if(Math.abs(dx)>2) map.panBy([dx,0],{animate:true,duration:.18});
          const scroller=popup.getElement()?.querySelector('.leaflet-popup-content');
          if(scroller) scroller.scrollTop=0;
          setTimeout(()=>{try{popup._adjustPan()}catch{}},210);
        }catch{}
      });
    });
  }
})();