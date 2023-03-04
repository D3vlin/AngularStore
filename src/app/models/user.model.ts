export interface User {
  id: number;
  name: string,
  email: string;
  password: string;
  role: 'customer' | 'admin';
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateUserDTO extends Omit<User, 'id' | 'role'> {}
