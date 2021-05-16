<div class="showcase">
  <h3 class="title">Blog</h3>
</div>

<style lang="scss">
.showcase {
  display: flex;
  align-items: center;
  height: 50rem;
  position: relative;
  background: var(--color-overlay);
  color: var(--color-text-main);

  @media (prefers-color-scheme: dark) { 
    background: var(--color-overlay-dark);
    color: var(--color-text-main-dark);
  }

  @media(max-width: 700px) {
    height: calc(100vh - 6.9rem);
  }

  @media(max-width: 500px) {
    height: calc(100vh - 11rem);
  }

  &:before {
    content: '';
    background: url('/img/macbook-3.jpg') no-repeat center center/cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .title {
    color: var(--color-text-heading);
    font-size: 6.4rem;
    margin: 0 auto;
    text-transform: uppercase;

    @media (prefers-color-scheme: dark) { 
      color: #252525;
    }

  }
}
</style>