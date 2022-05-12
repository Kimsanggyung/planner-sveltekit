<script>
// @ts-nocheck

  const getDate = new Date()
  let year = getDate.getFullYear();
  let month = getDate.getMonth();
  let date = getDate.getDate();
  let week = getDate.getDay();

  let weekStartDate = new Date(year, month, date - week);
  let weekEndDate = new Date(year, month, date + (6 - week));

  let weekMonth;
  let weekDay;
  const formatDate = (date) => {
    weekMonth = date.getMonth()+1;
    weekDay = date.getDate();
    return (weekMonth + "." + weekDay);
  }

  let getWeekStart = formatDate(weekStartDate)
  let getWeekEnd = formatDate(weekEndDate)

</script>

<div>
  <button>zzzz</button>
  <div>{getWeekStart}-{getWeekEnd}</div>
  <span>일</span>
  <span>월</span>
  <span>화</span>
  <span>수</span>
  <span>목</span>
  <span>금</span>
  <span>토</span>
</div>