<script>
 import { onMount } from 'svelte';
 import moment from 'moment';

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

<span class="text-3xl font-jua ml-4 mt-4 mb-4">현재시각: {hours}시 {minutes}분 {seconds}초</span>
