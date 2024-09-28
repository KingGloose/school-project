import PropTypes from "prop-types";
import React, { memo, useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { PictureBrowserWrapper } from "./style";

import IconClose from "@/assets/svg/icon_close";
import IconArrowLeft from "@/assets/svg/icon-arrow-left";
import IconArrowRight from "@/assets/svg/icon-arrow-right";
import IconArrowBottom from "@/assets/svg/icon-arrow-bottom";
import Indicator from "../b.indicator";
import classNames from "classnames";
import IconArrowTop from "@/assets/svg/icon-arrow-top";

const PictureBrowser = memo((props) => {
  const { closePBrowserEvent, pictureUrls } = props;

  const [selectIndex, setSelectIndex] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [isShowList, setIsShowList] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closePBrowserHandler = () => closePBrowserEvent && closePBrowserEvent(false); // 关闭图片阅览框
  const showListHandler = () => setIsShowList(!isShowList); // 是否显示图片指示栏

  // 左右按钮切换图片
  const pictureSliderHandler = (isNext) => {
    const length = pictureUrls?.length;
    let newSelectIndex = isNext ? selectIndex + 1 : selectIndex - 1;

    if (newSelectIndex < 0) newSelectIndex = length - 1;
    if (newSelectIndex > length - 1) newSelectIndex = 0;

    setSelectIndex(newSelectIndex);
    setIsNext(isNext);
  };

  // 点击图片指示栏跳转图片
  const indicatorItemHandler = (index) => {
    setIsNext(selectIndex < index);
    setSelectIndex(index);
  };

  return (
    <PictureBrowserWrapper isNext={isNext} isShowList={isShowList}>
      <div className="top">
        <div className="close-btn" onClick={closePBrowserHandler}>
          <IconClose width={"25"} height={"25"}></IconClose>
        </div>
      </div>
      <div className="slider">
        <div className="control">
          <div className="btn left" onClick={() => pictureSliderHandler(false)}>
            <IconArrowLeft width={"66"} height={"66"}></IconArrowLeft>
          </div>
          <div className="btn right" onClick={() => pictureSliderHandler(true)}>
            <IconArrowRight width={"66"} height={"66"}></IconArrowRight>
          </div>
        </div>
        <div className="picture">
          <SwitchTransition mode="in-out">
            <CSSTransition classNames="pic" key={pictureUrls[selectIndex]} timeout={200}>
              <img src={pictureUrls[selectIndex]} alt={pictureUrls[selectIndex]} />
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
      <div className="preview">
        <div className="info">
          <div className="desc">
            <div className="count">
              <span>
                {selectIndex + 1}/{pictureUrls.length}
              </span>
              <span> room 图片{selectIndex + 1}</span>
            </div>
            <div className="toggle" onClick={showListHandler}>
              <span>{isShowList ? "隐藏" : "显示"}图片列表 </span>
              {isShowList ? <IconArrowBottom></IconArrowBottom> : <IconArrowTop></IconArrowTop>}
            </div>
          </div>
          <div className="list">
            <Indicator selectIndex={selectIndex}>
              {pictureUrls.map((item, index) => {
                return (
                  <div
                    className={classNames("item", { active: selectIndex === index })}
                    onClick={(e) => indicatorItemHandler(index)}
                    key={index}
                  >
                    <img src={item} alt="" />
                  </div>
                );
              })}
            </Indicator>
          </div>
        </div>
      </div>
    </PictureBrowserWrapper>
  );
});

PictureBrowser.propTypes = {
  pictureUrls: PropTypes.array
};

export default PictureBrowser;
