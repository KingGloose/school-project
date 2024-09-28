import React, { memo, useEffect, useRef, useState } from "react";

import { ScrollViewWrapper } from "./style";

import IconArrowLeft from "@/assets/svg/icon-arrow-left";
import IconArrowRight from "@/assets/svg/icon-arrow-right";

const index = memo((props) => {
  const [isShowRightBtn, setIsShowRightBtn] = useState(false);
  const [isShowLeftBtn, setIsShowLeftBtn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollContentRef = useRef();
  const totalDistance = useRef();

  useEffect(() => {
    const totalScrollWidth = scrollContentRef.current.scrollWidth;
    const showScrollWidth = scrollContentRef.current.clientWidth;
    const distance = totalScrollWidth - showScrollWidth;

    totalDistance.current = distance;
    setIsShowRightBtn(distance > 0);
  }, [props.children]);

  const scorllBtnHandler = (isRight) => {
    const newIndex = isRight ? currentIndex + 1 : currentIndex - 1;
    const currentEl = scrollContentRef.current.children[newIndex];
    const currentElOffsetLeft = currentEl.offsetLeft;

    scrollContentRef.current.style.transform = `translate(-${currentElOffsetLeft}px)`;

    setCurrentIndex(newIndex);
    setIsShowRightBtn(totalDistance.current > currentElOffsetLeft);
    setIsShowLeftBtn(currentElOffsetLeft > 0);
  };

  return (
    <ScrollViewWrapper>
      {isShowLeftBtn && (
        <div className="control left" onClick={() => scorllBtnHandler(false)}>
          <IconArrowLeft />
        </div>
      )}

      {isShowRightBtn && (
        <button className="control right" onClick={() => scorllBtnHandler(true)}>
          <IconArrowRight />
        </button>
      )}

      <div className="scroll">
        <div className="scroll-content" ref={scrollContentRef}>
          {props.children}
        </div>
      </div>
    </ScrollViewWrapper>
  );
});

export default index;
