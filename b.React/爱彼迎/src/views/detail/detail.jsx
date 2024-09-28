import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";

import { changeAppHeaderConfigAction } from "@/store/modules/main";

import { DetailWrapper } from "./styls";

import DetailPictures from "./c-cpns/detail-pictures";
import DetailInfos from "./c-cpns/detail-infos";

const detail = memo(() => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeAppHeaderConfigAction({ isFixed: false, topAlpha: false }));
  }, [dispatch]);

  return (
    <DetailWrapper>
      <DetailPictures></DetailPictures>
      <DetailInfos></DetailInfos>
    </DetailWrapper>
  );
});

export default detail;
