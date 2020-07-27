<template>
  <div>
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div>
            <nuxt-link
              to="/"
              class="inline-flex items-center pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-700 hover:text-gray-800 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:border-gray-300 transition duration-150 ease-in-out"
            >
              Home
            </nuxt-link>
          </div>

          <div class="flex items-center">
            <nuxt-link
              to="/login"
              v-if="!$store.state.user"
              class="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-700  hover:text-gray-800 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:border-gray-300 transition duration-150 ease-in-out"
            >
              Login
            </nuxt-link>
            <nuxt-link
              to="/register"
              v-if="!$store.state.user"
              class="ml-8 inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white 
                bg-green-700
                rounded
                hover:bg-green-600
                focus:outline-none transition duration-150 ease-in-out"
            >
              Register
            </nuxt-link>
            <a
              v-if="$store.state.user"
              @click="logout"
              class="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
            >
              Logout
            </a>
            <nuxt-link to="/profile" v-if="$store.state.user" class="ml-4">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                class="w-8 h-8 text-gray-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>

    <nuxt />
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$axios.post('/api/logout')
        this.$store.commit('SET_USER', null)

        if (this.$route.path === '/profile') {
          this.$router.push('/')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
