import 'leaflet/dist/leaflet.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    CircleMarker,
    GeoJSON,
    MapContainer,
    Popup,
    TileLayer,
} from 'react-leaflet';
import './App.css';
import { cities, hoChiMinhCityCoords, labs, vietnamBounds } from './constants';
import vietnamGeoJSON from './vietnam.json';

function App() {
    const mapRef = useRef();
    const [selectedCode, setSelectedCode] = useState(null);

    const circleRefs = useRef(new Array(labs.length));
    useEffect(() => {
        circleRefs.current.forEach((ref, index) => {
            if (ref) {
                const circle = ref.getElement();
                circle.style.animation = 'blinker 1s linear infinite';
            }
        });
    }, []);

    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
        }
    };

    const geojsonStyle = {
        color: 'blue',
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0,
    };

    const locations = useMemo(() => {
        if (!selectedCode) return cities;
        return labs.filter((lab) => lab.code === selectedCode);
    }, [selectedCode]);

    const center = useMemo(() => {
        if (!selectedCode) return hoChiMinhCityCoords;
        return cities.find((city) => city.code === selectedCode).coordinate;
    }, [selectedCode]);

    const handleMarkerClick = (lab) => {
        setSelectedCode(lab.code);
        if (mapRef.current) {
            mapRef.current.setView(lab.coordinate, 13); // Set view takes (latlng, zoom)
        }
    };

    return (
        <div className="App">
            <button
                style={{ position: 'absolute', top: '0', zIndex: 999, left: 0 }}
                onClick={() => window.location.reload()}
            >
                Back
            </button>
            <MapContainer
                ref={mapRef}
                center={center}
                zoom={6}
                minZoom={6} // Prevents zooming out too much
                maxBounds={vietnamBounds}
                maxBoundsViscosity={1.0} // Makes the bounds totally 'sticky'
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <GeoJSON
                    data={vietnamGeoJSON}
                    style={geojsonStyle}
                    onEachFeature={onEachFeature}
                />

                {locations.map((lab, index) => (
                    <CircleMarker
                        key={index}
                        ref={(el) => (circleRefs.current[index] = el)}
                        center={lab.coordinate}
                        color={'red'}
                        fillColor={'red'}
                        fillOpacity={0.5}
                        radius={selectedCode ? 6 : 12}
                        className="pulsing-circle"
                        eventHandlers={{
                            mouseover: (e) => {
                                e.target.openPopup();
                            },
                            mouseout: (e) => {
                                e.target.closePopup();
                            },
                            click: () => handleMarkerClick(lab),
                        }}
                    >
                        <Popup>{lab.label}</Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
}

export default App;
