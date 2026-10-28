import React from 'react';
import ReactDOM from 'react-dom/client';
import PlanningExplorer from './planning/PlanningExplorer';
import 'maplibre-gl/dist/maplibre-gl.css';

// Public entry has no import path to the private research workspace.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><PlanningExplorer/></React.StrictMode>,
);
