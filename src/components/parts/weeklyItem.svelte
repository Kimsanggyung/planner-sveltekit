<script>
  // @ts-nocheck
  export let data;

  $: {
    console.log(data)
  }
</script>

<span class="w-80">
  {#if data !== undefined}
    {data.setTodoList.setTodo}
  {/if}
</span>