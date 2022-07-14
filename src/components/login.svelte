<script>
// @ts-nocheck
  import { stateData, storeUserData, todoDatas, dbInstance } from '../store/store'
  import { getItem } from '../store/indexed'
  import CryptoJS from "crypto-js";

  let getData
  let userData;
  let loggedUser;
  let inputId = '';
  let inputPwd  = '';
  let checkIndexUser;
  let saltKey = 'nuguseyo'
  const hashPwd =  CryptoJS.MD5(inputPwd+saltKey).toString();

  storeUserData.subscribe(value => {
    userData = value;
  });
  todoDatas.subscribe(value =>{
    loggedUser = value.loggedID
  })

  const checkUser = (id, pwd) => {
		const findUser = userData.find(user => user.id === id && user.pwd === pwd)
		return findUser;
	}

  const login = () => {
    getItem().then(data => {
    getData = data;
    checkIndexUser = getData.find(value => value.userId == inputId && value.userPwd)
    if(checkIndexUser){
      console.log(checkIndexUser)
    }
  })
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

  const singUp = () => {
    stateData.update(state => {
      state.signUpState = true;
      return state;
    })
  }

</script>
<div class="flex items-center flex justify-center mt-48 font-jua">
  <div class="bg-slate-50 w-96 h-80 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
    <div class="mb-4">
      <input bind:value={inputId} type="text" 
        class="form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="아이디">
    </div>
    <div class="mb-6">
      <input bind:value={inputPwd} type="password"
        class="form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="비밀번호">
    </div>
    <div class="flex items-center justify-between">
      <button on:click={login} class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">로그인</button>
    </div>
    <div class="flex items-center justify-between">
      <button on:click={singUp} class="text-blue-600 mt-4 underline underline-offset-2">회원가입</button>
    </div>
  </div>
</div>
