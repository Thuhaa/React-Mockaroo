import logo from './logo.svg';
import './App.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import useSWR from 'swr';


const fetcher = (...args) => fetch(...args).then(response => response.json());
function App() {
  const url = 'https://my.api.mockaroo.com/houses.json?key=002c85f0';
  const {data, error} = useSWR(url, {fetcher});

  const houses = data && !error ? data.slice(0,100) : [];
  return (
    <MapContainer center={[-1.2921, 36.8219]} zoom={13}>
    <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />

    {houses.map(houses => <Marker key={houses.id} position={[houses.latitude, houses.longitude]}/>)}
    </MapContainer>
  );
}

export default App;
