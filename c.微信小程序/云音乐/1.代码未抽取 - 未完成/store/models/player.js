import { HYEventStore } from "hy-event-store";

const usePlayerStore = new HYEventStore({
  state: {
    playMusicList: [],
    playMusicIndex: 0,
  },
  actions: {},
});

export default usePlayerStore;
