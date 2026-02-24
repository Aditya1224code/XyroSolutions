// API Service for XyroSolutions
const API_URL = import.meta.env.VITE_API_URL || 'https://xyrosolutions.onrender.com/api';

// Types
interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

interface ContactFormData {
  email: string;
  message: string;
}

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('xyro-token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Handle API responses
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
};

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    // Backend returns token directly on data object, not nested in data.data
    if (data.success && data.token) {
      localStorage.setItem('xyro-token', data.token);
    }
    
    return data;
  },

  logout: () => {
    localStorage.removeItem('xyro-token');
  },

  getMe: async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('xyro-token');
  }
};

// Content API
export const contentApi = {
  getContent: async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/content`);
    return handleResponse(response);
  },

  updateSection: async (section: string, data: Record<string, unknown>): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/content/${section}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  updateAllContent: async (data: Record<string, unknown>): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/content`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  }
};

// Contact API
export const contactApi = {
  submit: async (formData: ContactFormData): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return handleResponse(response);
  },

  getAll: async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/contact`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  updateStatus: async (id: string, status: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/contact/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    return handleResponse(response);
  },

  delete: async (id: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/contact/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Blog API
export const blogApi = {
  getPosts: async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/blog`);
    return handleResponse(response);
  },

  getPost: async (slug: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/blog/${slug}`);
    return handleResponse(response);
  },

  createPost: async (postData: Record<string, unknown>): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/blog`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(postData)
    });
    return handleResponse(response);
  },

  updatePost: async (id: string, postData: Record<string, unknown>): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/blog/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(postData)
    });
    return handleResponse(response);
  },

  deletePost: async (id: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/blog/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Upload Response Type
interface UploadResponse {
  url: string;
}

// Upload API
export const uploadApi = {
  uploadImage: async (file: File): Promise<ApiResponse<UploadResponse>> => {
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('xyro-token');
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData
    });
    return handleResponse<UploadResponse>(response);
  },

  getFiles: async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/upload`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  deleteFile: async (filename: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/upload/${filename}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

export default {
  auth: authApi,
  content: contentApi,
  contact: contactApi,
  blog: blogApi,
  upload: uploadApi
};
