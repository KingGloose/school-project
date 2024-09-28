import styled from "styled-components";

export const EntirePaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;

    .desc {
      margin-top: 30px;
    }

    .MuiPaginationItem-root {
      &.Mui-selected {
        background-color: #222;
        color: #fff;
      }

      &.Mui-selected:hover {
        text-decoration: underline;
        background-color: #222;
      }

      svg {
        font-size: 30px;
      }
    }
  }
`;
