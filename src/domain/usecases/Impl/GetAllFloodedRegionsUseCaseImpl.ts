import { RepoDI } from "../../../data/RepoDI";
import { RegionsRepo } from "../../../data/repositories/RegionsRepo";
import { WaterLevelsRepo } from "../../../data/repositories/WaterLevelsRepo";
import { GetFloodedAreaDTO } from "../../../presentation/DTO/Request/GetFloodedAreaDTO";
import { FloodedAreaDTO } from "../../../presentation/DTO/Response/FloodedAreaDTO";
import { GetAllFloodedRegionsUseCase } from "../GetAllFloodedRegionsUseCase";

export class GetAllFloodedRegionsUseCaseImpl implements GetAllFloodedRegionsUseCase {
    private repository: WaterLevelsRepo;
    private regionRepo: RegionsRepo;

    constructor() {
        this.repository = RepoDI.getWaterLevelsRepository();
        this.regionRepo = RepoDI.getRegionsRepository();
    }

    async execute(data: GetFloodedAreaDTO): Promise<FloodedAreaDTO[]> {
        const allFloodedAreas = await this.repository.getAllFloodedAreas();
        const parentRegionId = await this.repository.getRegionByUUID(data.region_id);

        const result: FloodedAreaDTO[] = [];

        for (const flooded of allFloodedAreas) {
            // fetch the region of the flooded area
            const region = await this.regionRepo.getRegionDetailByID(flooded.region_id);

            if (!region) continue;

            // check if its parent matches the given parentRegionId
            if (region.parent_id === parentRegionId?.id) {
                result.push({
                    region_uuid: region.uuid,
                    name: region.name,
                    description: region.description ?? "",
                    geom: region.geom,
                    flooded_at: flooded.datetime.toString(),
                });
            }
        }

        return result;
    }
}