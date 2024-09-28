import React, { memo } from "react";

import { AppFooterWrapper } from "@/components/1.app-footer/style";

import footerData from "@/assets/data/footer_data.json";

const appFooter = memo(() => {
  return (
    <AppFooterWrapper>
      <div className="service">
        {footerData.map((item) => {
          return (
            <div className="item" key={item.title}>
              <div className="title">{item.title}</div>
              <div className="list">
                {item.list.map((iten) => {
                  return (
                    <a className="iten" href={iten.url} key={iten.name}>
                      {iten.name}
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="statement">
        © 2022 Airbnb, Inc. All rights reserved.条款 · 隐私政策 · 网站地图 · 全国旅游投诉渠道 12301
      </div>
    </AppFooterWrapper>
  );
});

export default appFooter;
