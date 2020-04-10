<template>
  <section>
    Account Page
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
