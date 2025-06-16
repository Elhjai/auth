<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <!-- Hero Section with Marquee -->
    <section class="bg-gradient-to-r from-gray-800 to-gray-900 py-12 md:py-16 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=400&fit=crop&crop=center" 
          alt="Global Finance Background" 
          class="w-full h-full object-cover"
        />
      </div>
      
      <!-- Currency Exchange Visual -->
      <div class="relative z-10 text-center mb-8">
        <div class="flex justify-center items-center space-x-4 mb-6">
          <img 
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center" 
            alt="Currency Exchange" 
            class="w-16 h-16 rounded-full border-2 border-blue-400 animate-pulse"
          />
          <div class="text-2xl animate-bounce">⇄</div>
          <img 
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=100&h=100&fit=crop&crop=center" 
            alt="Global Markets" 
            class="w-16 h-16 rounded-full border-2 border-purple-400 animate-pulse"
          />
        </div>
        <h1 class="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Real-Time Currency Converter
        </h1>
      </div>

      <!-- Supported Countries Marquee -->
      <div class="mt-8 overflow-hidden">
        <h3 class="text-lg md:text-xl font-semibold text-gray-300 mb-4 text-center">
          Supported Worldwide
        </h3>
        <div class="relative">
          <div class="flex animate-marquee space-x-4">
            <div
              v-for="(country, index) in supportedCountries"
              :key="index"
              class="flex-shrink-0 bg-gray-800 p-3 rounded-lg border border-blue-500/30 hover:bg-blue-600/10 hover:border-blue-400 transition-all duration-300 min-w-[150px] md:min-w-[180px] text-center group"
            >
              <div class="flex justify-center mb-2">
                <img 
                  :src="country.flagImage" 
                  :alt="`${country.name} flag`"
                  class="w-8 h-6 rounded shadow-sm group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span class="text-xl mb-1 block">{{ country.flag }}</span>
              <p class="text-sm md:text-base font-medium text-gray-300 mt-1">
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
              class="flex-shrink-0 bg-gray-800 p-3 rounded-lg border border-blue-500/30 hover:bg-blue-600/10 hover:border-blue-400 transition-all duration-300 min-w-[150px] md:min-w-[180px] text-center group"
            >
              <div class="flex justify-center mb-2">
                <img 
                  :src="country.flagImage" 
                  :alt="`${country.name} flag`"
                  class="w-8 h-6 rounded shadow-sm group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span class="text-xl mb-1 block">{{ country.flag }}</span>
              <p class="text-sm md:text-base font-medium text-gray-300 mt-1">
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

    <!-- Live Rates Ticker -->
    <section class="bg-gray-800 py-4 overflow-hidden border-t border-blue-500/20">
      <div class="container mx-auto px-4">
        <div class="flex items-center space-x-3 text-sm md:text-base">
          <div class="flex items-center space-x-2">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=24&h=24&fit=crop&crop=center" 
              alt="Live Data" 
              class="w-6 h-6 rounded-full"
            />
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-blue-400 font-semibold whitespace-nowrap">Live Rates:</span>
          </div>
          <div class="flex space-x-4 animate-marquee">
            <span
              v-for="rate in liveRates"
              :key="rate.pair"
              class="text-gray-300 whitespace-nowrap flex items-center space-x-1"
            >
              <span>{{ rate.pair }}: {{ rate.value }}</span>
              <span class="text-green-400 text-xs">{{ rate.trend }}</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Conversion Form Section -->
    <section class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Conversion Form -->
        <div class="lg:col-span-2">
          <div
            class="bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl border border-blue-500/30 relative overflow-hidden"
          >
            <!-- Background decoration -->
            <div class="absolute top-0 right-0 w-32 h-32 opacity-10">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=128&h=128&fit=crop&crop=center" 
                alt="Finance Pattern" 
                class="w-full h-full object-cover rounded-full"
              />
            </div>
            
            <div class="relative z-10">
              <transition name="fade">
                <div
                  v-if="error"
                  class="bg-red-900/30 text-red-400 p-4 rounded-lg mb-6 text-center border border-red-500/30 flex items-center justify-center space-x-2"
                >
                  <span>⚠️</span>
                  <span>{{ error }}</span>
                </div>
              </transition>
              
              <form @submit.prevent="convertCurrency" class="space-y-6">
                <div>
                  <label for="amount" class="block text-sm font-medium text-gray-300 mb-2">
                    Amount to Convert
                  </label>
                  <div class="relative">
                    <input
                      type="number"
                      id="amount"
                      v-model.number="amount"
                      required
                      min="0"
                      step="0.01"
                      class="w-full px-4 py-3 bg-gray-700 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-600 pr-12"
                      placeholder="Enter amount"
                    />
                    <div class="absolute right-3 top-3 text-gray-400">
                      💰
                    </div>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="fromCurrency" class="block text-sm font-medium text-gray-300 mb-2">
                      From Currency
                    </label>
                    <div class="relative">
                      <select
                        id="fromCurrency"
                        v-model="fromCurrency"
                        required
                        class="w-full px-4 py-3 bg-gray-700 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-600 appearance-none pr-10"
                      >
                        <option
                          v-for="currency in currencies"
                          :key="currency.code"
                          :value="currency.code"
                        >
                          {{ currency.code }} - {{ currency.name }}
                        </option>
                      </select>
                      <div class="absolute right-3 top-3 text-gray-400 pointer-events-none">
                        <img 
                          :src="getCurrencyFlag(fromCurrency)" 
                          :alt="fromCurrency"
                          class="w-5 h-4 rounded"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label for="toCurrency" class="block text-sm font-medium text-gray-300 mb-2">
                      To Currency
                    </label>
                    <div class="relative">
                      <select
                        id="toCurrency"
                        v-model="toCurrency"
                        required
                        class="w-full px-4 py-3 bg-gray-700 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:bg-gray-600 appearance-none pr-10"
                      >
                        <option
                          v-for="currency in currencies"
                          :key="currency.code"
                          :value="currency.code"
                        >
                          {{ currency.code }} - {{ currency.name }}
                        </option>
                      </select>
                      <div class="absolute right-3 top-3 text-gray-400 pointer-events-none">
                        <img 
                          :src="getCurrencyFlag(toCurrency)" 
                          :alt="toCurrency"
                          class="w-5 h-4 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Swap Button -->
                <div class="flex justify-center">
                  <button
                    type="button"
                    @click="swapCurrencies"
                    class="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-180"
                  >
                    🔄
                  </button>
                </div>
                
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium text-sm md:text-base hover:from-blue-400 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                  <span v-else class="flex items-center">
                    <span class="mr-2">💱</span>
                    Convert Now
                  </span>
                </button>
              </form>
              
              <transition name="fade">
                <div v-if="result" class="mt-8 text-center">
                  <div class="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-lg border border-blue-400/30">
                    <p class="text-sm text-gray-400 mb-2">Conversion Result</p>
                    <p class="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                      {{ formatNumber(amount) }} {{ fromCurrency }} = 
                      <strong class="text-green-400">{{ formatNumber(result) }}</strong> {{ toCurrency }}
                    </p>
                    <p class="text-xs text-gray-500 mt-2">
                      Exchange rate: 1 {{ fromCurrency }} = {{ formatNumber(result / amount) }} {{ toCurrency }}
                    </p>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- Currency Info Sidebar -->
        <div class="space-y-6">
          <!-- Exchange Rate Card -->
          <div class="bg-gray-800 p-6 rounded-xl border border-blue-500/30">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-300">Live Exchange Rate</h3>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=32&h=32&fit=crop&crop=center" 
                alt="Live Rate" 
                class="w-8 h-8 rounded-full animate-pulse"
              />
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-400">{{ fromCurrency }} → {{ toCurrency }}</p>
              <p class="text-2xl font-bold text-blue-400">{{ getCurrentRate() }}</p>
              <p class="text-xs text-green-400 flex items-center justify-center mt-1">
                <span class="mr-1">📈</span>
                +0.23% today
              </p>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="bg-gray-800 p-6 rounded-xl border border-blue-500/30">
            <h3 class="text-lg font-semibold text-gray-300 mb-4 flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=24&h=24&fit=crop&crop=center" 
                alt="Stats" 
                class="w-6 h-6 rounded-full mr-2"
              />
              Market Info
            </h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-400">Market Status</span>
                <span class="text-green-400 text-sm">🟢 Open</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-400">Last Updated</span>
                <span class="text-blue-400 text-sm">{{ getCurrentTime() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-400">Volatility</span>
                <span class="text-yellow-400 text-sm">📊 Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Conversions Section -->
    <section class="container mx-auto px-4 py-12">
      <div class="text-center mb-8">
        <h2 class="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          Recent Conversions
        </h2>
        <img 
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=200&h=100&fit=crop&crop=center" 
          alt="Conversion History" 
          class="w-32 h-16 mx-auto rounded-lg shadow-lg border border-blue-500/30"
        />
      </div>
      
      <div
        v-if="recentConversions.length"
        class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        <div
          v-for="(conv, index) in recentConversions"
          :key="index"
          class="bg-gray-800 p-4 rounded-lg border border-blue-500/30 hover:bg-blue-600/10 hover:border-blue-400 hover:scale-105 transition-all duration-300 transform group"
        >
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-2">
              <img 
                :src="getCurrencyFlag(conv.from)" 
                :alt="conv.from"
                class="w-5 h-4 rounded"
              />
              <span class="text-xs text-gray-400">→</span>
              <img 
                :src="getCurrencyFlag(conv.to)" 
                :alt="conv.to"
                class="w-5 h-4 rounded"
              />
            </div>
            <span class="text-xs text-green-400 group-hover:scale-110 transition-transform">💰</span>
          </div>
          <p class="text-sm text-gray-300 font-medium">
            {{ formatNumber(conv.amount) }} {{ conv.from }} = 
            <strong class="text-blue-400">{{ formatNumber(conv.result) }}</strong> {{ conv.to }}
          </p>
          <p class="text-xs text-gray-500 mt-2 flex items-center">
            <span class="mr-1">🕒</span>
            {{ formatDate(conv.timestamp) }}
          </p>
        </div>
      </div>
      
      <div
        v-else
        class="text-center mt-8 p-8 bg-gray-800/50 rounded-lg border border-gray-700 max-w-md mx-auto"
      >
        <img 
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop&crop=center" 
          alt="No Conversions" 
          class="w-16 h-16 mx-auto rounded-full mb-4 opacity-50"
        />
        <p class="text-gray-500 text-sm font-medium animate-pulse">
          No recent conversions yet. Start converting now! 🚀
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CurrencyConverter',
  data() {
    return {
      amount: 100,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      currencies: [
        { code: 'USD', name: 'US Dollar', flag: 'https://flagcdn.com/w40/us.png' },
        { code: 'EUR', name: 'Euro', flag: 'https://flagcdn.com/w40/eu.png' },
        { code: 'GBP', name: 'British Pound', flag: 'https://flagcdn.com/w40/gb.png' },
        { code: 'JPY', name: 'Japanese Yen', flag: 'https://flagcdn.com/w40/jp.png' },
        { code: 'AUD', name: 'Australian Dollar', flag: 'https://flagcdn.com/w40/au.png' },
        { code: 'CAD', name: 'Canadian Dollar', flag: 'https://flagcdn.com/w40/ca.png' },
        { code: 'CHF', name: 'Swiss Franc', flag: 'https://flagcdn.com/w40/ch.png' },
        { code: 'CNY', name: 'Chinese Yuan', flag: 'https://flagcdn.com/w40/cn.png' },
        { code: 'INR', name: 'Indian Rupee', flag: 'https://flagcdn.com/w40/in.png' },
        { code: 'NGN', name: 'Nigerian Naira', flag: 'https://flagcdn.com/w40/ng.png' },
      ],
      result: null,
      isLoading: false,
      error: '',
      recentConversions: [],
      currentTime: '',
      // Exchange rates (mock data)
      exchangeRates: {
        'USD': { 'EUR': 0.92, 'GBP': 0.79, 'JPY': 149.25, 'AUD': 1.53, 'CAD': 1.35, 'CHF': 0.91, 'CNY': 7.18, 'INR': 83.12, 'NGN': 790.50 },
        'EUR': { 'USD': 1.09, 'GBP': 0.86, 'JPY': 162.34, 'AUD': 1.67, 'CAD': 1.47, 'CHF': 0.99, 'CNY': 7.82, 'INR': 90.43, 'NGN': 860.21 },
        'GBP': { 'USD': 1.27, 'EUR': 1.16, 'JPY': 189.51, 'AUD': 1.94, 'CAD': 1.71, 'CHF': 1.15, 'CNY': 9.12, 'INR': 105.34, 'NGN': 1003.14 },
        'JPY': { 'USD': 0.0067, 'EUR': 0.0062, 'GBP': 0.0053, 'AUD': 0.0102, 'CAD': 0.0090, 'CHF': 0.0061, 'CNY': 0.048, 'INR': 0.56, 'NGN': 5.30 },
        'AUD': { 'USD': 0.65, 'EUR': 0.60, 'GBP': 0.52, 'JPY': 97.55, 'CAD': 0.88, 'CHF': 0.59, 'CNY': 4.69, 'INR': 54.29, 'NGN': 516.44 },
        'CAD': { 'USD': 0.74, 'EUR': 0.68, 'GBP': 0.58, 'JPY': 110.56, 'AUD': 1.13, 'CHF': 0.67, 'CNY': 5.32, 'INR': 61.57, 'NGN': 585.93 },
        'CHF': { 'USD': 1.10, 'EUR': 1.01, 'GBP': 0.87, 'JPY': 164.18, 'AUD': 1.69, 'CAD': 1.49, 'CNY': 7.90, 'INR': 91.35, 'NGN': 869.23 },
        'CNY': { 'USD': 0.14, 'EUR': 0.13, 'GBP': 0.11, 'JPY': 20.78, 'AUD': 0.21, 'CAD': 0.19, 'CHF': 0.13, 'INR': 11.58, 'NGN': 110.15 },
        'INR': { 'USD': 0.012, 'EUR': 0.011, 'GBP': 0.0095, 'JPY': 1.79, 'AUD': 0.018, 'CAD': 0.016, 'CHF': 0.011, 'CNY': 0.086, 'NGN': 9.51 },
        'NGN': { 'USD': 0.0013, 'EUR': 0.0012, 'GBP': 0.001, 'JPY': 0.19, 'AUD': 0.0019, 'CAD': 0.0017, 'CHF': 0.0011, 'CNY': 0.0091, 'INR': 0.105 }
      },
      liveRates: [
        { pair: 'USD/EUR', value: '0.92', trend: '↗' },
        { pair: 'USD/GBP', value: '0.79', trend: '↗' },
        { pair: 'USD/JPY', value: '149.25', trend: '↘' },
        { pair: 'EUR/GBP', value: '0.86', trend: '↗' },
        { pair: 'GBP/JPY', value: '189.51', trend: '↘' },
        { pair: 'AUD/USD', value: '0.65', trend: '↗' },
      ],
      // Supported countries for marquee
      supportedCountries: [
        { name: 'United States', currency: 'USD', flag: '🇺🇸', flagImage: 'https://flagcdn.com/w40/us.png' },
        { name: 'Eurozone', currency: 'EUR', flag: '🇪🇺', flagImage: 'https://flagcdn.com/w40/eu.png' },
        { name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧', flagImage: 'https://flagcdn.com/w40/gb.png' },
        { name: 'Japan', currency: 'JPY', flag: '🇯🇵', flagImage: 'https://flagcdn.com/w40/jp.png' },
        { name: 'Australia', currency: 'AUD', flag: '🇦🇺', flagImage: 'https://flagcdn.com/w40/au.png' },
        { name: 'Canada', currency: 'CAD', flag: '🇨🇦', flagImage: 'https://flagcdn.com/w40/ca.png' },
        { name: 'Switzerland', currency: 'CHF', flag: '🇨🇭', flagImage: 'https://flagcdn.com/w40/ch.png' },
        { name: 'China', currency: 'CNY', flag: '🇨🇳', flagImage: 'https://flagcdn.com/w40/cn.png' },
        { name: 'India', currency: 'INR', flag: '🇮🇳', flagImage: 'https://flagcdn.com/w40/in.png' },
        { name: 'Nigeria', currency: 'NGN', flag: '🇳🇬', flagImage: 'https://flagcdn.com/w40/ng.png' },
      ],
    };
  },
  mounted() {
    // Initialize current time
    this.updateCurrentTime();
    // Update time every minute
    setInterval(this.updateCurrentTime, 60000);
    // Simulate real-time rate updates
    this.simulateRealTimeRates();
  },
  methods: {
    async convertCurrency() {
      this.isLoading = true;
      this.error = null;
      this.result = null;

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock conversion using exchange rates
        if (this.fromCurrency === this.toCurrency) {
          this.result = this.amount;
        } else {
          const rate = this.exchangeRates[this.fromCurrency]?.[this.toCurrency];
          if (rate) {
            this.result = parseFloat((this.amount * rate).toFixed(4));
          } else {
            throw new Error('Exchange rate not available');
          }
        }

        if (this.result !== null) {
          const conversion = {
            amount: this.amount,
            from: this.fromCurrency,
            to: this.toCurrency,
            result: this.result,
            timestamp: new Date().toISOString(),
          };
          this.recentConversions.unshift(conversion);
          this.recentConversions = this.recentConversions.slice(0, 9);
        }
      } catch (err) {
        this.error = err.message || 'Conversion failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
    
    swapCurrencies() {
      const temp = this.fromCurrency;
      this.fromCurrency = this.toCurrency;
      this.toCurrency = temp;
      
      if (this.result) {
        this.convertCurrency();
      }
    },
    
    getCurrencyFlag(currencyCode) {
      const currency = this.currencies.find(c => c.code === currencyCode);
      return currency ? currency.flag : 'https://flagcdn.com/w40/xx.png';
    },
    formatNumber(number) {
      if (number === null || isNaN(number)) return '0.00';
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      }).format(number);
    },
    
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'short'
      }).format(date);
    },
    
    getCurrentTime() {
      return new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });
    },
    
    updateCurrentTime() {
      this.currentTime = this.getCurrentTime();
    },
    
    getCurrentRate() {
      if (this.fromCurrency === this.toCurrency) return '1.0000';
      const rate = this.exchangeRates[this.fromCurrency]?.[this.toCurrency];
      return rate ? this.formatNumber(rate) : 'N/A';
    },
    
    simulateRealTimeRates() {
      // Simulate rate fluctuations
      setInterval(() => {
        this.liveRates = this.liveRates.map(rate => {
          const randomChange = (Math.random() * 0.02) - 0.01; // -1% to +1%
          const currentValue = parseFloat(rate.value);
          const newValue = currentValue * (1 + randomChange);
          
          return {
            pair: rate.pair,
            value: newValue.toFixed(4),
            trend: randomChange > 0 ? '↗' : '↘'
          };
        });
        
        // Also update the exchange rates object
        for (const fromCurr in this.exchangeRates) {
          for (const toCurr in this.exchangeRates[fromCurr]) {
            if (fromCurr !== toCurr) {
              const randomChange = (Math.random() * 0.005) - 0.0025; // -0.25% to +0.25%
              this.exchangeRates[fromCurr][toCurr] = 
                parseFloat((this.exchangeRates[fromCurr][toCurr] * (1 + randomChange)).toFixed(4));
            }
          }
        }
      }, 10000); // Update every 10 seconds
    }
  }
};
</script>

<style scoped>
/* Marquee animation */
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 20s linear infinite;
  display: flex;
  width: 200%;
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .animate-marquee {
    animation-duration: 15s;
  }
}
</style>
