export interface IEDeskHeaderAPI {
  HeaderMin: () => void;
  HeaderMax: () => void;
  HeaderClose: () => void;
}

export interface IDeskMainAPI {
  DownloadImage: (downloadImage: string, upload_img: string) => string;
  getMacV2: () => string;
}

declare global {
  interface Window {
    DeskTopHeader: IEDeskHeaderAPI;
    DeskMainAPI: IDeskMainAPI;
  }
}
