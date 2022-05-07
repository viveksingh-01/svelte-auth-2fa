<script lang="ts">
  import axios from 'axios';
  let email = '',
    password = '';

  interface ILoginPayload {
    email: string;
    password: string;
  }

  async function login(payload: ILoginPayload) {
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/login',
        payload
      );
      console.log(data?.message);
    } catch (error) {
      console.error(error?.response?.data.message);
    }
  }

  function submitForm() {
    const payload: ILoginPayload = { email, password };
    login(payload);
  }
</script>

<section class="form__container">
  <h2 class="mb-4 is-size-2">Login</h2>
  <form on:submit|preventDefault={submitForm}>
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
          <button type="submit" class="button is-info is-fullwidth">
            Login
          </button>
        </div>
      </div>
    </div>
  </form>
</section>
