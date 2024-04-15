import {
    GoogleMap,
    InfoWindow,
    LoadScript,
    Marker
} from '@react-google-maps/api';
import React from 'react';
import './GoogleMap.css';

const containerStyle = {
    width: '100vw',
    height: '100vh',
};

const defaultCenter = { lat: 10.7769, lng: 106.7009 };
const defaultZoom = 13;

const circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    center: defaultCenter,
    radius: 1000, // radius in meters
};

const labs = [
    {
        position: { lat: 10.796759, lng: 106.678689 },
        label: 'TMA Solutions Lab 1 - 111 Nguyễn Đình Chính, Phường 15, Phú Nhuận, Thành phố Hồ Chí Minh',
    },
    {
        position: { lat: 10.797543, lng: 106.669623 },
        label: 'TMA Solutions Lab 3 - 10 Đặng Văn Ngữ, Phường 10, Quận Phú Nhuận',
    },
    {
        position: { lat: 10.794138, lng: 106.672549 },
        label: 'TMA Solutions Lab 4 - 84A/5 Trần Hữu Trang, Phường 10, Quận Phú Nhuận',
    },
    {
        position: { lat: 10.852024553021439, lng: 106.62833271164152 },
        label: 'TMA Solutions Lab 5 - Tòa nhà Anna, Công viên phần mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12',
    },
    {
        position: { lat: 10.855866294679384, lng: 106.63107362698493 },
        label: 'TMA Solutions Lab 6 - Tòa nhà TMA, Công viên phần mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12',
    },
    {
        position: { lat: 13.72350943887635, lng: 109.21210580779363 },
        label: 'TMA Solutions Lab 8 - Đại lộ Khoa học, Thung lũng Sáng tạo Quy Nhon, P. Ghềnh Ráng, TP. Quy Nhon, Bình Định',
    },
];

function MapComponent() {
    const [selectedLab, setSelectedLab] = React.useState(null);

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBIQevDXWuxytLdM5rK4VDMY5h48DanQAI" // Replace "YOUR_API_KEY" with your actual Google Maps API key
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={defaultZoom}
            >
                {labs.map((lab, index) => (
                    <Marker
                        // key={index}
                        position={lab.position}
                        onClick={() => setSelectedLab(lab)}
                    />
                ))}

                {selectedLab && (
                    <InfoWindow
                        position={selectedLab.position}
                        onCloseClick={() => setSelectedLab(null)}
                    >
                        <div className="info-window-content">
                            <h2>Lab Details</h2>
                            <p>{selectedLab.label}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default MapComponent;
