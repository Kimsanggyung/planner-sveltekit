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
  <div>
    <div>{year}년</div>
    <button on:click={prevWeek}>저번주</button>
    <div>{month}.{getWeekStart}-{weekMonth+1}.{getWeekEnd}</div>
    <button on:click={nextWeek}>다음주</button>
  </div>
  <span>일</span>
  <span>월</span>
  <span>화</span>
  <span>수</span>
  <span>목</span>
  <span>금</span>
  <span>토</span>
</div>