<script>
  import { pages } from "$stores/pageStore";
	import { currentActivePage } from "$stores/activePageStore";
  import Post from '$src/pages/Post.svelte';
  
  $: page = $pages.find((page) => page.id === $currentActivePage);
  $: activePage =  (page == undefined) ? Post : page.component;
  function onSelectItem(id) {
    currentActivePage.update(() => id);
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<nav class="navbar container">
  <a class="logo" href="index.html">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 320 320" enable-background="new 0 0 320 320" xml:space="preserve">
        <path d="M243.01,61H62v39.904V270h48v-83.558L84.706,149h3.815h22.28l99.577,121h32.633h14.052H258V100.54V61H243.01
          z M235.093,187.015L234.428,187h-23.741l-1.087-1.525l0,0l-66.584-84.225l67.604-0.343l0.029,48.731l24.419,37.326l0.4,0.036h-0.385
          L235.093,187.015z"/>
      </svg>
      <span class="logo__text">noxasch</span>
  </a>
  <ul class="nav__menu">
    {#each $pages as page }
      <li class="nav__item {activePage === page.component ? 'active' : ''}">
        <a class="nav__link" on:click={onSelectItem(page.id)}>{page.name}</a>
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  .navbar {
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    margin: 0 auto;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      height: 6.4rem;
      width: 6.4rem;
      fill: var(--logo-color);

      @media (prefers-color-scheme: dark) { fill: var(--color-text-heading-dark); }
    }

    &__text {
      margin-top: 0.5rem;
      align-content: center;
      text-transform: uppercase;
      font-size: 2rem;
      font-family: var(--font-family-theme);
      color: var(--logo-color);
      @media (prefers-color-scheme: dark) { color: var(--color-text-heading-dark); }
    }
  } 

  .nav {
    &__menu {
      display: flex;
      align-items: center;
    }

    &__item {
      height: 100%;
      position: relative;
      border-left: 1px solid transparent;
      border-right: 1px solid transparent;
      border-bottom: 0.6rem solid transparent;
      border-top: 0.6rem solid transparent;
      display: flex;
      align-items: center;

      &::before {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 50%;
        height: 1rem;
        background-color: var(--color-primary);
        transition: all 0.25s ease-out 0.1s;
        width: 0;
      }

      &:hover::before, &.active::before {
        left: -5%;
        width: 120%;
      }
    }

    &__link {
      display: inline-block;
      text-transform: uppercase;
      padding: 1rem;
      
      font-family: var(--font-family-sans);
      color: var(--color-text-sub);
      text-decoration: none;

       @media (prefers-color-scheme: dark) { color: var(--color-text-sub-dark); }
    }
  }
</style>