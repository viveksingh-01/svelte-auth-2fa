<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';

  interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  }
  let user: IUser;

  async function getUserInfo() {
    try {
      const { data } = (await axios.get('user')) as { data: IUser };
      user = data;
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
      <h2 class="is-size-2">Hi {user.firstName}!</h2>
    {/if}
    <h3 class="is-size-3">Welcome to Svelte 2FA Auth!</h3>
  </div>
</section>
