import { AuthProvider } from './auth-provider.enum';

export interface MyAccountResponseDTO {
  id: string;
  username: string;
  fullName: string;
  email: string | null;
  icon: string | null;
  provider: AuthProvider;
  createdAt: Date | null;
  updatedAt: Date | null;
}
