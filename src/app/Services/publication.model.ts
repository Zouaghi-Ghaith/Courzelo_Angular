export interface Publication {
  idPublication: number;
  title: string;
  description: string;
  body: string;
  tags: string;
  comments: Comment[];
  upvoteCount: number; // Attribute to store upvote count
  downvoteCount: number; // Attribute to store downvote count
  votes: any[];
  voteCount: number;
}
