import { EncodableSection } from "./section/EncodableSection.js";
import { HeaderV1 } from "./section/HeaderV1.js";
import { TcfEuV2 } from "./section/TcfEuV2.js";
import { UspV1 } from "./section/UspV1.js";

export class GppModel {
  private sections = new Map<string, EncodableSection>();
  private sectionOrder: string[];

  constructor(encodedString?: string) {
    this.sectionOrder = [TcfEuV2.NAME, UspV1.NAME];

    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  public setFieldValue(sectionName: string, fieldName: string, value: any) {
    let section: EncodableSection = null;
    if (!this.sections.has(sectionName)) {
      if (sectionName === TcfEuV2.NAME) {
        section = new TcfEuV2();
        this.sections.set(TcfEuV2.NAME, section);
      } else if (sectionName === UspV1.NAME) {
        section = new UspV1();
        this.sections.set(UspV1.NAME, section);
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
    for (let i = 0; i < this.sectionOrder.length; i++) {
      let sectionName = this.sectionOrder[i];
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
    for (let i = 0; i < this.sectionOrder.length; i++) {
      let sectionName = this.sectionOrder[i];
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
      if (sectionIds[i] === TcfEuV2.ID) {
        let section = new TcfEuV2(encodedSections[i + 1]);
        this.sections.set(TcfEuV2.NAME, section);
      } else if (sectionIds[i] === UspV1.ID) {
        let section = new UspV1(encodedSections[i + 1]);
        this.sections.set(UspV1.NAME, section);
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

  public decodeSection(sectionName: string, encodedString: string): void {
    let section: EncodableSection = null;
    if (!this.sections.has(sectionName)) {
      if (sectionName === TcfEuV2.NAME) {
        section = new TcfEuV2();
        this.sections.set(TcfEuV2.NAME, section);
      } else if (sectionName === UspV1.NAME) {
        section = new UspV1();
        this.sections.set(UspV1.NAME, section);
      }
    } else {
      section = this.sections.get(sectionName);
    }

    if (section) {
      section.decode(encodedString);
    }
  }

  public toObject() {
    let obj = [];
    for (let i = 0; i < this.sectionOrder.length; i++) {
      let sectionName = this.sectionOrder[i];
      if (this.sections.has(sectionName)) {
        obj[sectionName] = this.sections.get(sectionName).toObj();
      }
    }

    return obj;
  }
}
