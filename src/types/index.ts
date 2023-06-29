import { Admin } from 'src/entities/admin.entity';
import { Assistant } from 'src/entities/assistant.entity';

export enum Gender {
  male = 'male',
  female = 'female',
}

export enum Roles {
  ADMIN = 'admin',
  ASSISTANT = 'assistant',
}

declare global {
  namespace Express {
    interface Request {
      id: string;
      admin: boolean;
      assistant: boolean;
    }
  }
}

export enum TokenRole {
  admin = 'admin',
  assistant = 'assistant',
}

export interface AdminTokenType {
  name: string;
  password: string;
  role: TokenRole;
}

export interface AssistantTokenType {
  username: string;
  password: string;
  number: string;
  role: TokenRole;
}
