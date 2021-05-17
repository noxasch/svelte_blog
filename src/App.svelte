<script>
	import Header from '$src/layout/Header.svelte';
	import Footer from '$src/layout/Footer.svelte';
	import Navbar from '$src/layout/Navbar.svelte';
	import Showcase from '$src/layout/Showcase.svelte';
	import Body from '$src/layout/Body.svelte';
	import Home from '$src/pages/Home.svelte';
	import Post from '$src/pages/Post.svelte';
	import Blog from '$src/pages/Blog.svelte';
	import { pages } from "$stores/pageStore";
	import { currentActivePage } from "$stores/activePageStore";

	$: page = $pages.find((page) => page.id === $currentActivePage);
	$: activePage =  (page == undefined) ? Post : page.component;

	function onOpenPost() {
    currentActivePage.update(() => 0);
	}
</script>


<Header>
	<Navbar />
	<svelte:component this={(activePage === Home || activePage === Blog) ? Showcase : null} />
</Header>
<Body className="{activePage === Post ? 'post' : ''}">
	<svelte:component this={activePage} on:openPost={onOpenPost} />
</Body>
<Footer />
