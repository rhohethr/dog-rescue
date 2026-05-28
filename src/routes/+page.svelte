<script lang="ts">
  import { base } from '$app/paths';
  const FULL_GLORY_URLS = [
    `${base}/img1.jpg`,
    `${base}/img2.jpg`,
    `${base}/img3.jpg`,
    `${base}/img4.jpg`,
  ];

  let currentIndex = $state(0);

  // Rotate image every 5 seconds
  $effect(() => {
    currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % FULL_GLORY_URLS.length;
    }, 5000);
    return () => clearInterval(interval);
  });
</script>

<section class="card hero">
  <h2>Meet Kapil</h2>

  <div class="hero-carousel">
    <img
      src={FULL_GLORY_URLS[currentIndex]}
      alt="Kapil, our rescue dog"
      class="hero-image"
    />
    <div class="hero-dots">
      {#each FULL_GLORY_URLS as _, i}
        <button
          class="hero-dot"
          class:active={i === currentIndex}
          onclick={() => currentIndex = i}
        ></button>
      {/each}
    </div>
  </div>

  <p>
    Kapil was rescued in critical condition. Thanks to the incredible generosity
    of our donors, he has received veterinary care, medication, and daily
    monitoring. This tracker is our commitment to keeping you updated on every
    rupee spent and every step of Kapil's recovery.
  </p>
</section>

<section class="card">
  <h3>Thank You to Our Supporters</h3>
  <p>
    We are overwhelmed by the outpouring of love and generosity. Every
    contribution, big or small, is helping give Kapil a second chance.
  </p>
</section>

<style lang="css">
  .card {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
  }

  .hero h2 {
    margin-bottom: 1rem;
  }

  .hero-carousel {
    position: relative;
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 8px;
    overflow: hidden;
  }

  .hero-image {
    width: 100%;
    max-height: 350px;
    object-fit: contain;
    display: block;
  }

  .hero-dots {
    position: absolute;
    bottom: 0.75rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
  }

  .hero-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid #fff;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    padding: 0;
    transition: background 0.2s;
  }

  .hero-dot.active {
    background: #fff;
  }

  h3 {
    margin-bottom: 0.5rem;
  }
</style>
