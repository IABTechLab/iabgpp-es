import { TcfEuV2 } from "./TcfEuV2.js";
import { TcfCaV1 } from "./TcfCaV1.js";
import { UspV1 } from "./UspV1.js";
import { UsNatV1 } from "./UsNatV1.js";
import { UsCaV1 } from "./UsCaV1.js";
import { UsVaV1 } from "./UsVaV1.js";
import { UsCoV1 } from "./UsCoV1.js";
import { UsUtV1 } from "./UsUtV1.js";
import { UsCtV1 } from "./UsCtV1.js";

export class Sections {
  public static SECTION_ID_NAME_MAP = new Map([
    [TcfEuV2.ID, TcfEuV2.NAME],
    [TcfCaV1.ID, TcfCaV1.NAME],
    [UspV1.ID, UspV1.NAME],
    [UsNatV1.ID, UsNatV1.NAME],
    [UsCaV1.ID, UsCaV1.NAME],
    [UsVaV1.ID, UsVaV1.NAME],
    [UsCoV1.ID, UsCoV1.NAME],
    [UsUtV1.ID, UsUtV1.NAME],
    [UsCtV1.ID, UsCtV1.NAME],
  ]);
  public static SECTION_ORDER = [
    TcfEuV2.NAME,
    TcfCaV1.NAME,
    UspV1.NAME,
    UsNatV1.NAME,
    UsCaV1.NAME,
    UsVaV1.NAME,
    UsCoV1.NAME,
    UsUtV1.NAME,
    UsCtV1.NAME,
  ];
}
