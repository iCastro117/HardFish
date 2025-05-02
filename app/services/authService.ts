async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };
  
    const response = await fetch(endpoint, { ...options, headers });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en la solicitud');
    }
    return response.json();
  }
  
  export const authService = {
    login: async (credentials: { email: string; password: string }) =>
      fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
  
    logout: async () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  
    getCurrentUser: () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
  
    getPerfil: async () => {
      return fetchWithAuth('/auth/perfil', { method: 'GET' });
    },
  };
  