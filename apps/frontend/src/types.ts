export interface User {
  id: string;
  email: string;
}

export interface Weight {
  id: string;
  user_id: string;
  date: string;
  weight: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
