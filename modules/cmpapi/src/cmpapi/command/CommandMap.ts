import { PingCommand } from "./PingCommand.js";
import { GetFieldCommand } from "./GetFieldCommand.js";
import { GetSectionCommand } from "./GetSectionCommand.js";
import { HasSectionCommand } from "./HasSectionCommand.js";
import { GppCommand } from "./GppCommand.js";
import { AddEventListenerCommand } from "./AddEventListenerCommand.js";
import { RemoveEventListenerCommand } from "./RemoveEventListenerCommand.js";

export class CommandMap {
  public static [GppCommand.ADD_EVENT_LISTENER]: typeof AddEventListenerCommand = AddEventListenerCommand;
  public static [GppCommand.GET_FIELD]: typeof GetFieldCommand = GetFieldCommand;
  public static [GppCommand.GET_SECTION]: typeof GetSectionCommand = GetSectionCommand;
  public static [GppCommand.HAS_SECTION]: typeof HasSectionCommand = HasSectionCommand;
  public static [GppCommand.PING]: typeof PingCommand = PingCommand;
  public static [GppCommand.REMOVE_EVENT_LISTENER]: typeof RemoveEventListenerCommand = RemoveEventListenerCommand;
}
