import styled from "styled-components";

export const EntireFilterWrapper = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 19;

  display: flex;
  align-items: center;
  height: 48px;
  padding-left: 16px;
  border-bottom: 1px solid #f2f2f2;
  background-color: #fff;

  .filter {
    display: flex;

    .item {
      margin: 0 4px 0 8px;
      padding: 6px 12px;
      border: 1px solid #dce0e0;
      border-radius: 4px;
      color: ${(props) => props.theme.text.primaryColor};
      cursor: pointer;

      &.active {
        background: ${(props) => props.theme.color.secondaryColor};
        border: 1px solid ${(props) => props.theme.color.secondaryColor};
        color: #ffffff;
      }
    }
  }
`;
