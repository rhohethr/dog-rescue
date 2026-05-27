<script lang="ts">
  import { donations, formatCurrency, totalDonations } from '$lib/mock-data';
  import { fetchAllData, getCachedData } from '$lib/api';

  let liveDonations = $state<typeof donations>([]);
  let loading = $state(true);

  $effect(() => {
    fetchAllData().then((data) => {
      if (data?.donations.length) {
        liveDonations = data.donations;
      } else {
        const cached = getCachedData();
        if (cached?.donations.length) {
          liveDonations = cached.donations;
        } else {
          liveDonations = donations;
        }
      }
      loading = false;
    }).catch(() => {
      liveDonations = donations;
      loading = false;
    });
  });

 </script>

<section class="card">
  <h2>Contributions</h2>
  {#if loading}
    <p class="loading">Loading contributions...</p>
  {:else}
    <p class="summary">
      Total raised: <strong>{formatCurrency(String(liveDonations.reduce(
        (s: number, d: typeof liveDonations[number]) => s + (parseFloat(d.amount) || 0),
        0
      )))}</strong>
      from <strong>{liveDonations.length}</strong> contributors
    </p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Contributor</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {#each [...liveDonations].reverse() as donation}
            <tr>
              <td>{donation.date}</td>
              <td>{donation.donator}</td>
              <td>{formatCurrency(donation.amount)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
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

  .table-wrapper {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  th, td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f8fafc;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  tr:last-child td {
    border-bottom: none;
  }

  td:last-child {
    font-weight: 600;
    text-align: right;
  }
</style>
