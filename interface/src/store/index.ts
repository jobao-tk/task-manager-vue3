import { createStore } from 'vuex';
import { jwtDecode } from 'jwt-decode';
import apiClient from '../config/axios'; // Importe o cliente API configurado

interface State {
  authToken: string | null;
  user: object | null;
  tasks: Array<object> | null;
}

export default createStore<State>({
  state: {
    authToken: null,
    user: null,
    tasks: null,
  },
  mutations: {
    setAuthToken(state, token: string) {
      state.authToken = token;
    },
    setUser(state, user: object) {
      state.user = user;
    },
    clearAuthData(state) {
      state.authToken = null;
      state.user = null;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    clearTasks(state, tasks) {
      state.tasks = null;
    }
  },
  actions: {
    login({ commit }, authData) {
      commit('setAuthToken', authData.token);
      const decodedToken: any = jwtDecode(authData.token);
      commit('setUser', decodedToken);
      localStorage.setItem('authToken', authData.token);
    },
    logout({ commit }) {
      commit('clearAuthData');
      localStorage.removeItem('authToken');
    },
    autoLogin({ commit }) {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          commit('setAuthToken', token);
          commit('setUser', decodedToken);
        } else {
          commit('clearAuthData');
          localStorage.removeItem('authToken');
        }
      }
    },
    async checkToken({ commit }) {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          commit('setAuthToken', token);
          commit('setUser', decodedToken);
          return true;
        } else {
          // Token expirado, tentar renovar o token
          try {
            const response = await apiClient.post('users/checkToken', { token });
            console.log(response);
            commit('setAuthToken', token);
            commit('setUser', decodedToken);
            localStorage.setItem('authToken', token);
            return true;
          } catch (error) {
            commit('clearAuthData');
            localStorage.removeItem('authToken');
            return false;
          }
        }
      }
      return false;
    },
    async fetchTasks({ commit }) {
      const response = await apiClient.get('tasks')
      if(response.data.length > 0) {
        commit('setTasks', response.data);
      } else {
        commit('clearTasks');
      }
      
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.authToken;
    },
    getUser(state) {
      return state.user;
    },
    getTasks(state) {
      return state.tasks;
    }
  }
});
