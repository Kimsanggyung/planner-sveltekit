<script>
	//import { Datepicker } from 'svelte-calendar';
  const date = new Date();
  const getDate = {
    year:  date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    korean: date.toLocaleDateString()
  }
  
</script>
  <button>오늘날짜: {getDate.year}년 {getDate.month}월 {getDate.day}일</button>
  