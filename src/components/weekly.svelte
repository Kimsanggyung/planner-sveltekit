<script>
// @ts-nocheck

  const getDate = new Date()
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();
  let week = getDate.getDay();

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

  
</script>

  <div>
    <div class="text-xl">{year}년</div>
    <button on:click={prevWeek} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">저번주</button>
    <span class="text-xl font-bolds">{month}.{getWeekStart}-{weekMonth+1}.{getWeekEnd}</span>
    <button on:click={nextWeek} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">다음주</button>
  </div>

  <table class="text-3xl m-4">
    <tr class="w-40" >
      <th>{getWeekStart} 일</th>
      <th>{getWeekStart+1} 월</th>
      <th>{getWeekStart+2} 화</th>
      <th>{getWeekStart+3} 수</th>
      <th>{getWeekStart+4} 목</th>
      <th>{getWeekStart+5} 금</th>
      <th>{getWeekEnd}토  </th>
    </tr>
  </table>