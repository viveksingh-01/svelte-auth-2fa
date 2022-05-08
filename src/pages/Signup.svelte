<script lang="ts">
  import axios from 'axios';
  import type { IResponseMessage, ISignupPayload } from '../types';

  let firstName = '',
    lastName = '',
    email = '',
    password = '',
    confirmPassword = '';

  let response: IResponseMessage;
  let isLoading = false;

  async function submitData(payload: ISignupPayload) {
    isLoading = true;
    response = { message: '', type: null };
    try {
      const { data } = await axios.post('register', payload);
      isLoading = false;
      response.message = data?.message;
      response.type = 'success';
    } catch (error: any) {
      isLoading = false;
      response.message = error?.response?.data.message;
      response.type = 'error';
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
  {#if response?.message}
    <article
      class="message {response.type === 'success' ? 'is-primary' : 'is-danger'}"
    >
      <div class="message-body">{response.message}</div>
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
