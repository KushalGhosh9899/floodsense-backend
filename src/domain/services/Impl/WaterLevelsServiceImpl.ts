// domain/services/impl/WaterLevelsServiceImpl.ts
import { WaterLevelsService } from "../WaterLevelsService";
import { WaterLevelsRepo } from "../../../data/repositories/WaterLevelsRepo";
import { RepoDI } from "../../../data/RepoDI";
import { AddWaterLevelDTO } from "../../../presentation/DTO/Request/AddWaterLevelDTO";

export class WaterLevelsServiceImpl implements WaterLevelsService {
    private repo: WaterLevelsRepo;

    constructor() {
        this.repo = RepoDI.getWaterLevelsRepository(); // DI
    }

    async addWaterLevelAndCheckFlood(input: AddWaterLevelDTO): Promise<boolean> {
        // Check if region exists
        const region = await this.repo.getRegionByUUID(input.region_id);
        if (!region) {
            console.error("Region not found");
            return false;
        }

        // Add water level
        const added = await this.repo.addWaterLevel(input.region_id, input.levels_in_meters);
        if (!added) return false;

        // Get DEM data of subregions
        const demDataList = await this.repo.getDemListOfSubRegionsByRegionId(region.id);
        if (!demDataList || demDataList.length === 0) return true; // No DEM so skip flooding

        // For each subregion DEM, check if flooded
        for (const dem of demDataList) {
            if (dem.avg_elevation !== null && dem.avg_elevation < input.levels_in_meters) {
                await this.repo.markFlooded(dem.region_id!); 
            }
        }

        return true;
    }
}
