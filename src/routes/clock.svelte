<script>
  const time = new Date();
  const getTime = {
    hour: time.getHours(),
    minutes: time.getMinutes(),
    seconds: time.getSeconds(),
  }

</script>

<h1>{getTime.hour}시 {getTime.minutes}분 {getTime.seconds}초</h1>