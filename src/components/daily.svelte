<script>
// @ts-nocheck
  import moment from "moment";
  import { getItem } from '../store/indexed'
  import { todoDate, stateData, todoDatas } from "../store/store";
  import DaillyItem from './parts/dailyItem.svelte';

  let targetID;
  let loggedID;

  const date = new Date();
	let	month = date.getMonth();
	let year = date.getFullYear();
  let day = date.getDate();

  

  console.log(targetID)
  console.log(loggedID)

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

  const viweDetails = (num, data) => {
    const result = findData(num, data)
    console.log(result)
    targetID =result.id
    console.log(targetID)
    stateData.update(state => {
      state.dailyState = false;
      state.checkDetailState = true;
      return state;
    })
    todoDatas.update(value => {
      value.editTargetID = targetID
      return value
    })
  }

</script>
<main>
  <div class="w-full h-32 bg-blue-400 mt-24 p-6 font-jua">
    <div class="font-jua flex item-center flex justify-center text-xl float-none">{year}년</div>
    <div class="font-jua flex item-center flex justify-center text-xl mt-2">
      <button on:click={prevDay} class="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">저번주</button>
      <span class="text-xl ml-4 mr-4 font-bolds">{month+1}월{day}일</span>
      <button on:click={nextDay} class="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">다음주</button>
    </div>
  </div>  
  {#await getItemPromise}
    <span>데이터 가지고 오는 중....</span>
  {:then data} 
    <div class="p-6 bg-violet-100">
      {#each time as {num}}
        <div on:click={()=>viweDetails(num, data)} class="text-xl font-jua mb-4 underline cursor-pointer"> 
          {num}시:
          <DaillyItem data={findData(num, data, day)} />
        </div>
      {/each}
    </div>
  {/await}
  
</main>