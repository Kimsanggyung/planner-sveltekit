<script>
// @ts-nocheck
  import { todoDate } from '../store/store'
  import { db } from '../store/indexed'

  let text;
  let value;
  let todo = '';
  let details = '';
  let getDate = new Date();
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();
  let setDate = year + '.' + month + '.' + date

  $: setTodoList = {
	  setTodo: todo,
	  setDetails: details,
    setDate: setDate,
    setTime: value
  }

  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},
    {num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ]
  const setItem =() =>{
    let store = db.transaction('datas', 'readwrite').objectStore('datas')
    let addReq = store.add({setTodoList})
    addReq.addEventListener('success',function(event){
      console.log(event.target.result)
    })
  }

  const timeValue = () => {
    let target = document.getElementById("time")
    value = target.options[target.selectedIndex].value;
    text =  target.options[target.selectedIndex].text;
    console.log(value)
    console.log(text)
  }
 
</script>

<div>
  <span>제목: </span>
  <input type="text" bind:value={todo} class="border border-gray-500">
</div>

<div>
  <span>세부내용: </span>
  <input type="text" bind:value={details} class="border border-gray-500">
</div>

<div>
  <label for="start" >예정일:</label>
  <input type="text" name="start" bind:value={$todoDate} class="border border-gray-500 w-24">
  <select id="time" on:change={timeValue}>
    <option value="not">시간선택</option>
    {#each time as {num}, i}
    <option value={num}> {num}시 </option>
    {/each}
  </select>
</div>

<button on:click={setItem}>등록</button>

