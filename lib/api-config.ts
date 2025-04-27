// Common API configuration to be used by both client and server
export const API_CONFIG = {
  BASE_URL: "http://127.0.0.1:8000/api/v1",
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
    CAR_STATISTICS: "/car-statisitcs/",
    CLIENT_STATISTICS: "/client-statisitcs/",
    STAFFS_STATISTICS: "/employee-statisitcs/",
  },
};

// Helper to get full endpoint URL
export const getEndpointUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
