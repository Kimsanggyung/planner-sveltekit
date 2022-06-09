<script>
// @ts-nocheck

  import { stateData, storeUserData, todoDatas } from '../store/store'

  let inputId = '';
  let inputPwd  = '';

  let userData;
  let loggedUser;
  storeUserData.subscribe(value => {
    userData = value;
  });
  todoDatas.subscribe(value =>{
    loggedUser = value.loggedID
  })
  console.log
  const checkUser = (id, pwd) => {
		const findUser = userData.find(user => user.id === id && user.pwd === pwd)
		return findUser;
	}

  const login = () => {

    const findUser = checkUser(inputId, inputPwd);

    if(findUser){
      stateData.update(state => {
        state.loggedState = true;
        return state;
      })
      todoDatas.update(vaule =>{
        vaule.loggedID = inputId;
        return vaule;
      })
    }
  }

</script>
<input bind:value={inputId} type="text" placeholder="아이디">
<input bind:value={inputPwd} type="password" placeholder="비밀번호">
<button on:click={login}>로그인</button>
