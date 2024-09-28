import React, { memo, useState } from "react";
import { CSSTransition } from "react-transition-group";

import SearchTitles from "@/assets/data/search_titles.json";

import { HeaderCenterWrapper } from "./style";

import IconSearchBar from "@/assets/svg/icon-search-bar";
import SearchTabs from "./c-cpns/search-tabs";
import SearchSections from "./c-cpns/search-sections";

const HeaderCenter = memo((props) => {
  const { isSearch, headerCenterEvent } = props;
  const [selectIndex, setSelectIndex] = useState(0);

  const titles = SearchTitles.map((item) => item.title);
  const searchInfos = SearchTitles.map((item) => item.searchInfos);
  const searchTabsClickEvent = (index) => setSelectIndex(index);
  const headerCenterHandler = () => {
    if (headerCenterEvent) headerCenterEvent();
  };

  return (
    <HeaderCenterWrapper>
      <CSSTransition in={!isSearch} classNames="bar" timeout={250} unmountOnExit={true}>
        <div className="searchBar" onClick={headerCenterHandler}>
          <div className="text">搜索房源和体验</div>
          <div className="icon">
            <IconSearchBar></IconSearchBar>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition in={isSearch} classNames="detail" timeout={250} unmountOnExit={true}>
        <div className="search-detail">
          <SearchTabs titles={titles} searchTabsClickEvent={searchTabsClickEvent}></SearchTabs>
          <div className="infos">
            <SearchSections searchInfos={searchInfos[selectIndex]}></SearchSections>
          </div>
        </div>
      </CSSTransition>
    </HeaderCenterWrapper>
  );
});

export default HeaderCenter;
