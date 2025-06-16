<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-12 md:py-20 text-center relative overflow-hidden">
      <!-- Background Animation Elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-400 animate-pulse"></div>
        <div class="absolute top-32 right-20 w-16 h-16 rounded-full bg-purple-400 animate-bounce"></div>
        <div class="absolute bottom-20 left-1/4 w-12 h-12 rounded-full bg-green-400 animate-ping"></div>
      </div>

      <!-- Hero Content with Background Image -->
      <div class="relative z-10">
        <div class="flex justify-center mb-8">
          <img 
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=120&fit=crop&crop=center" 
            alt="Currency Exchange" 
            class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-blue-400 shadow-2xl animate-pulse-subtle"
          />
        </div>
        
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

        <!-- Currency Showcase with Images -->
        <div class="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          <div
            v-for="currency in featuredCurrencies"
            :key="currency.code"
            class="bg-gray-800 p-4 rounded-lg border border-blue-500/30 hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in group"
            :style="{ animationDelay: `${currency.delay}s` }"
          >
            <div class="flex justify-center mb-3">
              <img 
                :src="currency.flag" 
                :alt="`${currency.name} flag`"
                class="w-8 h-6 rounded shadow-md group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span class="text-lg md:text-xl font-semibold">{{ currency.code }}</span>
            <p class="text-gray-400 text-sm">{{ currency.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Rates Ticker -->
    <section class="bg-gray-800 py-4 overflow-hidden">
      <div class="container mx-auto px-4">
        <div class="flex items-center space-x-3 text-sm md:text-base">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-blue-400 font-semibold whitespace-nowrap">Live Rates:</span>
          </div>
          <div class="flex space-x-4 animate-ticker">
            <span
              v-for="rate in exchangeRates"
              :key="rate.pair"
              class="text-gray-300 whitespace-nowrap flex items-center space-x-1"
            >
              <span>{{ rate.pair }}: {{ rate.value }}</span>
              <span class="text-green-400 text-xs">↗</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Statistics Section -->
    <section class="bg-gradient-to-r from-gray-800 to-gray-900 py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="transform hover:scale-105 transition-all duration-300">
            <div class="flex justify-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=80&h=80&fit=crop&crop=center" 
                alt="Global Network" 
                class="w-16 h-16 rounded-full border-2 border-blue-400"
              />
            </div>
            <h3 class="text-2xl font-bold text-blue-400">180+</h3>
            <p class="text-gray-300">Currencies Supported</p>
          </div>
          <div class="transform hover:scale-105 transition-all duration-300">
            <div class="flex justify-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=80&fit=crop&crop=center" 
                alt="Fast Processing" 
                class="w-16 h-16 rounded-full border-2 border-green-400"
              />
            </div>
            <h3 class="text-2xl font-bold text-green-400">1M+</h3>
            <p class="text-gray-300">Conversions Daily</p>
          </div>
          <div class="transform hover:scale-105 transition-all duration-300">
            <div class="flex justify-center mb-4">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop&crop=center" 
                alt="Real-time Updates" 
                class="w-16 h-16 rounded-full border-2 border-purple-400"
              />
            </div>
            <h3 class="text-2xl font-bold text-purple-400">99.9%</h3>
            <p class="text-gray-300">Uptime Guarantee</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-4 py-12 md:py-20">
      <h2
        class="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-down mb-4"
      >
        Why Choose CurrencyHub?
      </h2>
      
      <!-- Feature Hero Image -->
      <div class="flex justify-center mb-12">
        <img 
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=200&fit=crop&crop=center" 
          alt="Financial Technology" 
          class="w-full max-w-md h-48 object-cover rounded-lg shadow-2xl border border-blue-500/30 hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-gray-800 p-6 rounded-lg border border-blue-500/30 hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in group"
          :style="{ animationDelay: `${feature.delay}s` }"
        >
          <div class="flex justify-center mb-4">
            <img 
              :src="feature.image" 
              :alt="feature.title"
              class="w-16 h-16 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <component :is="feature.icon" class="w-8 h-8 text-blue-400 mb-4 mx-auto" />
          <h3 class="text-lg md:text-xl font-semibold">{{ feature.title }}</h3>
          <p class="text-gray-400 text-sm mt-2">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Call to Action with Background -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div class="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=400&fit=crop&crop=center" 
          alt="Global Finance" 
          class="w-full h-full object-cover"
        />
      </div>
      <div class="relative z-10 container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust CurrencyHub for accurate, real-time currency conversion.
        </p>
        <router-link
          to="/signup"
          class="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-full text-lg font-medium hover:from-blue-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 inline-block"
        >
          Start Converting Now
        </router-link>
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
        { 
          code: 'USD', 
          name: 'US Dollar', 
          delay: 0.2,
          flag: 'https://flagcdn.com/w40/us.png'
        },
        { 
          code: 'EUR', 
          name: 'Euro', 
          delay: 0.4,
          flag: 'https://flagcdn.com/w40/eu.png'
        },
        { 
          code: 'GBP', 
          name: 'British Pound', 
          delay: 0.6,
          flag: 'https://flagcdn.com/w40/gb.png'
        },
        { 
          code: 'JPY', 
          name: 'Japanese Yen', 
          delay: 0.8,
          flag: 'https://flagcdn.com/w40/jp.png'
        },
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
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center'
        },
        {
          title: 'Secure Transactions',
          description: 'Your data is protected with top-tier security.',
          icon: ShieldCheckIcon,
          delay: 0.4,
          image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=center'
        },
        {
          title: 'Easy to Use',
          description: 'Convert currencies with a simple, intuitive interface.',
          icon: CurrencyDollarIcon,
          delay: 0.6,
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center'
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
