export interface Reaction {
  emoji: string;
  count: number;
}

export interface Post {
  id: number;
  emojis: string[];
  userId: string;
  userName: string;
  userIcon: string;
  reactions: Reaction[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  icon: string;
}
