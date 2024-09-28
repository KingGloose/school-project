import PropTypes from "prop-types";
import classNames from "classnames";
import React, { memo, useState } from "react";

import { AreaTabsWrapper } from "./style";

import ScrollView from "@/base-ui/a.scroll-view";

const AreaTabs = memo((props) => {
  const { tabNames = [], tabClickEvent } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const areaTabsClick = (item, index) => {
    setCurrentIndex(index);
    tabClickEvent(item, index);
  };

  return (
    <AreaTabsWrapper>
      <ScrollView>
        {tabNames?.map((item, index) => {
          return (
            <div
              key={index}
              className={classNames("item", { active: index === currentIndex })}
              onClick={() => areaTabsClick(item, index)}
            >
              {item}
            </div>
          );
        })}
      </ScrollView>
    </AreaTabsWrapper>
  );
});

AreaTabs.propTypes = {
  tabNames: PropTypes.array
};

export default AreaTabs;
