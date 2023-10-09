import { EncodableSection } from "./section/EncodableSection.js";
import { HeaderV1 } from "./section/HeaderV1.js";
import { Sections } from "./section/Sections.js";
import { TcfCaV1 } from "./section/TcfCaV1.js";
import { TcfEuV2 } from "./section/TcfEuV2.js";
import { UspV1 } from "./section/UspV1.js";
import { UsNatV1 } from "./section/UsNatV1.js";
import { UsCaV1 } from "./section/UsCaV1.js";
import { UsVaV1 } from "./section/UsVaV1.js";
import { UsCoV1 } from "./section/UsCoV1.js";
import { UsUtV1 } from "./section/UsUtV1.js";
import { UsCtV1 } from "./section/UsCtV1.js";
import { InvalidFieldError } from "./error/InvalidFieldError.js";
import { DecodingError } from "./error/DecodingError.js";
import { HeaderV1Field } from "./field/HeaderV1Field.js";

export class GppModel {
  private sections = new Map<string, EncodableSection>();

  private encodedString = null;
  private decoded = true;
  private dirty = false;

  constructor(encodedString?: string | null) {
    if (encodedString) {
      this.decode(encodedString);
    }
  }

  public setFieldValue(sectionName: string, fieldName: string, value: any) {
    if (!this.decoded) {
      this.sections = this.decodeModel(this.encodedString);
      this.dirty = false;
      this.decoded = true;
    }

    let section: EncodableSection = null;
    if (!this.sections.has(sectionName)) {
      if (sectionName === TcfCaV1.NAME) {
        section = new TcfCaV1();
        this.sections.set(TcfCaV1.NAME, section);
      } else if (sectionName === TcfEuV2.NAME) {
        section = new TcfEuV2();
        this.sections.set(TcfEuV2.NAME, section);
      } else if (sectionName === UspV1.NAME) {
        section = new UspV1();
        this.sections.set(UspV1.NAME, section);
      } else if (sectionName === UsNatV1.NAME) {
        section = new UsNatV1();
        this.sections.set(UsNatV1.NAME, section);
      } else if (sectionName === UsCaV1.NAME) {
        section = new UsCaV1();
        this.sections.set(UsCaV1.NAME, section);
      } else if (sectionName === UsVaV1.NAME) {
        section = new UsVaV1();
        this.sections.set(UsVaV1.NAME, section);
      } else if (sectionName === UsCoV1.NAME) {
        section = new UsCoV1();
        this.sections.set(UsCoV1.NAME, section);
      } else if (sectionName === UsUtV1.NAME) {
        section = new UsUtV1();
        this.sections.set(UsUtV1.NAME, section);
      } else if (sectionName === UsCtV1.NAME) {
        section = new UsCtV1();
        this.sections.set(UsCtV1.NAME, section);
      }
    } else {
      section = this.sections.get(sectionName);
    }

    if (section) {
      section.setFieldValue(fieldName, value);
      this.dirty = true;
    } else {
      throw new InvalidFieldError(sectionName + "." + fieldName + " not found");
    }
  }

  public setFieldValueBySectionId(sectionId: number, fieldName: string, value: any) {
    this.setFieldValue(Sections.SECTION_ID_NAME_MAP.get(sectionId), fieldName, value);
  }

  public getFieldValue(sectionName: string, fieldName: string) {
    if (!this.decoded) {
      this.sections = this.decodeModel(this.encodedString);
      this.dirty = false;
      this.decoded = true;
    }

    if (this.sections.has(sectionName)) {
      return this.sections.get(sectionName).getFieldValue(fieldName);
    } else {
      return null;
    }
  }

  public getFieldValueBySectionId(sectionId: number, fieldName: string) {
    return this.getFieldValue(Sections.SECTION_ID_NAME_MAP.get(sectionId), fieldName);
  }

  public hasField(sectionName: string, fieldName: string) {
    if (!this.decoded) {
      this.sections = this.decodeModel(this.encodedString);
      this.dirty = false;
      this.decoded = true;
    }

    if (this.sections.has(sectionName)) {
      return this.sections.get(sectionName).hasField(fieldName);
    } else {
      return false;
    }
  }

