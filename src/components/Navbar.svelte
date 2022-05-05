<script lang="ts">
  import { link } from 'svelte-spa-router';

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
        <a href="/" use:link class="navbar-item"> Home </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a href="/signup" use:link class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a href="/login" use:link class="button is-light"> Log in </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
