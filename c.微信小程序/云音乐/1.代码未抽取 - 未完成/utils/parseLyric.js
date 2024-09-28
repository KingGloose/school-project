const lyricTimeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

const parseTime = (item) => {
  const result = lyricTimeReg.exec(item);
  if (!result) return;

  const minute = result[1] * 60 * 1000;
  const second = result[2] * 1000;
  const msecond = result[3].length === 2 ? result[3] * 10 : result[3] * 1;

  return minute + second + msecond;
};

const parseText = (item) => item?.replace(lyricTimeReg, "");

const parseLyric = (lyric) => {
  const lyricArr = lyric.split("\n");
  const lyricInfo = [];

  for (const item of lyricArr) {
    const time = parseTime(item);
    const text = parseText(item);

    lyricInfo.push({ time, text });
  }

  return lyricInfo;
};

export { parseLyric };
