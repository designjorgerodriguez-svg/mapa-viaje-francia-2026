(() => {
  const LUCIDE_SRC = 'https://unpkg.com/lucide@1.27.0';

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
    'Playa con perro':'waves',
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

  const iconEl = (name, cls='') => `<i data-lucide="${name}"${cls ? ` class="${cls}"` : ''}></i>`;
  const categoryIconName = category => categoryIcons[category] || 'map-pin';

  function isUncertain(text=''){
    return /⚠️|no confirmado|consultar|no he encontrado|no especifica|preguntar|confirmar|comprobar allí/i.test(text);
  }

  function isPaid(text=''){
    return /\d+(?:[,.]\d+)?\s*€|\bde pago\b|\bpago\b|\btarifa\b/i.test(text);
  }

  function dogsNeedAttention(text=''){
    return isUncertain(text) || /prohib|no admit|no se admit|no permitido|sin perros/i.test(text);
  }

  function accessNeedsAttention(text=''){
    return isUncertain(text) || isPaid(text);
  }

  function compactAccess(text=''){
    const price=text.match(/\d+(?:[,.]\d+)?\s*€/);
    const free=/gratis|gratuit|acceso libre|gratuito|entrada libre/i.test(text);
    const paid=isPaid(text);
    if(free && paid) return price ? `Gratis · ${price[0]} opc.` : 'Gratis · extras';
    if(free) return 'Gratis';
    if(price) return price[0];
    if(paid) return 'De pago';
    if(isUncertain(text)) return 'Consultar';
    return 'Consultar';
  }

  function compactDogs(text=''){
    if(isUncertain(text)) return 'Consultar';
    if(/prohib|no admit|no se admit|no permitido|sin perros/i.test(text)) return 'No';
    if(/sí|admitid|bienvenid|aceptad|tolerad|autorizad/i.test(text)) {
      if(/con correa|condiciones|zona|sector|horario|temporada|excepto|solo|únicamente/i.test(text)) return 'Sí, condiciones';
      return 'Sí';
    }
    return 'Consultar';
  }

  function shortHighlights(text=''){
    const parts=text.split('·').map(s=>s.trim()).filter(Boolean);
    let out=parts.length ? parts.slice(0,2).join(' · ') : text.trim();
    if(out.length>56) out=out.slice(0,53).trimEnd()+'…';
    return out || 'Ver detalles';
  }

  function modernCategoryIcon(category, cls='cat-icon'){
    return `<span class="${cls}" style="--cat:${categoryColors[category]||'#7C3AED'}">${iconEl(categoryIconName(category))}</span>`;
  }

  function fold({group,type,iconName,label,summary,detail,attention=false}){
    return `<details class="popup-fold ${type}${attention?' attention':''}" name="${group}">
      <summary class="popup-fold-toggle">
        <span class="popup-fold-icon">${iconEl(iconName)}</span>
        <span class="popup-fold-copy">
          <span class="popup-fold-label">${label}</span>
          <span class="popup-fold-summary">${summary}</span>
        </span>
        <span class="popup-fold-chevron">${iconEl('chevron-down')}</span>
      </summary>
      <div class="popup-fold-body"><div class="popup-fold-detail">${detail}</div></div>
    </details>`;
  }

  function modernPopup(p){
    const group=`popup-${String(p.id).replace(/[^a-z0-9_-]/gi,'')}`;
    return `<div class="popup popup-clean">
      <div class="popup-clean-head">
        ${modernCategoryIcon(p.category)}
        <div class="popup-clean-title"><h3>${p.name}</h3><div class="category">${p.category}</div></div>
      </div>
      <div class="popup-clean-body">
        <div class="popup-quicklist">
          ${fold({group,type:'access',iconName:'ticket',label:'Entrada / precio',summary:compactAccess(p.access),detail:p.access,attention:accessNeedsAttention(p.access)})}
          ${fold({group,type:'dogs',iconName:'paw-print',label:'Perros',summary:compactDogs(p.dogs),detail:p.dogs,attention:dogsNeedAttention(p.dogs)})}
          ${fold({group,type:'highlights',iconName:'sparkles',label:'Qué merece la pena',summary:shortHighlights(p.highlights),detail:`<p>${p.desc}</p><p><strong>Destacados:</strong> ${p.highlights}</p>`})}
          ${fold({group,type:'time',iconName:'clock',label:'Tiempo recomendado',summary:p.time,detail:`Reserva aproximadamente <strong>${p.time}</strong> para disfrutarlo con calma.`})}
          ${fold({group,type:'tip',iconName:'lightbulb',label:'Consejo',summary:'Ver consejo práctico',detail:p.tip})}
        </div>
        <div class="popup-actions popup-clean-actions">
          <a href="${gmaps(p)}" target="_blank" rel="noopener">${iconEl('navigation')} Google Maps</a>
          <a class="secondary" href="${p.source}" target="_blank" rel="noopener">${iconEl('book-open')} Fuente</a>
        </div>
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

  function validatePendingIcons(){
    if(!window.lucide?.icons) return;
    document.querySelectorAll('i[data-lucide]').forEach(el=>{
      const name=el.getAttribute('data-lucide');
      if(!window.lucide.icons[name]) el.setAttribute('data-lucide','circle');
    });
  }

  function renderIcons(){
    if(!window.lucide) return;
    validatePendingIcons();
    try{
      window.lucide.createIcons({icons:window.lucide.icons,attrs:{'stroke-width':1.9}});
      document.querySelectorAll('svg[data-lucide]').forEach(svg=>svg.removeAttribute('data-lucide'));
    }catch(err){
      console.warn('Lucide no pudo renderizar algún icono.',err);
    }
  }

  function upgradeStaticControls(){
    const locate=document.getElementById('locate');
    const fit=document.getElementById('fit');
    const install=document.getElementById('installApp');
    const fab=document.getElementById('filterFab');
    const close=document.getElementById('filterClose');
    const down=document.getElementById('sheetDown');
    const up=document.getElementById('sheetUp');

    if(locate) locate.innerHTML=`${iconEl('locate-fixed')}Mi ubicación`;
    if(fit) fit.innerHTML=`${iconEl('scan')}Ver visibles`;
    if(install) install.innerHTML=`${iconEl('download')}Instalar`;
    if(fab) fab.innerHTML=`${iconEl('list-filter')}<span>Filtros</span><span class="filter-state" id="filterState">${selected.size===0?'Todos':selected.size+' activos'}</span>`;
    if(close) close.innerHTML=iconEl('x');
    if(down) down.innerHTML=iconEl('chevron-down');
    if(up) up.innerHTML=iconEl('chevron-up');
  }

  function decoratePopup(pop){
    const root=pop?.getElement?.();
    if(!root) return;

    const close=root.querySelector('.leaflet-popup-close-button');
    if(close&&!close.dataset.designed){
      close.dataset.designed='1';
      close.innerHTML=iconEl('x');
      close.setAttribute('aria-label','Cerrar ficha');
    }

    root.querySelectorAll('details.popup-fold').forEach(detail=>{
      if(detail.dataset.bound) return;
      detail.dataset.bound='1';
      detail.addEventListener('toggle',()=>{
        if(detail.open){
          root.querySelectorAll('details.popup-fold[open]').forEach(other=>{
            if(other!==detail) other.open=false;
          });
        }
        setTimeout(()=>{
          try{pop.update();pop._adjustPan()}catch{}
        },260);
      });
    });

    renderIcons();
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
          if(opening) closeOtherCards(el);
          el.classList.toggle('open',opening);
          summary.setAttribute('aria-expanded',String(opening));
          if(opening) setTimeout(()=>el.scrollIntoView({block:'nearest',behavior:'smooth'}),80);
          renderIcons();
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
      renderIcons();
    };

    renderFilterMenu=function(){
      filterMenu.innerHTML='';
      cats.forEach(c=>{
        const count=places.filter(p=>p.category===c).length;
        const button=document.createElement('button');
        button.type='button';
        button.className='filter-option'+(draftSelected.has(c)?' selected':'');
        button.innerHTML=`${modernCategoryIcon(c,'filter-icon')}<span class="filter-option-copy"><span class="filter-option-name">${c}</span><span class="filter-option-count">${count} ${count===1?'lugar':'lugares'}</span></span><span class="filter-check">${iconEl('check')}</span>`;
        button.addEventListener('click',()=>{draftSelected.has(c)?draftSelected.delete(c):draftSelected.add(c);renderFilterMenu()});
        filterMenu.appendChild(button);
      });
      const count=draftSelected.size===0?places.length:places.filter(p=>draftSelected.has(p.category)).length;
      filterSummary.textContent=draftSelected.size===0?`Mostrando todos los lugares (${places.length}).`:`${draftSelected.size} tipos seleccionados · ${count} lugares visibles.`;
      renderIcons();
    };

    places.forEach(p=>{
      const marker=markers.get(p.id);
      if(!marker) return;
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
    renderIcons();
  }

  function boot(){
    if(window.lucide){installUI();return;}
    const script=document.createElement('script');
    script.src=LUCIDE_SRC;
    script.async=true;
    script.onload=installUI;
    script.onerror=()=>console.warn('No se pudo cargar Lucide; se mantiene la interfaz base.');
    document.head.appendChild(script);
  }

  boot();
})();