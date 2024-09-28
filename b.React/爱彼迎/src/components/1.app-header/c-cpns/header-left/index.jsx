import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

import IconLogo from "@/assets/svg/icon_logo";

import { HeaderLeftWrapper } from "./style";

const HeaderLeft = memo(() => {
  const navigate = useNavigate();
  const logoClick = () => navigate("/home");

  return (
    <HeaderLeftWrapper>
      <div className="logoIcon" onClick={logoClick}>
        <IconLogo></IconLogo>
      </div>
    </HeaderLeftWrapper>
  );
});

export default HeaderLeft;
