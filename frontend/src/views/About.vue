<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-12 md:py-20 text-center">
      <h1
        class="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-down"
      >
        About CurrencyHub
      </h1>
      <p
        class="text-base md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto animate-fade-in-up"
      >
        CurrencyHub is your go-to platform for fast, secure, and reliable currency conversion, powered by real-time exchange rates.
      </p>
    </section>

    <!-- Mission Section -->
    <section class="container mx-auto px-4 py-12">
      <h2
        class="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-down"
      >
        Our Mission
      </h2>
      <p
        class="text-gray-300 text-sm md:text-base mt-4 max-w-3xl mx-auto text-center animate-fade-in"
      >
        We aim to simplify global finance by providing an intuitive tool for converting currencies, accessible to everyone, anywhere, anytime.
      </p>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-4 py-12">
      <h2
        class="text-2xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-down"
      >
        Why CurrencyHub?
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
          <h3 class="text-lg md:text-xl font-semibold text-white">{{ feature.title }}</h3>
          <p class="text-gray-400 text-sm mt-2">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="container mx-auto px-4 py-12 text-center">
      <p
        class="text-base md:text-xl text-gray-300 mb-6 animate-fade-in-up"
      >
        Ready to start converting currencies with ease?
      </p>
      <router-link
        to="/signup"
        class="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full text-sm md:text-base font-medium hover:from-blue-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 animate-pulse-subtle"
      >
        Get Started
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          title: 'Real-Time Rates',
          description: 'Access up-to-date exchange rates from trusted sources.',
          delay: 0.2,
        },
        {
          title: 'User-Friendly Design',
          description: 'Enjoy a seamless and intuitive conversion experience.',
          delay: 0.4,
        },
        {
          title: 'Global Accessibility',
          description: 'Convert currencies anytime, anywhere.',
          delay: 0.6,
        },
      ],
    };
  },
};
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
</style>