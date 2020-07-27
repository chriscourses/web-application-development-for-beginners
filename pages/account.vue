<template>
  <section>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">Account Page</div>
  </section>
</template>

<script>
export default {
  fetch({ store, redirect }) {
    if (
      !store.state.user ||
      (store.state.user && store.state.user.isAuthenticated === false)
    ) {
      return redirect('/register')
    }
  }
}
</script>

<style lang="scss"></style>
