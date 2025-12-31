import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CountdownTimer } from '../components/CountdownTimer';

export const SlotSelection = () => {
  const navigate = useNavigate();
  const {
    selectedParking,
    searchFilters,
    lockedSlot,
    lockSlot,
    unlockSlot,
    setSelectedSlot
  } = useBooking();

  const [slots, setSlots] = useState([]);
  const [selectedSlotNumber, setSelectedSlotNumber] = useState(null);

  useEffect(() => {
    if (!selectedParking) {
      navigate('/parking-list');
      return;
    }

    const availableCount = selectedParking.availableSlots[searchFilters.vehicleType];
    const generatedSlots = [];

    for (let i = 1; i <= 20; i++) {
      const isAvailable = i <= availableCount;
      generatedSlots.push({
        number: i,
        isAvailable,
        isLocked: false
      });
    }

    setSlots(generatedSlots);
  }, [selectedParking, searchFilters.vehicleType, navigate]);

  const handleSlotSelect = (slotNumber) => {
    if (lockedSlot) {
      return;
    }

    setSelectedSlotNumber(slotNumber);
    const slot = slots.find(s => s.number === slotNumber);
    lockSlot(selectedParking, slot);
  };

  const handleExpire = () => {
    unlockSlot();
    setSelectedSlotNumber(null);
    alert('Slot lock has expired. Please select a slot again.');
  };

  const handleProceedToBooking = () => {
    if (lockedSlot) {
      setSelectedSlot(lockedSlot.slot);
      navigate('/booking-summary');
    }
  };

  const handleCancel = () => {
    unlockSlot();
    setSelectedSlotNumber(null);
  };

  if (!selectedParking) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="outline" onClick={() => navigate('/parking-list')}>
            ← Back to List
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedParking.name}
                </h1>
                <p className="text-gray-600">{selectedParking.location}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {searchFilters.date} • {searchFilters.startTime} - {searchFilters.endTime}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Available Slots</p>
                <p className="text-4xl font-bold text-green-600">
                  {selectedParking.availableSlots[searchFilters.vehicleType]}
                </p>
              </div>
            </div>
          </Card>

          {lockedSlot && (
            <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Slot {lockedSlot.slot.number} Locked
                  </h3>
                  <p className="text-gray-600">
                    Complete your booking before the timer expires
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <CountdownTimer
                    expiresAt={lockedSlot.lockedAt + lockedSlot.expiresIn}
                    onExpire={handleExpire}
                  />
                  <div className="flex gap-2">
                    <Button variant="danger" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleProceedToBooking}>
                      Proceed to Booking
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Slot</h2>

            <div className="mb-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-green-500 rounded-lg"></div>
                <span className="text-sm text-gray-700">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-red-500 rounded-lg"></div>
                <span className="text-sm text-gray-700">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-blue-500 rounded-lg border-4 border-blue-700"></div>
                <span className="text-sm text-gray-700">Selected</span>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {slots.map((slot) => (
                <button
                  key={slot.number}
                  onClick={() => slot.isAvailable && handleSlotSelect(slot.number)}
                  disabled={!slot.isAvailable || lockedSlot !== null}
                  className={`
                    aspect-square rounded-lg font-bold text-white transition-all transform
                    ${
                      selectedSlotNumber === slot.number
                        ? 'bg-blue-500 border-4 border-blue-700 scale-110'
                        : slot.isAvailable
                        ? 'bg-green-500 hover:bg-green-600 hover:scale-105 cursor-pointer'
                        : 'bg-red-500 cursor-not-allowed opacity-60'
                    }
                    ${lockedSlot && selectedSlotNumber !== slot.number ? 'opacity-50' : ''}
                  `}
                >
                  {slot.number}
                </button>
              ))}
            </div>

            {!lockedSlot && (
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-center text-blue-800">
                  💡 Select an available slot to lock it for 5 minutes
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
