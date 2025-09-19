export interface RegionModel {
    id: string;
    name: string;
    description?: string;
    sub_regions?: SubRegionModel[];
}

export interface SubRegionModel {
    id: string;
    name: string;
    description?: string;
}