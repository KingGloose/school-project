import PropTypes from "prop-types";
import React, { memo } from "react";

import { AreaHeaderWrapper } from "./style";

const AreaHeader = memo((props) => {
  const { title, subtitle } = props;

  return (
    <AreaHeaderWrapper>
      <h2 className="title">{title}</h2>
      {subtitle && <div className="subtitle">{subtitle}</div>}
    </AreaHeaderWrapper>
  );
});

AreaHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default AreaHeader;
