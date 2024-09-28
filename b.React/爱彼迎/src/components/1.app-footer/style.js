import styled from "styled-components";

export const AppFooterWrapper = styled.div`
  border-top: 1px solid #ebebeb;
  width: 1080px;
  margin: 0 auto;
  margin-top: 100px;
  box-sizing: border-box;
  padding: 48px 24px;

  .service {
    display: flex;

    .item {
      flex: 1;
      text-align: center;

      .title {
        margin-bottom: 16px;
        font-weight: 700;
      }

      .list {
        .iten {
          display: block;
          margin-top: 15px;
          color: #767676;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .statement {
    margin-top: 30px;
    border-top: 1px solid #ebebeb;
    padding: 20px;
    color: #767676;
    text-align: center;
  }
`;
