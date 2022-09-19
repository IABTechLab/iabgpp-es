import { CommandCallback } from "./command/CommandCallback.js";

export interface CustomCommands {
  [commandName: string]: (callback: CommandCallback, param?: any) => void;
}
