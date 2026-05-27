<script lang="ts">
  import { expenses as mockExpenses, formatCurrency, totalExpenses } from '$lib/mock-data';
  import { fetchAllData, getCachedData } from '$lib/api';

  let liveExpenses = $state<typeof mockExpenses>([]);
  let loading = $state(true);

  function parseLinks(text: string): { label: string; url: string }[] {
    if (!text) return [];
    const urls: { label: string; url: string }[] = [];
    const regex = /https?:\/\/[^\s\n]+/g;
    const lines = text.split('\n');
    for (const line of lines) {
      const urlsInLine = line.match(regex);
      if (urlsInLine) {
        for (const url of urlsInLine) {
          const label = line.replace(url, '').trim().replace(/^[\d.)]+\s*/, '');
          urls.push({ label: label || 'Link', url });
        }
      }
    }
    return urls;
  }

  $effect(() => {
    fetchAllData().then((data) => {
      if (data?.expenses.length) {
        liveExpenses = data.expenses;
      } else {
        const cached = getCachedData();
        if (cached?.expenses.length) {
          liveExpenses = cached.expenses;
        } else {
          liveExpenses = mockExpenses;
        }
      }
      loading = false;
    }).catch(() => {
      liveExpenses = mockExpenses;
      loading = false;
    });
  });

</script>

<section class="card">
  <h2>Medical & Care Expenses</h2>
  {#if loading}
    <p class="loading">Loading expenses...</p>
  {:else}
    <p class="summary">
      Total spent: <strong>{formatCurrency(String(liveExpenses.reduce(
        (s: number, e: typeof liveExpenses[number]) => s + (isNaN(parseFloat(e.amount)) ? 0 : parseFloat(e.amount)),
        0
      )))}</strong>
    </p>

    <div class="expense-list">
      {#each liveExpenses as expense}
        <div class="expense-item">
          <div class="expense-header">
            <div>
              <span class="expense-date">{expense.date}</span>
              <span class="expense-to">{expense.made_to}</span>
            </div>
            <span class:paid={expense.amount !== 'To be paid'} class:pending={expense.amount === 'To be paid'}>
              {formatCurrency(expense.amount)}
            </span>
          </div>

          {#if expense.comments}
            <p class="expense-comments">{expense.comments}</p>
          {/if}

          <div class="expense-links">
            {#if expense.bill_link}
              <a href={expense.bill_link} target="_blank" rel="noopener noreferrer">Bill</a>
            {/if}
            {#if expense.prescription_link}
              {#each parseLinks(expense.prescription_link) as link}
                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
              {/each}
            {/if}
            {#if expense.comments && !expense.bill_link && !expense.prescription_link}
              {#each parseLinks(expense.comments) as link}
                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
              {/each}
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</section>

<style lang="css">
  .card {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin-bottom: 0.5rem;
  }

  .summary {
    color: #555;
    margin-bottom: 1.5rem;
  }

  .loading {
    color: #888;
    font-style: italic;
    margin-bottom: 1rem;
  }

  .expense-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .expense-item {
    padding: 1.25rem;
    border: 1px solid #eee;
    border-radius: 8px;
  }

  .expense-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .expense-date {
    font-size: 0.85rem;
    color: #888;
  }

  .expense-to {
    font-weight: 600;
    margin-left: 0.5rem;
  }

  .paid {
    color: #16a34a;
    font-weight: 700;
  }

  .pending {
    color: #d97706;
    font-weight: 700;
  }

  .expense-comments {
    color: #555;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  .expense-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .expense-links a {
    display: inline-block;
    padding: 0.25rem 0.6rem;
    background: #eff6ff;
    color: #2563eb;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.85rem;
  }

  .expense-links a:hover {
    background: #dbeafe;
  }
</style>
