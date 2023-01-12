import { TcfEuV2 } from "./TcfEuV2.js";
import { TcfCaV1 } from "./TcfCaV1.js";
import { UspV1 } from "./UspV1.js";
import { UspNatV1 } from "./UspNatV1.js";
import { UspCaV1 } from "./UspCaV1.js";
import { UspVaV1 } from "./UspVaV1.js";
import { UspCoV1 } from "./UspCoV1.js";
import { UspUtV1 } from "./UspUtV1.js";
import { UspCtV1 } from "./UspCtV1.js";

export class Sections {
  public static SECTION_ID_NAME_MAP = new Map([
    [TcfEuV2.ID, TcfEuV2.NAME],
    [TcfCaV1.ID, TcfCaV1.NAME],
    [UspV1.ID, UspV1.NAME],
    [UspNatV1.ID, UspNatV1.NAME],
    [UspCaV1.ID, UspCaV1.NAME],
    [UspVaV1.ID, UspVaV1.NAME],
    [UspCoV1.ID, UspCoV1.NAME],
    [UspUtV1.ID, UspUtV1.NAME],
    [UspCtV1.ID, UspCtV1.NAME],
  ]);
  public static SECTION_ORDER = [
    TcfEuV2.NAME,
    TcfCaV1.NAME,
    UspV1.NAME,
    UspNatV1.NAME,
    UspCaV1.NAME,
    UspVaV1.NAME,
    UspCoV1.NAME,
    UspUtV1.NAME,
    UspCtV1.NAME,
  ];
}
