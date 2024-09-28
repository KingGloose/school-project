export const querySelectorElement = (selector) => {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.exec((res) => {
      resolve(res[0].height);
    });
  });
};
