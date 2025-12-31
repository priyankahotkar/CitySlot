import { Card } from './Card';
import { Button } from './Button';

export const ParkingCard = ({ parking, vehicleType, onSelect }) => {
  const availableSlots = parking.availableSlots[vehicleType];
  const isFull = availableSlots === 0;

  return (
    <Card hover={!isFull} onClick={!isFull ? onSelect : undefined}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{parking.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{parking.location}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium">{parking.rating}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500">Distance</p>
            <p className="text-lg font-semibold text-gray-900">{parking.distance} km</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Price/Hour</p>
            <p className="text-lg font-semibold text-gray-900">${parking.pricePerHour}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Available</p>
            <p className={`text-lg font-semibold ${isFull ? 'text-red-600' : 'text-green-600'}`}>
              {availableSlots} slots
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {parking.amenities.map((amenity, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
        </div>

        {isFull ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
            <p className="text-red-700 font-semibold">No Slots Available</p>
          </div>
        ) : (
          <Button variant="primary" fullWidth onClick={onSelect}>
            Select Parking
          </Button>
        )}
      </div>
    </Card>
  );
};
