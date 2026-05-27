<script lang="ts">
  import type { LayoutData } from './$types';
  let { data, children } = $props<LayoutData>();
</script>

<svelte:head>
  <title>Kapil's Rescue Tracker</title>
  <meta name="description" content="Track Kapil's rescue journey. Transparent view of donations, expenses, and daily updates." />
</svelte:head>

<app>
  <header>
    <h1>Kapil's Rescue Tracker</h1>
    <nav>
      <a href="/" class={data.page === 'home' ? 'active' : ''}>Home</a>
      <a href="/donations" class={data.page === 'donations' ? 'active' : ''}>Donations</a>
      <a href="/expenses" class={data.page === 'expenses' ? 'active' : ''}>Expenses</a>
      <a href="/updates" class={data.page === 'updates' ? 'active' : ''}>Updates</a>
    </nav>
  </header>
  <main>
    {@render children()}
  </main>
</app>

<style lang="css">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f5f5f5;
    color: #1a1a1a;
    line-height: 1.6;
  }

  app {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  header {
    text-align: center;
    padding: 2rem 0 1rem;
  }

  header h1 {
    font-size: 1.8rem;
    font-weight: 700;
  }

  nav {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  nav a {
    padding: 0.5rem 1.2rem;
    border: none;
    background: #e5e5e5;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    color: #333;
    transition: background 0.2s;
  }

  nav a:hover {
    background: #d4d4d4;
  }

  nav a.active {
    background: #1a1a1a;
    color: #fff;
  }

  main {
    padding: 1.5rem 0 3rem;
  }
</style>
