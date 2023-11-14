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
import { LazyDecodingError } from "./error/LazyDecodingError.js";

export class GppModel {
  private sections = new Map<string, EncodableSection>();

  private encodedString;
  private decoded;
  private dirty;

  constructor(encodedString?: string) {
    if (encodedString) {
      this.encodedString = encodedString;
      this.decoded = false;
      this.dirty = false;
    } else {
      this.encodedString = "DBAA";
      this.decoded = false;
      this.dirty = false;
    }
  }

  public setFieldValue(sectionName: string, fieldName: string, value: any) {
    // lazily decode
    if (!this.decoded && this.encodedString != null && this.encodedString.length > 0) {
      try {
        this.decode(this.encodedString);
      } catch (e) {
        throw new LazyDecodingError(e.message);
      }
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
    // lazily decode
    if (!this.decoded && this.encodedString != null && this.encodedString.length > 0) {
      try {
        this.decode(this.encodedString);
      } catch (e) {
        throw new LazyDecodingError(e.message);
      }
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
    // lazily decode
    if (!this.decoded && this.encodedString != null && this.encodedString.length > 0) {
      try {
        this.decode(this.encodedString);
      } catch (e) {
        throw new LazyDecodingError(e.message);
      }
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
    // lazily decode
    if (!this.decoded && this.encodedString != null && this.encodedString.length > 0) {
      try {
        this.decode(this.encodedString);
      } catch (e) {
        throw new LazyDecodingError(e.message);
      }
    }

    return this.sections.has(sectionName);
  }

  public hasSectionId(sectionId: number) {
    return this.hasSection(Sections.SECTION_ID_NAME_MAP.get(sectionId));
  }

  public deleteSection(sectionName: string) {
    // lazily decode
    if (!this.decoded && this.encodedString != null && this.encodedString.length > 0) {
      try {
        this.decode(this.encodedString);
      } catch (e) {
        throw new LazyDecodingError(e.message);
      }
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
    // lazily decode
    if (!this.decoded && this.encodedString != null && this.encodedString.length > 0) {
      try {
        this.decode(this.encodedString);
      } catch (e) {
        throw new LazyDecodingError(e.message);
      }
    }

    let header = new HeaderV1();
    header.setFieldValue("SectionIds", this.getSectionIds());
    return header.toObj();
  }

  public getSection(sectionName: string) {
    // lazily decode
    if (!this.decoded && this.encodedString != null && this.encodedString.length > 0) {
      try {
        this.decode(this.encodedString);
      } catch (e) {
        throw new LazyDecodingError(e.message);
      }
    }

    if (this.sections.has(sectionName)) {
      return this.sections.get(sectionName).toObj();
    } else {
      return null;
    }
  }

  public getSectionIds() {
    // lazily decode
    if (!this.decoded && this.encodedString != null && this.encodedString.length > 0) {
      try {
        this.decode(this.encodedString);
      } catch (e) {
        throw new LazyDecodingError(e.message);
      }
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

  public encode() {
    if (!this.dirty) {
      return this.encodedString;
    }

    // lazily decode
    if (!this.decoded && this.encodedString != null && this.encodedString.length > 0) {
      try {
        this.decode(this.encodedString);
      } catch (e) {
        throw new LazyDecodingError(e.message);
      }
    }

    let encodedSections = [];
    let sectionIds = [];
    for (let i = 0; i < Sections.SECTION_ORDER.length; i++) {
      let sectionName = Sections.SECTION_ORDER[i];
      if (this.sections.has(sectionName)) {
        let section = this.sections.get(sectionName);
        encodedSections.push(section.encode());
        sectionIds.push(section.getId());
      }
    }

    let header = new HeaderV1();
    header.setFieldValue("SectionIds", this.getSectionIds());
    encodedSections.unshift(header.encode());

    this.encodedString = encodedSections.join("~");
    this.dirty = false;
    return this.encodedString;
  }

  public decode(str: string) {
    this.encodedString = str;
    this.decoded = false;
    this.dirty = true;
    this.sections.clear();

    let encodedSections = str.split("~");
    let header = new HeaderV1(encodedSections[0]);
    this.sections.set(HeaderV1.NAME, header);

    let sectionIds = header.getFieldValue("SectionIds");
    for (let i = 0; i < sectionIds.length; i++) {
      if (sectionIds[i] === TcfCaV1.ID) {
        let section = new TcfCaV1(encodedSections[i + 1]);
        this.sections.set(TcfCaV1.NAME, section);
      } else if (sectionIds[i] === TcfEuV2.ID) {
        let section = new TcfEuV2(encodedSections[i + 1]);
        this.sections.set(TcfEuV2.NAME, section);
      } else if (sectionIds[i] === UspV1.ID) {
        let section = new UspV1(encodedSections[i + 1]);
        this.sections.set(UspV1.NAME, section);
      } else if (sectionIds[i] === UsNatV1.ID) {
        let section = new UsNatV1(encodedSections[i + 1]);
        this.sections.set(UsNatV1.NAME, section);
      } else if (sectionIds[i] === UsCaV1.ID) {
        let section = new UsCaV1(encodedSections[i + 1]);
        this.sections.set(UsCaV1.NAME, section);
      } else if (sectionIds[i] === UsVaV1.ID) {
        let section = new UsVaV1(encodedSections[i + 1]);
        this.sections.set(UsVaV1.NAME, section);
      } else if (sectionIds[i] === UsCoV1.ID) {
        let section = new UsCoV1(encodedSections[i + 1]);
        this.sections.set(UsCoV1.NAME, section);
      } else if (sectionIds[i] === UsUtV1.ID) {
        let section = new UsUtV1(encodedSections[i + 1]);
        this.sections.set(UsUtV1.NAME, section);
      } else if (sectionIds[i] === UsCtV1.ID) {
        let section = new UsCtV1(encodedSections[i + 1]);
        this.sections.set(UsCtV1.NAME, section);
      }
    }

    this.decoded = true;
    this.dirty = false;
  }

  public encodeSection(sectionName: string): string {
    // lazily decode
    if (!this.decoded && this.encodedString != null && this.encodedString.length > 0) {
      try {
        this.decode(this.encodedString);
      } catch (e) {
        throw new LazyDecodingError(e.message);
      }
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
    // lazily decode
    if (!this.decoded && this.encodedString != null && this.encodedString.length > 0) {
      try {
        this.decode(this.encodedString);
      } catch (e) {
        throw new LazyDecodingError(e.message);
      }
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
      section.decode(encodedString);
      this.dirty = true;
    }
  }

  public decodeSectionById(sectionId: number, encodedString: string): void {
    this.decodeSection(Sections.SECTION_ID_NAME_MAP.get(sectionId), encodedString);
  }

  public toObject() {
    // lazily decode
    if (!this.decoded && this.encodedString != null && this.encodedString.length > 0) {
      try {
        this.decode(this.encodedString);
      } catch (e) {
        throw new LazyDecodingError(e.message);
      }
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
}
