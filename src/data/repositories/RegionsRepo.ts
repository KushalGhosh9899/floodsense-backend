import { RegionEntity } from "../entities/RegionEntity";

export interface RegionsRepo {
    getAllRegions(): Promise<RegionEntity[]>;
    getRegionDetailByID(region_id: number): Promise<RegionEntity>;
    getAllSubRegions(region_id: number): Promise<RegionEntity[]>;
}
