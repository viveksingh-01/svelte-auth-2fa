<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { isAuthenticated } from '../store/auth';
  import type { IUser } from '../types';

  let user: IUser;

  async function getUserInfo() {
    try {
      const { data } = await axios.get<IUser>('user');
      if (!!data) {
        user = data;
        isAuthenticated.set(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  onMount(() => {
    getUserInfo();
  });
</script>

<section>
  <div class="has-text-centered my-5">
    {#if user?.firstName}
      <h2 class="is-size-2 mb-4 has-text-primary">Hi {user.firstName}!</h2>
    {/if}
    <h3 class="is-size-4">Welcome to Svelte 2FA!</h3>
  </div>
</section>
