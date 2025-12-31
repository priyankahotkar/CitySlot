import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const BookingSummary = () => {
  const navigate = useNavigate();
  const {
    selectedParking,
    selectedSlot,
    searchFilters,
    calculatePrice,
    createBooking,
    unlockSlot
  } = useBooking();

  if (!selectedParking || !selectedSlot) {
    navigate('/');
    return null;
  }

  const totalPrice = calculatePrice(
    selectedParking.pricePerHour,
    searchFilters.startTime,
    searchFilters.endTime
  );

  const handleConfirmBooking = () => {
    const booking = {
      parking: selectedParking,
      slot: selectedSlot,
      date: searchFilters.date,
      startTime: searchFilters.startTime,
      endTime: searchFilters.endTime,
      vehicleType: searchFilters.vehicleType,
      totalPrice: totalPrice
    };

    createBooking(booking);
    unlockSlot();

    navigate('/booking-confirmed', { state: { booking } });
  };

  const calculateDuration = () => {
    const [startHour, startMin] = searchFilters.startTime.split(':').map(Number);
    const [endHour, endMin] = searchFilters.endTime.split(':').map(Number);
    const hours = (endHour * 60 + endMin - startHour * 60 - startMin) / 60;
    return hours.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="outline" onClick={() => navigate('/slot-selection')}>
            ← Back to Slots
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Booking Summary</h1>

          <Card className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Parking Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Parking Name</span>
                <span className="font-semibold text-gray-900">{selectedParking.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location</span>
                <span className="font-semibold text-gray-900">{selectedParking.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Slot Number</span>
                <span className="font-semibold text-gray-900">#{selectedSlot.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle Type</span>
                <span className="font-semibold text-gray-900">{searchFilters.vehicleType}</span>
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Time Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold text-gray-900">{searchFilters.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Start Time</span>
                <span className="font-semibold text-gray-900">{searchFilters.startTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">End Time</span>
                <span className="font-semibold text-gray-900">{searchFilters.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold text-gray-900">{calculateDuration()} hours</span>
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {selectedParking.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </Card>

          <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Price Breakdown</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Price per Hour</span>
                <span className="font-semibold text-gray-900">
                  ${selectedParking.pricePerHour}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold text-gray-900">{calculateDuration()} hours</span>
              </div>
              <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total Amount</span>
                <span className="text-3xl font-bold text-green-600">${totalPrice}</span>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate('/slot-selection')}
            >
              Cancel
            </Button>
            <Button variant="primary" fullWidth onClick={handleConfirmBooking}>
              Confirm Booking
            </Button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 text-center">
              ⚠️ This is a demo application. No actual payment will be processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
