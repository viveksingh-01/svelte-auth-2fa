<script lang="ts">
  import axios from 'axios';
  import QRCode from 'qrcode';
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { message, setMessage } from '../store/message';
  import type { IAuthenticationPayload } from '../types/authentication-payload';

  let qrcodeSrc: string;
  let code: string;
  let isLoading = false;
  export let loginData: { id: number; secret?: string; otpAuthUrl?: string };

  async function submitData(payload: IAuthenticationPayload) {
    isLoading = true;
    try {
      const { data } = (await axios.post('validateOTP', payload, {
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

  function validateCode() {
    const { id, secret } = loginData;
    const payload: IAuthenticationPayload = { id, secret, code };
    submitData(payload);
  }

  onMount(() => {
    if (loginData.otpAuthUrl) {
      QRCode.toDataURL(loginData.otpAuthUrl, (err, url) => {
        qrcodeSrc = url;
      });
    }
  });
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
  <h3 class="is-size-4">Please enter the 6-digits code.</h3>
  {#if qrcodeSrc}
    <div class="is-fullwidth has-text-centered">
      <img src={qrcodeSrc} alt="QR code for OTP" />
    </div>
  {/if}
  <form on:submit|preventDefault={validateCode}>
    <div class="content">
      <div class="field">
        <div class="control">
          <input
            type="password"
            placeholder="Enter 6-digits code"
            class="input"
            bind:value={code}
          />
        </div>
      </div>
      <div class="field mt-5">
        <div class="control">
          <button
            type="submit"
            class="button is-info is-fullwidth {isLoading && 'is-loading'}"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>
</section>
