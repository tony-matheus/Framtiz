export type User = {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  is_admin: boolean;
};

export type SignUpData = {
  email: string;
  password: string;
  username: string;
  full_name?: string;
};

export type SignInData = {
  email: string;
  password: string;
};
