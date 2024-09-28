import React, { memo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { DetailPicturesWrapper } from "./style";

import PictureBrowser from "@/base-ui/c.picture-browser";

const DetailPictures = memo((props) => {
  const [showPBrowser, setShowPBrowser] = useState(false);

  const { detailInfo } = useSelector(
    (state) => ({
      detailInfo: state.detail.detailInfo
    }),
    shallowEqual
  );

  const showPictureBrowserHandler = () => {
    const newShowPBrowser = !showPBrowser;
    setShowPBrowser(newShowPBrowser);
  };

  const closePBrowserHandler = (flag) => setShowPBrowser(flag);

  return (
    <DetailPicturesWrapper>
      <div className="pictures">
        <div className="left">
          <div className="item">
            <img src={detailInfo.picture_urls?.[0]} alt="" />
            <div className="cover"></div>
          </div>
        </div>
        <div className="right">
          {detailInfo.picture_urls?.slice(1, 5).map((item, index) => {
            return (
              <div className="item" key={index}>
                <img src={item} alt="" />
                <div className="cover"></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="show-btn" onClick={showPictureBrowserHandler}>
        显示照片
      </div>

      {showPBrowser && (
        <PictureBrowser
          pictureUrls={detailInfo.picture_urls}
          closePBrowserEvent={closePBrowserHandler}
        ></PictureBrowser>
      )}
    </DetailPicturesWrapper>
  );
});

export default DetailPictures;
