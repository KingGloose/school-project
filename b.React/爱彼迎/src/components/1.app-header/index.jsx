import React, { memo, useRef, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import classNames from "classnames";
import { ThemeProvider } from "styled-components";

import useScrollPosition from "@/hooks/modules/useScrollPosition";

import { HeaderWrapper } from "./style";

import HeaderLeft from "./c-cpns/header-left";
import HeaderCenter from "./c-cpns/header-center";
import HeaderRight from "./c-cpns/header-rigth";

const appHeader = memo(() => {
  const [isSearch, setIsSearch] = useState(false);

  const { AppHeaderConfig } = useSelector(
    (state) => ({
      AppHeaderConfig: state.main.AppHeaderConfig
    }),
    shallowEqual
  );
  const { isFixed, topAlpha } = AppHeaderConfig;

  const headerCenterHandler = () => setIsSearch(true);
  const closeCoverHandler = () => setIsSearch(false);

  // 滚动监听
  const { scrollY } = useScrollPosition();
  const prevScrollY = useRef(0);
  if (!isSearch) prevScrollY.current = scrollY;
  if (isSearch && Math.abs(prevScrollY.current - scrollY) > 30) setIsSearch(false);

  const isAlpha = topAlpha && scrollY === 0;

  return (
    <ThemeProvider theme={{ isAlpha }}>
      <HeaderWrapper className={classNames({ isFixedClass: isFixed })} isSearch={isSearch}>
        <div className="content">
          <div className="top">
            <HeaderLeft></HeaderLeft>
            <HeaderCenter
              isSearch={isAlpha || isSearch}
              headerCenterEvent={headerCenterHandler}
            ></HeaderCenter>
            <HeaderRight></HeaderRight>
          </div>
          <div className="search-area"></div>
        </div>
        {isSearch && <div className="cover" onClick={closeCoverHandler}></div>}
      </HeaderWrapper>
    </ThemeProvider>
  );
});

export default appHeader;
