import { useEffect, useState } from "react";
import { throttle } from "underscore";

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const scrollListenHandler = throttle(() => {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    }, 100);

    window.addEventListener("scroll", scrollListenHandler);
    return () => {
      window.removeEventListener("scroll", scrollListenHandler);
    };
  }, []);

  return { scrollX, scrollY };
};

export default useScrollPosition;
