import styled from "styled-components";

export const EntireRoomWrapper = styled.div`
  position: relative;
  padding: 30px 20px;
  margin-top: 128px;

  .count {
    margin: 0 0 10px 8px;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
  }

  > .cover {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
