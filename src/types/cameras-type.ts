export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
};

export type Cameras = Camera[];

export type FetchCamerasPayloadType = {
  pageId: number;
  paramsSort: {
    _sort: string | null;
    _order: string | null;
    category: string[];
    type: string[];
    level: string[];
    minPrice: string | null;
    maxPrice: string | null;
  };
};
