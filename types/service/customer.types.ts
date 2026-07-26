export interface UserResponse {
  status: boolean;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  image: string | null;
  otp: string | null;
  otp_expires_at: string | null;
  email_verify: number;
  phone: string;
  status: string | null;
  created_at: string;
  updated_at: string;
  wallet_points: string;
  credit_limit: string;
  used_limit: string;
  is_credit_enabled: number;
}