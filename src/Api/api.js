import axios from 'axios';

// Set up base URL
const API = axios.create({
    baseURL: 'http://localhost:3000', // Adjust to match backend
    headers: { 'Content-Type': 'application/json' },
});

// Attach token to headers (if available)
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Authentication APIs
export const login = async (userData) => {
  try {
      const response = await API.post('/login', userData);
      console.log("API Response:", response);  // Debugging: log full response

      if (response.status === 200 && response.data) {
          const { token, role, userId } = response.data.data || response.data;

          console.log("Retrieved Role:", role); // Debug role value

          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('role', role); // Store role

          return response.data;
      } else {
          throw new Error("Invalid response from server");
      }
  } catch (error) {
      console.error("Login failed:", error);
      throw error;
  }
};

export const register = (userData) => API.post('/register', userData);
export const forgotPassword = (userData) => API.post('/forgot', userData);

export const getUserById = (id) => API.get(`/user/${id}`);

// Tour Package APIs
export const createTourPackage = (packageData) =>
    API.post('/tour-package/create-package', packageData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
export const getAllTourPackages = () => API.get('/tour-package'); // Update URL to match backend
export const getTourPackageById = (id) => API.get(`/tour-package/${id}`);



export const deleteTourPackage = async (id) => {
    return await API.delete(`/tour-package/${id}`);
};

// Update Tour Package API
export const updateTourPackage = async (id, formData) => {
    try {
      const response = await API.put(`/tour-package/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Ensure the correct content type for form data
      });
  
      if (response.status === 200) {
        return response.data; // Return the response data
      } else {
        throw new Error('Failed to update package');
      }
    } catch (error) {
      console.error('Error updating package:', error);
      throw error; // Re-throw the error to be handled elsewhere
    }
  };

// Booking APIs
export const createBooking = (bookingData) => {
    return API.post('/api/create-booking', bookingData); // Ensure this URL matches your backend route
};

// Get all bookings (Admin)
export const getAllBookings = () => API.get('/api/all-bookings');

export const updateBookingStatus = async (bookingId, status) => {
    try {
        const response = await API.put(`/api/update-booking/${bookingId}`, { status });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to update booking status');
        }
    } catch (error) {
        console.error('Error updating booking status:', error);
        throw error;
    }
};

// Delete a booking
export const deleteBooking = async (bookingId) => {
    return await API.delete(`/booking/${bookingId}`);
};
// Customize Package APIs
export const createCustomizePackage = async (packageData) => {
    try {
        console.log("Sending Data:", packageData); // Debugging
      const response = await API.post("http://localhost:3000/customize-package/create", packageData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  export const updateCustomPackageStatus = async (id, status) => {
    try {
        const response = await API.put(`http://localhost:3000/customize-package/update-status/${id}`, { status });
      return response.data;
    } catch (error) {
      console.error("Error updating package status:", error);
      throw error;
    }
  };



// export const updateBookingStatus = async (bookingId, status) => {
//     try {
//         const response = await API.put(`/api/booking/${bookingId}`, { status });
//         if (response.status === 200) {
//             return response.data;
//         } else {
//             throw new Error('Failed to update booking status');
//         }
//     } catch (error) {
//         console.error('Error updating booking status:', error);
//         throw error;
//     }
// };

  export const getAllCustomPackages = async () => {
    try {
      const response = await API.get('/customize-package/getall');
      return response.data;
    } catch (error) {
      console.error("Error fetching custom packages:", error);
      throw error;
    }
  };
  
// export const getCustomizePackageByUser = (userId) => API.get(`/customize-package/${userId}`);

// export const updateCustomizePackage = async (id, customizeData) => {
//     try {
//         const response = await API.put(`/api/customize-package/${id}`, customizeData);
//         return response.data;
//     } catch (error) {
//         console.error('Error updating customize package:', error.response?.data?.message || error.message);
//         throw new Error(error.response?.data?.message || "Update failed.");
//     }
// };

// export const deleteCustomizePackage = async (id) => API.delete(`/api/customize-package/${id}`);

export default API;
