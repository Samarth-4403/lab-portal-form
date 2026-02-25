// List of all CSIR labs (same as DPR/DIB forms) - SORTED ALPHABETICALLY
export const ALL_LABS = [
    "CSIR - 4PI",
    "CSIR - AMPRI",
    "CSIR - CBRI",
    "CSIR - CCMB",
    "CSIR - CDRI",
    "CSIR - CECRI",
    "CSIR - CEERI",
    "CSIR - CFTRI",
    "CSIR - CGCRI",
    "CSIR - CIMAP",
    "CSIR - CIMFR",
    "CSIR - CLRI",
    "CSIR - CMC",
    "CSIR - CMERI",
    "CSIR - CRRI",
    "CSIR - CSMCRI",
    "CSIR - CSIO",
    "CSIR - HQ",
    "CSIR - IGIB",
    "CSIR - IHBT",
    "CSIR - IICB",
    "CSIR - IICT",
    "CSIR - IIIM",
    "CSIR - IIP",
    "CSIR - IITR",
    "CSIR - IMMT",
    "CSIR - IMTECH",
    "CSIR - NAL",
    "CSIR - NBRI",
    "CSIR - NCL",
    "CSIR - NEERI",
    "CSIR - NEIST",
    "CSIR - NGRI",
    "CSIR - NIIST",
    "CSIR - NIO",
    "CSIR - NIScPR",
    "CSIR - NML",
    "CSIR - NPL",
    "CSIR - SERC",
    "CSIR - URDIP"
].sort();

// New Dimensions
export const DEPARTMENTS = [
    "Scientific",
    "Technical",
    "Administration",
    "Isolated"
];

export const GROUPS_BY_DEPT = {
    "Scientific": ["Group IV"],
    "Technical": ["Group III", "Group II", "Group I"],
    "Administration": ["N/A"],
    "Isolated": ["N/A"]
};

export const GENDERS = ["Male", "Female", "Others"];

export const CATEGORIES = ["General", "EWS", "OBC", "SC", "ST", "PwBD"];

// Designations by Group (with Pay Levels)
export const DESIGNATIONS_BY_GROUP = {
    "Group IV": [
        "Junior Scientist - PayLevel 10",
        "Scientist - PayLevel 11",
        "Senior Scientist - PayLevel 12",
        "Principal Scientist - PayLevel 13",
        "Senior Principal Scientist - PayLevel 13A",
        "Chief Scientist - PayLevel 14"
    ],
    "Group III": [
        "Technical Assistant - PayLevel 6",
        "Technical Officer - PayLevel 7",
        "Senior Technical Officer 1 - PayLevel 10",
        "Senior Technical Officer 2 - PayLevel 11",
        "Senior Technical Officer 3 - PayLevel 12",
        "Principal Technical Officer - PayLevel 13"
    ],
    "Group II": [
        "Technical 1 - PayLevel 2",
        "Technical 2 - PayLevel 5",
        "Senior Technical 1 - PayLevel 6",
        "Senior Technical 2 - PayLevel 7",
        "Senior Technical 3 - PayLevel 8"
    ],
    "Group I": [
        "Lab. Attendant 1 - PayLevel 1",
        "Lab. Attendant 2 - PayLevel 2",
        "Lab. Assistant - PayLevel 5"
    ],
    "N/A": ["N/A"]
};
