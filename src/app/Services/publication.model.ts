export interface Publication {

  idPublication: number;
  title: string;
  description: string;
  body: string;
  tags: string;
  comments: Comment[];
  upvoteCount: number;
  downvoteCount: number;
  votes: any[];
  voteCount: number;
  netScore;
  commentCount:number;

}
