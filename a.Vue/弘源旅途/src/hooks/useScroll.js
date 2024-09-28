import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";

const useScroll = (elRef) => {
  let el = window;

  let isReachBottom = ref(false);

  let scrollTop = ref(0);
  let scrollHeight = ref(0);
  let clientTop = ref(0);

  const elListenerScroll = throttle(() => {
    if (el === window) {
      scrollTop.value = document.documentElement.scrollTop;
      scrollHeight.value = document.documentElement.scrollHeight;
      clientTop.value = document.documentElement.clientHeight;
    } else {
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
      clientTop.value = el.clientHeight;
    }

    if (scrollTop.value + clientTop.value + 2 >= scrollHeight.value) {
      isReachBottom.value = true;
    }
  }, 200);

  onMounted(() => {
    if (elRef) el = elRef.value;
    el.addEventListener("scroll", elListenerScroll);
  });
  onUnmounted(() => {
    el.removeEventListener("scroll", elListenerScroll);
  });

  return {
    isReachBottom,
    scrollTop,
    scrollHeight,
    clientTop,
  };
};

export default useScroll;
