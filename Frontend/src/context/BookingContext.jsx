import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [searchFilters, setSearchFilters] = useState({
    location: 'All Locations',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '17:00',
    vehicleType: '4-wheeler'
  });

  const [selectedParking, setSelectedParking] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [lockedSlot, setLockedSlot] = useState(null);
  const [bookings, setBookings] = useState([]);

  const updateSearchFilters = (filters) => {
    setSearchFilters(prev => ({ ...prev, ...filters }));
  };

  const lockSlot = (parking, slot) => {
    setLockedSlot({
      parking,
      slot,
      lockedAt: Date.now(),
      expiresIn: 300000
    });
  };

  const unlockSlot = () => {
    setLockedSlot(null);
  };

  const createBooking = (bookingData) => {
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      bookedAt: new Date().toISOString()
    };
    setBookings(prev => [...prev, newBooking]);
    setLockedSlot(null);
    setSelectedSlot(null);
    return newBooking;
  };

  const calculatePrice = (pricePerHour, startTime, endTime) => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const hours = (endHour * 60 + endMin - startHour * 60 - startMin) / 60;
    return (hours * pricePerHour).toFixed(2);
  };

  const value = {
    searchFilters,
    updateSearchFilters,
    selectedParking,
    setSelectedParking,
    selectedSlot,
    setSelectedSlot,
    lockedSlot,
    lockSlot,
    unlockSlot,
    bookings,
    createBooking,
    calculatePrice
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
