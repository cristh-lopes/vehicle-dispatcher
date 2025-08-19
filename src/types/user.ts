export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  phoneValidated: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
