const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      trim: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Please enter a valid email'
      ]
    },

    name: {
      type: String,
      required: [true, 'Please add a name']
    },

    password: {
      type: String,
      required: function () {
        return !this.firebaseUid;
      }
    },

    firebaseUid: {
      type: String,
      unique: true,
      sparse: true
    },

    photoURL: {
      type: String,
      default: ''
    },

    role: {
      type: String,
      enum: ['user', 'admin', 'organizer'],
      default: 'user'
    },

    // ---- Booking Domain ----

    activeReservations: [
      {
        reservationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Reservation'
        },
        eventId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Event'
        },
        expiresAt: {
          type: Date
        }
      }
    ],

    bookingHistory: [
      {
        bookingId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Booking'
        },
        bookedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    // ---- Metadata ----

    lastLogin: {
      type: Date,
      default: Date.now
    },

    isBlocked: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ firebaseUid: 1 });
userSchema.index({ 'activeReservations.expiresAt': 1 });

module.exports = mongoose.model('User', userSchema);
