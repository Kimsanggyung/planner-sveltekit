<script>
// @ts-nocheck

  let newItem = '';

  let todoList = [{text: '', status: false}];

function addToList() {
  todoList = [...todoList, {text: newItem, status: false}];
  newItem = '';
 }

function removeFromList(index) {
  todoList.splice(index, 1)
  todoList = todoList;
  }
</script>

<input bind:value={newItem} type="text" placeholder="일정입력">
<button on:click={addToList}>일정추가</button>

<br/>
{#each todoList as item, index}
<input bind:checked={item.status} type="checkbox">
<span class:checked={item.status}>{item.text}</span>
<span on:click={() => removeFromList(index)}>제거</span>
<br/>
{/each} 


<style> 
  .checked {
        text-decoration: line-through;
    }
</style>  