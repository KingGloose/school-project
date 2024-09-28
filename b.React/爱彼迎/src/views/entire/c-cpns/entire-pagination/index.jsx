import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRoomListAction } from "@/store/modules/entire/index";

import { EntirePaginationWrapper } from "./style";

import Pagination from "@mui/material/Pagination";

const index = memo((props) => {
  const { totalCount, currentPage, size, roomList } = useSelector((state) => ({
    totalCount: state.entire.totalCount,
    currentPage: state.entire.currentPage,
    size: state.entire.size,
    roomList: state.entire.roomList
  }));

  const startCount = currentPage * size + 1;
  const endCount = (currentPage + 1) * size;
  const totalPage = Math.ceil(totalCount / size);

  const dispath = useDispatch();
  const pageChangeHandler = (event, page) => {
    window.scrollTo(0, 0);
    dispath(fetchRoomListAction(page - 1));
  };

  return (
    <EntirePaginationWrapper>
      {!!roomList.length && (
        <div className="info">
          <Pagination count={totalPage} onChange={pageChangeHandler} />
          <div className="desc">
            第{startCount} - {endCount}个房源，共超过{totalCount}个
          </div>
        </div>
      )}
    </EntirePaginationWrapper>
  );
});

export default index;
