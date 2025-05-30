<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-12 md:py-20 text-center">
      <h1
        class="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-down"
      >
        Convert Currencies with Ease
      </h1>
      <p
        class="text-base md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto animate-fade-in-up"
      >
        Experience lightning-fast currency conversion with real-time rates and a seamless interface.
      </p>

      <!-- CTA Buttons -->
      <div class="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <router-link
          to="/signup"
          class="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full text-sm md:text-base font-medium hover:from-blue-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 animate-pulse-subtle"
        >
          Get Started
        </router-link>
        <router-link
          to="/converter"
          class="bg-gray-700 px-6 py-3 rounded-full text-sm md:text-base font-medium hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
        >
          Try Converter
        </router-link>
      </div>

      <!-- Currency Showcase -->
      <div class="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
        <div
          v-for="currency in featuredCurrencies"
          :key="currency.code"
          class="bg-gray-800 p-4 rounded-lg border border-blue-500/30 hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
          :style="{ animationDelay: `${currency.delay}s` }"
        >
          <span class="text-lg md:text-xl font-semibold">{{ currency.code }}</span>
          <p class="text-gray-400 text-sm">{{ currency.name }}</p>
        </div>
      </div>
    </section>

    <!-- Live Rates Ticker -->
    <section class="bg-gray-800 py-4 overflow-hidden">
      <div class="container mx-auto px-4">
        <div class="flex items-center space-x-3 text-sm md:text-base">
          <span class="text-blue-400 font-semibold whitespace-nowrap">Live Rates:</span>
          <div class="flex space-x-4 animate-ticker">
            <span
              v-for="rate in exchangeRates"
              :key="rate.pair"
              class="text-gray-300 whitespace-nowrap"
            >
              {{ rate.pair }}: {{ rate.value }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-4 py-12 md:py-20">
      <h2
        class="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-down"
      >
        Why Choose CurrencyHub?
      </h2>
      <div
        class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
      >
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-gray-800 p-6 rounded-lg border border-blue-500/30 hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
          :style="{ animationDelay: `${feature.delay}s` }"
        >
          <component :is="feature.icon" class="w-10 h-10 text-blue-400 mb-4 mx-auto" />
          <h3 class="text-lg md:text-xl font-semibold">{{ feature.title }}</h3>
          <p class="text-gray-400 text-sm mt-2">{{ feature.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import {
  CurrencyDollarIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline';

export default defineComponent({
  data() {
    return {
      featuredCurrencies: [
        { code: 'USD', name: 'US Dollar', delay: 0.2 },
        { code: 'EUR', name: 'Euro', delay: 0.4 },
        { code: 'GBP', name: 'British Pound', delay: 0.6 },
        { code: 'JPY', name: 'Japanese Yen', delay: 0.8 },
      ],
      exchangeRates: [
        { pair: 'USD/EUR', value: '0.92' },
        { pair: 'USD/GBP', value: '0.79' },
        { pair: 'USD/JPY', value: '149.25' },
        { pair: 'EUR/GBP', value: '0.86' },
      ],
      features: [
        {
          title: 'Real-Time Rates',
          description: 'Get up-to-date exchange rates from trusted sources.',
          icon: ClockIcon,
          delay: 0.2,
        },
        {
          title: 'Secure Transactions',
          description: 'Your data is protected with top-tier security.',
          icon: ShieldCheckIcon,
          delay: 0.4,
        },
        {
          title: 'Easy to Use',
          description: 'Convert currencies with a simple, intuitive interface.',
          icon: CurrencyDollarIcon,
          delay: 0.6,
        },
      ],
    };
  },
});
</script>

<style scoped>
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes pulseSubtle {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

@keyframes ticker {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-pulse-subtle {
  animation: pulseSubtle 2s ease-in-out infinite;
}

.animate-ticker {
  animation: ticker 25s linear infinite;
}
</style>