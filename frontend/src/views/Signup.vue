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
        Create Your Account
      </h2>
      <transition name="fade">
        <div
          v-if="error"
          class="bg-red-900/50 text-red-300 p-4 rounded-lg mb-6 text-center border border-red-500/30"
        >
          {{ error }}
        </div>
      </transition>
      <transition name="fade">
        <div
          v-if="success"
          class="bg-green-900/50 text-green-300 p-4 rounded-lg mb-6 text-center border border-green-500/30"
        >
          {{ success }}
        </div>
      </transition>
      <form @submit.prevent="handleSignup" class="space-y-6">
        <div>
          <label
            for="username"
            class="block text-sm font-medium text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="mt-1 w-full p-3 bg-gray-700 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            placeholder="Enter your username"
          />
        </div>
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
          <span v-if="isLoading">Signing Up...</span>
          <span v-else>Sign Up</span>
        </button>
      </form>
      <div class="mt-4 space-y-2">
        
      </div>
      <p class="mt-6 text-center text-gray-400 text-sm">
        Already have an account?
        <router-link
          to="/login"
          class="text-blue-400 hover:text-blue-300 transition-all duration-300"
        >
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      isLoading: false,
      error: null,
      success: null,
    };
  },
  methods: {
    async handleSignup() {
      this.isLoading = true;
      this.error = null;
      this.success = null;

      // Simulate signup process without server dependency
      setTimeout(() => {
        try {
          // Mock successful signup - accept any username/email/password
          if (this.username && this.email && this.password) {
            // Basic validation
            if (this.password.length < 3) {
              this.error = 'Password must be at least 3 characters long';
              return;
            }

            // Store mock token and username
            const mockToken = 'mock-signup-token-' + Date.now();
            
            localStorage.setItem('userToken', mockToken);
            localStorage.setItem('username', this.username);
            
            this.success = 'Account created successfully! Redirecting...';
            
            // Redirect after showing success message
            setTimeout(() => {
              this.$router.push('/converter');
            }, 1000);
          } else {
            this.error = 'Please fill in all fields';
          }
        } catch (error) {
          this.error = 'Signup failed';
        } finally {
          this.isLoading = false;
        }
      }, 1000); // Simulate network delay
    },
    bypassSignup() {
      // Allow immediate access without any credentials
      const mockToken = 'bypass-signup-token-' + Date.now();
      const username = 'new-user-' + Math.floor(Math.random() * 1000);
      
      localStorage.setItem('userToken', mockToken);
      localStorage.setItem('username', username);
      
      this.success = 'Account created! Redirecting...';
      
      setTimeout(() => {
        this.$router.push('/converter');
      }, 500);
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
