import PropTypes from "prop-types";
import React, { memo, useState, useCallback } from "react";

import { HomeSectionV2Wrapper } from "./style";

import AreaHeader from "@/components/2.area-header";
import AreaRoom from "@/components/2.area-room";
import AreaTabs from "@/components/2.area-tabs";
import AreaFooter from "@/components/2.area-footer";

const HomeSectionV2 = memo((props) => {
  const { itemData = {} } = props;

  const initalName = Object.keys(itemData.dest_list)[0];
  const [name, setName] = useState(initalName);

  const tabNames = itemData.dest_address?.map((item) => item.name);

  const tabClickEventHandler = useCallback((name, index) => {
    setName(name);
  }, []);

  return (
    <HomeSectionV2Wrapper>
      <AreaHeader title={itemData.title} subtitle={itemData.subtitle}></AreaHeader>
      <AreaTabs tabNames={tabNames} tabClickEvent={tabClickEventHandler}></AreaTabs>
      <AreaRoom itemData={itemData.dest_list?.[name]} roomWidth="33.33%"></AreaRoom>
      <AreaFooter name={name}></AreaFooter>
    </HomeSectionV2Wrapper>
  );
});

HomeSectionV2.propTypes = {
  itemData: PropTypes.object
};

export default HomeSectionV2;