  public hasFieldBySectionId(sectionId: number, fieldName: string) {
    return this.hasField(Sections.SECTION_ID_NAME_MAP.get(sectionId), fieldName);
  }

  public hasSection(sectionName: string) {
    if (!this.decoded) {
      this.sections = this.decodeModel(this.encodedString);
      this.dirty = false;
      this.decoded = true;
    }

    return this.sections.has(sectionName);
  }

  public hasSectionId(sectionId: number) {
    return this.hasSection(Sections.SECTION_ID_NAME_MAP.get(sectionId));
  }

  public deleteSection(sectionName: string) {
    // lazily decode
    if (!this.decoded && this.encodedString != null && this.encodedString.length > 0) {
      this.decode(this.encodedString);
    }

    this.sections.delete(sectionName);
    this.dirty = true;
  }

  public deleteSectionById(sectionId: number) {
    this.deleteSection(Sections.SECTION_ID_NAME_MAP.get(sectionId));
  }

  public clear() {
    this.sections.clear();
    this.encodedString = "DBAA";
    this.decoded = false;
    this.dirty = false;
  }

  public getHeader() {
    if (!this.decoded) {
      this.sections = this.decodeModel(this.encodedString);
      this.dirty = false;
      this.decoded = true;
    }

    let header = new HeaderV1();
    header.setFieldValue("SectionIds", this.getSectionIds());
    return header.toObj();
  }

  public getSection(sectionName: string) {
    if (!this.decoded) {
      this.sections = this.decodeModel(this.encodedString);
      this.dirty = false;
      this.decoded = true;
    }

    if (this.sections.has(sectionName)) {
      return this.sections.get(sectionName).toObj();
    } else {
      return null;
    }
  }

  public getSectionIds() {
    if (!this.decoded) {
      this.sections = this.decodeModel(this.encodedString);
      this.dirty = false;
      this.decoded = true;
    }

    let sectionIds = [];
    for (let i = 0; i < Sections.SECTION_ORDER.length; i++) {
      let sectionName = Sections.SECTION_ORDER[i];
      if (this.sections.has(sectionName)) {
        let section = this.sections.get(sectionName);
        sectionIds.push(section.getId());
      }
    }
    return sectionIds;
  }

  protected encodeModel(sections: Map<string, EncodableSection>) {
    let encodedSections = [];
    let sectionIds = [];
    for (let i = 0; i < Sections.SECTION_ORDER.length; i++) {
      let sectionName = Sections.SECTION_ORDER[i];
      if (sections.has(sectionName)) {
        let section = sections.get(sectionName);
        encodedSections.push(section.encode());
        sectionIds.push(section.getId());
      }
    }

    let header = new HeaderV1();
    header.setFieldValue("SectionIds", sectionIds);
    encodedSections.unshift(header.encode());

    return encodedSections.join("~");
  }

  protected decodeModel(str: string) {
    if (!str || str.length == 0 || str.startsWith("D")) {
      let encodedSections = str.split("~");
      let sections = new Map<string, EncodableSection>();
      if (encodedSections[0].startsWith("D")) {
        //GPP String
        let header = new HeaderV1(encodedSections[0]);
        let sectionIds = header.getFieldValue("SectionIds");
        for (let i = 0; i < sectionIds.length; i++) {
          if (sectionIds[i] === TcfCaV1.ID) {
            let section = new TcfCaV1(encodedSections[i + 1]);
            sections.set(TcfCaV1.NAME, section);
          } else if (sectionIds[i] === TcfEuV2.ID) {
            let section = new TcfEuV2(encodedSections[i + 1]);
            sections.set(TcfEuV2.NAME, section);
          } else if (sectionIds[i] === UspV1.ID) {
            let section = new UspV1(encodedSections[i + 1]);
            sections.set(UspV1.NAME, section);
          } else if (sectionIds[i] === UsNatV1.ID) {
            let section = new UsNatV1(encodedSections[i + 1]);
            sections.set(UsNatV1.NAME, section);
          } else if (sectionIds[i] === UsCaV1.ID) {
            let section = new UsCaV1(encodedSections[i + 1]);
            sections.set(UsCaV1.NAME, section);
          } else if (sectionIds[i] === UsVaV1.ID) {
            let section = new UsVaV1(encodedSections[i + 1]);
            sections.set(UsVaV1.NAME, section);
          } else if (sectionIds[i] === UsCoV1.ID) {
            let section = new UsCoV1(encodedSections[i + 1]);
            sections.set(UsCoV1.NAME, section);
          } else if (sectionIds[i] === UsUtV1.ID) {
            let section = new UsUtV1(encodedSections[i + 1]);
            sections.set(UsUtV1.NAME, section);
          } else if (sectionIds[i] === UsCtV1.ID) {
            let section = new UsCtV1(encodedSections[i + 1]);
            sections.set(UsCtV1.NAME, section);
          }
        }
      }
      return sections;
    } else if (str.startsWith("C")) {
      // old tcfeu only string
      let sections = new Map<string, EncodableSection>();

      let section = new TcfEuV2(str);
      sections.set(TcfEuV2.NAME, section);

      let header = new HeaderV1();
      header.setFieldValue(HeaderV1Field.SECTION_IDS, [2]);
      sections.set(HeaderV1.NAME, section);

      return sections;
    } else {
      throw new DecodingError("Unable to decode '" + str + "'");
    }
  }

