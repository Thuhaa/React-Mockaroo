import logo from './logo.svg';
import './App.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import useSWR from 'swr';
import React from 'react'


const fetcher = (...args) => fetch(...args).then(response => response.json());
function App() {
  const url = 'https://my.api.mockaroo.com/houses.json?key=002c85f0';
  const {data, error} = useSWR(url, {fetcher});
  const [activeHouse, setActiveHouse] = React.useState(null);
  const houses = data && !error ? data.slice(0,100) : [];
  return (
    <MapContainer center={[0, 0]} zoom={2}>
    <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />

    {houses.map(houses => <Marker 
      key={houses.id} 
      position={[houses.latitude, houses.longitude]}
      onClick = {()=>{
        setActiveHouse(houses);
      }}/>)}
    {activeHouse && (
      <Popup
      key={activeHouse.id}
      position={[ 
        activeHouse.latitude,
        activeHouse.longitude
        ]}>
        <div>
        <img src={activeHouse.picture}/>
        <h4>Apartment Type: {activeHouse.apartment_type}</h4>
        <h4>Price:{activeHouse.price_per_unit}</h4>
        </div></Popup>)}
    </MapContainer>
  );
}

export default App;
