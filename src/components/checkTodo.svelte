<script>
// @ts-nocheck
  import localforage from 'localforage'
  import { getItem, deleteTodo } from '../store/indexed'
  import { stateData } from '../store/store'

  let num;
  let getData;

  getItem().then(data => {
    getData = data;
  })
  
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

</script>

<div>
  {#if getData !== undefined}
    {#each getData as { setTodoList, id }, idx }
      <button on:click={editMode}>
        {idx + 1}. 일자:{setTodoList.setDate} 제목:{setTodoList.setTodo} 내용:{setTodoList.setDetails}
      </button>
      <button on:click={()=> { deleteTodo(id)}}>X</button>
      <br/>
    {/each}
  {/if}
</div>

