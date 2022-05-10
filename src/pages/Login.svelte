<script lang="ts">
  import AuthenticatorForm from '../components/AuthenticatorForm.svelte';
  import LoginForm from '../components/LoginForm.svelte';

  let loginData: { id: number; secret?: string; otpAuthUrl?: string } = {
    id: 0,
  };
</script>

{#if loginData.id === 0}
  <LoginForm on:login={(e) => (loginData = e.detail)} />
{:else}
  <AuthenticatorForm {loginData} />
{/if}
