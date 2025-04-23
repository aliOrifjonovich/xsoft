import Cookies from "js-cookie";
import { API_CONFIG, getEndpointUrl } from "./api-config";

// Client-side authentication functions
export const getAuthToken = () => {
  return Cookies.get('token');
};

export const setAuthToken = (token: string) => {
  Cookies.set('token', token, { secure: true });
};

// Default headers with authentication (client-side)
export const getDefaultHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Client-side API service
export const apiService = {
  // GET request
  async get(endpoint: string, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${getEndpointUrl(endpoint)}?${queryString}` : getEndpointUrl(endpoint);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: getDefaultHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  },

  // POST request
  async post(endpoint: string, data = {}) {
    try {
      const response = await fetch(getEndpointUrl(endpoint), {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error posting data to ${endpoint}:`, error);
      throw error;
    }
  },

  // PUT request
  async put(endpoint: string, data = {}) {
    try {
      const response = await fetch(getEndpointUrl(endpoint), {
        method: 'PUT',
        headers: getDefaultHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating data at ${endpoint}:`, error);
      throw error;
    }
  },

  // PATCH request
  async patch(endpoint: string, data = {}) {
    try {
      const response = await fetch(getEndpointUrl(endpoint), {
        method: 'PATCH',
        headers: getDefaultHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error patching data at ${endpoint}:`, error);
      throw error;
    }
  },

  // DELETE request
  async delete(endpoint: string) {
    try {
      const response = await fetch(getEndpointUrl(endpoint), {
        method: 'DELETE',
        headers: getDefaultHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Some DELETE endpoints may not return a response body
      if (response.status === 204) {
        return true;
      }

      return await response.json();
    } catch (error) {
      console.error(`Error deleting data at ${endpoint}:`, error);
      throw error;
    }
  },

  // Special method for SWR fetcher
  fetcher: (url: string) => {
    return fetch(url, {
      headers: getDefaultHeaders(),
    }).then(res => {
      if (!res.ok) throw new Error('API error');
      return res.json();
    });
  }
};

// For multipart form data (file uploads)
export const apiServiceMultipart = {
  async post(endpoint: string, formData: FormData) {
    const token = getAuthToken();
    try {
      const response = await fetch(getEndpointUrl(endpoint), {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          // Don't set Content-Type for multipart/form-data
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error posting form data to ${endpoint}:`, error);
      throw error;
    }
  },

  async put(endpoint: string, formData: FormData) {
    const token = getAuthToken();
    try {
      const response = await fetch(getEndpointUrl(endpoint), {
        method: 'PUT',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating form data at ${endpoint}:`, error);
      throw error;
    }
  },

  async patch(endpoint: string, formData: FormData) {
    const token = getAuthToken();
    try {
      const response = await fetch(getEndpointUrl(endpoint), {
        method: 'PATCH',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error patching form data at ${endpoint}:`, error);
      throw error;
    }
  }
};

// Export API_CONFIG and getEndpointUrl for convenience
export { API_CONFIG, getEndpointUrl };
