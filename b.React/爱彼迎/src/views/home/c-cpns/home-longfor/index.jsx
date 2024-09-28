import PropTypes from "prop-types";
import React, { memo } from "react";

import { HomeLongforWrapper } from "./style";

import AreaHeader from "@/components/2.area-header";
import LongforItem from "@/components/b.longfor-item";
import ScrollView from "@/base-ui/a.scroll-view";

const HomeLongfor = memo((props) => {
  const { itemData } = props;

  return (
    <HomeLongforWrapper>
      <AreaHeader title={itemData.title} subtitle={itemData.subtitle}></AreaHeader>
      <div className="longfor-list">
        <ScrollView>
          {itemData.list.map((item, index) => {
            return <LongforItem itemData={item} key={index}></LongforItem>;
          })}
        </ScrollView>
      </div>
    </HomeLongforWrapper>
  );
});

HomeLongfor.propTypes = {
  itemData: PropTypes.object
};

export default HomeLongfor;
