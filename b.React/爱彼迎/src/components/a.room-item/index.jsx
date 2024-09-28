import PropTypes from "prop-types";
import React, { memo, useRef, useState } from "react";

import { RoomItemWrapper } from "./style";

import { Carousel } from "antd";
import Rating from "@mui/material/Rating";
import IconArrowLeft from "@/assets/svg/icon-arrow-left";
import IconArrowRight from "@/assets/svg/icon-arrow-right";
import Indicator from "../../base-ui/b.indicator";
import classNames from "classnames";

const RoomItem = memo((props) => {
  const { itemData = {}, itemWidth = "25%", roomItemClick } = props;
  const [selectIndex, setSelectIndex] = useState(0);
  const carouselRef = useRef();

  const carouselSliderHanlder = (event, isNext) => {
    isNext ? carouselRef.current.next() : carouselRef.current.prev();

    const length = itemData.picture_urls.length;
    let newSelectIndex = isNext ? selectIndex + 1 : selectIndex - 1;

    if (newSelectIndex < 0) newSelectIndex = length - 1;
    if (newSelectIndex > length - 1) newSelectIndex = 0;

    setSelectIndex(newSelectIndex);

    event.stopPropagation(); // 阻止事件冒泡
  };

  const roomItemClickHandler = () => {
    if (roomItemClick) roomItemClick(itemData);
  };

  const swiperItem = (
    <div className="swiper">
      <div className="control">
        <div className="btn left" onClick={(e) => carouselSliderHanlder(e, false)}>
          <IconArrowLeft width="30" height="30"></IconArrowLeft>
        </div>
        <div className="btn right" onClick={(e) => carouselSliderHanlder(e, true)}>
          <IconArrowRight width="30" height="30"></IconArrowRight>
        </div>
      </div>
      <div className="indicator">
        <Indicator selectIndex={selectIndex}>
          {itemData.picture_urls?.map((item, index) => {
            return (
              <div className="item" key={index}>
                <span className={classNames("dot", { active: selectIndex === index })}></span>
              </div>
            );
          })}
        </Indicator>
      </div>
      <Carousel dots={false} ref={carouselRef}>
        {itemData.picture_urls?.map((item, index) => {
          return (
            <div className="cover" key={index}>
              <img src={item} alt="图片" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
  const coverItem = (
    <div className="cover">
      <img src={itemData.picture_url} alt="图片" />
    </div>
  );

  return (
    <RoomItemWrapper
      verifyColor={itemData.verify_info.text_color}
      itemWidth={itemWidth}
      onClick={roomItemClickHandler}
    >
      {!!itemData.picture_urls ? swiperItem : coverItem}
      <div className="desc">{itemData.verify_info.messages.join("~")}</div>
      <div className="title">{itemData.name}</div>
      <div className="price">￥{itemData.price}/晚</div>
      <div className="bottom">
        <Rating
          name="half-rating-read"
          precision={0.5}
          value={itemData.reviews_count ?? 5}
          sx={{ fontSize: "14px", color: itemData?.star_rating_color }}
          readOnly
        />
        <span className="count">{itemData.reviews_count}</span>
        {itemData.bottom_info?.content && (
          <span className="extra">·{itemData.bottom_info.content}</span>
        )}
      </div>
    </RoomItemWrapper>
  );
});

RoomItem.propTypes = {
  itemData: PropTypes.object
};

export default RoomItem;
