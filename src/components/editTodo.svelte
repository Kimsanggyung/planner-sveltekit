<script>
// @ts-nocheck

  import { stateData, dbInstance, todoDatas, selectTime } from '../store/store';
  import { getItem } from '../store/indexed';
  import EditError from './parts/editError.svelte'
  
  let idb;
  let day;
  let todo;
  let value;
  let details;
  let targetID;
  let loggedID;
  let selectedTime;
  let error = "";
  
  let getDate = new Date();
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();

  dbInstance.subscribe(idxdb => idb = idxdb)
  selectTime.subscribe(value => {
    selectedTime = value;
  })
  todoDatas.subscribe(value => {
    targetID = value.editTargetID
    loggedID = value.loggedID
  })

  getItem(targetID).then(value => {
    day = value.setTodoList.setDate;
    todo = value.setTodoList.setTodo;
    details = value.setTodoList.setDetails;
    selectedTime = value.setTodoList.setTime;
  });

  $: edidtDatas ={
    setDate: day,
    setTodo: todo,
    setDetails: details,
    setTime: selectedTime,
    setUser: loggedID
  }

  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},
    {num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ]

  const editTodoDatas = () => {
    if(selectedTime === "시간선택"){
      error = "일정시간을 선택해주세요"
      console.log("일정시간을 선택해주세요")
    }
    if(details === ""){
      error = "상세내용을 입력해주세요"
      console.log("상세내용을 입력해주세요")
    }
    if(todo === ""){
      error = "제목을 입력해주세요"
      console.log("제목을 입력해주세요")
    }
    if(todo !== "" && details !== "" && selectedTime !== "시간선택"){
      let store = idb.transaction('datas', 'readwrite').objectStore('datas');
      let putReq = store.put({
        id:(targetID),
        setTodoList: edidtDatas 
      })
      putReq.addEventListener('succcess', function(event){
        console.log(event)
      })
      stateData.update(state =>{
        state.edidtTodoState = false
        state.monthState = true
        return state
      })
    }
    
  }

  const cancel = () =>{
    stateData.update(state => {
      state.edidtTodoState = false;
      return state;
    })
  } 

  const timeValue = () => {
    let target = document.getElementById("time")
    let timeValue = target.options[target.selectedIndex].value;
  }
  
</script>
<div class="flex items-center flex justify-center mt-32 font-jua">
  <div class="bg-slate-50 w-full h-80 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
    <div class="mb-4">
      <span>일자: </span>
      <input type="text" bind:value={day} class="border border-gray-500 w-48">
      <span>{selectedTime}시</span>
    </div>

    <div class="mb-4">
      <span>제목: </span>
      <input type="text" bind:value={todo} class="border border-gray-500">
    </div>

    <div class="mb-4">
      <span>세부내용: </span>
      <input type="text" bind:value={details} class="border border-gray-500 w-80">
    </div>

    <div class="mb-4">
      <label for="start" >시간:</label>
      <select id="time" bind:value={selectedTime} on:change={timeValue}>
        <option value="시간선택">시간선택</option>
        {#each time as {num}}
          <option value={num}> {num}시 </option>
        {/each}
      </select>
    </div>
    <div>
      <EditError errorMessege = {error}/>  
    </div>
    <div class="mt-4">
      <button on:click={editTodoDatas} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">등록</button>
      <button on:click={cancel} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">취소</button>
    </div>
  </div>
</div>