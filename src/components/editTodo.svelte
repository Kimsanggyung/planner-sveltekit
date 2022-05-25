<script>
// @ts-nocheck

  import { stateData } from '../store/store'
  import { db } from '../store/indexed'
  
  let dataId;
  let getDate = new Date();
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();

  let edidtDatas ={
    setDate: '',
    setTodo: '',
    setDetails: ''
  }

  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},
    {num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ]

  year + '.' + month + '.' + date

  datasId.subscribe(value => {
    dataId = value
  })
  console.log(dataId)

  const editTodoDatas = () => {
    let store = db.transaction('datas', 'readwrite').objectStore('datas');
    let putReq = store.put({
      id:dataId,
      setTodoList: edidtDatas 
    })
    putReq.addEventListener('succcess', function(event){
      console.log(event)
    })
  }

  const getDataValue = ()=> {
    let store = db.transaction('datas', 'readonly').objectStore('datas')
    let getReq = store.get(1);
    getReq.addEventListener('success', function(event){
      let value = event.target.result
      console.log(value)
      edidtDatas.setDate = value.setTodoList.setDate;
      edidtDatas.setTodo = value.setTodoList.setTodo;
      edidtDatas.setDetails = value.setTodoList.setDetails
    })
  }
  getDataValue();

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
</script>
<input bind:value={edidtDatas.setDate}>
<input bind:value={edidtDatas.setTodo}>
<input bind:value={edidtDatas.setDetails}>
<select id="time" >
    {#each time as {num}, i}
    <option value={num}> {num}시 </option>
    {/each}
</select>

<button on:click={editTodoDatas}>등록</button>
<button on:click={cancel}>취소</button>
