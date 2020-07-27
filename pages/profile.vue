<template>
  <div class="bg-red-100">
    <section
      v-if="$store.state.user"
      class="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div>
        <div class="text-sm leading-5 font-medium text-gray-900">
          Account Email
        </div>
        <div class="text-sm leading-5 text-gray-500">
          {{ $store.state.user.email }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  fetch({ store, redirect }) {
    if (
      !store.state.user ||
      (store.state.user && store.state.user.isAuthenticated === false)
    ) {
      return redirect('/')
    }
  }
}
</script>
