<script>
	// @ts-nocheck
	import { getItem } from "../store/indexed";
	import MonthlyItem from "./parts/monthlyItem.svelte";
	import { stateData, todoDatas, todoDate } from "../store/store";

	// let getItem = null;
	const getItemPromise = getItem().then(data => {
    return data;
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

	const viweAddTodo = (i,firstDayIndex) =>{
		const selectDate = ((i-firstDayIndex)+1)
		console.log(selectDate)
		todoDate.update(value => {
			value = year+"."+(monthIndex+1)+"."+selectDate
			return value;
		})
    stateData.update(value => {
      value.monthState = false;
      value.addTodoState =true;
      return value;
    })
  }
	
	$: console.log(`${month}, ${today.dayNumber}, ${year}, FIRST DAY index is ${firstDayIndex}, MONTH index is ${monthIndex}, No. of days: ${numberOfDays}`)

	// $: checkDate = { year+"."+(monthIndex+1)+'.'+((i - firstDayIndex) + 1)}

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
					<li>
						<div>&nbsp;</div>
						<div class="w-48 h-7 overflow-hidden"></div>
					</li>
				{:else}
					<li class:active={i === today.dayNumber+(firstDayIndex-1) && monthIndex === today.month && year === today.year}>
						<div class="dateList" on:click={()=>viweAddTodo(i ,firstDayIndex)}>{(i - firstDayIndex) + 1}</div>
						<MonthlyItem month={month} getDate = {year+"."+(monthIndex+1)+'.'+((i - firstDayIndex) + 1)} />
					</li>
				{/if}
			{/each}
		</ul>
	{/await}


				
<style>
	@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

	ul {list-style-type: none;}

	/* Month header */
	.month {
		color:black;
		padding: 70px 25px;
		width: auto;
		background: #0ea5e9;
		text-align: center;
		margin-top: 80px;
		font-family: 'Jua', sans-serif;
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
		font-family: 'Jua', sans-serif;
		margin: 0;
		padding: 10px 0;
		background-color:#e0f2fe;
	}

	.weekdays li {
		display: inline-block;
		width: 13.6%;
		color: #666;
		text-align: center;
	}

	/* Days (1-31) */
	.days {
		font-family: 'Jua', sans-serif;
		padding: 10px 0;
		width: auto;
		background: #cffafe;
		margin: 0;
	}
	.days li {
		list-style-type: none;
		display: inline-block;
		border: 1px solid black;
		padding: 9px;
		width: 13.7%;
		height: 84px;
		text-align: center;
		margin-top: 6px;
		margin-bottom: 0px;
		margin-left: 6px;
		font-size: 1.2rem;
		color: #777;
		cursor: pointer;
	}

	.dateList{
		text-decoration: underline;
	}

	/* Highlight the "current" day */
	.active {
		padding: 5px;
		background: #0ea5e9;
		color: white !important
	}
</style>