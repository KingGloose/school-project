import React, { memo } from "react";

import { DetailInfosWrapper } from "./style";

const detailInfos = memo((props) => {
  return (
    <DetailInfosWrapper>
      <div>detailInfos</div>
    </DetailInfosWrapper>
  );
});

detailInfos.propTypes = {};

export default detailInfos;
