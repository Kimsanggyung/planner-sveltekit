<script>
// @ts-nocheck


  import { getDates, stateData } from '../store/store'

  let getYear;
  let getMonth;
  let getDay;
  getDates.subscribe(value => {
   getYear = value.year
   getMonth = value.month
   getDay = value.day
  })

  let monthState;
  let weeklyState;
  let dailyState;
  let addTodoState
  stateData.subscribe(state => {
    monthState = state.monthState;
    weeklyState = state.weeklyState;
    dailyState = state.dailyState;
    addTodoState =state.addTodoState
  })


  const viweMonth = () => {
      stateData.update(value => {
      value.monthState = true
      return value
    })
    if(weeklyState == true){
        stateData.update(value => {
        value.weeklyState = !value.weeklyState
        return value
      })
    }
    if(dailyState == true){
      stateData.update(value => {
      value.dailyState = !value.dailyState
      return value
      })
    }
  }

  const viweWeekly = () => {
      stateData.update(value => {
      value.weeklyState = true
      return value
    })
    if(monthState == true){
      stateData.update(value => {
        value.monthState = !value.monthState
        return value
      })
    }
    if(dailyState == true){
      stateData.update(value => {
      value.dailyState = !value.dailyState
      return value
      })
    }
  }

  const viweDaily = () => {
    stateData.update(value => {
      value.dailyState = true
      return value
    })
    if(monthState == true){
      stateData.update(value => {
        value.monthState = !value.monthState
        return value
      })
    }
    if(weeklyState == true){
      stateData.update(value => {
      value.weeklyState = !value.weeklyState
      return value
      })
    }
  }

  const viweAddTodo = () => {
    stateData.update(value => {
      value.addTodoState = true;
    })
    if(monthState == true){
      stateData.update(value => {
        value.monthState = !value.monthState
        return value
      })
    }
    if(weeklyState == true){
      stateData.update(value => {
      value.weeklyState = !value.weeklyState
      return value
      })
    }
    if(dailyState == true){
      stateData.update(value => {
      value.dailyState = !value.dailyState
      return value
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