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
    if(getWeekStart >= 24){
      month +=1;
      return getWeekStart = (getWeekStart+7)-31
    }
    if(getWeekEnd >= 24){
      weekMonth +=1;
      return getWeekEnd = (getWeekEnd+7)-31
    }
    getWeekStart+= 7;
    getWeekEnd += 7;
  }

  const prevWeek = () => {
    if(month <=1 ){
      year -=1;
      return month = 12;
    }
    if(getWeekStart <= 1){
      month -= 1;
      return getWeekStart = (getWeekStart-7)+31
    }
    if(getWeekEnd <=1){
      weekMonth -= 1;
      return getWeekEnd = (getWeekEnd-7)+31
    }
    getWeekStart -= 7;
    getWeekEnd -= 7;
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
      <th>일</th>
      <th>월</th>
      <th>화</th>
      <th>수</th>
      <th>목</th>
      <th>금</th>
      <th>토</th>
    </tr>
  </table>