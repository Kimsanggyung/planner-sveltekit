<script>
  // @ts-nocheck
  import {stateData, todoDatas } from "../../store/store";
  import { getItem } from '../../store/indexed';
  import { afterUpdate } from 'svelte';

  export let getDate;
  let targetID
  let getItemPromise;
  let nullCheck = false

  let loggedUser;
	todoDatas.subscribe(value => {
    loggedUser = value.loggedID;
  })

  afterUpdate(async() => {
    getItemPromise = await getItem().then(data => {
      const getData = data.find(({setTodoList})=>{
        if (!setTodoList) return false;
        const {setDate, setUser} = setTodoList;
        return (setDate === getDate && setUser === loggedUser)
      })
      if(getData){
        targetID = getData.id
        nullCheck = true;
      }
      return getData ? getData.setTodoList.setTodo : "   "; 
    });
  });

  const viweDetails = () => {
    stateData.update(state => {
      state.monthState = false;
      state.checkDetailState = true;
      return state;
    })
    todoDatas.update(value => {
      value.editTargetID = targetID
      return value;
    })
  }
  
</script>

{#if getItemPromise && nullCheck} 
  <div on:click={viweDetails} class="w-48 h-7 pb-1 ml-4 border-2 border-indigo-300 overflow-hidden">
    {getItemPromise}
  </div>
  {:else}
  <div class="w-48 h-7 overflow-hidden"></div>
{/if}