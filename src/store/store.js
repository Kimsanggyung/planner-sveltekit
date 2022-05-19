import { writable } from "svelte/store";

const date = new Date();
export const getDates = writable({
	year: date.getFullYear(),
	month: date.getMonth()+1,
	day: date.getDate()
});

export const stateData = writable({
	monthState: true,
	dailyState: false,
	weeklyState: false,
	addTodoState: false,
	checkTodoState: false,
	edidtTodoState: false
})

export const todoData = writable({
	startDay: '',
	startTime:'',
	endDay: '',
	endTime:'',
	setTodo: '',
	setDetails: ''
})

export let datasId = writable(0);
