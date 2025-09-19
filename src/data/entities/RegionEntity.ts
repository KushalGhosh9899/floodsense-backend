export interface RegionEntity {
    id: number;           // DB primary key
    uuid: string;         // UUID column
    name: string;         // Region name
    description: string;  // Region description
    parent_id: number | null; // Parent region ID
    geom?: any;            // Geometry field from PostGIS 
}
