import { writable } from "svelte/store";
import Home from "$src/pages/Home.svelte";

export const currentActivePage = writable(1); ;

