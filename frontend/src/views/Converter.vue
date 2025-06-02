<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <!-- Hero Section with Marquee -->
    <section class="bg-gray-800 py-12 md:py-16">
      <!-- Supported Countries Marquee -->
      <div class="mt-8 overflow-hidden">
        <h3
          class="text-lg md:text-xl font-semibold text-gray-300 mb-4 animate-fade-in"
        >
        
        </h3>
        <div class="relative">
          <div class="flex animate-marquee space-x-4">
            <div
              v-for="(country, index) in supportedCountries"
              :key="index"
              class="flex-shrink-0 bg-gray-800 p-3 rounded-lg border border-blue-500/30 hover:bg-blue-600/10 hover:border-blue-400 transition-all duration-300 min-w-[150px] md:min-w-[180px] text-center"
            >
              <span class="text-2xl">{{ country.flag }}</span>
              <p class="text-sm md:text-base font-medium text-gray-300 mt-2">
                {{ country.name }}
              </p>
              <p class="text-xs text-gray-400">
                {{ country.currency }}
              </p>
            </div>
            <!-- Duplicate for seamless looping -->
            <div
              v-for="(country, index) in supportedCountries"
              :key="'dup-' + index"
              class="flex-shrink-0 bg-gray-800 p-3 rounded-lg border border-blue-500/30 hover:bg-blue-600/10 hover:border-blue-400 transition-all duration-300 min-w-[150px] md:min-w-[180px] text-center"
            >
              <span class="text-2xl">{{ country.flag }}</span>
              <p class="text-sm md:text-base font-medium text-gray-300 mt-2">
                {{ country.name }}
              </p>
              <p class="text-xs text-gray-400">
                {{ country.currency }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Conversion Form Section -->
    <section class="container mx-auto px-4 py-12">
      <div
        class="bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl max-w-lg mx-auto border border-blue-500/30 animate-slide-in"
      >
        <transition name="fade">
          <div
            v-if="error"
            class="bg-red-900/30 text-red-400 p-4 rounded-lg mb-6 text-center border border-red-500/30"
          >
            {{ error }}
          </div>
        </transition>
        <form @submit.prevent="convertCurrency" class="space-y-6">
          <div>
            <label for="amount" class="block text-sm font-medium text-gray-300">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              v-model.number="amount"
              required
              min="0"
              step="0.01"
              class="mt-2 w-full px-4 py-3 bg-gray-700 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-600"
              placeholder="Enter amount"
            />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                for="fromCurrency"
                class="block text-sm font-medium text-gray-300"
              >
                From Currency
              </label>
              <select
                id="fromCurrency"
                v-model="fromCurrency"
                required
                class="mt-2 w-full px-4 py-3 bg-gray-700 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-600"
              >
                <option
                  v-for="currency in currencies"
                  :key="currency"
                  :value="currency"
                >
                  {{ currency }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="toCurrency"
                class="block text-sm font-medium text-gray-300"
              >
                To Currency
              </label>
              <select
                id="toCurrency"
                v-model="toCurrency"
                required
                class="mt-2 w-full px-4 py-3 bg-gray-700 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-600"
              >
                <option
                  v-for="currency in currencies"
                  :key="currency"
                  :value="currency"
                >
                  {{ currency }}
                </option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium text-sm md:text-base hover:from-blue-400 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-subtle flex items-center justify-center"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg
                class="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Converting...
            </span>
            <span v-else>Convert Now</span>
          </button>
        </form>
        <transition name="fade">
          <div v-if="result" class="mt-8 text-center">
            <p
              class="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 animate-fade-in-up"
            >
              {{ amount }} {{ fromCurrency }} = <strong>{{ result }}</strong> {{ toCurrency }}
            </p>
          </div>
        </transition>
      </div>
    </section>

    <!-- Recent Conversions Section -->
    <section class="container mx-auto px-4 py-12">
      <h2
        class="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse"
      >
        Recent Conversions
      </h2>
      <div
        v-if="recentConversions.length"
        class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        <div
          v-for="(conv, index) in recentConversions"
          :key="index"
          class="bg-gray-800 p-4 rounded-lg border border-blue-500/30 hover:bg-blue-600/10 hover:border-blue-400 hover:scale-105 transition-all duration-300 transform animate-slide-in-out"
          :style="{ animationDelay: `${0.3 * index}s` }"
        >
          <p class="text-sm text-gray-300 font-medium">
            {{ conv.amount }} {{ conv.from }} = <strong>{{ conv.result }}</strong> {{ conv.to }}
          </p>
          <p class="text-xs text-gray-500 mt-2">
            {{ new Date(conv.timestamp).toLocaleString() }}
          </p>
        </div>
      </div>
      <p
        v-else
        class="text-center text-gray-500 mt-4 text-sm font-medium animate-pulse"
      >
        No recent conversions yet. Start converting now!
      </p>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

// API Configuration
const API_URL = 'https://auth-production-3fd3.up.railway.app';

export default {
  data() {
    return {
      amount: 100,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      currencies: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'],
      result: null,
      isLoading: false,
      error: '',
      recentConversions: JSON.parse(localStorage.getItem('recentConversions')) || [],
      // Hero section data
      quickAmount: 1,
      quickFromCurrency: 'USD',
      quickToCurrency: 'EUR',
      quickResult: null,
      liveRates: [
        { pair: 'USD/EUR', value: '0.92' },
        { pair: 'USD/GBP', value: '0.79' },
        { pair: 'USD/JPY', value: '149.25' },
        { pair: 'EUR/GBP', value: '0.86' },
      ],
      // Supported countries for marquee
      supportedCountries: [
        { name: 'United States', currency: 'USD', flag: '🇺🇸' },
        { name: 'Eurozone', currency: 'EUR', flag: '🇪🇺' },
        { name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
        { name: 'Japan', currency: 'JPY', flag: '🇯🇵' },
        { name: 'Australia', currency: 'AUD', flag: '🇦🇺' },
        { name: 'Canada', currency: 'CAD', flag: '🇨🇦' },
      ],
    };
  },
  watch: {
    quickAmount(newVal) {
      if (newVal > 0) this.quickConvert();
    },
    quickFromCurrency() {
      if (this.quickAmount > 0) this.quickConvert();
    },
    quickToCurrency() {
      if (this.quickAmount > 0) this.quickConvert();
    },
  },
  methods: {
    async convertCurrency() {
      this.isLoading = true;
      this.error = null;
      this.result = null;
      try {
        const response = await axios.get(`${API_URL}/api/converter/convert`, {
          params: {
            from: this.fromCurrency,
            to: this.toCurrency,
            amount: this.amount,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        this.result = response.data.result;
        if (this.result) {
          const conversion = {
            amount: this.amount,
            from: this.fromCurrency,
            to: this.toCurrency,
            result: this.result,
            timestamp: new Date().toISOString(),
          };
          this.recentConversions.unshift(conversion);
          this.recentConversions = this.recentConversions.slice(0, 9);
          localStorage.setItem('recentConversions', JSON.stringify(this.recentConversions));
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Conversion failed';
        console.error('Conversion error:', err);
      } finally {
        this.isLoading = false;
      }
    },
    async quickConvert() {
      if (!this.quickAmount || this.quickAmount <= 0) {
        this.quickResult = null;
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/api/converter/convert`, {
          params: {
            from: this.quickFromCurrency,
            to: this.quickToCurrency,
            amount: this.quickAmount,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        this.quickResult = response.data.result;
      } catch (err) {
        this.quickResult = null;
        console.error('Quick convert failed:', err);
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spinSlow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes slideIn {
  0% { opacity: 0; transform: translateX(-20px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes slideInOut {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes pulseSubtle {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.03); opacity: 0.95; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
}

@keyframes ticker {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-spin-slow {
  animation: spinSlow 20s linear infinite;
}

.animate-slide-in {
  animation: slideIn 0.6s ease-out forwards;
}

.animate-slide-in-out {
  animation: slideInOut 0.6s ease-out forwards;
}

.animate-pulse-subtle {
  animation: pulseSubtle 2.5s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

.animate-ticker {
  animation: ticker 25s linear infinite;
}

.animate-marquee {
  animation: marquee 20s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
