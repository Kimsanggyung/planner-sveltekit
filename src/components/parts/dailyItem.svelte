<script>
  // @ts-nocheck
  import {stateData, todoDatas } from "../../store/store";
  export let data;
  let targetID;

  const viweDetails = () => {
    targetID = data.id
    stateData.update(state => {
      state.dailyState = false;
      state.checkDetailState = true;
      return state;
    })
    todoDatas.update(value => {
      value.editTargetID = targetID
      return value
    })
  }
</script>


<span on:click={viweDetails}>
  {#if data !== undefined}
    {data.setTodoList.setTodo}
  {/if}
</span>
