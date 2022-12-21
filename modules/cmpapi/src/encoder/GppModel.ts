import { EncodableSection } from "./section/EncodableSection.js";
import { HeaderV1 } from "./section/HeaderV1.js";
import { Sections } from "./section/Sections.js";
import { TcfCaV2 } from "./section/TcfCaV2.js";
import { TcfEuV2 } from "./section/TcfEuV2.js";
import { UspV1 } from "./section/UspV1.js";
import { UspNatV1 } from "./section/UspNatV1.js";
import { UspCaV1 } from "./section/UspCaV1.js";
import { UspVaV1 } from "./section/UspVaV1.js";
import { UspCoV1 } from "./section/UspCoV1.js";
import { UspUtV1 } from "./section/UspUtV1.js";
import { UspCtV1 } from "./section/UspCtV1.js";

export class GppModel {
  private sections = new Map<string, EncodableSection>();

  constructor(encodedString?: string) {
    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  public setFieldValue(sectionName: string, fieldName: string, value: any) {
    let section: EncodableSection = null;
    if (!this.sections.has(sectionName)) {
      if (sectionName === TcfCaV2.NAME) {
        section = new TcfCaV2();
        this.sections.set(TcfCaV2.NAME, section);
      } else if (sectionName === TcfEuV2.NAME) {
        section = new TcfEuV2();
        this.sections.set(TcfEuV2.NAME, section);
      } else if (sectionName === UspV1.NAME) {
        section = new UspV1();
        this.sections.set(UspV1.NAME, section);
      } else if (sectionName === UspNatV1.NAME) {
        section = new UspNatV1();
        this.sections.set(UspNatV1.NAME, section);
      } else if (sectionName === UspCaV1.NAME) {
        section = new UspCaV1();
        this.sections.set(UspCaV1.NAME, section);
      } else if (sectionName === UspVaV1.NAME) {
        section = new UspVaV1();
        this.sections.set(UspVaV1.NAME, section);
      } else if (sectionName === UspCoV1.NAME) {
        section = new UspCoV1();
        this.sections.set(UspCoV1.NAME, section);
      } else if (sectionName === UspUtV1.NAME) {
        section = new UspUtV1();
        this.sections.set(UspUtV1.NAME, section);
      } else if (sectionName === UspCtV1.NAME) {
        section = new UspCtV1();
        this.sections.set(UspCtV1.NAME, section);
      }
    } else {
      section = this.sections.get(sectionName);
    }

    if (section) {
      section.setFieldValue(fieldName, value);
    } else {
      throw new Error(sectionName + " not found");
    }
  }

  public getFieldValue(sectionName: string, fieldName: string) {
    if (this.sections.has(sectionName)) {
      return this.sections.get(sectionName).getFieldValue(fieldName);
    } else {
      return null;
    }
  }

  public hasField(sectionName: string, fieldName: string) {
    if (this.sections.has(sectionName)) {
      return this.sections.get(sectionName).hasField(fieldName);
    } else {
      return false;
    }
  }

  public hasSection(sectionName: string) {
    return this.sections.has(sectionName);
  }

  public deleteSection(sectionName: string) {
    this.sections.delete(sectionName);
  }

  public clear() {
    this.sections.clear();
  }

  public getHeader() {
    let header = new HeaderV1();
    header.setFieldValue("SectionIds", this.getSectionIds());
    return header.toObj();
  }

  public getSection(sectionName: string) {
    if (this.sections.has(sectionName)) {
      return this.sections.get(sectionName).toObj();
    } else {
      return null;
    }
  }

  public getSectionIds() {
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

    let encodedString = encodedSections.join("~");
    return encodedString;
  }

  public decode(str: string) {
    this.sections.clear();

    let encodedSections = str.split("~");
    let header = new HeaderV1(encodedSections[0]);
    this.sections.set(HeaderV1.NAME, header);

    let sectionIds = header.getFieldValue("SectionIds");
    for (let i = 0; i < sectionIds.length; i++) {
      if (sectionIds[i] === TcfCaV2.ID) {
        let section = new TcfCaV2(encodedSections[i + 1]);
        this.sections.set(TcfCaV2.NAME, section);
      } else if (sectionIds[i] === TcfEuV2.ID) {
        let section = new TcfEuV2(encodedSections[i + 1]);
        this.sections.set(TcfEuV2.NAME, section);
      } else if (sectionIds[i] === UspV1.ID) {
        let section = new UspV1(encodedSections[i + 1]);
        this.sections.set(UspV1.NAME, section);
      } else if (sectionIds[i] === UspNatV1.ID) {
        let section = new UspNatV1(encodedSections[i + 1]);
        this.sections.set(UspNatV1.NAME, section);
      } else if (sectionIds[i] === UspCaV1.ID) {
        let section = new UspCaV1(encodedSections[i + 1]);
        this.sections.set(UspCaV1.NAME, section);
      } else if (sectionIds[i] === UspVaV1.ID) {
        let section = new UspVaV1(encodedSections[i + 1]);
        this.sections.set(UspVaV1.NAME, section);
      } else if (sectionIds[i] === UspCoV1.ID) {
        let section = new UspCoV1(encodedSections[i + 1]);
        this.sections.set(UspCoV1.NAME, section);
      } else if (sectionIds[i] === UspUtV1.ID) {
        let section = new UspUtV1(encodedSections[i + 1]);
        this.sections.set(UspUtV1.NAME, section);
      } else if (sectionIds[i] === UspCtV1.ID) {
        let section = new UspCtV1(encodedSections[i + 1]);
        this.sections.set(UspCtV1.NAME, section);
      }
    }
  }

  public encodeSection(sectionName: string): string {
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
      if (sectionName === TcfCaV2.NAME) {
        section = new TcfCaV2();
        this.sections.set(TcfCaV2.NAME, section);
      } else if (sectionName === TcfEuV2.NAME) {
        section = new TcfEuV2();
        this.sections.set(TcfEuV2.NAME, section);
      } else if (sectionName === UspV1.NAME) {
        section = new UspV1();
        this.sections.set(UspV1.NAME, section);
      } else if (sectionName === UspNatV1.NAME) {
        section = new UspNatV1();
        this.sections.set(UspNatV1.NAME, section);
      } else if (sectionName === UspCaV1.NAME) {
        section = new UspCaV1();
        this.sections.set(UspCaV1.NAME, section);
      } else if (sectionName === UspVaV1.NAME) {
        section = new UspVaV1();
        this.sections.set(UspVaV1.NAME, section);
      } else if (sectionName === UspCoV1.NAME) {
        section = new UspCoV1();
        this.sections.set(UspCoV1.NAME, section);
      } else if (sectionName === UspUtV1.NAME) {
        section = new UspUtV1();
        this.sections.set(UspUtV1.NAME, section);
      } else if (sectionName === UspCtV1.NAME) {
        section = new UspCtV1();
        this.sections.set(UspCtV1.NAME, section);
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
