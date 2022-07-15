<script>
// @ts-nocheck
  import { todoDatas, todoDate, selectTime, stateData } from '../store/store'
  import { setItem } from '../store/indexed'
  import AddError from './parts/addError.svelte'

  let todo = '';
  let details = '';
  let error = ''
  let loggedUser;
  let selectDate;
  let selectedTime;
  let getDate = new Date();
  let year = getDate.getFullYear();
  let month = getDate.getMonth()+1;
  let date = getDate.getDate();
  let setDate = year + '.' + month + '.' + date
  const pattern = /(^\d{4}).([1-9]|1[0-2]).([1-9]|[12][0-9]|3[01])$/

  todoDatas.subscribe(value => {
    loggedUser = value.loggedID
  })
  todoDate.subscribe(value => {
    selectDate = value;
  })
  selectTime.subscribe(value => {
    selectedTime = value;
  })

  $: setTodoList = {
	  setTodo: todo,
	  setDetails: details,
    setDate: selectDate,
    setTime: selectedTime,
    setUser: loggedUser
  }

  const time = [
    {num:1},{num:2},{num:3},{num:4},{num:5},{num:6},{num:7},{num:8},{num:9},{num:10},
    {num:11},{num:12},{num:13},{num:14},{num:15},{num:16},{num:17},{num:18},{num:19},{num:20},{num:21},{num:22},{num:23},{num:24}
  ]
  
  const submit = () => {
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
    }if(!pattern.test(selectDate)){
      error = "정확한 날짜를 입력해주세요"
      console.log("정확한 날짜를 입력해주세요")
    }
    if(selectedTime !== "시간선택" && todo !== "" && details !== "" && pattern.test(selectDate)){
      setItem({setTodoList})
      stateData.update(state => {
        state.addTodoState = false
        state.monthState = true
        return state
      })
    }
  }
  const timeValue = () => {
    let target = document.getElementById("time")
    let timeValue = target.options[target.selectedIndex].value;
    // selectTime.update(selectValue => {
    //   selectValue = timeValue
    //   return selectValue
    // })
  }

</script>

<div class="flex items-center flex justify-center mt-32 font-jua">
  <div class="bg-slate-50 w-96 h-80 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
    <div class="mb-4">
      <span>제목: </span>
      <input type="text" bind:value={todo} class="border border-gray-500">
    </div>

    <div class="mb-6">
      <span>세부내용: </span>
      <input type="text" bind:value={details} class="border border-gray-500">
    </div>

    <div class="mb-8">
      <label for="start" >예정일:</label>
      <input type="text" name="start" bind:value={selectDate} class="border border-gray-500 w-24">
      <select id="time" bind:value={selectedTime} on>
        <option value="시간선택">시간선택</option>
        {#each time as {num}}
          <option value={num}> {num}시 </option>
        {/each}
      </select>
    </div>
    <div>
      <AddError errorMessege={error}/>
    </div>
    <div>
      <button on:click={submit}>등록</button>
    </div>
  </div>
</div>