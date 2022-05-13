<script>
// @ts-nocheck
  import localforage from 'localforage'
  import {todoData} from '../store/store'
  let todo = '';
  let details = '';
  let getDate = new Date();
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();

  let startDate = year + '.' + month + '.' + date

  let setTodoList = {
    startDay: startDate,
	  setTodo: todo,
	  setDetails: details
  }

  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},
    {num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ]

  const setItem = async() =>{
    try {
      await localforage.setDriver(localforage.INDEXEDDB)
      const value = await localforage.setItem(startDate, (setTodoList));
      console.log(value)
    } catch (err) {
      console.log(err);
    }
  }

  const test = () => {
    console.log(startDate)
    console.log(todo)
    console.log(details)

  }
</script>

<button on:click={setItem}>등록</button>
<button on:click={test}>test</button>
<div>
  <span>제목: </span>
  <input type="text" bind:value={todo} class="border border-gray-500">
</div>

<div>
  <span>세부내용: </span>
  <input type="text" bind:value={details} class="border border-gray-500">
</div>

<div>
  <span>일시: </span>
  <label for="start" >예정일:</label>
  <input type="text" name="start" bind:value={startDate} class="border border-gray-500 w-24">
  <select name="time">
    {#each time as {num}, i}
    <option value="" >{num}시 </option>
    {/each}
  </select>
</div>



