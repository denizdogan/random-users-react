export interface User {
  picture: { thumbnail: string; medium: string; large: string };
  name: { title: string; first: string; last: string };
  phone: string;
  email: string;
  dob: { age: number; date: string };
  gender: string;
}
