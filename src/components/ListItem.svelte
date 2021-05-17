<script>
  import { createEventDispatcher } from 'svelte';
  export let url;
  export let title;
  export let date = new Date.now();

  const dispatch = createEventDispatcher();
  
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  let formattedDate = date.toLocaleDateString("en-US", options);
  let readTime = '9 min read';

  function onOpenPost() {
    const index = parseInt(event.target.dataset.id);
    dispatch('openPost', {
      
    });
  }
</script>

<li class="list__item">
  <a  href="{url}" on:click|preventDefault={onOpenPost}>
    <h4 class="item__title title">{title}</h4>
  </a>
  <span class="item__date">{formattedDate}  • {readTime}</span>
</li>

<style lang="scss">
.list__item {
  border-bottom: 1px solid var(--color-line);
  padding: 2rem 1rem;

  @media (prefers-color-scheme: dark) { border-color: var(--color-line-dark);}

  @media (max-width: 1200px) {
    padding: 1rem 1rem;
  }
}

.item {
  &__title {
    font-size: 3.2rem;

    @media (max-width: 1200px) {
      font-size: 2.8rem;
    }
  }
}
</style>
