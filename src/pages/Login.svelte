<script lang="ts">
  import axios from 'axios';
  import { push } from 'svelte-spa-router';
  import { message, setMessage } from '../store/message';
  import type { ILoginPayload } from '../types';

  let email = '',
    password = '';
  let isLoading = false;

  async function submitData(payload: ILoginPayload) {
    isLoading = true;
    try {
      const { data } = (await axios.post('login', payload, {
        withCredentials: true,
      })) as { data: { message: string; token: string } };

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      isLoading = false;
      setMessage({ body: data.message, type: 'success' });

      setTimeout(async () => {
        await push('/');
      }, 1000);
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
