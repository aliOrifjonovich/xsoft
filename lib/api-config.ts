// Common API configuration to be used by both client and server
export const API_CONFIG = {
  BASE_URL: "https://carmanagement-1-rmyc.onrender.com/api/v1",
  ENDPOINTS: {
    LOGIN: "/token/",
    USER_DATA: "/request-user-data/",
    CARS: "/cars",
    BRANCHES: "/branchs",
    CLIENTS: "/clients",
    CLIENT: "/client/",
    STAFFS: "/staffs",
    EMPLOYEE: "/employee",
    CATEGORIES: "/categories",
    CAR_CATEGORIES: "/car-catergories/",
    CAR_FEATURES: "/car-features",
    RESERVATIONS: "/reservations",
    FEATURES: "/features",
    SCHEDULE: "/schedule",
  },
};

// Helper to get full endpoint URL
export const getEndpointUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
