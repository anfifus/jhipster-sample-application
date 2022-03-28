import { IUser } from '@/shared/model/user.model';
import { IVideo } from '@/shared/model/video.model';

export interface IRating {
  id?: number;
  puntuation?: number | null;
  date?: Date | null;
  user?: IUser | null;
  video?: IVideo | null;
}

export class Rating implements IRating {
  constructor(
    public id?: number,
    public puntuation?: number | null,
    public date?: Date | null,
    public user?: IUser | null,
    public video?: IVideo | null
  ) {}
}
