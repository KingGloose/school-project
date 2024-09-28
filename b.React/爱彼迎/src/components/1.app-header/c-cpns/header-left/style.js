import styled from "styled-components";

export const HeaderLeftWrapper = styled.div`
  flex: 1;
  margin-left: 20px;
  color: ${(props) => (props.theme.isAlpha ? "#fff" : props.theme.color.primaryColor)};

  .logoIcon {
    cursor: pointer;
  }
`;
