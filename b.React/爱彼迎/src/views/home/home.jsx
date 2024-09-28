import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { fetchHomeDataAction } from "@/store/modules/home";
import { changeAppHeaderConfigAction } from "@/store/modules/main";

import { isObjectEmpty } from "@/utils/index";
import { HomeWrapper } from "./style";

import HomeBanner from "./c-cpns/home-banner";
import HomeLongfor from "./c-cpns/home-longfor";
import HomeSectionV1 from "./c-cpns/home-section-v1";
import HomeSectionV2 from "./c-cpns/home-section-v2";
import HomeSectionV3 from "./c-cpns/home-section-v3";

const home = memo(() => {
  const { homeGoodScore, homeHighScore, homeDiscount, homeRecommend, homeLongfor, homePlus } =
    useSelector(
      (state) => ({
        homeGoodScore: state.home.homeGoodScore,
        homeHighScore: state.home.homeHighScore,
        homeDiscount: state.home.homeDiscount,
        homeRecommend: state.home.homeRecommend,
        homeLongfor: state.home.homeLongfor,
        homePlus: state.home.homePlus
      }),
      shallowEqual
    );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHomeDataAction());
    dispatch(changeAppHeaderConfigAction({ isFixed: true, topAlpha: true }));
  }, [dispatch]);

  return (
    <HomeWrapper>
      <HomeBanner></HomeBanner>
      <div className="content">
        {isObjectEmpty(homeDiscount) && <HomeSectionV2 itemData={homeDiscount}></HomeSectionV2>}
        {isObjectEmpty(homeRecommend) && <HomeSectionV2 itemData={homeRecommend}></HomeSectionV2>}
        {isObjectEmpty(homeLongfor) && <HomeLongfor itemData={homeLongfor}></HomeLongfor>}
        {isObjectEmpty(homeGoodScore) && <HomeSectionV1 itemData={homeGoodScore}></HomeSectionV1>}
        {isObjectEmpty(homeHighScore) && <HomeSectionV1 itemData={homeHighScore}></HomeSectionV1>}
        {isObjectEmpty(homePlus) && <HomeSectionV3 itemData={homePlus}></HomeSectionV3>}
      </div>
    </HomeWrapper>
  );
});

export default home;
