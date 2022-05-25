<script>
// @ts-nocheck


  import { stateData, todoDate } from '../store/store'

  let monthState;
  let weeklyState;
  let dailyState;
  let addTodoState;
  let checkTodoState;
  let edidtTodoState;

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
  })


  const viweMonth = () => {
      stateData.update(value => {
      value.monthState = true;
      return value;
    })
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
  }

  const viweWeekly = () => {
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
  }

  const viweDaily = () => {
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
  }

  const viweAddTodo = () => {
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
  }

</script>

<div>
  <button on:click={viweMonth}>월간</button>
  <button on:click={viweWeekly}>주간</button>
  <button on:click={viweDaily}>일간</button>
</div>
<button on:click={viweAddTodo}>일정추가</button>
<button on:click={viweCheckTodo}>일정확인</button>