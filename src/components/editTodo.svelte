<script>
// @ts-nocheck

  import { stateData, dbInstance, todoDatas } from '../store/store';
  import { getItem } from '../store/indexed';
  
  let idb;
  let day;
  let todo;
  let value;
  let details;
  let targetID;
  let loggedID;
  let getDate = new Date();
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();

  dbInstance.subscribe(idxdb => idb = idxdb)
  todoDatas.subscribe(value => {
    targetID = value.editTargetID
    loggedID = value.loggedID
  })

  getItem(targetID).then(value => {
    day = value.setTodoList.setDate;
    todo = value.setTodoList.setTodo;
    details = value.setTodoList.setDetails;
  });

  $: edidtDatas ={
    setDate: day,
    setTodo: todo,
    setDetails: details,
    setTime: value,
    setUser: loggedID
  }

  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},
    {num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ]

  year + '.' + month + '.' + date

  const editTodoDatas = () => {
    let store = idb.transaction('datas', 'readwrite').objectStore('datas');
    let putReq = store.put({
      id:(targetID),
      setTodoList: edidtDatas 
    })
    putReq.addEventListener('succcess', function(event){
      console.log(event)
    })
  }

  const cancel = () =>{
    stateData.update(state => {
      state.checkTodoState = true;
      return state;
    })
    stateData.update(state => {
      state.edidtTodoState = false;
      return state;
    })
  } 

  const timeValue = () => {
    let target = document.getElementById("time")
    value = target.options[target.selectedIndex].value;
    console.log(value)
  }

</script>
<input bind:value={day}>
<input bind:value={todo}>
<input bind:value={details}>
<select id="time" on:change={timeValue}>
    <option value="not">시간선택</option>
    {#each time as {num}, i}
      <option value={num}> {num}시 </option>
    {/each}
</select>

<button on:click={editTodoDatas}>등록</button>
<button on:click={cancel}>취소</button>
