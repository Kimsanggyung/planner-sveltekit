<script>
// @ts-nocheck
  import { getItem, deleteTodo } from '../store/indexed'
  import { stateData, todoDatas } from '../store/store'

  let getData;
  let loggedUser;
  let checkUser;
  let checkedID;

  todoDatas.subscribe(value => {
    loggedUser = value.loggedID
  })

  getItem().then(data => {
    getData = data;
    checkUser = getData.find(value => value.setTodoList.setUser == loggedUser)
    if(checkUser){
      checkedID = checkUser.setTodoList.setUser;
    }
  })

  const editMode = (id) =>{
    stateData.update(state => {
      state.edidtTodoState = true;
      return state;
    })
    stateData.update(state =>{
      state.checkTodoState = false;
      return state
    })
    todoDatas.update(value => {
      value.editTargetID = id
      return value
    })
  }

  const cancel = (id) => {
    deleteTodo(id)
    stateData.update(state =>{
      state.monthState = true;
      state.checkTodoState = false;
      return state
    })
  }

  

</script>

<div class="font-jua underline bg-sky-100 mt-16 h-full text-2xl">
  {#if getData && getData.length > 0 && checkUser && checkedID && loggedUser === checkedID}
    {#each getData as { setTodoList, id }, idx }
      <span on:click={() => editMode(id)}>
        {idx + 1}. 일자:{setTodoList.setDate} 제목:{setTodoList.setTodo} 내용:{setTodoList.setDetails}
      </span>
      <button class="text-red-500" on:click={()=> {cancel(id)}}>X</button>
      <br/>
    {/each}
  {:else}
      <span>일정이 없습니다.</span>
  {/if}
</div>

