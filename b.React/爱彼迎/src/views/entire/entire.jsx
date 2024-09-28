import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchRoomListAction } from "@/store/modules/entire/index";
import { changeAppHeaderConfigAction } from "@/store/modules/main";

import { EntireWrapper } from "./style";

import EntireFilter from "./c-cpns/entire-filter/index";
import EntireRoom from "./c-cpns/entire-room/index";
import EntirePagination from "./c-cpns/entire-pagination/index";

const entire = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomListAction());
    dispatch(changeAppHeaderConfigAction({ isFixed: true, topAlpha: false }));
  }, [dispatch]);

  return (
    <EntireWrapper>
      <EntireFilter></EntireFilter>
      <EntireRoom></EntireRoom>
      <EntirePagination></EntirePagination>
    </EntireWrapper>
  );
});

export default entire;
