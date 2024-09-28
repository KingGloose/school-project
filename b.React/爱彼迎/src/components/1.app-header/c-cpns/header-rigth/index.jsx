import React, { memo, useEffect, useState } from "react";

import IconGlobal from "@/assets/svg/icon_global";
import IconMenu from "@/assets/svg/icon_menu";

import { HeaderRightWrapper } from "./style";
import IconAvatar from "@/assets/svg/icon_avatar";

const HeaderRight = memo(() => {
  const [isShowPanel, setIsShowPanel] = useState(false);

  // 副作用函数 - window Click监听
  useEffect(() => {
    const windowClickHandler = () => setIsShowPanel(false);
    window.addEventListener("click", windowClickHandler);
    return () => window.removeEventListener("click", windowClickHandler);
  }, []);

  // 事件监听 - 点击显示panel
  const setIsShowPanelClick = (event) => {
    event.stopPropagation(); // 阻止事件冒泡
    setIsShowPanel(true);
  };

  return (
    <HeaderRightWrapper>
      <div className="btns">
        <span className="btn">登录</span>
        <span className="btn">注册</span>
        <span className="btn">
          <IconGlobal></IconGlobal>
        </span>
      </div>

      <div className="menus" onClick={setIsShowPanelClick}>
        <IconMenu></IconMenu>
        <IconAvatar></IconAvatar>
      </div>

      {isShowPanel && (
        <div className="panel">
          <div className="panel__top">
            <div className="register item">注册</div>
            <div className="login item">登录</div>
          </div>
          <div className="panel__bottom">
            <div className="item">出租房源</div>
            <div className="item">开展体验</div>
            <div className="item">帮助</div>
          </div>
        </div>
      )}
    </HeaderRightWrapper>
  );
});

export default HeaderRight;
