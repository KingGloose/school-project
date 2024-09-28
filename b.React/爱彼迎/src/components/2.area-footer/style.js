import styled from "styled-components";

export const AreaFooterWrapper = styled.div`
  display: flex;
  margin-top: 10px;

  .info {
    display: flex;
    align-items: center;
    cursor: pointer;

    font-size: 17px;
    font-weight: 700;
    color: ${(props) => (props.name ? props.theme.color.secondaryColor : "#000")};

    &:hover {
      text-decoration: underline;
    }

    .text {
      margin-right: 6px;
    }
  }
`;
