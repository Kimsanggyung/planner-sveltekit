// @ts-nocheck
import {dbInstance} from './store';
import { browser } from '$app/env';
let idb;

export let db = null;

if(browser){
  const dbReq = window.indexedDB.open('todoDatas',3);
  dbInstance.subscribe(db => idb = db);

  dbReq.addEventListener('success',function(event){
    console.log('success')
    dbInstance.update(() => event.target.result)
  })
  dbReq.addEventListener('error',function(event){
    const error = event.target.error;
    console.log('erroe',error.name)
  })
  dbReq.addEventListener('upgradeneeded',function(event){
    console.log('upgradeneeded')
    // db.update(() => event.target.result);
    idb = event.target.result
    let oldVersion = event.oldVersion;
    if(oldVersion < 1){
      idb.createObjectStore('datas',{keyPath:'id',autoIncrement:true})
    }
    if(oldVersion < 2){
      idb.createObjectStore('datas2',{keyPath:'id',autoIncrement:true})
    }
    dbInstance.update(() => idb);
  })
}

export const setItem = (data) => {
  let store = idb.transaction('datas', 'readwrite').objectStore('datas')
  let addReq = store.add(data);
  addReq.addEventListener('success',function(event){
    console.log(event.target.result)
  })
}

export const getItem = (id) => {
  return new Promise((resolve, reject) => {
    let store = idb.transaction('datas', 'readonly').objectStore('datas')
    console.log(id)
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
    let store = idb.transaction('datas','readwrite').objectStore('datas');
    let deleteReq = store.delete(id)
    deleteReq.addEventListener('success', function(event){
      resolve(event)
    })
    deleteReq.addEventListener('error',function(event){
      reject(event)
    })
  })
}
