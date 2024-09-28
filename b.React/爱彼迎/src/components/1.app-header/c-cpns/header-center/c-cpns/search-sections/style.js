import styled from "styled-components";

export const SearchSectionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #aaa;
  border-radius: 50px;
  background-color: ${(props) =>
    props.theme.isAlpha ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)"};

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    height: 50px;
    padding: 10px 20px;

    .info {
      .title {
        font-size: 14px;
        font-weight: 700;
      }
      .desc {
        margin-top: 3px;
      }
    }

    .divider {
      height: 80%;
      border-right: 1px solid #aaa;
      margin-left: 50px;
    }
  }
`;
