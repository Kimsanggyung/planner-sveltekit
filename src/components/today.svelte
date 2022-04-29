<script>
	//import { Datepicker } from 'svelte-calendar';
  const date = new Date();
  const year = date.getFullYear();
  const month= date.getMonth() + 1;
  const day = date.getDate();
  const korean = date.toLocaleDateString();
  
  console.log(date)
  console.log(month)
  console.log(day)
  console.log(korean)
</script>
  <h1>오늘날짜: {year}년 {month}월 {day}일</h1>
  