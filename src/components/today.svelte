<script>
// @ts-nocheck
  const getDate = new Date();
  let year =  getDate.getFullYear()
  let month = getDate.getMonth() + 1
  let day = getDate.getDate()
  
  const dateFormat = (date) =>{
    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0'+day;
    return year + '년 ' + month + '월 ' + day + '일'
  }
  dateFormat()
  
</script>

<div class="flex items-center font-jua ml-4 mt-2">
  <button class="text-3xl">오늘날짜:{year}년 {month}월 {day}일</button>
</div>
  