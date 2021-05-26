<script>
  import { scale } from "svelte/transition";
</script>

<svelte:head>
  <script src="https://unpkg.com/@codersrank/summary@x.x.x/codersrank-summary.min.js"></script>
  <script src="https://unpkg.com/@codersrank/timeline@x.x.x/codersrank-timeline.min.js"></script>
  <script src="https://unpkg.com/@codersrank/activity@x.x.x/codersrank-activity.min.js"></script>
  <script src="https://unpkg.com/@codersrank/portfolio@x.x.x/codersrank-portfolio.min.js"></script>
</svelte:head>


<div class="profile_container">
  <div class="center">
    <p class="greet">Hello there,</p>
    <p class="text">My name is <span class="bold">Alexander Dischberg</span></p>
    <p class="text lightup">(Full-Stack and mobile app developer)</p>
    <p class="text">based in Malaysia.</p>
    <p class="text mt-2">my legal name is asyraf however.</p>
  </div>
</div>

<div class="summary_container">
  <codersrank-summary 
    username="noxasch" 
    branding=false
    layout="vertical"
  >
  </codersrank-summary>
</div>

<div class="activity_container" in:scale> 
  <codersrank-activity 
    username="noxasch" 
    branding=false
    legend=true
    labels=true
    tooltip=true
  >
  </codersrank-activity>  
</div>

<div class="timeline_container">
  <codersrank-timeline 
    username="noxasch"
    type="technologies"
    branding=false
  ></codersrank-timeline>
</div>

<style lang="scss">

  codersrank-summary {
    --bg-color: #333;
    --header-bg-color: #1a1a1a;
    --badge-bg-color: #1a1a1a;
    --badge-text-color: #aeaeae;
    --border: 1px solid #333;
    
  }

  codersrank-timeline {
    --timeline-item-bg-color: #333;
  }

  codersrank-activity {
    --bg-color-0: #333;
    --bg-color-3: rgba(123, 184, 113, 1); 
    --bg-color-2: rgba(123, 184, 113, 0.6);
    --bg-color-1: rgba(123, 184, 113, 0.3);
    --preloader-color: var(--color-primary);
    --bg-color-4: rgb(105, 196, 92); 
    
  }

  @media (prefers-color-scheme: dark) {
    codersrank-activity { 
      --legend-text-color: var(--color-text-main-dark);
      --label-text-color: var(--color-text-main-dark);
    }
  }
  
  .profile_container {
    margin-top: 40px 0;
    grid-column: 2/ span 6;
    height: 800px;
    display: flex;
    align-items: center;
  }

  .summary_container {
    padding: 10px;
    grid-column: 8/ span 4;
  }

  .activity_container {
    padding: 10px;
    margin: 20px 0;
    grid-column: 1/ span 12;
  }

  .center {
    height: 50%;
  }

  .greet {
    font-size: 5rem;
    font-family: var(--font-family-serif);
    margin-bottom: 10px;
  }

  .text {
    font-size: 2.6rem;
    line-height: 1.3;
    font-weight: 100;
  }

  .text.mt-2 {
    margin-top: 20px;
    font-size: 2.4rem;
  }

  .bold {
    font-weight: bold;
    font-family: 'Noto Sans', sans-serif;
  }

  .timeline_container {
    padding: 10px;
    margin: 80px 0;
    grid-column: 1/ span 12;
  }  
</style>