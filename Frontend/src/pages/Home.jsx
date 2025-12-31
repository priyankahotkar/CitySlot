import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { locations } from '../data/parkingData';

export const Home = () => {
  const navigate = useNavigate();
  const { searchFilters, updateSearchFilters } = useBooking();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/parking-list');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect Parking Spot
          </h1>
          <p className="text-xl text-gray-600">
            Quick, easy, and hassle-free parking booking
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <form onSubmit={handleSearch} className="space-y-6">
              <Select
                label="Location"
                value={searchFilters.location}
                onChange={(e) => updateSearchFilters({ location: e.target.value })}
                options={locations}
              />

              <Input
                label="Date"
                type="date"
                value={searchFilters.date}
                onChange={(e) => updateSearchFilters({ date: e.target.value })}
                min={today}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Time"
                  type="time"
                  value={searchFilters.startTime}
                  onChange={(e) => updateSearchFilters({ startTime: e.target.value })}
                />
                <Input
                  label="End Time"
                  type="time"
                  value={searchFilters.endTime}
                  onChange={(e) => updateSearchFilters({ endTime: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Vehicle Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => updateSearchFilters({ vehicleType: '2-wheeler' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      searchFilters.vehicleType === '2-wheeler'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-4xl mb-2">🏍️</div>
                    <div className="font-semibold">2-Wheeler</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateSearchFilters({ vehicleType: '4-wheeler' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      searchFilters.vehicleType === '4-wheeler'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-4xl mb-2">🚗</div>
                    <div className="font-semibold">4-Wheeler</div>
                  </button>
                </div>
              </div>

              <Button type="submit" variant="primary" fullWidth>
                Search Parking
              </Button>
            </form>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold text-lg mb-2">Instant Booking</h3>
              <p className="text-sm text-gray-600">Book your parking in seconds</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-bold text-lg mb-2">Secure Parking</h3>
              <p className="text-sm text-gray-600">CCTV monitored locations</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-bold text-lg mb-2">Best Prices</h3>
              <p className="text-sm text-gray-600">Competitive hourly rates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
