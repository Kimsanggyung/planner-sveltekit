import { writable } from "svelte/store";

const date = new Date();
export const getDates = writable({
	year: date.getFullYear(),
	month: date.getMonth()+1,
	day: date.getDate()
});

export const stateData = writable({
	monthState: false,
	dayState: false 
})

