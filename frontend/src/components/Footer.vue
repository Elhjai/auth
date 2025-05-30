<template>
  <footer class="bg-gray-900 text-white py-6 border-t border-blue-500/30">
    <div class="container mx-auto px-4">
      <!-- Exchange Rate Ticker -->
      <div
        class="bg-gray-800 p-3 rounded-lg mb-4 flex items-center justify-center space-x-3 overflow-hidden text-sm"
      >
        <span class="text-blue-400 font-semibold">Live Rates:</span>
        <div class="flex space-x-3 animate-ticker">
          <span
            v-for="rate in exchangeRates"
            :key="rate.pair"
            class="text-gray-300 whitespace-nowrap"
          >
            {{ rate.pair }}: {{ rate.value }}
          </span>
        </div>
      </div>

      <!-- Main Footer Content -->
      <div
        class="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0"
      >
        <!-- Branding -->
        <div class="text-center md:text-left">
          <router-link
            to="/"
            class="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            CurrencyHub
          </router-link>
          <p class="text-gray-400 text-xs md:text-sm mt-2">
            Your trusted platform for real-time currency conversion.
          </p>
        </div>

        <!-- Navigation Links -->
        <div class="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 text-center">
          <router-link
            to="/about"
            class="text-gray-300 hover:text-blue-400 transition-all duration-300 text-sm"
          >
            About
          </router-link>
          <router-link
            to="/contact"
            class="text-gray-300 hover:text-blue-400 transition-all duration-300 text-sm"
          >
            Contact
          </router-link>
          <router-link
            to="/privacy"
            class="text-gray-300 hover:text-blue-400 transition-all duration-300 text-sm"
          >
            Privacy Policy
          </router-link>
        </div>

        <!-- Social Links -->
        <div class="flex space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            class="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
          >
            <svg
              class="w-5 h-5 md:w-6 md:h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.643 4.937a10.384 10.384 0 01-2.986.817 5.21 5.21 0 002.285-2.88 10.326 10.326 0 01-3.29 1.257 5.182 5.182 0 00-8.82 4.717 14.688 14.688 0 01-10.665-5.416 5.182 5.182 0 001.6 6.915 5.153 5.153 0 01-2.346-.647v.066a5.183 5.183 0 004.156 5.077 5.183 5.183 0 01-2.34.088 5.184 5.184 0 004.84 3.598 10.39 10.39 0 01-6.437 2.22c-.418 0-.83-.025-1.236-.074a14.688 14.688 0 007.954 2.332c9.55 0 14.77-7.91 14.77-14.77 0-.225-.005-.45-.015-.672A10.54 10.54 0 0024 4.59l-.357.347z"
              />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            class="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
          >
            <svg
              class="w-5 h-5 md:w-6 md:h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"
              />
            </svg>
          </a>
        </div>
      </div>

      <!-- Copyright -->
      <div class="text-center text-gray-400 text-xs mt-6">
        © 2025 CurrencyHub. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      exchangeRates: [
        { pair: 'USD/EUR', value: '0.92' },
        { pair: 'USD/GBP', value: '0.79' },
        { pair: 'USD/JPY', value: '149.25' },
        { pair: 'EUR/GBP', value: '0.86' },
      ],
    };
  },
};
</script>

<style scoped>
@keyframes ticker {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-ticker {
  animation: ticker 25s linear infinite;
}
</style>