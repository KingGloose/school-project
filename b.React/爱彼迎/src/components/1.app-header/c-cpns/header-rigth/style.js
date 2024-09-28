import styled from "styled-components";

export const HeaderRightWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${(props) => props.theme.text.primaryColor};
  font-weight: 600;
  margin-right: 20px;

  .btns {
    display: flex;
    margin-right: 15px;
    color: ${(props) => (props.theme.isAlpha ? "#fff" : props.theme.text.primaryColor)};

    .btn {
      height: 18px;
      line-height: 18px;
      padding: 12px 15px;
      cursor: pointer;
      border-radius: 22px;

      ${(props) =>
        props.theme.isAlpha
          ? props.theme.mixin.hoverBackgroudAlphaColor
          : props.theme.mixin.hoverBoxShadow}
    }
  }

  .menus {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 77px;
    height: 42px;
    border: 1px solid #ccc;
    border-radius: 25px;
    background-color: #fff;
    cursor: pointer;

    ${(props) => props.theme.mixin.hoverBoxShadow}
  }

  .panel {
    position: absolute;
    right: 10px;
    top: 62px;
    z-index: 99;
    width: 240px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    color: #666;

    .panel__top,
    .panel__bottom {
      padding: 10px 0;

      .item {
        height: 40px;
        line-height: 40px;
        padding: 0px 16px;
        margin: 0 10px;
        border-radius: 10px;

        ${(props) => props.theme.mixin.hoverBackgroudColor}
      }
    }

    .top {
      border-bottom: 1px solid #ddd;
    }
  }
`;
