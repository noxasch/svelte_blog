<div class="content">
  <slot></slot>
</div>

<style lang="scss">
  .content {
    grid-column: 2/ span 7;
    padding: 1.6rem;

    @media (max-width: 1650px) {
      grid-column: 1/ span 8;
    }

    @media (max-width: 1440px){
      grid-column: 1/ span 8;
    }

    @media (max-width: 1200px) {
      padding: 1rem;
    }

    @media (max-width: 600px) {
      padding: 1rem 0;
    }
  
  }
</style>