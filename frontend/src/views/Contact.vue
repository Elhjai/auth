<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-12 md:py-20 text-center">
      <h1
        class="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-down"
      >
        Get in Touch
      </h1>
      <p
        class="text-base md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto animate-fade-in-up"
      >
        Have questions or need support? Reach out to us, and we’ll get back to you as soon as possible.
      </p>
    </section>

    <!-- Contact Form -->
    <section class="container mx-auto px-4 py-12">
      <div
        class="bg-gray-800 p-6 md:p-8 rounded-xl shadow-2xl max-w-lg mx-auto border border-blue-500/30 animate-fade-in"
      >
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              required
              class="mt-1 w-full p-3 bg-gray-700 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              required
              class="mt-1 w-full p-3 bg-gray-700 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              for="message"
              class="block text-sm font-medium text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="4"
              class="mt-1 w-full p-3 bg-gray-700 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full font-medium hover:from-blue-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-subtle"
          >
            <span v-if="isSubmitting">Sending...</span>
            <span v-else>Send Message</span>
          </button>
        </form>
      </div>
    </section>

    <!-- Contact Info -->
    <section class="container mx-auto px-4 py-12 text-center">
      <h2
        class="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-down"
      >
        Contact Information
      </h2>
      <div
        class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
      >
        <div
          class="bg-gray-800 p-6 rounded-lg border border-blue-500/30 hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 animate-fade-in"
          style="animation-delay: 0.2s"
        >
          <p class="text-lg font-semibold text-white">Email</p>
          <p class="text-gray-400 text-sm mt-2">support@currencyhub.com</p>
        </div>
        <div
          class="bg-gray-800 p-6 rounded-lg border border-blue-500/30 hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 animate-fade-in"
          style="animation-delay: 0.4s"
        >
          <p class="text-lg font-semibold text-white">Phone</p>
          <p class="text-gray-400 text-sm mt-2">+1 (555) 123-4567</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
      isSubmitting: false,
    };
  },
  methods: {
    handleSubmit() {
      this.isSubmitting = true;
      // Simulate form submission (no server logic as per request)
      setTimeout(() => {
        this.isSubmitting = false;
        this.form = { name: '', email: '', message: '' };
        alert('Message sent! (This is a placeholder response.)');
      }, 1000);
    },
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