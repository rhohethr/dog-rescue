<script lang="ts">
  import { dailyUpdates as mockUpdates } from '$lib/mock-data';
  import { fetchAllData, getCachedData } from '$lib/api';

  let liveUpdates = $state<typeof mockUpdates>([]);
  let loading = $state(true);
  let selectedImage: string | null = $state(null);

  function closeModal() {
    selectedImage = null;
  }

  function openImage(url: string) {
    selectedImage = url;
  }

  $effect(() => {
    fetchAllData().then((data) => {
      if (data?.updates.length) {
        liveUpdates = data.updates;
      } else {
        const cached = getCachedData();
        if (cached?.updates.length) {
          liveUpdates = cached.updates;
        } else {
          liveUpdates = mockUpdates;
        }
      }
      loading = false;
    }).catch(() => {
      liveUpdates = mockUpdates;
      loading = false;
    });
  });
</script>

<section class="card">
  <h2>Daily Updates & Photos</h2>
  <p class="note">
    Daily photos and updates from Kapil's recovery journey. New folders will
    be added each day.
  </p>
</section>

{#if loading}
  <section class="card">
    <p class="loading">Loading updates...</p>
  </section>
{:else}
  {#each liveUpdates as update}
    <section class="card update">
      <h3>{update.date}</h3>

      {#if update.note}
        <div class="note-text">
          {#each update.note.split('\n') as line}
            <p>{line}</p>
          {/each}
        </div>
      {/if}

      {#if update.images.length > 0}
        <div class="image-grid">
          {#each update.images as img}
            <img
              src={img}
              alt="Kapil - {update.date}"
              class="update-image"
              crossorigin="anonymous"
              onclick={() => openImage(img)}
            />
          {/each}
        </div>
      {/if}
    </section>
  {/each}
{/if}

{#if selectedImage}
  <div class="modal-overlay" onclick={closeModal}>
    <img src={selectedImage} alt="Enlarged photo" class="modal-image" />
    <button class="modal-close" onclick={closeModal}>&times;</button>
  </div>
{/if}

<style lang="css">
  .card {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
  }

  h2 {
    margin-bottom: 0.5rem;
  }

  .note {
    color: #888;
    font-style: italic;
    margin-bottom: 1rem;
  }

  .loading {
    color: #888;
    font-style: italic;
  }

  .update {
    margin-bottom: 1.5rem;
  }

  .update h3 {
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .note-text {
    margin-bottom: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
    line-height: 1.7;
  }

  .note-text p {
    margin-bottom: 0.25rem;
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
  }

  .update-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .update-image:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 2rem;
  }

  .modal-image {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 8px;
    object-fit: contain;
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    background: none;
    border: none;
    color: #fff;
    font-size: 2.5rem;
    cursor: pointer;
    line-height: 1;
  }
</style>
