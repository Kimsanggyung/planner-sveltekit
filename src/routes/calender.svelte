<script>
  let date = new Date();
  let getDate ={
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay()
  }
</script>

<h1>{getDate.year}년 {getDate.month}월 {getDate.day}일</h1>