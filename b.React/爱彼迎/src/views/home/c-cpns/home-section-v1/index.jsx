import PropTypes from "prop-types";
import React, { memo } from "react";

import { HomeSectionV1Wrapper } from "./style";

import AreaHeader from "@/components/2.area-header";
import AreaRoom from "@/components/2.area-room";
import AreaFooter from "@/components/2.area-footer";

const index = memo((props) => {
  const { itemData } = props;

  return (
    <HomeSectionV1Wrapper>
      <AreaHeader title={itemData.title} subtitle={itemData.subtitle}></AreaHeader>
      <AreaRoom itemData={itemData.list}></AreaRoom>
      <AreaFooter></AreaFooter>
    </HomeSectionV1Wrapper>
  );
});

index.propTypes = {
  itemData: PropTypes.object
};

export default index;
