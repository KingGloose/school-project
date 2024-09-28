import React, { memo } from "react";

import { NotFoundWrapper } from "./style";

const notfound = memo(() => {
  return (
    <NotFoundWrapper>
      <h2>notfound</h2>
    </NotFoundWrapper>
  );
});

export default notfound;
