import PropTypes from "prop-types";
import React, { memo } from "react";
import styleStrToObject from "./utils";

const icon_close = memo((props) => {
  const { width = 12, height = 12 } = props;

  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="false"
      aria-label="关闭"
      focusable="false"
      style={styleStrToObject(
        `height: ${height}px; width: ${width}px; display: block; fill: rgb(255, 255, 255);`
      )}
    >
      <path
        d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22"
        fillRule="evenodd"
      ></path>
    </svg>
  );
});

icon_close.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
};

export default icon_close;
