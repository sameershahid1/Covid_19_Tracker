import React,{useState} from 'react';
import {MapContainer, TileLayer,useMap,Marker,Popup} from 'react-leaflet'
import '../CSS/Map.css'
import { showDataOnMap } from '../Utility/utility';

function SetViewOnClick({ coords }) 
{
  //The useMap hook is used to travel dynamacialy to any location
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

const Map = ({countries,casesType,center,zoom}) => {
  return (
    <div className="map">
       <MapContainer center={[center[0],center[1]]} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
         {showDataOnMap(countries,casesType)}
          <Marker position={[center[0],center[1]]}>
             <Popup><h2>Selected Country</h2></Popup>
          </Marker>
          <SetViewOnClick coords={center}/>
       </MapContainer>
    </div>
  )
}

export default Map