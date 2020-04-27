<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <h2 class="text-3xl font-bold">Reset Password</h2>
      <p class="mt-6 text-base leading-5 text-gray-600 max-w-sm mx-auto">
        Enter your email below and we'll send you instructions on how to create
        a new password.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="submit">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Email
            </label>

            <div class="mt-1 rounded-md shadow-sm">
              <input
                v-model="email"
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-purple focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                class="rounded-full tracking-wider  bg-gray-800 hover:bg-gray-900  text-white font-bold text-center py-3 px-8 text-sm uppercase transition transform duration-200 focus:outline-none w-full"
              >
                Send Reset
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    async submit() {
      try {
        const response = await this.$axios.post('/api/users/resetPassword', {
          email: this.email
        })
        console.log(response)
      } catch (err) {
        console.log(err.response)
        // throw new Error(err)
      }
    }
  }
}
</script>

<style lang="scss"></style>
