import styled from "styled-components";

export const AreaHeaderWrapper = styled.div`
  color: ${(props) => props.theme.text.secondaryColor};
  margin-top: 80px;
  margin-bottom: 30px;

  .title {
    font-size: 22px;
    font-weight: 700;
  }

  .subtitle {
    font-size: 16px;
    margin-top: 15px;
  }
`;
