import styled from "styled-components";

export const HeaderWrapper = styled.div`
  &.isFixedClass {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
  }

  .content {
    background-color: ${(props) =>
      props.theme.isAlpha ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)"};
    position: relative;
    z-index: 100;
    border-bottom: 1px solid #eee;
    border-bottom-color: ${(props) =>
      props.theme.isAlpha ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)"};
    transition: all 200ms ease;

    .top {
      display: flex;
      align-items: center;
      height: 80px;
    }
    .search-area {
      height: ${(props) => (props.isSearch ? "100px" : "0px")};
      transition: height 250ms ease;
    }
  }

  .cover {
    position: fixed;
    z-index: 99;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
