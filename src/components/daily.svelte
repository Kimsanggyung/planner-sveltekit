<script>
// @ts-nocheck

  import { getDates } from '../store/store'
  let year;
  let month;
  let day;

  getDates.subscribe(value => {
    year = value.year,
    month = value.month,
    day = value.day 
  })

</script>
<main>
  <div>
    <button></button>
    <sanp>{year}년 {month}월 {day}일</sanp>
    <button></button>
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