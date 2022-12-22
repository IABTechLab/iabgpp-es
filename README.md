# iabgpp-es

Encode/decode consent information with the IAB GPP Framework

(https://iabtechlab.com/gpp/)

## Methods available to CMPs

```javascript
constructor(cmpId: number, cmpVersion: number, customCommands?: CustomCommands)
fireUpdate(currentAPI?: string, uiVisible = false): void
getApplicableSection(): number[]
setApplicableSection(applicableSection: number[]): void
getCurrentAPI(): string
setCurrentAPI(currentAPI: string): void
setGppString(encodedGppString: string): void
getGppString(): string
setSectionString(sectionName: string, encodedSectionString: string): void
setSectionStringById(sectionId: number, encodedSectionString: string): void
getSectionString(sectionName: string): string
getSectionStringById(sectionId: number): string
setFieldValue(sectionName: string, fieldName: string, value: any): void
setFieldValueBySectionId(sectionId: number, fieldName: string, value: any)
getFieldValue(sectionName: string, fieldName: string): any
getFieldValueBySectionId(sectionId: number, fieldName: string)
getSection(sectionName: string): any
getSectionById(sectionId: number): any
hasSection(sectionName: string): any
hasSectionId(sectionId: number): any
deleteSection(sectionName: string)
deleteSectionById(sectionId: number)
clear()
getObject()
getGvlFromVendorList(vendorList: VendorList): Gvl
async getGvlFromUrl(gvlUrlConfig: GvlUrlConfig): Promise<Gvl>
```

## Commands available to consumers

```javascript
__gpp("addEventListener", callback?, param?)
__gpp("getField", callback?, param?)
__gpp("getGPPData", callback?, param?)
__gpp("getSection", callback?, param?)
__gpp("hasSection", callback?, param?)
__gpp("ping", callback?, param?)
__gpp("removeEventListener", callback?, param?)
```

## CMP usage Example

```javascript
<script>
  import {CmpApi} from '@iabgpp/cmpapi'; const cmpApi = new CmpApi(1, 3); cmpApi.setGppString(gppString);
  cmpApi.setFieldValue("uspv1", "OptOutSale", 0); cmpApi.fireUpdate("uspv1"); console.log(cmpApi.getGppString());
</script>
```

## Consumer usage example

```javascript
<script src="/js/stub/stub.js"></script>
<script>
  console.log(__gpp("ping"));

  __gpp("addEventListener", function (evt) {
    console.log("Received uspv1 event: " + evt);
    console.log(__gpp("getGPPString"));
  }, "uspv1");

  if(__gpp("hasSection", null, "tcfeuv2")) {
    console.log(__gpp("getSection", null, "tcfeuv2"));
  }

  if(__gpp("hasSection", null, "uspv1")) {
    console.log(__gpp("getField", null, "uspv1.OptOutSale"));
  }
</script>
```
