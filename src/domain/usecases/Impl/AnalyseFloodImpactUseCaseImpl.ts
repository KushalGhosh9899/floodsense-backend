import { RepoDI } from "../../../data/RepoDI";
import { RegionsRepo } from "../../../data/repositories/RegionsRepo";
import { WaterLevelsRepo } from "../../../data/repositories/WaterLevelsRepo";
import { AnalyseFloodImpactDTO } from "../../../presentation/DTO/Request/AnalyseFloodImpactDTO";
import { FloodedAreaDTO } from "../../../presentation/DTO/Response/FloodedAreaDTO";
import { AnalyseFloodImpactUseCase } from "../AnalyseFloodImpactUseCase";

export class AnalyseFloodImpactUseCaseImpl implements AnalyseFloodImpactUseCase {
    private repository: WaterLevelsRepo;
    private regionRepo: RegionsRepo;

    constructor() {
        this.repository = RepoDI.getWaterLevelsRepository();
        this.regionRepo = RepoDI.getRegionsRepository();
    }

    async execute(data: AnalyseFloodImpactDTO): Promise<FloodedAreaDTO[]> {
        const parentRegion = await this.repository.getRegionByUUID(data.region_id);
        if (!parentRegion) return [];

        const allSubRegions = await this.regionRepo.getAllSubRegions(parentRegion.id);

        const result: FloodedAreaDTO[] = [];

        for (const subRegion of allSubRegions) {
            // Get full region info
            const demSubRegion = await this.repository.getDemDetailByRegionId(subRegion.id)
            const regionDetail = await this.regionRepo.getRegionDetailByID(subRegion.id);
            if (!regionDetail) continue;

            // Check flooding condition
            const isBelowWaterLevel = demSubRegion.avg_elevation < data.water_levels_in_meters;

            if (isBelowWaterLevel) {
                result.push({
                    region_uuid: regionDetail.uuid,
                    name: regionDetail.name,
                    description: regionDetail.description ?? '',
                    geom: regionDetail.geom,
                    flooded_at: new Date().toString(), // realtime
                });
            }
        }

        return result;
    }
}