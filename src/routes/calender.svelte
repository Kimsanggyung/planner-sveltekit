<script>
	import { Datepicker } from 'svelte-calendar';
  const date = new Date();
  const getDate ={
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay()
  }
</script>
  <Datepicker/>
  <h1>{getDate.year}년 {getDate.month}월 {getDate.day}일</h1>

  
