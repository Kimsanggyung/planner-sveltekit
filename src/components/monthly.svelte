<script>
	// @ts-nocheck
	import { getItem } from "../store/indexed";
	import MonthlyItem from "./parts/monthlyItem.svelte";
	import { stateData, dbInstance, todoDatas } from "../store/store";
import { each } from "svelte/internal";

	// let getItem = null;
	let getItemPromise;
	dbInstance.subscribe(db => {
		if(db){			
			getItemPromise = getItem().then(data => {
				return data;
			});
		}
	});	

	let loggedUser;
	todoDatas.subscribe(value => {
    loggedUser = value.loggedID;
  })

	
	const date = new Date();
	const today = {
		dayNumber: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear(),
	}

	const monthNames = [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
	let monthIndex = date.getMonth();
	$: month = monthNames[monthIndex];
	
	let year = date.getFullYear();
	
	$: firstDayIndex = new Date(year, monthIndex, 1).getDay();

	$: numberOfDays = new Date(year, monthIndex+1, 0).getDate();
	
	$: calendarCellsQty = numberOfDays + firstDayIndex;
 
	for(i = 1; i < calendarCellsQty; i++){
		console.log((i - firstDayIndex) + 1)
	}

	const goToNextMonth = () => {
		if (monthIndex >= 11) {
			year += 1;
			return monthIndex = 0;
		}
		return monthIndex += 1;
	}
	
	const goToPrevMonth = () => {
		if (monthIndex <= 0) {
			year -= 1;
			return monthIndex = 11;
		}
		return monthIndex -= 1;
	}

	// const findData = (time, data) => {
  //   const result = data.find(({setTodoList})=>{
  //     const {setTime, setDate, setUser} = setTodoList;
  //     return (parseInt(setTime) === time && setDate === year+"."+(month+1)+'.'+ day && setUser === loggedUser)
  //   })
  //   return result;
  // }

	$: console.log(calendarCellsQty)

	const viweAddTodo = () =>{
    stateData.update(value => {
      value.monthState = false;
      value.addTodoState =true;
      return value;
    })
  }
	
	$: console.log(`${month}, ${today.dayNumber}, ${year}, FIRST DAY index is ${firstDayIndex}, MONTH index is ${monthIndex}, No. of days: ${numberOfDays}`)

</script>


	<div class="month">
		<ul>
			<li class="prev" on:click={goToPrevMonth}>&#10094;</li>
			<li class="next" on:click={goToNextMonth}>&#10095;</li>
			<li>{month}<br>
				<span style="font-size:18px">{year}년</span>
			</li>
		</ul>
	</div>

	<ul class="weekdays">
		<li>일</li>
		<li>월</li>
		<li>화</li>
		<li>수</li>
		<li>목</li>
		<li>금</li>
		<li>토</li>
	</ul>
	{#await getItemPromise}
      <span>데이터 가지고 오는 중....</span>
    {:then data} 
		<ul class="days">
			{#each Array(calendarCellsQty) as _, i}
				{#if i < firstDayIndex || i >= numberOfDays+firstDayIndex  }
					<li>&nbsp;</li>
				{:else}
					<li on:click={viweAddTodo} class:active={i === today.dayNumber+(firstDayIndex-1) &&
														monthIndex === today.month &&
														year === today.year}>

						{(i - firstDayIndex) + 1}
						<!-- <MonthlyItem data={findData(data, date)} /> -->
					</li>
				{/if}
			{/each}
		</ul>
	{/await}


				
<style>
	ul {list-style-type: none;}

	/* Month header */
	.month {
		padding: 70px 25px;
		width: auto;
		background: #1abc9c;
		text-align: center;
	}

	/* Month list */
	.month ul {
		margin: 0;
		padding: 0;
	}

	.month ul li {
		color: white;
		font-size: 20px;
		text-transform: uppercase;
		letter-spacing: 3px;
	}

	/* Previous button inside month header */
	.month .prev {
		float: left;
		padding-top: 10px;
		cursor: pointer;
	}

	/* Next button */
	.month .next {
		float: right;
		padding-top: 10px;
		cursor: pointer;
	}

	/* Weekdays (Mon-Sun) */
	.weekdays {
		margin: 0;
		padding: 10px 0;
		background-color:#ddd;
	}

	.weekdays li {
		display: inline-block;
		width: 13.6%;
		color: #666;
		text-align: center;
	}

	/* Days (1-31) */
	.days {
		padding: 10px 0;
		background: #eee;
		margin: 0;
		margin-left: 14.5px;
	}

	.days li {
		list-style-type: none;
		display: inline-block;
		border: 1px solid black;
		padding: 9px;
		width: 13.8%;
		text-align: center;
		margin-bottom: 1px;
		font-size: 1.2rem;
		color: #777;
		cursor: pointer;
	}

	/* Highlight the "current" day */
	.active {
		padding: 5px;
		background: #1abc9c;
		color: white !important
	}
</style>