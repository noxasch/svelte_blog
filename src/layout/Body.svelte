<script>
  export let className = '';
</script>

<div class="container main {className}">
  <slot></slot>
</div>

<style lang="scss">
.main {
  display: grid;
  // grid-auto-rows: minmax(100px, auto);
  // grid-template-columns: repeat(12, 1fr); // break in chrome 80
  grid-template-columns: repeat(12, minmax(calc(8.33% - 1rem), 1fr)); 
  // grid-auto-columns: minmax(100px, auto);
  column-gap: 1rem;
  grid-gap: 1rem;
  align-items: center;

  @media (max-width: 800px){
    display: block;
    padding: 0;
  }
}

.post {
    border-top: 1px solid var(--color-line);

    @media (prefers-color-scheme: dark){
        border-color: #414141;
    }
  }
</style>