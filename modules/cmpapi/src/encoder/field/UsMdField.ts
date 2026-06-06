export enum UsMdField {
  MSPA_VERSION = "MspaVersion",
  MSPA_COVERED_TRANSACTION = "MspaCoveredTransaction",
  MSPA_MODE = "MspaMode",
  PROCESSING_NOTICE = "ProcessingNotice",
  SALE_OPT_OUT_NOTICE = "SaleOptOutNotice",
  TARGETED_ADVERTISING_OPT_OUT_NOTICE = "TargetedAdvertisingOptOutNotice",
  SALE_OPT_OUT = "SaleOptOut",
  TARGETED_ADVERTISING_OPT_OUT = "TargetedAdvertisingOptOut",
  ADDITIONAL_DATA_PROCESSING_CONSENT = "AdditionalDataProcessingConsent",

  GPC_SEGMENT_TYPE = "GpcSegmentType",
  GPC_SEGMENT_INCLUDED = "GpcSegmentIncluded",
  GPC = "Gpc",
}

export const UsMd_CORE_SEGMENT_FIELD_NAMES = [
  UsMdField.MSPA_VERSION,
  UsMdField.MSPA_COVERED_TRANSACTION,
  UsMdField.MSPA_MODE,
  UsMdField.PROCESSING_NOTICE,
  UsMdField.SALE_OPT_OUT_NOTICE,
  UsMdField.TARGETED_ADVERTISING_OPT_OUT_NOTICE,
  UsMdField.SALE_OPT_OUT,
  UsMdField.TARGETED_ADVERTISING_OPT_OUT,
  UsMdField.ADDITIONAL_DATA_PROCESSING_CONSENT,
];

export const UsMd_GPC_SEGMENT_FIELD_NAMES = [UsMdField.GPC_SEGMENT_TYPE, UsMdField.GPC];
