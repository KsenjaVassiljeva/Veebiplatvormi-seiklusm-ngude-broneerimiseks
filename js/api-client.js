const API_URL = 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  async request(method, endpoint, data = null) {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const options = {
      method,
      headers
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'API Error');
      }

      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(firstName, lastName, email, password) {
    return this.request('POST', '/auth/register', { firstName, lastName, email, password });
  }

  async login(email, password) {
    return this.request('POST', '/auth/login', { email, password });
  }

  async getCurrentUser() {
    return this.request('GET', '/auth/me');
  }

  // Quest endpoints
  async getQuests() {
    return this.request('GET', '/quests');
  }

  async getQuest(id) {
    return this.request('GET', `/quests/${id}`);
  }

  // TimeSlot endpoints
  async getAvailableSlots(questId, startDate, endDate) {
    return this.request('GET', `/time-slots/quest/${questId}/available?startDate=${startDate}&endDate=${endDate}`);
  }

  async getQuestSlots(questId) {
    return this.request('GET', `/time-slots/quest/${questId}`);
  }

  // Booking endpoints
  async createBooking(timeSlotId, numberOfPeople) {
    return this.request('POST', '/bookings', { timeSlotId, numberOfPeople });
  }

  async getMyBookings() {
    return this.request('GET', '/bookings');
  }

  async getBooking(id) {
    return this.request('GET', `/bookings/${id}`);
  }

  async cancelBooking(id) {
    return this.request('DELETE', `/bookings/${id}`);
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }
}

const apiClient = new ApiClient();
