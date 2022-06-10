<script>
// @ts-nocheck
  import moment from "moment";
  import { getItem } from '../store/indexed'
  import { todoDate, stateData, todoDatas } from "../store/store";
  import DaillyItem from './parts/dailyItem.svelte';

  const date = new Date();
	let	month = date.getMonth();
	let year = date.getFullYear();
  let day = date.getDate();

  const getItemPromise = getItem().then(data => {
    return data;
  });

  let loggedUser;
  todoDatas.subscribe(value => {
    loggedUser = value.loggedID
  })


  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},
    {num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ];

  const nextDay = () => {
    const checkMonth = [1,3,5,7,8,9,12]
    const result = checkMonth.find(value => value == month+1)
		if (result !== undefined && day >= 31 ) {
			month += 1;
			return day = 1;
    }
    if (result == undefined && day >= 30 ) {
			month += 1;
			return day = 1;
    }
    if(month >= 11){
      year += 1;
      return month = 0;
    }
    todoDate.update(date => date = year+"."+(month+1)+'.'+ (day+1))
    return day += 1;
	}
	
	const prevDay = () => {
    const checkMonth = [1,3,5,7,8,9,12]
    const result = checkMonth.find(value => value == month+1)
    console.log(month, result)
		if (result !== undefined && day <= 1) {
			month -= 1;
			return day = 30;
		}
    if (result == undefined && day <= 1) {
			month -= 1;
			return day = 31;
		}
    if(month <= 0){
      year -= 1;
      return month = 12;
    }
    todoDate.update(date => date = year+"."+(month+1)+'.'+ (day+1))
		return day -= 1;
	}

  const findData = (time, data) => {
    const result = data.find(({setTodoList})=>{
      const {setTime, setDate, setUser} = setTodoList;
      return (parseInt(setTime) === time && setDate === year+"."+(month+1)+'.'+ day && setUser === loggedUser)
    })
    return result;
  }
  
  const viweAddTodo = () => {
    stateData.update(value => {
      value.dailyState = false;
      value.addTodoState = true;
      return value;
    })
  }

</script>
<main>
  <div class="inline-grid text-xl grid-cols-3 w-25">
    <button on:click={prevDay} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">Prev</button>
    <sanp>{year}년 {month+1}월 {day}일</sanp>
    <button on:click={nextDay} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">Next</button>
  </div>
  {#await getItemPromise}
    <span>데이터 가지고 오는 중....</span>
  {:then data} 
    <div>
      {#each time as {num}}
        <div on:click={viweAddTodo}> 
          {num}시:  
          <DaillyItem data={findData(num, data, day)} />
        </div>
      {/each}
    </div>
  {/await}
  
</main>