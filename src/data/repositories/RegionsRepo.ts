import { RegionEntity } from "../entities/RegionEntity";

export interface RegionsRepo {
    getAllRegions(): Promise<RegionEntity[]>;
}
