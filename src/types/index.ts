export enum Gender {
  male = 'male',
  female = 'female',
}

declare global {
  namespace Express {
    interface Request {
        id: string;
    }
  }
}


