// import 'ol/ol.css';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import axios from 'axios';

// Import per marker
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.querySelector('#address')! as HTMLInputElement;
let coordinates: { lat: number, lng: number } = { lat: 0, lng: 0 };

async function searchAddressHandler(event: Event) {
    event.preventDefault();

    // Ottieni le coordinate dall'API Nominatim
    await axios.get('https://nominatim.openstreetmap.org/search?format=json&limit=3&q=' + addressInput.value)
        .then(res => {
            coordinates = { lat: parseFloat(res.data[0].lat), lng: parseFloat(res.data[0].lon) };
        }).catch(err => {
            console.log(err);
        });

    document.getElementById('map')!.innerHTML = ''; // Svuota il contenuto di <div id="map">

    // Crea la mappa
    const map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new OSM()
            })
        ],
        view: new View({
            center: fromLonLat([coordinates.lng, coordinates.lat]),
            zoom: 16,
            maxZoom: 18,
            minZoom: 14,
            zoomFactor: 2
        })
    });

    // Crea il marker
    const marker = new Feature({
        geometry: new Point(fromLonLat([coordinates.lng, coordinates.lat]))
    });

    // Stile per il marker
    marker.setStyle(new Style({
        image: new Icon({
            anchor: [0.5, 1],
            src: 'https://openlayers.org/en/latest/examples/data/icon.png' // Link dell'icona
        })
    }));

    // Layer per il marker
    const vectorSource = new VectorSource({
        features: [marker]
    });

    const markerLayer = new VectorLayer({
        source: vectorSource
    });

    // Aggiungi il layer del marker alla mappa
    map.addLayer(markerLayer);
}

form.addEventListener('submit', searchAddressHandler);
