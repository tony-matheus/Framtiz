export type User = {
  id: string;
  email: string;
  username?: string;
  fullName?: string;
  avatarUrl?: string;
  isAdmin: boolean;
  githubUsername?: string;
  profileId: number;
};

export type SignUpData = {
  email: string;
  password: string;
  username: string;
  fullName?: string;
};

export type SignInData = {
  email: string;
  password: string;
};
