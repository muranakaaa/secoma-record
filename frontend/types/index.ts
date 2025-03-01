export type SignUpFormData = {
  email: string;
  password: string;
  name: string;
};

export type SignInFormData = {
  email: string;
  password: string;
};

export type Area = {
  id: string;
  area: string;
  area_romaji: string;
  totalShops: number;
};

export type SubArea = {
  id: string;
  name: string;
  sub_area_romaji: string;
  totalShops: number;
};

export type Shop = {
  id: number;
  name: string;
  address: string;
};

export type Visit = {
  id: number;
  shop_id: number;
  user_id: number;
  visit_date: string;
  comment: string | null;
};

export type UserStateType = {
  client: string;
  accessToken: string;
  id: number;
  name: string;
  email: string;
  isSignedIn: boolean;
  isFetched: boolean;
};

export type SnackbarStateType = {
  message: null | string;
  severity: null | "success" | "error";
  pathname: null | string;
};

export interface BreadcrumbContextType {
  area?: string;
  areaName?: string;
  subArea?: string;
  subAreaName?: string;
  shopName?: string;
}
