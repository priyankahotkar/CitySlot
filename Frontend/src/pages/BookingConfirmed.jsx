import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const BookingConfirmed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
            <span className="text-6xl">✓</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600">
            Your parking slot has been successfully reserved
          </p>
        </div>

        <Card className="mb-6">
          <div className="text-center mb-6 pb-6 border-b">
            <p className="text-sm text-gray-600 mb-2">Booking ID</p>
            <p className="text-2xl font-bold text-gray-900">#{booking.id}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Parking Location</span>
              <span className="font-semibold text-gray-900 text-right">
                {booking.parking.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Address</span>
              <span className="font-semibold text-gray-900">{booking.parking.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Slot Number</span>
              <span className="font-semibold text-gray-900">#{booking.slot.number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vehicle Type</span>
              <span className="font-semibold text-gray-900">{booking.vehicleType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-semibold text-gray-900">{booking.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time</span>
              <span className="font-semibold text-gray-900">
                {booking.startTime} - {booking.endTime}
              </span>
            </div>
            <div className="flex justify-between pt-4 border-t">
              <span className="text-xl font-bold text-gray-900">Total Paid</span>
              <span className="text-2xl font-bold text-green-600">${booking.totalPrice}</span>
            </div>
          </div>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Please arrive on time to avoid additional charges</li>
            <li>• Your slot will be held for 15 minutes after start time</li>
            <li>• Contact parking security upon arrival</li>
            <li>• Keep your booking ID handy</li>
          </ul>
        </div>

        <Button variant="primary" fullWidth onClick={() => navigate('/')}>
          Book Another Parking
        </Button>
      </div>
    </div>
  );
};
