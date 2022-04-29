<script>
// @ts-nocheck

	import '../app.css';
	import { stateData } from '../store/store'
	import Clock from '../components/clock.svelte';
	//import Todo from '../components/todo.svelte';
	import Today from '../components/today.svelte';
	import Month from '../components/monthly.svelte';
	import Weekly from '../components/weekly.svelte';
	import Daily from '../components/daily.svelte';
	import Select from '../components/select.svelte';
	
	let monthState
	let weeklyState
	let dailyState
	
	stateData.subscribe(state => {
		monthState = state.monthState
		weeklyState = state.weeklyState
		dailyState = state.dailyState
	})
	//$: state = monthState

	console.log(monthState)
</script>
<div>
	<Today/>
	<Clock/>
	<Select/>
</div>
{#if monthState == true}
<Month/>
{/if}
{#if weeklyState}
<Weekly/>
{/if}
{#if dailyState}
	<Daily/>
{/if}
