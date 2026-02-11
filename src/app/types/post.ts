export type Post = {
  id: string;
  communityId: number;
  title: string;
  body: string;
};

export type PostDTO = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
export type CreatePostInput = {
  communityId: number;
  title: string;
  body: string;
};
