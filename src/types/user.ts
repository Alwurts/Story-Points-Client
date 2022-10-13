// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface UserDisplay {
  users: User[];
}

export type User = {
  id: string;
  userName: string;
  color: string;
};
