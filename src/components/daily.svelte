<script>
// @ts-nocheck
  const date = new Date();
	let	month = date.getMonth();
	let year = date.getFullYear();
  let day = date.getDate();
  
  const nextDay = () => {
    const checkMonth = [1,3,5,7,8,9,12]
    const result = checkMonth.find(value => value == month+1)
		if (result !== undefined && day >= 31 ) {
			month += 1;
			return day = 1;
    }
    if (result == undefined && day >= 30 ) {
			month += 1;
			return day = 1;
    }
    if(month >= 11){
      year += 1;
      return month = 0;
    }
		return day += 1;
	}
	
	const prevDay = () => {
    const checkMonth = [1,3,5,7,8,9,12]
    const result = checkMonth.find(value => value == month+1)
    console.log(month, result)
		if (result !== undefined && day <= 1) {
			month -= 1;
			return day = 30;
		}
    if (result == undefined && day <= 1) {
			month -= 1;
			return day = 31;
		}
    if(month <= 0){
      year -= 1;
      return month = 12;
    }
		return day -= 1;
	}

</script>
<main>
  <div class="inline-grid text-xl grid-cols-3 w-25">
    <button on:click={prevDay} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-l">Prev</button>
    <sanp>{year}년 {month+1}월 {day}일</sanp>
    <button on:click={nextDay} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-r">Next</button>
  </div>
  <div>
    <li>00시</li>
    <li>01시</li>
    <li>02시</li>
    <li>03시</li>
    <li>04시</li>
    <li>05시</li>
    <li>06시</li>
    <li>08시</li>
    <li>09시</li>
    <li>10시</li>
    <li>11시</li>
    <li>12시</li>
    <li>13시</li>
    <li>14시</li>
    <li>15시</li>
    <li>16시</li>
    <li>17시</li>
    <li>18시</li>
    <li>19시</li>
    <li>20시</li>
    <li>21시</li>
    <li>22시</li>
    <li>23시</li>
    <li>24시</li>
  </div>
</main>