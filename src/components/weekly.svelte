<script>
  // @ts-nocheck
  import moment from "moment";
  import { getItem } from "../store/indexed";
  import { todoDatas, selectTime, stateData, todoDate } from "../store/store";
  import WeeklyItem from "./parts/weeklyItem.svelte";

  const getDate = new Date()
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();
  let week = getDate.getDay();

  let weekStsrt = moment().day(0).format("DD");
  
  let checkUser;
  let checkedID;

  let loggedUser;
  todoDatas.subscribe(value => {
    loggedUser = value.loggedID;
  })
  
  const getItemPromise = getItem().then(data => {
    checkUser = data.find(value => value.setTodoList.setUser == loggedUser)
    if(checkUser){
      checkedID = checkUser.setTodoList.setUser;
    }
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

  const formatDate = (date) => {
    weekDay = date.getDate();
    return (weekDay);
  }
  
  let getWeekStart = formatDate(weekStartDate)
  let getWeekEnd = formatDate(weekEndDate)

  let monDate = getWeekStart+1;
  let tueDate = getWeekStart+2
  let wedDate = getWeekStart+3;
  let thuDate = getWeekStart+4
  let friDate = getWeekStart+5

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
  };

  const findWeekData = (time, data, weekStr) => {
    const weekDataArr = [
      {day: "일", weekInt: getWeekStart}, {day: "월", weekInt: getWeekStart+1}, {day: "화", weekInt: getWeekStart+2}, {day: "수", weekInt: getWeekStart+3}, {day: "목", weekInt: getWeekStart+4}, {day: "금", weekInt: getWeekStart+5}, {day: "토", weekInt: getWeekEnd}
    ];
    const findWeekDay = weekDataArr.find((data)=>{
      return data.day === weekStr
    })
    const result = data.find(({setTodoList})=>{
      const {setTime, setDate} = setTodoList;
      return (parseInt(setTime) === time && setDate === year+"."+(month)+'.'+(findWeekDay.weekInt) && loggedUser == checkedID)
    })
    return result;
  };

  const viweAddTodo = (num, date) => {
    todoDate.update(value => {
      value = year+"."+month+'.'+ date
      return value;
    })
    selectTime.update(value => {
      value = num;
      return value;
    })
    stateData.update(state => {
      state.weeklyState = false;
      state.addTodoState = true;
      return state
    })
  }


</script>

<div class="w-full h-32 bg-blue-500 p-6 mt-24">
  <div class="font-jua flex item-center flex justify-center text-xl  float-none">{year}년</div>
  <div class="font-jua flex item-center flex justify-center text-xl mt-2 ">
    <button on:click={prevWeek} class="h-6 w-16 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">저번주</button>
    <span class="text-xl font-bolds ml-4 mr-4">{month}.{getWeekStart}-{weekMonth+1}.{getWeekEnd}</span>
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

