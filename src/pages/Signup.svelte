<script lang="ts">
  import axios from 'axios';
  import { message, setMessage } from '../store/message';
  import type { ISignupPayload } from '../types';

  let firstName = '',
    lastName = '',
    email = '',
    password = '',
    confirmPassword = '';
  let isLoading = false;

  async function submitData(payload: ISignupPayload) {
    isLoading = true;
    try {
      const { data } = await axios.post('signup', payload);
      isLoading = false;
      setMessage({ body: data.message, type: 'success' });
    } catch (error: any) {
      isLoading = false;
    }
  }

  function signup() {
    const payload: ISignupPayload = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };
    submitData(payload);
  }
</script>

<section class="form__container">
  <h2 class="mb-4 is-size-2">Sign-up</h2>
  {#if $message.body}
    <article
      class="message {$message.type === 'success' ? 'is-primary' : 'is-danger'}"
    >
      <div class="message-body">{$message.body}</div>
    </article>
  {/if}
  <form on:submit|preventDefault={signup}>
    <div class="content">
      <div class="is-flex">
        <div class="field mr-2">
          <label class="label" for="firstname">First Name</label>
          <div class="control">
            <input
              type="text"
              placeholder="Enter your first name"
              class="input"
              bind:value={firstName}
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="lastname">Last Name</label>
          <div class="control">
            <input
              type="text"
              placeholder="Enter your last name"
              class="input"
              bind:value={lastName}
            />
          </div>
        </div>
      </div>
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
            placeholder="Enter password"
            class="input"
            bind:value={password}
          />
        </div>
      </div>
      <div class="field">
        <label class="label" for="confirm-password">Confirm Password</label>
        <div class="control">
          <input
            type="password"
            placeholder="Re-enter password"
            class="input"
            bind:value={confirmPassword}
          />
        </div>
      </div>
      <div class="field mt-5">
        <div class="control">
          <button
            type="submit"
            class="button is-primary is-fullwidth {isLoading && 'is-loading'}"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>
</section>
