# @iabgpp/cmpapi

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
  import {CmpApi} from '@iabgpp/cmpapi';
  const cmpApi = new CmpApi(1, 3);
  cmpApi.setGppString(gppString);
  cmpApi.setFieldValue("uspv1", "OptOutSale", 0);
  cmpApi.fireUpdate("uspv1"); 
  console.log(cmpApi.getGppString());
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

## Fields

| Section Name | Section ID | Field                               | Data Type/Value                                                |
| ------------ | ---------- | ----------------------------------- | -------------------------------------------------------------- |
| tcfeuv2      | 2          | Version                             | 6 bit int. Value is 2.                                         |
| tcfeuv2      | 2          | Created                             | Datetime. Updated when fields are set                          |
| tcfeuv2      | 2          | LastUpdated                         | Datetime. Updated when fields are set                          |
| tcfeuv2      | 2          | CmpId                               | 12 bit int                                                     |
| tcfeuv2      | 2          | CmpVersion                          | 12 bit int                                                     |
| tcfeuv2      | 2          | ConsentScreen                       | 6 bit int                                                      |
| tcfeuv2      | 2          | ConsentLanguage                     | 2 character country code                                       |
| tcfeuv2      | 2          | VendorListVersion                   | 12 bit int                                                     |
| tcfeuv2      | 2          | PolicyVersion                       | 6 bit int. Value is 2                                          |
| tcfeuv2      | 2          | IsServiceSpecific                   | Boolean                                                        |
| tcfeuv2      | 2          | UseNonStandardStacks                | Boolean                                                        |
| tcfeuv2      | 2          | SpecialFeatureOptins                | Boolean array of size 12                                       |
| tcfeuv2      | 2          | PurposeConsents                     | Boolean array of size 24                                       |
| tcfeuv2      | 2          | PurposeLegitimateInterests          | Boolean array of size 24                                       |
| tcfeuv2      | 2          | PurposeOneTreatment                 | Boolean                                                        |
| tcfeuv2      | 2          | PublisherCountryCode                | 2 character country code                                       |
| tcfeuv2      | 2          | VendorConsents                      | Integer array of variable size                                 |
| tcfeuv2      | 2          | VendorLegitimateInterests           | Integer array of variable size                                 |
| tcfeuv2      | 2          | PublisherRestrictions               | Integer array of variable size                                 |
| tcfeuv2      | 2          | PublisherPurposesSegmentType        | 3 bit int. Value is 3                                          |
| tcfeuv2      | 2          | PublisherConsents                   | Boolean array of size 24                                       |
| tcfeuv2      | 2          | PublisherLegitimateInterests        | Boolean array of size 24                                       |
| tcfeuv2      | 2          | NumCustomPurposes                   | 6 bit int                                                      |
| tcfeuv2      | 2          | PublisherCustomConsents             | Boolean array where size is set by the NumCustomPurposes field |
| tcfeuv2      | 2          | PublisherCustomLegitimateInterests  | Boolean array where size is set by the NumCustomPurposes field |
| tcfeuv2      | 2          | VendorsAllowedSegmentType           | 3 bit int. Value is 2                                          |
| tcfeuv2      | 2          | VendorsAllowed                      | Integer array of variable size                                 |
| tcfeuv2      | 2          | VendorsDisclosedSegmentType         | 3 bit int. Value is 1                                          |
| tcfeuv2      | 2          | VendorsDisclosed                    | Integer array of variable size                                 |
| tcfcav2      | 5          | Version                             | 6 bit int. Value is 2.                                         |
| tcfcav2      | 5          | Created                             | Datetime. Updated when any fields are set                      |
| tcfcav2      | 5          | LastUpdated                         | Datetime. Updated when any fields are set                      |
| tcfcav2      | 5          | CmpId                               | 12 bit int                                                     |
| tcfcav2      | 5          | CmpVersion                          | 12 bit int                                                     |
| tcfcav2      | 5          | ConsentScreen                       | 6 bit int                                                      |
| tcfcav2      | 5          | ConsentLanguage                     | 2 character country code                                       |
| tcfcav2      | 5          | VendorListVersion                   | 12 bit int                                                     |
| tcfcav2      | 5          | TcfPolicyVersion                    | 6 bit int. Value is 2.                                         |
| tcfcav2      | 5          | UseNonStandardStacks                | Boolean                                                        |
| tcfcav2      | 5          | SpecialFeatureExpressConsent        | Boolean array of size 12                                       |
| tcfcav2      | 5          | PurposesExpressConsent              | Boolean array of size 24                                       |
| tcfcav2      | 5          | PurposesImpliedConsent              | Boolean array of size 24                                       |
| tcfcav2      | 5          | VendorExpressConsent                | Integer array of variable size                                 |
| tcfcav2      | 5          | VendorImpliedConsent                | Integer array of variable size                                 |
| tcfcav2      | 5          | PubPurposesSegmentType              | 3 bit int. Value is 3                                          |
| tcfcav2      | 5          | PubPurposesExpressConsent           | Boolean array of size 24                                       |
| tcfcav2      | 5          | PubPurposesImpliedConsent           | Boolean array of size 24                                       |
| tcfcav2      | 5          | NumCustomPurposes                   | 6 bit int                                                      |
| tcfcav2      | 5          | CustomPurposesExpressConsent        | Boolean array where size is set by the NumCustomPurposes field |
| tcfcav2      | 5          | CustomPurposesImpliedConsent        | Boolean array where size is set by the NumCustomPurposes field |
| uspv1        | 6          | Version                             | 6 bit int. Value is 1                                          |
| uspv1        | 6          | Notice                              | 2 bit int                                                      |
| uspv1        | 6          | OptOutSale                          | 2 bit int                                                      |
| uspv1        | 6          | LspaCovered                         | 2 bit int                                                      |
| uspnatv1     | 7          | Version                             | 6 bit int. Value is 1                                          |
| uspnatv1     | 7          | SharingNotice                       | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspnatv1     | 7          | SaleOptOutNotice                    | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspnatv1     | 7          | SharingOptOutNotice                 | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspnatv1     | 7          | TargetedAdvertisingOptOutNotice     | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspnatv1     | 7          | SensitiveDataProcessingOptOutNotice | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspnatv1     | 7          | SensitiveDataLimitUseNotice         | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspnatv1     | 7          | SaleOptOut                          | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspnatv1     | 7          | SharingOptOut                       | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspnatv1     | 7          | TargetedAdvertisingOptOut           | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspnatv1     | 7          | SensitiveDataProcessing             | 2 bit int array of size 12. 0=Not applicable, 1=Yes, 2=No      |
| uspnatv1     | 7          | KnownChildSensitiveDataConsents     | 2 bit int array of size 2. 0=Not applicable, 1=Yes, 2=No       |
| uspnatv1     | 7          | PersonalDataConsents                | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspnatv1     | 7          | MspaCoveredTransaction              | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspnatv1     | 7          | MspaOptOutOptionMode                | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspnatv1     | 7          | MspaServiceProviderMode             | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspnatv1     | 7          | GpcSegmentType                      | 2 bit int. Value is 1                                          |
| uspnatv1     | 7          | Gpc                                 | Boolean                                                        |
| uspcav1      | 8          | Version                             | 6 bit int. Value is 1                                          |
| uspcav1      | 8          | SaleOptOutNotice                    | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcav1      | 8          | SharingOptOutNotice                 | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcav1      | 8          | SensitiveDataLimitUseNotice         | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcav1      | 8          | SaleOptOut                          | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcav1      | 8          | SharingOptOut                       | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcav1      | 8          | SensitiveDataProcessing             | 2 bit int array of size 9. 0=Not applicable, 1=Yes, 2=No       |
| uspcav1      | 8          | KnownChildSensitiveDataConsents     | 2 bit int array of size 2. 0=Not applicable, 1=Yes, 2=No       |
| uspcav1      | 8          | PersonalDataConsents                | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcav1      | 8          | MspaCoveredTransaction              | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcav1      | 8          | MspaOptOutOptionMode                | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcav1      | 8          | MspaServiceProviderMode             | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcav1      | 8          | GpcSegmentType                      | 2 bit int. Value is 1                                          |
| uspcav1      | 8          | Gpc                                 | Boolean                                                        |
| uspvav1      | 9          | Version                             | 6 bit int. Value is 1                                          |
| uspvav1      | 9          | SharingNotice                       | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspvav1      | 9          | SaleOptOutNotice                    | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspvav1      | 9          | TargetedAdvertisingOptOutNotice     | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspvav1      | 9          | SaleOptOut                          | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspvav1      | 9          | TargetedAdvertisingOptOut           | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspvav1      | 9          | SensitiveDataProcessing             | 2 bit int array of size 8. 0=Not applicable, 1=Yes, 2=No       |
| uspvav1      | 9          | KnownChildSensitiveDataConsents     | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspvav1      | 9          | MspaCoveredTransaction              | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspvav1      | 9          | MspaOptOutOptionMode                | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspvav1      | 9          | MspaServiceProviderMode             | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcov1      | 10         | Version                             | 6 bit int. Value is 1                                          |
| uspcov1      | 10         | SharingNotice                       | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcov1      | 10         | SaleOptOutNotice                    | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcov1      | 10         | TargetedAdvertisingOptOutNotice     | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcov1      | 10         | SaleOptOut                          | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcov1      | 10         | TargetedAdvertisingOptOut           | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcov1      | 10         | SensitiveDataProcessing             | 2 bit int array of size 7. 0=Not applicable, 1=Yes, 2=No       |
| uspcov1      | 10         | KnownChildSensitiveDataConsents     | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcov1      | 10         | MspaCoveredTransaction              | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcov1      | 10         | MspaOptOutOptionMode                | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcov1      | 10         | MspaServiceProviderMode             | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspcov1      | 10         | GpcSegmentType                      | 2 bit int. Value is 1                                          |
| uspcov1      | 10         | Gpc                                 | Boolean                                                        |
| usputv1      | 11         | Version                             | 6 bit int. Value is 1                                          |
| usputv1      | 11         | SharingNotice                       | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| usputv1      | 11         | SaleOptOutNotice                    | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| usputv1      | 11         | TargetedAdvertisingOptOutNotice     | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| usputv1      | 11         | SensitiveDataProcessingOptOutNotice | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| usputv1      | 11         | SaleOptOut                          | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| usputv1      | 11         | TargetedAdvertisingOptOut           | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| usputv1      | 11         | SensitiveDataProcessing             | 2 bit int array of size 8. 0=Not applicable, 1=Yes, 2=No       |
| usputv1      | 11         | KnownChildSensitiveDataConsents     | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| usputv1      | 11         | MspaCoveredTransaction              | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| usputv1      | 11         | MspaOptOutOptionMode                | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| usputv1      | 11         | MspaServiceProviderMode             | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspctv1      | 12         | Version                             | 6 bit int. Value is 1                                          |
| uspctv1      | 12         | SharingNotice                       | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspctv1      | 12         | SaleOptOutNotice                    | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspctv1      | 12         | TargetedAdvertisingOptOutNotice     | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspctv1      | 12         | SaleOptOut                          | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspctv1      | 12         | TargetedAdvertisingOptOut           | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspctv1      | 12         | SensitiveDataProcessing             | 2 bit int array of size 8. 0=Not applicable, 1=Yes, 2=No       |
| uspctv1      | 12         | KnownChildSensitiveDataConsents     | 2 bit int array of size 3. 0=Not applicable, 1=Yes, 2=No       |
| uspctv1      | 12         | MspaCoveredTransaction              | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspctv1      | 12         | MspaOptOutOptionMode                | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspctv1      | 12         | MspaServiceProviderMode             | 2 bit int. 0=Not applicable, 1=Yes, 2=No                       |
| uspctv1      | 12         | GpcSegmentType                      | 2 bit int. Value is 1                                          |
| uspctv1      | 12         | Gpc                                 | Boolean                                                        |

## Example Usage / Encoder / Decoder

[https://iabgpp.com](https://iabgpp.com)
