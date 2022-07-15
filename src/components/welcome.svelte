<script>
  import { todoDatas } from "../store/store";
  let loggedUserId = ""

  todoDatas.subscribe(value=>{
    loggedUserId = value.loggedID
  })

</script>

<div class="text-3xl font-jua mt-1 ml-4">{loggedUserId}님 환영합니다.</div>

