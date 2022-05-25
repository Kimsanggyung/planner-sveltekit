import { writable } from "svelte/store";

const getDate = new Date();
let year = getDate.getFullYear();
let month = getDate.getMonth()+1;
let day = getDate.getDate();

export const stateData = writable({
	monthState: true,
	dailyState: false,
	weeklyState: false,
	addTodoState: false,
	checkTodoState: false,
	edidtTodoState: false
});

export const todoDatas = writable({
	setDate: '',
	setTime: 0,
	setTodo: '',
	setDetails: ''
});

export const todoDate = writable(year+"."+month+'.'+ day);