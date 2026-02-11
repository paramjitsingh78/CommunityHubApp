export type Post = {
  id: string;
  communityId: string;
  title: string;
  body: string;
};

export type PostDTO = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
