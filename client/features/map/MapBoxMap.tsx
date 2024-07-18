import type { LatAndLng, TravelSpot } from 'common/types/travelSpots';
import { useRef } from 'react';
import styles from './MapBoxMap.module.css';
import useMap from './useMap';

type MapBoxMapProps = {
  allDestinationSpots: TravelSpot[];
  currentLocation: LatAndLng;
};

const MapBoxMap = ({ allDestinationSpots, currentLocation }: MapBoxMapProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<HTMLDivElement[]>([]);
  const currentLocationElement = useRef<HTMLDivElement | null>(null);
  const { selectedSpots, onMarkerClick, onDecide } = useMap(
    allDestinationSpots,
    currentLocation,
    mapContainer,
    markerRef,
    currentLocationElement,
  );

  return (
    <div className={styles.container}>
      <div>
        {selectedSpots.map((spot, index) => (
          <div key={index}>
            <h3>{spot.name}</h3>
          </div>
        ))}
      </div>

      <button onClick={onDecide}>行き先決定</button>
      <div ref={mapContainer} className={styles.map} />

      {allDestinationSpots.map((spot, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el === null) return;
            markerRef.current[index] = el;
          }}
          onClick={() => onMarkerClick(index)}
          className={styles.destinationPin}
        >
          <h3 className={styles.placeName}>{spot.name}</h3>
        </div>
      ))}

      <div ref={currentLocationElement} className={styles.currentLocationPin}>
        <h3 className={styles.currentName}>現在地</h3>
      </div>
    </div>
  );
};

export default MapBoxMap;
