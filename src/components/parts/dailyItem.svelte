<script>
  // @ts-nocheck
  export let data;

  $: {
    console.log(data)
  }
</script>


<span>
  {#if data !== undefined}
    {data.setTodoList.setTodo}
  {/if}
</span>
