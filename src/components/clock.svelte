<script>
 import { onMount } from 'svelte';

  let time = new Date();

  $: hours = time.getHours();
  $: minutes = time.getMinutes();
  $: seconds = time.getSeconds();

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

</script>

<h1>현재시각: {hours}시 {minutes}분 {seconds}초</h1>