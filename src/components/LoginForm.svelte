<script lang="ts">
  import axios from 'axios';
  import { createEventDispatcher } from 'svelte';
  import { message } from '../store/message';
  import type { ILoginPayload } from '../types';

  let email = '',
    password = '';
  let isLoading = false;
  const dispatch = createEventDispatcher();

  async function submitData(payload: ILoginPayload) {
    isLoading = true;
    try {
      const { data } = (await axios.post('login', payload, {})) as {
        data: { id: number; secret?: string; otpAuthUrl?: string };
      };
      isLoading = false;
      dispatch('login', data);
    } catch (error: any) {
      isLoading = false;
    }
  }

  function login() {
    const payload: ILoginPayload = { email, password };
    submitData(payload);
  }
</script>

<section class="form__container">
  <h2 class="mb-4 is-size-2">Login</h2>
  {#if $message.body}
    <article
      class="message {$message.type === 'success' ? 'is-primary' : 'is-danger'}"
    >
      <div class="message-body">{$message.body}</div>
    </article>
  {/if}
  <form on:submit|preventDefault={login}>
    <div class="content">
      <div class="field">
        <label class="label" for="email">Email</label>
        <div class="control">
          <input
            type="email"
            placeholder="Enter your email address"
            class="input"
            bind:value={email}
          />
        </div>
      </div>
      <div class="field">
        <label class="label" for="password">Password</label>
        <div class="control">
          <input
            type="password"
            placeholder="Enter your password"
            class="input"
            bind:value={password}
          />
        </div>
      </div>
      <div class="field mt-5">
        <div class="control">
          <button
            type="submit"
            class="button is-info is-fullwidth {isLoading && 'is-loading'}"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </form>
</section>
