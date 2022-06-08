<script>
  // @ts-nocheck
  import { mount_component } from "svelte/internal";
  import moment from "moment";
  import { getItem } from "../store/indexed";
  import { stateData } from "../store/store";
  import WeeklyItem from "./parts/weeklyItem.svelte";

  const getDate = new Date()
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();
  let week = getDate.getDay();

  let weekStsrt = moment().day(0).format("DD");
  console.log(weekStsrt)

  const getItemPromise = getItem().then(data => {
    return data;
  });

  const time = [
    {num:0},{num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},
    {num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ]

  let weekStartDate = new Date(year, month, date - week);
  let weekEndDate = new Date(year, month, date + (6 - week));

  let weekMonth = getDate.getMonth();
  let weekDay;
  console.log(date-week);
  const formatDate = (date) => {
    weekDay = date.getDate();
    return (weekDay);
  }
  
  let getWeekStart = formatDate(weekStartDate)
  let getWeekEnd = formatDate(weekEndDate)

  const nextWeek = () => {
    const checkMonth = [1,3,5,7,8,10,12]
    const result = checkMonth.find(check => check == month)
    if(month >=12){
      year+1
    }
    if(result !== undefined && getWeekStart >= 24){
      month +=1;
      return getWeekStart = (getWeekStart+7)-30
    }
    if(result == undefined && getWeekEnd >= 24){
      weekMonth +=1;
      return getWeekEnd = (getWeekEnd+7)-30
    }
    if(result == undefined && getWeekStart >= 23){
      month +=1;
      return getWeekStart = (getWeekStart+7)-31
    }
    if(result == undefined && getWeekEnd >= 23){
      weekMonth +=1;
      return getWeekEnd = (getWeekEnd+7)-31
    }
    return (getWeekStart+= 7, getWeekEnd += 7)
  }

  const prevWeek = () => {
    const checkMonth = [1,3,5,7,8,10,12]
    const result = checkMonth.find(check => check == month)
    if(month <=1 ){
      year -=1;
      return month = 12;
    }
    if(result !== undefined && getWeekStart <= 1){
      month -= 1;
      return getWeekStart = (getWeekStart-7)+30
    }
    if(result !== undefined && getWeekEnd <=1){
      weekMonth -= 1;
      return getWeekEnd = (getWeekEnd-7)+30
    }
    if(result == undefined && getWeekStart <= 1){
      month -= 1;
      return getWeekStart = (getWeekStart-7)+31
    }
    if(result == undefined && getWeekEnd <=1){
      weekMonth -= 1;
      return getWeekEnd = (getWeekEnd-7)+31
    }
    return (getWeekStart -= 7, getWeekEnd -= 7)
  }

  const findData = (time, data) => {
    const result = data.find(({setTodoList})=>{
      const {setTime, setDate} = setTodoList;
      return (parseInt(setTime) === time && setDate === year+"."+(month)+'.'+(getWeekStart+4))
    })
    return result;
  }

  const viweAddTodo = () =>{
    stateData.update(value => {
      value.weeklyState = false;
      value.addTodoState =true;
      return value;
    })
  }

</script>

  <div>
    <div class="text-xl">{year}년</div>
    <button on:click={prevWeek} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">저번주</button>
    <span class="text-xl font-bolds">{month}.{getWeekStart}-{weekMonth+1}.{getWeekEnd}</span>
    <button on:click={nextWeek} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">다음주</button>
  </div>

  <table class="text-3xl m-4">
    <tr class="w-40" on:click={viweAddTodo}>
      <th>{weekStsrt} 일</th>
      <th>{getWeekStart+1} 월</th>
      <th>{getWeekStart+2} 화</th>
      <th>{getWeekStart+3} 수</th>
      <th>{getWeekStart+4} 목</th>
      <th>{getWeekStart+5} 금</th>
      <th>{getWeekEnd}토  </th>
    </tr>
    {#await getItemPromise}
      <span>데이터 가지고 오는 중....</span>
    {:then data} 
      <div>
        {#each time as {num}}
          <div> 
            {num}시:  
            <WeeklyItem data={findData(num, data, date)} />
          </div>
        {/each}
      </div>
    {/await}

  </table>