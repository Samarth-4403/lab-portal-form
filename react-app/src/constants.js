// List of all CSIR labs - SORTED ALPHABETICALLY
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

// Departments
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

// Designations by Group
export const DESIGNATIONS_BY_GROUP = {
    "Group IV": [
        { name: "Junior Scientist", level: "L-10" },
        { name: "Scientist", level: "L-11" },
        { name: "Senior Scientist", level: "L-12" },
        { name: "Principal Scientist", level: "L-13" },
        { name: "Senior Principal Scientist", level: "L-13A" },
        { name: "Chief Scientist", level: "L-14" }
    ],
    "Group III": [
        { name: "Technical Assistant", level: "L-6" },
        { name: "Technical Officer", level: "L-7" },
        { name: "Senior Technical Officer 1", level: "L-10" },
        { name: "Senior Technical Officer 2", level: "L-11" },
        { name: "Senior Technical Officer 3", level: "L-12" },
        { name: "Principal Technical Officer", level: "L-13" }
    ],
    "Group II": [
        { name: "Technical 1", level: "L-2" },
        { name: "Technical 2", level: "L-5" },
        { name: "Senior Technical 1", level: "L-6" },
        { name: "Senior Technical 2", level: "L-7" },
        { name: "Senior Technical 3", level: "L-8" }
    ],
    "Group I": [
        { name: "Lab. Attendant 1", level: "L-1" },
        { name: "Lab. Attendant 2", level: "L-2" },
        { name: "Lab. Assistant", level: "L-5" }
    ],
    "N/A": [
        { name: "N/A", level: "N/A" }
    ]
};

// Helper: get level from designation name and group
export function getLevel(group, designationName) {
    const designations = DESIGNATIONS_BY_GROUP[group] || [];
    const match = designations.find(d => d.name === designationName);
    return match ? match.level : "N/A";
}

// Default data fields for a new entry (table input columns)
export function createDefaultDataFields() {
    const emptyMfo = () => ({ m: 0, f: 0, o: 0 });
    
    return {
        // Categories with nested M/F/O
        gen: emptyMfo(),
        sc: emptyMfo(),
        st: emptyMfo(),
        obc: emptyMfo(),
        ews: emptyMfo(),
        
        // PWD with nested M/F/O
        oh: emptyMfo(),
        hh: emptyMfo(),
        vh: emptyMfo(),
        dbe: emptyMfo(),

        // Others
        exServiceMan: emptyMfo(),
        minorityCommunity: emptyMfo()
    };
}
