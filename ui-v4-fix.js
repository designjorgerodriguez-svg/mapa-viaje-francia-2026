(() => {
  const style=document.createElement('style');
  style.textContent=`
    .v4-map-marker .lucide{width:19px;height:19px;display:block}
    .filter-fab .lucide{flex:0 0 auto}
  `;
  document.head.appendChild(style);

  updateFilterFab = function(){
    const fab=document.getElementById('filterFab');
    const state=document.getElementById('filterState');
    const n=selected.size;
    if(state) state.textContent=n===0?'Todos':`${n} activos`;
    if(fab) fab.classList.toggle('has-filters',n>0);
  };

  updateFilterFab();
})();