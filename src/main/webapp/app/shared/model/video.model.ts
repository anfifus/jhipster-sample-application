import { IUser } from '@/shared/model/user.model';

export interface IVideo {
  id?: number;
  url?: string | null;
  description?: string | null;
  title?: string | null;
  videoSize?: number | null;
  user?: IUser | null;
}

export class Video implements IVideo {
  constructor(
    public id?: number,
    public url?: string | null,
    public description?: string | null,
    public title?: string | null,
    public videoSize?: number | null,
    public user?: IUser | null
  ) {}
}
