/** Context-only raster providers. Neither is a synchronized world-state observation. */
export const IMAGERY = {
  id: 'esri-world-imagery',
  name: 'Esri World Imagery',
  tile_url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  metadata_url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
  attribution: 'Esri, Vantor, Earthstar Geographics, and the GIS User Community',
  metadata_checked: '2026-09-08',
  acquisition_date: null,
  limitation: 'Satellite/aerial mosaic; capture dates vary and are not resolved per pixel here. Not live imagery. Displayed on a flat surface, not a photogrammetric 3D mesh.',
  analysis_use: 'Visual context only; not used in station metrics, building-height calculations or predictions.',
};
