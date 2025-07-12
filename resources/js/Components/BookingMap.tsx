

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngExpression, LatLng, Control } from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import { useEffect, useRef } from 'react';
import L from 'leaflet';

// Interface pour les coordonnées
export interface Coordinates {
    lat: number;
    lng: number;
}

// Interface pour les props du composant BookingMap
interface BookingMapProps {
    startPoint: Coordinates | null;
    endPoint: Coordinates | null;
    // Callbacks pour informer le parent (Dashboard) des changements
    onStartLocated: (name: string, coords: Coordinates) => void;
    onEndLocated: (name: string, coords: Coordinates) => void;
}

// Composant interne pour gérer les contrôles de géocodage
const GeocoderControls = ({ onStartLocated, onEndLocated }: { onStartLocated: BookingMapProps['onStartLocated'], onEndLocated: BookingMapProps['onEndLocated'] }) => {
    const map = useMap();

    useEffect(() => {
        const geocoder = (L.Control as any).Geocoder.nominatim();

        const createGeocoderControl = (placeholder: string, onLocated: (name: string, coords: Coordinates) => void) => {
            const control = (L.Control as any).geocoder({
                geocoder: geocoder,
                placeholder: placeholder,
                defaultMarkGeocode: false, // On ne veut pas du marqueur par défaut
            }).on('markgeocode', (e: { geocode: any }) => {
                const { center, name } = e.geocode;
                onLocated(name, { lat: center.lat, lng: center.lng });
            }).addTo(map);

            // Appliquer des styles Tailwind pour un look professionnel
            const controlContainer = control.getContainer();
            if (controlContainer) {
                controlContainer.classList.add('w-full', 'md:w-auto', 'shadow-lg');
                const input = controlContainer.querySelector('input');
                if (input) {
                    input.classList.add('dark:bg-gray-800', 'dark:text-gray-200', 'border-gray-300', 'dark:border-gray-600', 'focus:ring-indigo-500', 'focus:border-indigo-500');
                }
            }
            return control;
        };

        const startControl = createGeocoderControl('Point de départ', onStartLocated);
        const endControl = createGeocoderControl('Destination', onEndLocated);

        return () => {
            map.removeControl(startControl);
            map.removeControl(endControl);
        };
    }, [map, onStartLocated, onEndLocated]);

    return null;
};

// Composant interne pour gérer le routage
const Routing = ({ startPoint, endPoint }: { startPoint: Coordinates | null, endPoint: Coordinates | null }) => {
    const map = useMap();
    const routingControlRef = useRef<Control | null>(null);

    useEffect(() => {
        if (!map) return;

        if (routingControlRef.current) {
            map.removeControl(routingControlRef.current);
            routingControlRef.current = null;
        }

        if (startPoint && endPoint) {
            const routingControl = (L.Routing as any).control({
                waypoints: [
                    L.latLng(startPoint.lat, startPoint.lng),
                    L.latLng(endPoint.lat, endPoint.lng)
                ],
                routeWhileDragging: false,
                addWaypoints: false,
                draggableWaypoints: false,
                fitSelectedRoutes: true,
                show: false, // On cache les instructions textuelles
                lineOptions: {
                    styles: [{ color: '#1e40af', opacity: 0.8, weight: 6 }],
                },
                // On utilise nos propres marqueurs personnalisés
                createMarker: () => null, 
            }).addTo(map);
            routingControlRef.current = routingControl;
        }

    }, [map, startPoint, endPoint]);

    // Nous gérons les marqueurs séparément pour plus de contrôle
    useEffect(() => {
        const startIcon = L.divIcon({
            html: `<div class="bg-white dark:bg-gray-800 rounded-full shadow-lg w-8 h-8 flex items-center justify-center"><div class="bg-green-500 rounded-full w-4 h-4"></div></div>`,
            className: 'custom-marker', iconSize: [32, 32], iconAnchor: [16, 16],
        });
        const endIcon = L.divIcon({
            html: `<div class="bg-white dark:bg-gray-800 rounded-full shadow-lg w-8 h-8 flex items-center justify-center"><div class="bg-red-500 rounded-full w-4 h-4"></div></div>`,
            className: 'custom-marker', iconSize: [32, 32], iconAnchor: [16, 16],
        });

        const markers: L.Marker[] = [];
        if(startPoint) markers.push(L.marker([startPoint.lat, startPoint.lng], { icon: startIcon }).addTo(map));
        if(endPoint) markers.push(L.marker([endPoint.lat, endPoint.lng], { icon: endIcon }).addTo(map));

        return () => {
            markers.forEach(marker => map.removeLayer(marker));
        };

    }, [map, startPoint, endPoint]);

    return null;
};


const BookingMap = ({ startPoint, endPoint, onStartLocated, onEndLocated }: BookingMapProps) => {
    const defaultPosition: LatLngExpression = [-11.325, 27.3222]; // Kinshasa

    return (
        <MapContainer
            center={defaultPosition}
            zoom={14}
            style={{ height: '100%', width: '100%' }}
           
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
            />
            <GeocoderControls onStartLocated={onStartLocated} onEndLocated={onEndLocated} />
            <Routing startPoint={startPoint} endPoint={endPoint} />
        </MapContainer>
    );
};

export default BookingMap;