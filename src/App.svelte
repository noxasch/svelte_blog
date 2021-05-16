<script>
	import Header from '$src/layout/Header.svelte';
	import Footer from '$src/layout/Footer.svelte';
	import Navbar from '$src/layout/Navbar.svelte';
	import Showcase from '$src/layout/Showcase.svelte';
	import Body from '$src/layout/Body.svelte';
	import { pages } from "$stores/pageStore";
	import { currentActivePage } from "$stores/activePageStore";

	$: activePage =  $pages.find((page) => page.id === $currentActivePage).component;

</script>


<Header>
	<Navbar />
	<Showcase />
</Header>
<Body>
	<svelte:component this={activePage} />
</Body>
<Footer />


<style>

</style>