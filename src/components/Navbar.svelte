<script lang="ts">
  let isActive = false;
  function toggleNavbar() {
    isActive = !isActive;
  }
</script>

<nav class="navbar is-light py-2" aria-label="main navigation">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <h1 class="is-size-5 has-text-weight-light">SVELTE 2FA AUTH</h1>
      </a>

      <!-- svelte-ignore a11y-missing-attribute -->
      <a
        role="button"
        class="navbar-burger {isActive && 'is-active'}"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar"
        on:click={toggleNavbar}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div id="navbar" class="navbar-menu {isActive && 'is-active'}">
      <div class="navbar-start">
        <a class="navbar-item" href="/"> Home </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" href="/signup">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" href="/login"> Log in </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
