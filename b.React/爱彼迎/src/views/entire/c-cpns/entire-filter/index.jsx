import React, { memo, useState } from "react";
import classNames from "classnames";

import { EntireFilterWrapper } from "./style";

import filterData from "@/assets/data/filter_data.json";

const index = memo((props) => {
  const [selectFilter, setSelectFilter] = useState([]);

  const filterTabClick = (item) => {
    const newSelectFilter = [...selectFilter];

    const filterSelectIndex = () => newSelectFilter.findIndex((element) => element === item);

    newSelectFilter.includes(item)
      ? newSelectFilter.splice(filterSelectIndex(), 1)
      : newSelectFilter.push(item);

    setSelectFilter(newSelectFilter);
  };

  return (
    <EntireFilterWrapper>
      <div className="filter">
        {filterData.map((item, index) => {
          return (
            <div
              className={classNames("item", { active: selectFilter.includes(item) })}
              key={index}
              onClick={() => filterTabClick(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
    </EntireFilterWrapper>
  );
});

export default index;
