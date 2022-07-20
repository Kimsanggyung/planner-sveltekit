<script>
  // @ts-nocheck
  import moment from "moment";
  import { getItem } from "../store/indexed";
  import { todoDatas, selectTime, stateData, todoDate } from "../store/store";
  import WeeklyItem from "./parts/weeklyItem.svelte";

  let getDate = new Date();
  $: year = getDate.getFullYear();
  $: month = getDate.getMonth()+1;
  $: date = getDate.getDate();
  $: week = getDate.getDay();
  $: thisMonthLast = new Date(year, month, 0).getDate();
  $: beforeMonthLast = new Date(year, month-1, 0).getDate();
  $: {
    console.log(getDate, year, month, date, week);
  }  

  console.log(thisMonthLast)
  console.log(beforeMonthLast)

  let loggedUser;
  todoDatas.subscribe(value => {
    loggedUser = value.loggedID;
  })

  const getItemPromise = getItem().then(data => {
    return data;
  });

  const time = [
    {num:0},{num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},
    {num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ]

  $: weekStartDate = new Date(year, month, date - week);
  $: weekEndDate = new Date(year, month, date + (6 - week));

  $: weekMonth = getDate.getMonth();
  
  $: getWeekStart = weekStartDate.getDate();
  $: getWeekEnd = weekEndDate.getDate();

  const getAddDate = (date, num) => {
    const temp = new Date(date);
    temp.setDate(temp.getDate() + num);
    return temp.getDate();
  }

  $: monDate = getAddDate(weekStartDate, 1);
  $: tueDate = getAddDate(weekStartDate, 2);
  $: wedDate = getAddDate(weekStartDate, 3);
  $: thuDate = getAddDate(weekStartDate, 4);
  $: friDate = getAddDate(weekStartDate, 5);
  $: {
    console.log(getWeekStart, monDate, tueDate, wedDate, thuDate, friDate, getWeekEnd);
  }

  const nextWeek = () => {
    getDate.setDate(getDate.getDate() + 7);
    getDate = getDate;
    return;
  }

  const prevWeek = () => {
    getDate.setDate(getDate.getDate() - 7);
    getDate = getDate;
    return;
  };

  $: findWeekData = (time, data, weekStr) => {
    const weekDataArr = [
      {day: "일", weekInt: getWeekStart}, {day: "월", weekInt: getWeekStart+1}, {day: "화", weekInt: getWeekStart+2}, {day: "수", weekInt: getWeekStart+3}, {day: "목", weekInt: getWeekStart+4}, {day: "금", weekInt: getWeekStart+5}, {day: "토", weekInt: getWeekEnd}
    ];
    console.log(getWeekStart)
    const findWeekDay = weekDataArr.find((data)=>{
      return data.day === weekStr
    });
    const result = data.find(({setTodoList})=>{
      if (!setTodoList) return false;
      const {setTime, setDate, setUser} = setTodoList;
      return (parseInt(setTime) === time && setDate === year+"."+(month)+'.'+(findWeekDay.weekInt) && setUser == loggedUser)
    });
    return result;
  };

  const viweAddTodo = (num, date) => {
    todoDate.update(value => {
      value = year+"."+month+'.'+ date
      return value;
    });
    selectTime.update(value => {
      value = num;
      return value;
    });
    stateData.update(state => {
      state.weeklyState = false;
      state.addTodoState = true;
      return state
    });
  };

  


</script>

<div class="w-full h-32 bg-blue-500 p-6 mt-24">
  <div class="font-jua flex item-center flex justify-center text-xl  float-none">{year}년</div>
  <div class="font-jua flex item-center flex justify-center text-xl mt-2 ">
    <button on:click={prevWeek} class="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">저번주</button>
    <span class="text-xl font-bolds ml-4 mr-4">{weekStartDate.getMonth()}.{getWeekStart}-{weekEndDate.getMonth()}.{getWeekEnd}</span>
    <button on:click={nextWeek} class="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">다음주</button>
  </div>
</div>
  {#await getItemPromise}
    <span>데이터 가지고 오는 중....</span>
  {:then data}
    <div class="text-xl w-full bg-sky-100 p-4 font-jua">
      <div class="cursor-pointer flex ml-6">
        <div class="w-1/4">
          <div class="text-2xl bg-cyan-100 ">{getWeekStart} 일</div>
          {#each time as {num}}
              <div class="mt-4">  
                <span on:click={()=>viweAddTodo(num, {getWeekStart})}>{num}시:</span> 
                <WeeklyItem data={findWeekData(num, data, "일")} />
              </div>
          {/each}
        </div>
        <div class="w-1/4">
          <div class="text-2xl bg-cyan-100">{monDate} 월</div>
          {#each time as {num}}
            <div class="mt-4">
              <span on:click={()=>viweAddTodo(num, monDate)}>{num}시:</span> 
              <WeeklyItem data={findWeekData(num, data , "월")} />
            </div>
          {/each}
        </div>
        <div class="w-1/4">
          <div class="text-2xl bg-cyan-100">{tueDate} 화</div>
          {#each time as {num}}
              <div class="mt-4">
                <span on:click={()=>viweAddTodo(num, tueDate)}>{num}시:</span> 
                <WeeklyItem data={findWeekData(num, data, "화")} />
              </div>
          {/each}
        </div>
        <div class="w-1/4">
          <div class="text-2xl bg-cyan-100">{wedDate} 수</div>
          {#each time as {num}}
            <div class="mt-4">
              <span on:click={()=>viweAddTodo(num, wedDate)}>{num}시:</span> 
              <WeeklyItem data={findWeekData(num, data, "수")} />
            </div>
          {/each}
        </div>
        <div class="w-1/4">
          <div class="text-2xl bg-cyan-100">{thuDate} 목</div>
          {#each time as {num}}
              <div class="mt-4"> 
                <span on:click={()=>viweAddTodo(num, {thuDate})}>{num}시:</span> 
                <WeeklyItem data={findWeekData(num, data, "목")} />
              </div>
          {/each}
        </div>
        <div class="w-1/4">
          <span class="text-2xl bg-cyan-100">{friDate} 금</span>
          {#each time as {num}}
            <div class="mt-4"> 
              <span on:click={()=>viweAddTodo(num, {friDate})}>{num}시:</span> 
              <WeeklyItem data={findWeekData(num, data, "금")} />
            </div>
          {/each}
        </div>
        <div class="w-1/4">
          <div class="text-2xl bg-cyan-100">{getWeekEnd} 토</div>
          {#each time as {num}}
            <div class="mt-4">  
              <span on:click={()=>viweAddTodo(num, {getWeekEnd})}>{num}시:</span> 
              <WeeklyItem data={findWeekData(num, data, "토")} />
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/await}

