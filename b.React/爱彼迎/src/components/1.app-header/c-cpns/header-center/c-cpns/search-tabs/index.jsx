import classNames from "classnames";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";

import { SearchTabsWrapper } from "./style";

const SearchTabs = memo((props) => {
  const { titles, searchTabsClickEvent } = props;
  const [selectIndex, setSelectIndex] = useState(0);

  const searchTabsHandler = (index) => {
    if (searchTabsClickEvent) searchTabsClickEvent(index);
    setSelectIndex(index);
  };

  return (
    <SearchTabsWrapper>
      {titles.map((item, index) => {
        return (
          <div className="item" key={index} onClick={() => searchTabsHandler(index)}>
            <div className="text">{item}</div>
            <div className={classNames("bottom", { active: selectIndex === index })}></div>
          </div>
        );
      })}
    </SearchTabsWrapper>
  );
});

SearchTabs.propTypes = {
  titles: PropTypes.array
};

export default SearchTabs;
