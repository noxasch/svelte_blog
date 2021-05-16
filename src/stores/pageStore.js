import { readable } from "svelte/store";
import Home from "$src/pages/Home.svelte";
import About from "$src/pages/About.svelte";
import Works from "$src/pages/Works.svelte";
import Blog from "$src/pages/Blog.svelte";

export const pages = readable([
  { id: 1, name: 'home', component: Home },
  { id: 2, name: 'about', component: About },
  { id: 3, name: 'works', component: Works },
  { id: 4, name: 'blog', component: Blog },
]);
