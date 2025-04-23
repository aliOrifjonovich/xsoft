// Re-export everything from client-side API for backward compatibility
// This file ensures that existing imports continue to work

import { API_CONFIG, getEndpointUrl, getAuthToken, setAuthToken, getDefaultHeaders, apiService, apiServiceMultipart } from './api-client';

export { API_CONFIG, getEndpointUrl, getAuthToken, setAuthToken, getDefaultHeaders, apiService, apiServiceMultipart };

// Note: Server-side API functions are not exported here to avoid 
// importing server-side code in client components.
// Import from api-server.ts directly in server components.
