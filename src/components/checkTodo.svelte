<script>
  import localforage from 'localforage'

  const getItem = async() =>{
    try {
      await localforage.setDriver(localforage.INDEXEDDB)
      const value = await localforage.getItem('Todo');
      console.log(value)
    } catch (err) {
      console.log(err);
    }
  }
  getItem();

</script>