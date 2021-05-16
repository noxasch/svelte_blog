
<aside class="sidebar">
  <slot></slot>
</aside>

<style lang="scss">
  .sidebar {
    grid-column: 9/ span 12;
    text-align: center;
    padding: 20px 10px 20px 5rem;

    @media (max-width: 1650px) {
      grid-column: 9/ span 12;
    }

    @media (max-width: 1440px){
      grid-column: 9/ span 12;
    }

    @media (max-width: 1024px){
      padding-left: 10px;
    }
  }
</style>