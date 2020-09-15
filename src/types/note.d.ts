interface INote {
  id: number;
  title: string;
  description: string;
  user_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface NoteUser {
  id?: number;
  username?: string;
  password?: string;
  is_admin?: boolean;
  notes?: INote[];
}
