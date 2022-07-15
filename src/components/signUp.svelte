<script>
// @ts-nocheck

  import { setItem, getItem } from '../store/indexed'
  import { stateData } from '..//store/store';
  import CryptoJS from "crypto-js";
  import { storeUserData } from '..//store/store'
  import SignUpError from '../components/parts/signUpError.svelte'

  let inputID = null;
  let inputPwd = null;
  let checkPwd = null;
  let saltKey = "nuguseyo"
  let error = ""
  let checked = ""
  let storeUser;
  let checkState;

  stateData.subscribe(state=> {
    checkState = state.checkIdState
  })

  storeUserData.subscribe(value => {
    storeUser = value;
  });
  const checkUser = (id) => {
		const findUser = storeUser.find(user => user.id === id)
		return findUser;
	}
  const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  $: hashPwd =  CryptoJS.MD5(inputPwd+saltKey).toString();

  $: userData = {
    userId: inputID,
    userPwd: hashPwd
  }

  const submit = () => {
    if(checkState === false){
      error = "아이디 중복확인을 해주세요."
    }
    if(inputID === null){
      error = "아이디를 입력해 주세요."
    }
    if(!password.test(inputPwd)){
      error = "비밀변호는 최소 8 자, 최소 하나의 문자 및 하나의 숫자를 포함하고 있어야합니다"
    }
    if(checkPwd === null){
      error = "비밀번호를 한번더 입력해주세요."
    }
    if(inputPwd !== checkPwd){
      error = "입력하신 비밀번호가 다릅니다."
      console.log("error")
    }
    if(inputID !== null && inputPwd !== null && inputPwd !== null && checkPwd === inputPwd && password.test(inputPwd) && checkState === true){
      setItem({userData})
      console.log('성공')
      stateData.update(state => {
        state.signUpState = false
        return state
      })
    }
  }

  const checkId = () => {
    getItem().then(data => {
      console.log(data.length)
      if(data.length !== 0){
        data.find(({userData})=>{
          if (!userData) return false;
          console.log(userData)
          const checkInputId = userData.userId === inputID
          const findId = checkUser(inputID);
          if(checkInputId || findId){
            error = "이미사용되고있는 아이디입니다."
            console.log("이미사용되고있는 아이디입니다.")
            stateData.update(state => {
              state.checkIdState = false
              console.log(checkState)
              return state
            })
          }
          if(!checkInputId && !findId){
            error = ""
            checked = "사용가능한 아이디입니다."
            stateData.update(state => {
              state.checkIdState = true
              console.log(checkState)
              return state
            })
          }
        })
      }
      if(data.length == 0){
        const findId = checkUser(inputID);
        if(findId){
          error = "이미사용되고있는 아이디입니다."
          console.log("이미사용되고있는 아이디입니다.")
          stateData.update(state => {
            state.checkIdState = false
            console.log(checkState)
            return state
          })
        }
        if(!findId){
          error = ""
          checked = "사용가능한 아이디입니다."
          stateData.update(state => {
            state.checkIdState = true
            console.log(checkState)
            return state
          })
        }
      }
    })
  }

</script>

<div class="flex items-center flex justify-center mt-48 font-jua">
  <div class="bg-slate-50 w-96 h-80 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
    <div class="mb-4">
      <input bind:value={inputID} type="text" 
        class="form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="아이디를 입력해 주세요">
        <button on:click={checkId}>중복확인</button>
        <div>{checked}</div>
    </div>
    <div class="mb-6">
      <input bind:value={inputPwd} type="password"
        class="form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="비밀번호을 입력해주세요">
    </div>
    <div class="mb-6">
      <input bind:value={checkPwd} type="password"
        class="form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="비밀번호을 한번더 입력해주세요">
    </div>
    <div>
      <SignUpError errorMessege={error}/>
    </div>
    <div class="flex items-center justify-between">
      <button on:click={submit} class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">등록</button>
    </div>
  </div>
</div>
