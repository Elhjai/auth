<template>
  <div
    class="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12"
  >
    <div
      class="bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl max-w-md w-full border border-blue-500/30 animate-fade-in"
    >
      <h2
        class="text-2xl md:text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6"
      >
        Welcome Back
      </h2>
      <transition name="fade">
        <div
          v-if="error"
          class="bg-red-900/50 text-red-300 p-4 rounded-lg mb-6 text-center border border-red-500/30"
        >
          {{ error }}
        </div>
      </transition>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 w-full p-3 bg-gray-700 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 w-full p-3 bg-gray-700 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full font-medium hover:from-blue-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-subtle"
        >
          <span v-if="isLoading">Logging In...</span>
          <span v-else>Login</span>
        </button>
      </form>
      <p class="mt-6 text-center text-gray-400 text-sm">
        Don't have an account?
        <router-link
          to="/signup"
          class="text-blue-400 hover:text-blue-300 transition-all duration-300"
        >
          Sign Up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password,
        });

        // Store token and username
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('username', response.data.username);
        this.$router.push('/converter');
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseSubtle {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-pulse-subtle {
  animation: pulseSubtle 2s ease-in-out infinite;
}
</style>