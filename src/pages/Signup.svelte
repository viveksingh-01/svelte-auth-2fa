<script lang="ts">
  let firstName = '',
    lastName = '',
    email = '',
    password = '',
    confirmPassword = '';

  interface ISignupPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  function submitForm() {
    const payload: ISignupPayload = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };
    console.log(payload);
  }
</script>

<section class="form__container">
  <h2 class="mb-4 is-size-2">Sign-up</h2>
  <form on:submit|preventDefault={submitForm}>
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
            type="text"
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
      <div class="field">
        <label class="label" for="confirm-password">Confirm Password</label>
        <div class="control">
          <input
            type="password"
            placeholder="Re-enter your password"
            class="input"
            bind:value={confirmPassword}
          />
        </div>
      </div>
      <div class="field mt-5">
        <div class="control">
          <button type="submit" class="button is-primary is-fullwidth">
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>
</section>
