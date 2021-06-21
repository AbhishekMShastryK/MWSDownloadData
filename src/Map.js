import React from 'react'
import './Map.css'
import { MapContainer, TileLayer,Marker, Popup } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';


function Map({coord1,coord2} ) {
  
    return (
        <div className="map">
            <MapContainer center={coord1 } zoom={10}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
                    <MarkerClusterGroup >
                <Marker position={coord1} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                    <Popup>
                    <div className="para3">
                    <p><b>Node1 location</b> <br/>Latitude: {coord1[0]} | Longitude: {coord1[1]}</p>
                    </div>
                    </Popup>
                </Marker>
                <Marker position={coord2} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                    <Popup>
                    <div className="para3">
                    <p><b>Node2 location </b><br/>Latitude: {coord2[0]} | Longitude: {coord2[1]}</p>
                    </div>
                    </Popup>
                </Marker>
                </MarkerClusterGroup>

            </MapContainer>
        </div>
    )
}

export default Map;