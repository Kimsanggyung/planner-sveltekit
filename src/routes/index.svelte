<script>
	import '../app.css';
	import { stateData } from '../store/store';
	import Clock from '../components/clock.svelte';
	//import Todo from '../components/todo.svelte';
	import Month from '../components/month.svelte';
	import Select from '../components/select.svelte';
	import Today from '../components/today.svelte';

</script>
<div>
	<Today/>
	<Clock/>
</div>
{#if !stateData.monthState}
	<Month/>
{/if}
 <Select/>
