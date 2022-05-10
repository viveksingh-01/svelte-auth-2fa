<script lang="ts">
  import axios from 'axios';
  import { link, push } from 'svelte-spa-router';
  import { isAuthenticated } from '../store/auth';

  let isActive = false;
  function toggleNavbar() {
    isActive = !isActive;
  }

  async function logout() {
    try {
      await axios.post('logout', {}, { withCredentials: true });
      isAuthenticated.set(false);
      await push('/login');
    } catch (error) {
      console.error(error);
    }
  }
</script>

<nav class="navbar is-light py-2" aria-label="main navigation">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <h1 class="is-size-5 has-text-weight-light">SVELTE 2FA</h1>
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
            {#if $isAuthenticated}
              <button class="button is-light" on:click={logout}>Logout</button>
            {:else}
              <a href="/signup" use:link class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a href="/login" use:link class="button is-light"> Log in </a>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
