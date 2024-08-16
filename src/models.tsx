export interface User{
  username: string;
  image: {
    png: string,
    webp: string,
  },
  }
  
export type CommentData = {
  id: number,
  content: string,
  createdAt: string,
  score: number,
  user: User,
  replies: Array<ReplyData>,
}

export type ReplyData = {
  id: number,
  content: string,
  createdAt: string,
  score: number,
  replyingTo: string,
  user: User,
}
  
export interface QueryData{
  currentUser:{
    image: {
      png: string,
      webp: string,
    },
    username: string,
  },
  comments: Array<CommentData>,
}