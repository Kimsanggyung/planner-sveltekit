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
	edidtTodoState: false,
	loggedState: false,
	checkDetailState: false
});

export const todoDatas = writable({
	setDate: '',
	setTime: 0,
	setTodo: '',
	setDetails: '',
	editTargetID: '',
	loggedID:''
});

export const storeUserData = writable([
	{id: 'a', pwd: '123'},
	{id: 'b', pwd: '1234'}
]);

export const todoDate = writable(year+"."+month+'.'+ day);

export const dbInstance = writable();
