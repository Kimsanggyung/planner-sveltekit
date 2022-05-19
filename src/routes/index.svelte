<script>
// @ts-nocheck

	import '../app.css';
	import { stateData } from '../store/store'
	import Clock from '../components/clock.svelte';
	import AddTodo from '../components/addTodo.svelte';
	import Today from '../components/today.svelte';
	import Month from '../components/monthly.svelte';
	import Weekly from '../components/weekly.svelte';
	import Daily from '../components/daily.svelte';
	import Select from '../components/select.svelte';
	import CheckTodo from '../components/checkTodo.svelte'
	import EditTodo from '../components/editTodo.svelte'
	
	let monthState;
	let weeklyState;
	let dailyState;
	let addTodoState;
	let checkTodoState;
	let editTodoState;

	stateData.subscribe(state => {
		monthState = state.monthState;
		weeklyState = state.weeklyState;
		dailyState = state.dailyState;
		addTodoState = state.addTodoState;
		checkTodoState = state.checkTodoState;
		editTodoState = state.edidtTodoState;
	})

</script>

<div>
	<Today/>
	<Clock/>
	<Select/>
</div>
{#if checkTodoState == true}
	<CheckTodo/>
{/if}
{#if editTodoState == true}
	<EditTodo/>
{/if}
{#if addTodoState == true}
<AddTodo/>
{/if}
{#if monthState == true}
<Month/>
{/if}
{#if weeklyState}
<Weekly/>
{/if}
{#if dailyState}
	<Daily/>
{/if}
