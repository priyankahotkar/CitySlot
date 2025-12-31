import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Home } from './pages/Home';
import { ParkingList } from './pages/ParkingList';
import { SlotSelection } from './pages/SlotSelection';
import { BookingSummary } from './pages/BookingSummary';
import { BookingConfirmed } from './pages/BookingConfirmed';

function App() {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parking-list" element={<ParkingList />} />
          <Route path="/slot-selection" element={<SlotSelection />} />
          <Route path="/booking-summary" element={<BookingSummary />} />
          <Route path="/booking-confirmed" element={<BookingConfirmed />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;
