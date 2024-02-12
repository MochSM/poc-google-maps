'use client';
import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Button, position } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { BiTargetLock } from 'react-icons/bi';

const Map = () => {
  const [currentPosition, setCurrentPosition] = React.useState({
    lat: -2.359522,
    lng: 117.4168671,
  });
  const [isLocationFetched, setIsLocationFetched] = React.useState(false);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyD09fbkPuRt1lrU2WYgY2rQb1kaNPHldU0',
  });

  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          setIsLocationFetched(true);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleMarkerDrag = (event: any) => {
    setCurrentPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  return isLoaded ? (
    <>
      <Button
        leftIcon={<Icon as={BiTargetLock} />}
        position={'fixed'}
        left={'50%'}
        bottom={'30px'}
        transform={'translateX(-50%)'}
        border={'1px solid gray'}
        zIndex={9999}
        onClick={getCurrentPosition}
      >
        Get Current Location
      </Button>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={currentPosition} zoom={isLocationFetched ? 16 : 5}>
        {isLocationFetched && <Marker position={currentPosition} draggable={true} onDragEnd={handleMarkerDrag} />}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default Map;
