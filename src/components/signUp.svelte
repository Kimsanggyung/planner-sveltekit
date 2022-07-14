<script>
// @ts-nocheck
  import { setItem } from '../store/indexed'
  import CryptoJS from "crypto-js";
  import { storeUserData } from '..//store/store'
  import SignUpError from '../components/parts/signUpError.svelte'

  let inputID = null;
  let inputPwd = null;
  let checkPwd = null;
  let saltKey = "nuguseyo"
  let error = ""

  const hashPwd =  CryptoJS.MD5(inputPwd+saltKey).toString();

  $: userData = {
    userId: inputID,
    userPwd: hashPwd
  }

  const submit = () => {
    if(inputID === null){
      error = "아이디를 입력해 주세요."
    }
    else if(inputPwd !== checkPwd){
      error = "입력하신 비밀번호가 다릅니다."
    }
    else{
      setItem(userData)
    }
  }

</script>

<div class="flex items-center flex justify-center mt-48 font-jua">
  <div class="bg-slate-50 w-96 h-80 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col flex items-center flex justify-center">
    <div class="mb-4">
      <input bind:value={inputID} type="text" 
        class="form-control block px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="아이디를 입력해 주세요">
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
    <div class="flex items-center justify-between">
      <button on:click={submit} class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">등록</button>
    </div>
    <div>
      <SignUpError errorMessege={error}/>
    </div>
  </div>
</div>
