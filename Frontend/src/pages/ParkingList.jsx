import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { ParkingCard } from '../components/ParkingCard';
import { Button } from '../components/Button';
import { parkingLocations } from '../data/parkingData';

export const ParkingList = () => {
  const navigate = useNavigate();
  const { searchFilters, setSelectedParking } = useBooking();
  const [selectedParkingId, setSelectedParkingId] = useState(null);

  const filteredParkings = useMemo(() => {
    let filtered = parkingLocations;

    if (searchFilters.location && searchFilters.location !== 'All Locations') {
      filtered = filtered.filter(p => p.location === searchFilters.location);
    }

    return filtered.sort((a, b) => a.distance - b.distance);
  }, [searchFilters.location]);

  const availableParkings = filteredParkings.filter(
    p => p.availableSlots[searchFilters.vehicleType] > 0
  );

  const fullParkings = filteredParkings.filter(
    p => p.availableSlots[searchFilters.vehicleType] === 0
  );

  const handleSelectParking = (parking) => {
    setSelectedParking(parking);
    setSelectedParkingId(parking.id);
    navigate('/slot-selection');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigate('/')}>
              ← Back to Search
            </Button>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {searchFilters.date} • {searchFilters.startTime} - {searchFilters.endTime}
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {searchFilters.vehicleType}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Available Parking Locations
          </h1>
          <p className="text-gray-600">
            Found {availableParkings.length} available parking locations near you
          </p>
        </div>

        {availableParkings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {availableParkings.map(parking => (
              <ParkingCard
                key={parking.id}
                parking={parking}
                vehicleType={searchFilters.vehicleType}
                onSelect={() => handleSelectParking(parking)}
              />
            ))}
          </div>
        )}

        {fullParkings.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Nearest Parking Alternatives
              </h2>
              <p className="text-gray-600">
                These locations are currently full but are nearby
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullParkings.map(parking => (
                <ParkingCard
                  key={parking.id}
                  parking={parking}
                  vehicleType={searchFilters.vehicleType}
                  onSelect={() => handleSelectParking(parking)}
                />
              ))}
            </div>
          </div>
        )}

        {availableParkings.length === 0 && fullParkings.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Parking Locations Found
            </h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search filters
            </p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Modify Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
