import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { EntireRoomWrapper } from "./style";

import RoomItem from "@/components/a.room-item";

import { changeDetailInfoAction } from "@/store/modules/detail";

const index = memo((props) => {
  const { roomList, totalCount, isLoading } = useSelector((state) => ({
    roomList: state.entire.roomList,
    totalCount: state.entire.totalCount,
    isLoading: state.entire.isLoading
  }));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roomItemClickHandler = useCallback(
    (itemData) => {
      dispatch(changeDetailInfoAction(itemData));
      navigate("/detail");
    },
    [navigate, dispatch]
  );

  return (
    <EntireRoomWrapper>
      <h2 className="count">共{totalCount}处住所</h2>
      <div className="content">
        {roomList.map((item, index) => {
          return (
            <RoomItem
              itemData={item}
              itemWidth={"20%"}
              key={index}
              roomItemClick={roomItemClickHandler}
            ></RoomItem>
          );
        })}
      </div>

      {isLoading && <div className="cover"></div>}
    </EntireRoomWrapper>
  );
});

export default index;
