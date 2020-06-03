import {
    SS_ADDED_SUCCESSFUL,
    SS_ADDED_UNSUCCESSFUL,
    GET_SS_SUCCESSFULL,
    GET_SS_UNSUCCESSFULL,
    OPEN_VENDOR_SOCKET,
    GET_UNHANDLED_REQUEST_SUCCESSFULL,
    GET_UNHANDLED_REQUEST_UNSUCCESSFULL,
    GET_COMPLETED_SERVICES_SS
    // HANDLE_BOOKING_REQUEST_SUCCESSFULL
  } from '../actions/types';
  
  const initialState = {
    ss: null,
    ssLoaded: false,
    vendorSocket: null,
    unhandledBooking: [],
    completed: []
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SS_ADDED_SUCCESSFUL:
        return {
          ...state,
          ss: payload.servicestation,
        };
      case GET_SS_SUCCESSFULL:
        return {
          ...state,
          ss: payload.servicestation,
          ssLoaded: true
        }
      case GET_COMPLETED_SERVICES_SS:
        return{
          ...state,
          completed: payload.bookings
        }
      case OPEN_VENDOR_SOCKET:
        return{
          ...state,
          vendorSocket: payload
        }
      // case HANDLE_BOOKING_REQUEST_SUCCESSFULL:
      //   return{
      //     ...state,
      //   }
      case GET_UNHANDLED_REQUEST_SUCCESSFULL:
        return{
          ...state,
          unhandledBooking: payload.bookings
        }
      case GET_UNHANDLED_REQUEST_UNSUCCESSFULL:
        return{
          ...state,
          unhandledBooking: []
        }
      case GET_SS_UNSUCCESSFULL:
      case SS_ADDED_UNSUCCESSFUL:
        return {
          ...state,
          ss: null,
          ssLoaded: true
        };
      default:
        return state;
    }
  }
  