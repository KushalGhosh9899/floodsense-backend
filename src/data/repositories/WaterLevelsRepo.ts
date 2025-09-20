import { DemDataEntity } from "../entities/DemDataEntity";
import { RegionEntity } from "../entities/RegionEntity";

export interface WaterLevelsRepo {
    addWaterLevel(region_uuid: string, level: number): Promise<boolean>;
    getRegionByUUID(region_uuid: string): Promise<RegionEntity | null>;
    getDemDataByRegionId(region_id: number): Promise<DemDataEntity[]>;
    markFlooded(region_id: number): Promise<boolean>;
    getDemListOfSubRegionsByRegionId(region_id: number): Promise<DemDataEntity[]>;
}
