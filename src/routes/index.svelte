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
	import Login from '../components/login.svelte'
	import CheckDetail from '../components/checkDetail.svelte'
	
	let monthState;
	let weeklyState;
	let dailyState;
	let addTodoState;
	let checkTodoState;
	let editTodoState;
	let loggedState;
	let detailState

	stateData.subscribe(state => {
		monthState = state.monthState;
		weeklyState = state.weeklyState;
		dailyState = state.dailyState;
		addTodoState = state.addTodoState;
		checkTodoState = state.checkTodoState;
		editTodoState = state.edidtTodoState;
		loggedState = state.loggedState;
		detailState = state.checkDetailState
	})

</script>

{#if loggedState == true}
	<div class="border border-yellow-700 rounded w-96 ml-8 mr-10 float-left">
		<Today/>
		<Clock/>
	</div>
	<Select/>
{/if}

{#if loggedState == false}
	<div class="border border-yellow-700 rounded w-96 ml-8 mt-8">
		<Today/>
		<Clock/>
	</div>
	<Login/>
{/if}
{#if checkTodoState == true}
	<CheckTodo/>
{/if}
{#if detailState}
	<CheckDetail/>
{/if}
{#if editTodoState == true}
	<EditTodo/>
{/if}
{#if addTodoState == true}
<AddTodo/>
{/if}
{#if monthState == true && loggedState == true}
<Month/>
{/if}
{#if weeklyState}
<Weekly/>
{/if}
{#if dailyState}
	<Daily/>
{/if}
