import PropTypes from "prop-types";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

import IconMoreArrow from "@/assets/svg/icon-more-arrow";

import { AreaFooterWrapper } from "./style";

const AreaFooter = memo((props) => {
  const { name } = props;

  let showMessage = "显示全部";
  if (name) showMessage = `查看${name}更多房源`;

  const navigate = useNavigate();
  const areaFooterClickHandler = () => navigate("/entire");

  return (
    <AreaFooterWrapper name={name}>
      <div className="info" onClick={areaFooterClickHandler}>
        <span className="text">{showMessage}</span>
        <IconMoreArrow />
      </div>
    </AreaFooterWrapper>
  );
});

AreaFooter.propTypes = {
  name: PropTypes.string
};

export default AreaFooter;
