// API service for handling all backend requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function for API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error: any) {
    console.error(`API request failed for ${url}:`, error);
    throw new Error(error.message || 'Network error occurred');
  }
}

// Auth API
export const authAPI = {
  register: (data: any) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  login: (data: any) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getProfile: (token: string) => apiRequest('/auth/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  
  updateProfile: (data: any, token: string) => apiRequest('/auth/profile', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
};

// Properties API
export const propertiesAPI = {
  getAll: () => apiRequest('/properties'),
  getNearby: () => apiRequest('/properties/nearby'),
  getById: (id: string) => apiRequest(`/properties/${id}`),
  create: (data: any, token: string) => apiRequest('/properties', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  createPublic: (data: any) => apiRequest('/properties/public', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any, token: string) => apiRequest(`/properties/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  delete: (id: string, token: string) => apiRequest(`/properties/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

// Mess API
export const messAPI = {
  getAll: () => apiRequest('/mess'),
  getOfficial: () => apiRequest('/mess/official'),
  getById: (id: string) => apiRequest(`/mess/${id}`),
  create: (data: any, token: string) => apiRequest('/mess', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  createPublic: (data: any) => apiRequest('/mess/public', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any, token: string) => apiRequest(`/mess/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  delete: (id: string, token: string) => apiRequest(`/mess/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

// Laundry API
export const laundryAPI = {
  getAll: () => apiRequest('/laundry'),
  getById: (id: string) => apiRequest(`/laundry/${id}`),
  create: (data: any, token: string) => apiRequest('/laundry', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  createPublic: (data: any) => apiRequest('/laundry/public', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any, token: string) => apiRequest(`/laundry/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  delete: (id: string, token: string) => apiRequest(`/laundry/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

// Printing API
export const printingAPI = {
  getAll: () => apiRequest('/printing'),
  getById: (id: string) => apiRequest(`/printing/${id}`),
  create: (data: any, token: string) => apiRequest('/printing', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  createPublic: (data: any) => apiRequest('/printing/public', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any, token: string) => apiRequest(`/printing/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  delete: (id: string, token: string) => apiRequest(`/printing/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

// Events API
export const eventsAPI = {
  getAll: () => apiRequest('/events'),
  getById: (id: string) => apiRequest(`/events/${id}`),
  create: (data: any, token: string) => apiRequest('/events', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  createPublic: (data: any) => apiRequest('/events/public', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any, token: string) => apiRequest(`/events/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  delete: (id: string, token: string) => apiRequest(`/events/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

// Community API
export const communityAPI = {
  // Posts
  getPosts: () => apiRequest('/community/posts'),
  getPostById: (id: string) => apiRequest(`/community/posts/${id}`),
  createPost: (data: any, token: string) => apiRequest('/community/posts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  updatePost: (id: string, data: any, token: string) => apiRequest(`/community/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  deletePost: (id: string, token: string) => apiRequest(`/community/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  likePost: (id: string, token: string) => apiRequest(`/community/posts/${id}/like`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  commentOnPost: (id: string, data: any, token: string) => apiRequest(`/community/posts/${id}/comment`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  
  // Project Friday
  getStories: () => apiRequest('/community/project-friday'),
  getStoryById: (id: string) => apiRequest(`/community/project-friday/${id}`),
  createStory: (data: any, token: string) => apiRequest('/community/project-friday', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  updateStory: (id: string, data: any, token: string) => apiRequest(`/community/project-friday/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
  deleteStory: (id: string, token: string) => apiRequest(`/community/project-friday/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  likeStory: (id: string, token: string) => apiRequest(`/community/project-friday/${id}/like`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  commentOnStory: (id: string, data: any, token: string) => apiRequest(`/community/project-friday/${id}/comment`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
};

// Owner API
export const ownerAPI = {
  getDashboard: (token: string) => apiRequest('/owner/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  getServices: (token: string) => apiRequest('/owner/services', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
  updateProfile: (data: any, token: string) => apiRequest('/owner/profile', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }),
};

export default {
  authAPI,
  propertiesAPI,
  messAPI,
  laundryAPI,
  printingAPI,
  eventsAPI,
  communityAPI,
  ownerAPI,
};