  public encodeSection(sectionName: string): string {
    if (!this.decoded) {
      this.sections = this.decodeModel(this.encodedString);
      this.dirty = false;
      this.decoded = true;
    }

    if (this.sections.has(sectionName)) {
      return this.sections.get(sectionName).encode();
    } else {
      return null;
    }
  }

  public encodeSectionById(sectionId: number): string {
    return this.encodeSection(Sections.SECTION_ID_NAME_MAP.get(sectionId));
  }

  public decodeSection(sectionName: string, encodedString: string): void {
    let section: EncodableSection = null;
    if (!this.sections.has(sectionName)) {
      if (sectionName === TcfCaV1.NAME) {
        section = new TcfCaV1();
        this.sections.set(TcfCaV1.NAME, section);
      } else if (sectionName === TcfEuV2.NAME) {
        section = new TcfEuV2();
        this.sections.set(TcfEuV2.NAME, section);
      } else if (sectionName === UspV1.NAME) {
        section = new UspV1();
        this.sections.set(UspV1.NAME, section);
      } else if (sectionName === UsNatV1.NAME) {
        section = new UsNatV1();
        this.sections.set(UsNatV1.NAME, section);
      } else if (sectionName === UsCaV1.NAME) {
        section = new UsCaV1();
        this.sections.set(UsCaV1.NAME, section);
      } else if (sectionName === UsVaV1.NAME) {
        section = new UsVaV1();
        this.sections.set(UsVaV1.NAME, section);
      } else if (sectionName === UsCoV1.NAME) {
        section = new UsCoV1();
        this.sections.set(UsCoV1.NAME, section);
      } else if (sectionName === UsUtV1.NAME) {
        section = new UsUtV1();
        this.sections.set(UsUtV1.NAME, section);
      } else if (sectionName === UsCtV1.NAME) {
        section = new UsCtV1();
        this.sections.set(UsCtV1.NAME, section);
      }
    } else {
      section = this.sections.get(sectionName);
    }

    if (section) {
      section.decode(encodedString);
    }
  }

  public decodeSectionById(sectionId: number, encodedString: string): void {
    this.decodeSection(Sections.SECTION_ID_NAME_MAP.get(sectionId), encodedString);
  }

  public toObject() {
    if (!this.decoded) {
      this.sections = this.decodeModel(this.encodedString);
      this.dirty = false;
      this.decoded = true;
    }

    let obj = {};
    for (let i = 0; i < Sections.SECTION_ORDER.length; i++) {
      let sectionName = Sections.SECTION_ORDER[i];
      if (this.sections.has(sectionName)) {
        obj[sectionName] = this.sections.get(sectionName).toObj();
      }
    }

    return obj;
  }

  public encode(): string {
    if (this.encodedString == null || this.encodedString.length === 0 || this.dirty) {
      this.encodedString = this.encodeModel(this.sections);
      this.dirty = false;
      this.decoded = true;
    }

    return this.encodedString;
  }

  public decode(encodedString: string | null): void {
    this.encodedString = encodedString;
    this.dirty = false;
    this.decoded = false;
  }
}
