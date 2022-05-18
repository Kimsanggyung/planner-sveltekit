<script>
// @ts-nocheck
  import localforage from 'localforage'
  import { db } from '../store/indexed'
  let value;
  let dateValue;
  let todoValue;
  let detailsValue;
  

  
  
  
  const getItem = () =>{
    let store = db.transaction('datas', 'readwrite').objectStore('datas')
    let getAllReq = store.getAll();
    getAllReq.addEventListener('success',function(event){
      console.log(event.target.result)
      
    })
    let getIdReq = store.get(1);
    getIdReq.addEventListener('success',function(event){
      value = event.target.result
      dateValue = value.setTodoList.setDate
      todoValue = value.setTodoList.setTodo
      detailsValue = value.setTodoList.setDetails
      console.log(dateValue)
    })
  }
    
  getItem()


</script>

<div>일자:{dateValue} 제목:{todoValue} 내용:{detailsValue}</div>