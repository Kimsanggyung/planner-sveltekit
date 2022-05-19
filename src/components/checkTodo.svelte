<script>
// @ts-nocheck
  import localforage from 'localforage'
  import { db } from '../store/indexed'
  import { stateData, datasId} from '../store/store'
  let value;
  let dateValue;
  let todoValue;
  let detailsValue;
  let num;

  const getItem = () =>{
    let store = db.transaction('datas', 'readonly').objectStore('datas')
    let getIdReq = store.get(1);
    getIdReq.addEventListener('success',function(event){
      value = event.target.result
      dateValue = value.setTodoList.setDate
      todoValue = value.setTodoList.setTodo
      detailsValue = value.setTodoList.setDetails
      num = value.id
    })
  }
  getItem();

  const getList = () =>{
    let store = db.transaction('datas', 'readonly').objectStore('datas');
    let getAllReq = store.getAll();
    getAllReq.addEventListener('success', function(event){
      value = event.target.result
      console.log(event)
      console.log(value)
    })
  }
  getList();

  const editMode = () =>{
    stateData.update(state => {
      state.edidtTodoState = true;
      return state;
    })
    stateData.update(state =>{
      state.checkTodoState = false;
      return state
    })
    datasId.update(id => id = num)
  }

  const deleteTodo = () => {
    let store = db.transaction('datas','readwrite').objectStore('datas');
    let deleteReq = store.delete(1)
    deleteReq.addEventListener('success', function(event){
      console.log(event)
    })
  }
  console.log(value)
</script>

{#if dateValue == undefined }
  <div>일정이 없습니다.</div>
{/if}
{#if dateValue !== undefined }
<div>
  <button on:click={editMode}>
    {num}. 일자:{dateValue} 제목:{todoValue} 내용:{detailsValue}
    </button>
    <button on:click={deleteTodo}>X</button>
</div>
{/if}