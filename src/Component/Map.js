import React,{useState} from 'react';
import {MapContainer, TileLayer,Marker,Popup} from 'react-leaflet'
import '../CSS/Map.css'
import { showDataOnMap } from '../Utility/utility';

const Map = ({countries,center,zoom}) => {
  return (
    <div className="map">
       <MapContainer center={[center[0],center[1]]} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
         {showDataOnMap(countries)}
       </MapContainer>
    </div>
  )
}

export default Map