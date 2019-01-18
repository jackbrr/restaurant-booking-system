import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

const createBooking = booking => { 
    return axios({
    method: 'POST',
    url: `${API_URL}/book`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: booking
  });
};

const getBookingsDate = date => {
  const params = date ? { params: { date } } : null;
  return axios.get(`${API_URL}/bookings`, params).then(({ data }) => data);
};

const getBookings = params => {
  return axios.post(`${API_URL}/bookings`, { data: params }).then(({ data }) => data);
};

const cancelBooking = booking => { 
    return axios({
    method: 'DELETE',
    url: `${API_URL}/bookings`, 
    headers: {
     'Content-Type': 'application/json'
    },
   data: booking
  });
}




export { createBooking, getBookings, cancelBooking, getBookingsDate };
