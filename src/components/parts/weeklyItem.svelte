<script>
  // @ts-nocheck
  import {stateData, todoDatas } from "../../store/store";

  export let data;
  let targetID;

  const viweDetails = () => {
    targetID = data.id
    stateData.update(state => {
      state.weeklyState = false;
      state.checkDetailState = true;
      return state;
    })
    todoDatas.update(value => {
      value.editTargetID = targetID
      return value
    })
  }


</script>

<span class="w-80" on:click={viweDetails}>
  {#if data !== undefined}
    {data.setTodoList.setTodo}
  {/if}
</span>