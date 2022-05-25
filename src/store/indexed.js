// @ts-nocheck
const dbReq = indexedDB.open('todoDatas',3)
export let db;
dbReq.addEventListener('success',function(event){
  console.log('success')
  db = event.target.result;
})
dbReq.addEventListener('error',function(event){
  const error = event.target.error;
  console.log('erroe',error.name)
})
dbReq.addEventListener('upgradeneeded',function(event){
  console.log('upgradeneeded')
  db = event.target.result;
  let oldVersion = event.oldVersion;
  if(oldVersion < 1){
    db.createObjectStore('datas',{keyPath:'id',autoIncrement:true})
  }
  if(oldVersion < 2){
    db.createObjectStore('datas2',{keyPath:'id',autoIncrement:true})
  }
})

// export const getItem = (id) => {
//   return new Promise((resolve, reject) => {
//   }
// }

export const getItem = (id) => {
  return new Promise((resolve, reject) => {
    let store = db.transaction('datas', 'readonly').objectStore('datas')
    let getIdReq = id? store.get(id) : store.getAll();
    getIdReq.addEventListener('success',function(event){
      resolve(event.target.result)
    })
    getIdReq.addEventListener('error',function(event){
      reject(event)
    })
  })
}

export const deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    let store = db.transaction('datas','readwrite').objectStore('datas');
    let deleteReq = store.delete(id)
    deleteReq.addEventListener('success', function(event){
      resolve(event)
    })
    deleteReq.addEventListener('error',function(event){
      reject(event)
    })
  })
}