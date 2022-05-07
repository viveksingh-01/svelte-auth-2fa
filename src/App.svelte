<script>
  import Router from 'svelte-spa-router';
  import Navbar from './components/Navbar.svelte';
  import './interceptors/axios';
  import Home from './pages/Home.svelte';
  import Login from './pages/Login.svelte';
  import Signup from './pages/Signup.svelte';

  const routes = {
    '/': Home,
    '/signup': Signup,
    '/login': Login,
  };
</script>

<header>
  <Navbar />
</header>
<main class="container">
  <Router {routes} />
</main>
