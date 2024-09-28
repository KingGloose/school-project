import PropTypes from "prop-types";
import React, { memo } from "react";

import RoomItem from "../a.room-item";

import { AreaRoomWrapper } from "./style";

const index = memo((props) => {
  const { itemData, roomWidth } = props;

  return (
    <AreaRoomWrapper>
      {itemData?.slice(0, 8).map((item) => {
        return <RoomItem itemData={item} key={item.id} itemWidth={roomWidth}></RoomItem>;
      })}
    </AreaRoomWrapper>
  );
});

index.propTypes = {
  itemData: PropTypes.array,
  roomWidth: PropTypes.string
};

export default index;
