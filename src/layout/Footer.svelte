<script>
  const startYear = 2020;
  let today = new Date();
  const currentYear = today.getFullYear();
  let links = [
    { title: 'attribution', url: ''},
    { title: 'instagram', url: ''},
    { title: 'twitter', url: ''},
    { title: 'github', url: ''},
  ];
</script>

<footer class="footer container">
 <span>{startYear} - {currentYear} &copy; Alexander Dischberg • <a href="#">License</a></span>
 <ul class="menu">
  {#each links as link}
    <li class="item"><a class="item-link">{link.title}</a></li>
  {/each}
 </ul>
</footer>

<style lang="scss">
  .footer {
    font-family: var(--font-family-sans);
    color: var(--color-text-sub);
    border-top: 1px solid var(--color-line);
    margin-top: 5rem;
    padding: 3rem 0;

    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;

  @media (prefers-color-scheme: dark) { 
    color: var(--color-text-sub-dark);
    border-color: var(--color-line-dark); 
  }

  @media(max-width: 1024px) {
    display: block;
    text-align: center;
  }

  .menu {
    display: flex;

    @media(max-width: 1024px) {
        margin-top: 2rem;
        display: block;
    }

    .item {
      text-transform: capitalize;
      font-family: var(--font-family-sans);
      margin: 0 0.5rem 0 0.5rem;

      &-link::before {
        content: '.';
      }

      // &:not(:first-child) .item-link::before {
      //   content: '• ';
      // }

      &-link:not(:first-child) {
        background-color: orangered;
      }
      
      @media(max-width: 1024px) {
        display: inline-block;
      }
      @media(max-width: 700px) {
        display: inline-block;
      }

      @media(max-width: 500px) {
        display: block;
        padding: 0.5rem 2rem;
        margin: 1rem;
        border: 1px solid var(--color-line);

        &-link {
          display: block;
          &:hover {
            background-color: var(--color-primary);
          }
        }
        display: none;
      }
    }
  }
}
</style>