<script>

  import { getDates, stateData } from '../store/store'

  let getYear;
  let getMonth;
  let getDay;

  getDates.subscribe(value => {
   getYear = value.year
   getMonth = value.month
   getDay = value.day
  })


  const viweMonth = () => stateData.monthState = !stateData.monthState

  const viweDaily = () => {stateData.monthState} 


</script>

<div>
  <button>-</button>
  <h1>{getYear}년 {getMonth}월 {getDay}일</h1>
  <button>+</button>
</div>

<div>
  <button on:click={viweMonth}>월간</button>
  <button>주간</button>
  <button>일간</button>
</div>