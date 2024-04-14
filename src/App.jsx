import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import './App.css';
import MapComponent from './components/GoogleMap';

const hoChiMinhCityCoords = [10.7769, 106.7009];
const defaultZoom = 13;

const labs = [
    {
        coordinate: [10.796759, 106.678689],
        label: 'TMA Solutions Lab 1 - 111 Nguyễn Đình Chính, Phường 15, Phú Nhuận, Thành phố Hồ Chí Minh',
    },
    {
        coordinate: [10.797543, 106.669623],
        label: 'TMA Solutions Lab 3 - 10 Đặng Văn Ngữ, Phường 10, Quận Phú Nhuận',
    },
    {
        coordinate: [10.794138, 106.672549],
        label: 'TMA Solutions Lab 4 - 84A/5 Trần Hữu Trang, Phường 10, Quận Phú Nhuận',
    },
    {
        coordinate: [10.852024553021439, 106.62833271164152],
        label: 'TMA Solutions Lab 5 - Tòa nhà Anna, Công viên phần mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12',
    },
    {
        coordinate: [10.855866294679384, 106.63107362698493],
        label: 'TMA Solutions Lab 6 - Tòa nhà TMA, Công viên phần mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12',
    },
    {
        coordinate: [13.72350943887635, 109.21210580779363],
        label: 'TMA Solutions Lab 8 - Đại lộ Khoa học, Thung lũng Sáng tạo Quy Nhon, P. Ghềnh Ráng, TP. Quy Nhon, Bình Ðịnh',
    },
];

function App() {
    return <MapComponent />;

    const mapRef = useRef();

    // TODO: Change size of circle when zoom in, zoom out

    const circleRefs = useRef(new Array(labs.length));
    useEffect(() => {
        circleRefs.current.forEach((ref, index) => {
            if (ref) {
                const circle = ref.getElement();
                circle.style.animation = 'blinker 1s linear infinite';
            }
        });
    }, []);

    return (
        <div className="App">
            <MapContainer
                ref={mapRef}
                center={hoChiMinhCityCoords}
                zoom={defaultZoom}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* <TileLayer
                    url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    maxZoom={18}
                    id="yourMapboxStyleId"
                    tileSize={512}
                    zoomOffset={-1}
                    accessToken="yourMapboxAccessToken"
                /> */}

                {labs.map((lab, index) => (
                    <CircleMarker
                        key={index}
                        ref={(el) => (circleRefs.current[index] = el)}
                        center={lab.coordinate}
                        color="red"
                        fillColor="#f03"
                        fillOpacity={0.5}
                        radius={20}
                        className="pulsing-circle"
                    >
                        <Popup>{lab.label}</Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
            <div className="sidebar">
                <h2>Disney World</h2>
                <p>Bay Lake, FL</p>
                <ul>
                    <li>Lat: 28.3852</li>
                    <li>Long: -81.5639</li>
                </ul>
                <p>
                    <button onClick={() => {}}>Set View to Disney World</button>
                </p>
                <h2>Disneyland</h2>
                <p>Anaheim, CA</p>
                <ul>
                    <li>Lat: 33.8121</li>
                    <li>Long: -117.9190</li>
                </ul>
                <p>
                    <button onClick={() => {}}>Fly to Disneyland</button>
                </p>
            </div>
        </div>
    );
}

export default App;
