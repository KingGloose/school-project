import styled from "styled-components";

export const HeaderCenterWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 48px;

  .searchBar {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 48px;
    padding: 0px 8px;
    border: 1px solid #ddd;
    border-radius: 24px;
    cursor: pointer;

    ${(props) => props.theme.mixin.hoverBoxShadow}

    .text {
      padding: 0 16px;
      color: ${(props) => props.theme.text.secondaryColor};
      font-weight: 600;
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: #fff;
      background-color: ${(props) => props.theme.color.primaryColor};
    }
  }

  .search-detail {
    position: relative;
    transform-origin: 50% 0;
    will-change: transform, opacity;

    .infos {
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .detail-exit {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  .detail-exit-active {
    transition: all 250ms ease;
    transform: scale(0.35, 0.727273) translateY(-58px);
    opacity: 0;
  }
  .detail-enter {
    transform: scale(0.35, 0.727273) translateY(-58px);
    opacity: 0;
  }
  .detail-enter-active {
    transition: all 250ms ease;
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  .bar-enter {
    transform: scale(2.85714, 1.375) translateY(58px);
    opacity: 0;
  }
  .bar-enter-active {
    transition: all 250ms ease;
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  .bar-exit {
    opacity: 0;
  }
`;
