const theme = {
  color: {
    primaryColor: "#ff385c",
    secondaryColor: "#00848A"
  },
  text: {
    primaryColor: "#484848",
    secondaryColor: "#222222"
  },
  mixin: {
    hoverBoxShadow: `
      transition: box-shadow 0.2s ease;
      &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
      }
    `,
    hoverBackgroudColor: `
      &:hover {
        background-color: #f5f5f5;
      }
    `,
    hoverBackgroudAlphaColor: `
      &:hover {
        background-color: #f5f5f5;
        opacity: 0.1;
      }
    `
  }
};

export default theme;
