import PropTypes from "prop-types";
import React, { memo } from "react";

import { HomeSectionV3Wrapper } from "./style";
import AreaHeader from "@/components/2.area-header";
import RoomItem from "@/components/a.room-item";
import ScrollView from "@/base-ui/a.scroll-view";

const index = memo((props) => {
  const { itemData } = props;

  return (
    <HomeSectionV3Wrapper>
      <AreaHeader title={itemData.title} subtitle={itemData.subtitle}></AreaHeader>
      <div className="content">
        <ScrollView>
          {itemData.list.map((item, index) => {
            return <RoomItem itemData={item} key={index} itemWidth={"20%"}></RoomItem>;
          })}
        </ScrollView>
      </div>
    </HomeSectionV3Wrapper>
  );
});

index.propTypes = {
  itemData: PropTypes.object
};

export default index;
