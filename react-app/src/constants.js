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
    "Administration": [
        "General Cadre: CCO & Non-CCO",
        "F&A Cadre: CCO & Non-CCO",
        "S&P Cadre: CCO & Non-CCO",
        "Stenographic Cadre: CCO & Non-CCO",
        "MTS",
        "Canteen"
    ],
    "Isolated": ["ISO-SEC", "ISO-RAJ", "ISO-OTH"]
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
    ],
    "General Cadre: CCO & Non-CCO": [
        { name: "SO(G)", level: "L-8", subGroup: "CCO" },
        { name: "SO(G) (MACP)", level: "L-9", subGroup: "CCO" },
        { name: "SO(G) (NFS/MACP)", level: "L-10", subGroup: "CCO" },
        { name: "SO(G) (L-11)", level: "L-11", subGroup: "CCO" },
        { name: "AO / U.S.", level: "L-11", subGroup: "CCO" },
        { name: "AO / U.S. (MACP)", level: "L-12", subGroup: "CCO" },
        { name: "COA / D.S.", level: "L-12", subGroup: "CCO" },
        { name: "Senior COA / Senior D.S.", level: "L-13", subGroup: "CCO" },
        { name: "JSA (G)", level: "L-2", subGroup: "Non-CCO" },
        { name: "JSA (G) (MACP - L3)", level: "L-3", subGroup: "Non-CCO" },
        { name: "JSA (G) (MACP - L4)", level: "L-4", subGroup: "Non-CCO" },
        { name: "SSA (G) (MACP - L4)", level: "L-4", subGroup: "Non-CCO" },
        { name: "SSA (G) (MACP - L5)", level: "L-5", subGroup: "Non-CCO" },
        { name: "SSA (G) (MACP - L6)", level: "L-6", subGroup: "Non-CCO" },
        { name: "ASO (G)", level: "L-7", subGroup: "Non-CCO" },
        { name: "ASO (G) (MACP - L8)", level: "L-8", subGroup: "Non-CCO" },
        { name: "ASO (G) (MACP - L9)", level: "L-9", subGroup: "Non-CCO" }
    ],
    "F&A Cadre: CCO & Non-CCO": [
        { name: "SO(F&A)", level: "L-8", subGroup: "CCO" },
        { name: "SO(F&A) (MACP)", level: "L-9", subGroup: "CCO" },
        { name: "SO(F&A) (NFS/MACP)", level: "L-10", subGroup: "CCO" },
        { name: "SO(F&A) (MACP - L11)", level: "L-11", subGroup: "CCO" },
        { name: "F&AO", level: "L-11", subGroup: "CCO" },
        { name: "F&AO (MACP)", level: "L-12", subGroup: "CCO" },
        { name: "COFA / DFA", level: "L-12", subGroup: "CCO" },
        { name: "Senior COFA / Senior DFA", level: "L-13", subGroup: "CCO" },
        { name: "JSA (F&A)", level: "L-2", subGroup: "Non-CCO" },
        { name: "JSA (F&A) (MACP - L3)", level: "L-3", subGroup: "Non-CCO" },
        { name: "JSA (F&A) (MACP - L4)", level: "L-4", subGroup: "Non-CCO" },
        { name: "SSA (F&A)", level: "L-4", subGroup: "Non-CCO" },
        { name: "SSA (F&A) (MACP - L5)", level: "L-5", subGroup: "Non-CCO" },
        { name: "SSA (F&A) (MACP - L6)", level: "L-6", subGroup: "Non-CCO" },
        { name: "ASO (F&A)", level: "L-7", subGroup: "Non-CCO" },
        { name: "ASO (F&A) (MACP - L8)", level: "L-8", subGroup: "Non-CCO" },
        { name: "ASO (F&A) (MACP - L9)", level: "L-9", subGroup: "Non-CCO" }
    ],
    "S&P Cadre: CCO & Non-CCO": [
        { name: "SO (S&P) (L-8)", level: "L-8", subGroup: "CCO" },
        { name: "SO (S&P) (MACP)", level: "L-9", subGroup: "CCO" },
        { name: "SO (S&P) (NFS/MACP)", level: "L-10", subGroup: "CCO" },
        { name: "SO (S&P) (L-11)", level: "L-11", subGroup: "CCO" },
        { name: "SPO (L-11)", level: "L-11", subGroup: "CCO" },
        { name: "SPO (L-12)", level: "L-12", subGroup: "CCO" },
        { name: "COSP", level: "L-12", subGroup: "CCO" },
        { name: "Senior COSP", level: "L-13", subGroup: "CCO" },
        { name: "JSA (S&P)", level: "L-2", subGroup: "Non-CCO" },
        { name: "JSA (S&P) (MACP - L3)", level: "L-3", subGroup: "Non-CCO" },
        { name: "JSA (S&P) (MACP - L4)", level: "L-4", subGroup: "Non-CCO" },
        { name: "SSA (S&P)", level: "L-4", subGroup: "Non-CCO" },
        { name: "SSA (S&P) (MACP - L5)", level: "L-5", subGroup: "Non-CCO" },
        { name: "SSA (S&P) (MACP - L6)", level: "L-6", subGroup: "Non-CCO" },
        { name: "ASO (S&P)", level: "L-7", subGroup: "Non-CCO" },
        { name: "ASO (S&P) (MACP - L8)", level: "L-8", subGroup: "Non-CCO" },
        { name: "ASO (S&P) (MACP - L9)", level: "L-9", subGroup: "Non-CCO" }
    ],
    "Stenographic Cadre: CCO & Non-CCO": [
        { name: "PS", level: "L-8", subGroup: "CCO" },
        { name: "PS (MACP)", level: "L-9", subGroup: "CCO" },
        { name: "PS (NFS/MACP)", level: "L-10", subGroup: "CCO" },
        { name: "PPS", level: "L-11", subGroup: "CCO" },
        { name: "Senior PPS", level: "L-12", subGroup: "CCO" },
        { name: "PSO", level: "L-13", subGroup: "CCO" },
        { name: "Junior Steno. (L-4)", level: "L-4", subGroup: "Non-CCO" },
        { name: "Junior Steno. (L-5)", level: "L-5", subGroup: "Non-CCO" },
        { name: "Junior Steno. (L-6)", level: "L-6", subGroup: "Non-CCO" },
        { name: "Senior Steno. (L-7)", level: "L-7", subGroup: "Non-CCO" },
        { name: "Senior Steno. (L-8)", level: "L-8", subGroup: "Non-CCO" },
        { name: "Senior Steno. (L-9)", level: "L-9", subGroup: "Non-CCO" }
    ],
    "MTS": [
        { name: "Multi Tasking Staff", level: "L-1", subGroup: "N/A" },
        { name: "Multi Tasking Staff (MACP - L2)", level: "L-2", subGroup: "N/A" },
        { name: "Multi Tasking Staff (MACP - L3)", level: "L-3", subGroup: "N/A" },
        { name: "Multi Tasking Staff (MACP - L4)", level: "L-4", subGroup: "N/A" }
    ],
    "Canteen": [
        { name: "Assistant Halwai-cum-Cook/Clerk", level: "L-2", subGroup: "N/A" },
        { name: "Assistant Manager-cum-Store Keeper", level: "L-4", subGroup: "N/A" },
        { name: "Manager-cum-Accountant manager Gr. II", level: "L-6", subGroup: "N/A" }
    ],
    "ISO-SEC": [
        { name: "Security Officer (L-7)", level: "L-7", subGroup: "N/A" },
        { name: "Security Officer (L-10)", level: "L-10", subGroup: "N/A" },
        { name: "Security Officer (L-11)", level: "L-11", subGroup: "N/A" },
        { name: "Security Assistant / Watch & Ward Assistant (L-6)", level: "L-6", subGroup: "N/A" },
        { name: "Security Assistant / Watch & Ward Assistant (L-7)", level: "L-7", subGroup: "N/A" },
        { name: "Security Assistant / Watch & Ward Assistant (L-10)", level: "L-10", subGroup: "N/A" }
    ],
    "ISO-RAJ": [
        { name: "Hindi Officer", level: "L-10", subGroup: "N/A" },
        { name: "Senior Hindi Officer", level: "L-11", subGroup: "N/A" },
        { name: "Senior Hindi Officer (SG)", level: "L-12", subGroup: "N/A" },
        { name: "Junior Hindi Translator", level: "L-6", subGroup: "N/A" },
        { name: "Senior Hindi Translator", level: "L-7", subGroup: "N/A" }
    ],
    "ISO-OTH": [
        { name: "Receptionist (L-6)", level: "L-6", subGroup: "N/A" },
        { name: "Receptionist (L-7)", level: "L-7", subGroup: "N/A" },
        { name: "Receptionist (L-8)", level: "L-8", subGroup: "N/A" },
        { name: "Receptionist (L-10)", level: "L-10", subGroup: "N/A" },
        { name: "Car Driver (L-2)", level: "L-2", subGroup: "N/A" },
        { name: "Car Driver (L-4)", level: "L-4", subGroup: "N/A" },
        { name: "Car Driver (L-5)", level: "L-5", subGroup: "N/A" },
        { name: "Car Driver (L-6)", level: "L-6", subGroup: "N/A" }
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
