<script>
// @ts-nocheck

  import { stateData, datasId } from '../store/store'
  import { db } from '../store/indexed'
  
  let dataId;
  let getDate = new Date();
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();

  let edidtDatas ={
    setDate: year + '.' + month + '.' + date,
    setTodo: '',
    setDetails: ''
  }

  

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

<button on:click={cancel}>취소</button>
<button on:click={editTodoDatas}>등록</button>