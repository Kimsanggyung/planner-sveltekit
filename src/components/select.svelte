<script>
// @ts-nocheck


  import { stateData, todoDate, selectTime } from '../store/store'

  let monthState;
  let weeklyState;
  let dailyState;
  let addTodoState;
  let checkTodoState;
  let edidtTodoState;
  let checkDetailState;

  let getDate = new Date();
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let day = getDate.getDate();

  stateData.subscribe(state => {
    monthState = state.monthState;
    weeklyState = state.weeklyState;
    dailyState = state.dailyState;
    addTodoState = state.addTodoState;
    checkTodoState = state.checkTodoState;
    edidtTodoState = state.edidtTodoState;
    checkDetailState = state.checkDetailState;
  })


  const viweMonth = () => {
    todoDate.update(value => {
      value = year+"."+month+'.'+ day
      return value;
    });
    stateData.update(value => {
      value.monthState = true;
      return value;
    });
    if(weeklyState == true){
        stateData.update(value => {
        value.weeklyState = !value.weeklyState;
        return value;
      });
    }
    if(dailyState == true){
      stateData.update(value => {
      value.dailyState = !value.dailyState;
      return value;
      })
    }
    if(addTodoState == true){
      stateData.update(value => {
        value.addTodoState =!value.addTodoState;
        return value;
      })
    }
    if(checkTodoState == true){
      stateData.update(value => {
        value.checkTodoState = !value.checkTodoState;
        return value;
      })
    }
    if(edidtTodoState == true){
      stateData.update(value => {
        value.edidtTodoState = false;
        return value;
      })
    }
    if(checkDetailState == true){
      stateData.update(value =>{
        value.checkDetailState = false;
        return value;
      })
    }
  }

  const viweWeekly = () => {
    todoDate.update(value => {
      value = year+"."+month+'.'+ day
      return value;
    })
    stateData.update(value => {
      value.weeklyState = true;
      return value;
    })
    if(monthState == true){
      stateData.update(value => {
        value.monthState = !value.monthState;
        return value;
      })
    }
    if(dailyState == true){
      stateData.update(value => {
      value.dailyState = !value.dailyState;
      return value;
      })
    }
    if(addTodoState == true){
      stateData.update(value => {
        value.addTodoState =!value.addTodoState;
        return value;
      })
    }
    if(checkTodoState == true){
      stateData.update(value => {
        value.checkTodoState = !value.checkTodoState;
        return value;
      })
    }
    if(edidtTodoState == true){
      stateData.update(value => {
        value.edidtTodoState = false;
        return value;
      })
    }
    if(checkDetailState == true){
      stateData.update(value =>{
        value.checkDetailState = false;
        return value;
      })
    }
  }

  const viweDaily = () => {
    todoDate.update(value => {
      value = year+"."+month+'.'+ day
      return value;
    })
    stateData.update(value => {
      value.dailyState = true;
      return value;
    })
    if(monthState == true){
      stateData.update(value => {
        value.monthState = !value.monthState;
        return value;
      })
    }
    if(weeklyState == true){
      stateData.update(value => {
      value.weeklyState = !value.weeklyState;
      return value;
      })
    }
    if(addTodoState == true){
      stateData.update(value => {
        value.addTodoState =!value.addTodoState;
        return value;
      })
    }
    if(checkTodoState == true){
      stateData.update(value => {
        value.checkTodoState = !value.checkTodoState;
        return value;
      })
    }
    if(edidtTodoState == true){
      stateData.update(value => {
        value.edidtTodoState = false;
        return value;
      })
    }
    if(checkDetailState == true){
      stateData.update(value =>{
        value.checkDetailState = false;
        return value;
      })
    }
  }

  const viweAddTodo = () => {
    selectTime.update(value => {
      value = "시간선택"
      return value;
    })
    stateData.update(value => {
      value.addTodoState = true;
      return value;
    })
    todoDate.update(value => {
      value = year+"."+(month)+'.'+ day;
      return value;
    })
    if(monthState == true){
      stateData.update(value => {
        value.monthState = !value.monthState;
        return value;
      })
    }
    if(weeklyState == true){
      stateData.update(value => {
      value.weeklyState = !value.weeklyState;
      return value;
      })
    }
    if(dailyState == true){
      stateData.update(value => {
      value.dailyState = !value.dailyState;
      return value;
      })
    }
    if(checkTodoState == true){
      stateData.update(value => {
        value.checkTodoState = !value.checkTodoState
        return value;
      })
    }
    if(edidtTodoState == true){
      stateData.update(value => {
        value.edidtTodoState = false;
        return value;
      })
    }
    if(checkDetailState == true){
      stateData.update(value =>{
        value.checkDetailState = false;
        return value;
      })
    }
  }

  const viweCheckTodo = () => {
    stateData.update(value => {
      value.checkTodoState = true;
      return value;
    })
    if(monthState == true){
      stateData.update(value => {
        value.monthState = !value.monthState;
        return value;
      })
    }
    if(weeklyState == true){
      stateData.update(value => {
      value.weeklyState = !value.weeklyState;
      return value;
      })
    }
    if(dailyState == true){
      stateData.update(value => {
      value.dailyState = !value.dailyState;
      return value;
      })
    }
    if(addTodoState == true){
      stateData.update(value => {
        value.addTodoState = !value.addTodoState;
        return value;
      })
    }
    if(edidtTodoState == true){
      stateData.update(value => {
        value.edidtTodoState = false;
        return value;
      })
    }
    if(checkDetailState == true){
      stateData.update(value =>{
        value.checkDetailState = false;
        return value;
      })
    }
  }

</script>
<span class="font-jua flex item-center text-white flex flex justify-center text-xl float-left float-right ml-80 mt-6">
  <span on:click={viweMonth} class="bg-red-500 hover:bg-green-500 text-white py-2 px-4 border border-blue-700 rounded mr-1">
    <button>월간</button>
  </span>
  <span on:click={viweWeekly} class="bg-orange-500 hover:bg-blue-500 text-white py-2 px-4 border border-blue-700 rounded mr-1">
    <button>주간</button>
  </span>
  <span on:click={viweDaily} class="bg-green-500 hover:bg-orange-500 text-white font-bold py-2 px-4 border border-blue-700 rounded">
    <button>일간</button>
  </span>
</span>

<span class="font-jua text-s mr-8 mt-10 flex justify-end">
  <button on:click={viweAddTodo} class="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-2">오늘일정추가</button>
  <button on:click={viweCheckTodo} class="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">전체일정확인</button>
</span>
