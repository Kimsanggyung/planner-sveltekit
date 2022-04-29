import { writable } from "svelte/store";

export const exportDate = writable(new Date());
const date = new Date();

export const getDates = writable({
	year: date.getFullYear(),
	month: date.getMonth(),
	day: date.getDay()
});

