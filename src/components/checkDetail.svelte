<script>
  // @ts-nocheck
  
    import { todoDatas } from '../store/store';
    import { getItem } from '../store/indexed';
    
    let targetID;
    let day;
    let todo;
    let details;
    let getItemPromise = null;

    todoDatas.subscribe(value => {
    getItemPromise = getItem(value.editTargetID).then(data => {
      console.log(data)
        day = data.setTodoList.setDate;
        todo = data.setTodoList.setTodo;
        details = data.setTodoList.setDetails;
        return data;
      });
  })

  
  
  </script>

{#await getItemPromise}
    <span>데이터 가지고 오는 중....</span>
  {:then data}
  <div class="flex items-center flex justify-center mt-32 font-jua">
    <div class="bg-slate-50 w-2/5 h-96 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
      <div class="mb-4 text-4xl">
        <span>제목: </span>
        <span>{todo}</span>
      </div>
  
      <div class="mb-6 text-3xl">
        <span>세부내용: </span>
        <span>{details}</span>
      </div>
  
      <div class="mb-10 text-2xl">
        <span>예정일:</span>
        <span>{day}</span>
      </div>
    </div>
  </div>
{/await}
  