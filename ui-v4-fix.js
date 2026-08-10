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

  // El diseño definitivo vive en theme.css. Eliminamos capas antiguas
  // inyectadas por versiones previas para evitar estilos que se pisan.
  ['travel-theme-v3','travel-theme-v4','travel-ui-v7-bold-blue'].forEach(id=>{
    document.getElementById(id)?.remove();
  });

  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content','#075FE4');
})();