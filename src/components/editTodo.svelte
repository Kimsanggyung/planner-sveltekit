<script>
  import { stateData } from '../store/store'

  const cancel = () =>{
    stateData.update(state => {
      state.checkTodoState = true;
      console.log(state)
      console.log(state.checkTodoState)
      return state;
    })
  } 
</script>

<button on:click={cancel}>취소</button>
