import { User } from "./user";

export interface Room {
  id: string;
  topic: string;
  state: "waiting" | "voting";
  moderator: User | null;
  activeUsers: User[];
  votingSessionUsers: { [key: string]: User };
  votingSessionVotes: { [key: string]: string };
}
