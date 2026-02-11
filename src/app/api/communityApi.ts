export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export const fetchCommunityPosts = async (
  communityId: number,
): Promise<Post[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const allPosts: Post[] = await res.json();

  // simulate community → user mapping
  return allPosts.filter(post => post.userId === communityId);
};
