export interface UpdateUserCredentialsRequestDTO {
  username: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
