export type SignUpFormData = {
  email: string;
  password: string;
  name: string;
};

export type SignInFormData = {
  email: string;
  password: string;
};

export type PasswordResetFormData = {
  email: string;
};

export type Area = {
  id: string;
  area: string;
  area_romaji: string;
  visitedShops: number;
  totalShops: number;
};

export type SubArea = {
  id: string;
  name: string;
  sub_area_romaji: string;
  totalShops: number;
  visitedShops: number;
};

export type Shop = {
  id: number;
  name: string;
  address: string;
  visited: boolean;
};

export type Visit = {
  id: number;
  shop_id: number;
  user_id: number;
  visit_date: string;
  comment: string | null;
};

export type UserStateType = {
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
