import styled from "styled-components";

export const SearchTabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${(props) => (props.theme.isAlpha ? "#fff" : "#222")};

  .item {
    padding: 0 20px;

    .bottom {
      margin-top: 5px;

      &.active {
        border-bottom: 2px solid ${(props) => (props.theme.isAlpha ? "#fff" : "#333")};
      }
    }
  }
`;
