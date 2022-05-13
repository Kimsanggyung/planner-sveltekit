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
	
	let monthState;
	let weeklyState;
	let dailyState;
	let addTodoState;

	stateData.subscribe(state => {
		monthState = state.monthState;
		weeklyState = state.weeklyState;
		dailyState = state.dailyState;
		addTodoState = state.addTodoState;
	})
	
	
	//$: state = monthState
</script>

<div>
	<Today/>
	<Clock/>
	<Select/>
</div>

<AddTodo/>

{#if monthState == true}
<Month/>
{/if}
{#if weeklyState}
<Weekly/>
{/if}
{#if dailyState}
	<Daily/>
{/if}
