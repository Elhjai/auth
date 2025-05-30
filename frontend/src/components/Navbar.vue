<template>
  <nav class="bg-gray-900 text-white p-4 shadow-lg border-b border-blue-500/30">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <router-link
        to="/"
        class="text-xl md:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-300 hover:to-purple-400 transition-all duration-300"
      >
        💸 CurrencyHub
      </router-link>

      <!-- Hamburger Menu Button (Mobile) -->
      <button
        class="md:hidden text-gray-300 hover:text-blue-400 focus:outline-none"
        @click="toggleMobileMenu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
          ></path>
        </svg>
      </button>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-6">
        <router-link
          to="/"
          class="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group"
        >
          Home
          <span
            class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
        <router-link
          to="/about"
          class="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group"
        >
          About
          <span
            class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
        <router-link
          to="/contact"
          class="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group"
        >
          Contact
          <span
            class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/signup"
          class="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group"
        >
          Signup
          <span
            class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group"
        >
          Login
          <span
            class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
        <router-link
          v-if="isLoggedIn"
          to="/converter"
          class="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group"
        >
          Converter
          <span
            class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"
          ></span>
        </router-link>
        <!-- Currency Dropdown -->
        <div class="relative group">
          <button
            class="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center"
            @click="toggleCurrencyDropdown"
          >
            <span>{{ selectedCurrency }}</span>
            <svg
              class="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div
            v-if="showCurrencyDropdown"
            class="absolute right-0 mt-2 w-48 bg-gray-800 border border-blue-500/30 rounded-lg shadow-xl z-10"
          >
            <div
              v-for="currency in currencies"
              :key="currency"
              class="px-4 py-2 text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer"
              @click="selectCurrency(currency)"
            >
              {{ currency }}
            </div>
          </div>
        </div>
        <!-- Logout Button -->
        <button
          v-if="isLoggedIn"
          @click="logout"
          class="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-full text-sm font-medium hover:from-red-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden bg-gray-800 border-t border-blue-500/30 mt-4 rounded-lg shadow-xl"
    >
      <div class="flex flex-col p-4 space-y-4">
        <router-link
          to="/"
          class="text-gray-300 hover:text-blue-400 transition-all duration-300"
          @click="toggleMobileMenu"
        >
          Home
        </router-link>
        <router-link
          to="/about"
          class="text-gray-300 hover:text-blue-400 transition-all duration-300"
          @click="toggleMobileMenu"
        >
          About
        </router-link>
        <router-link
          to="/contact"
          class="text-gray-300 hover:text-blue-400 transition-all duration-300"
          @click="toggleMobileMenu"
        >
          Contact
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/signup"
          class="text-gray-300 hover:text-blue-400 transition-all duration-300"
          @click="toggleMobileMenu"
        >
          Signup
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="text-gray-300 hover:text-blue-400 transition-all duration-300"
          @click="toggleMobileMenu"
        >
          Login
        </router-link>
        <router-link
          v-if="isLoggedIn"
          to="/converter"
          class="text-gray-300 hover:text-blue-400 transition-all duration-300"
          @click="toggleMobileMenu"
        >
          Converter
        </router-link>
        <div>
          <button
            class="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center"
            @click="toggleCurrencyDropdown"
          >
            <span>{{ selectedCurrency }}</span>
            <svg
              class="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div
            v-if="showCurrencyDropdown"
            class="mt-2 w-full bg-gray-700 border border-blue-500/30 rounded-lg shadow-xl"
          >
            <div
              v-for="currency in currencies"
              :key="currency"
              class="px-4 py-2 text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-200 cursor-pointer"
              @click="selectCurrency(currency)"
            >
              {{ currency }}
            </div>
          </div>
        </div>
        <button
          v-if="isLoggedIn"
          @click="logout"
          class="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-full text-sm font-medium hover:from-red-400 hover:to-pink-400 transition-all duration-300 text-center"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      mobileMenuOpen: false,
      showCurrencyDropdown: false,
      currencies: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'],
      selectedCurrency: 'USD',
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('userToken');
    },
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      if (this.showCurrencyDropdown) this.showCurrencyDropdown = false;
    },
    toggleCurrencyDropdown() {
      this.showCurrencyDropdown = !this.showCurrencyDropdown;
    },
    selectCurrency(currency) {
      this.selectedCurrency = currency;
      this.showCurrencyDropdown = false;
      this.$emit('currency-selected', currency);
    },
    logout() {
      localStorage.removeItem('userToken');
      localStorage.removeItem('username');
      this.$router.push('/login');
      this.mobileMenuOpen = false;
    },
  },
};
</script>