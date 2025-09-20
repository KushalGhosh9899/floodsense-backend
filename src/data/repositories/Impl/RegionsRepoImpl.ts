import { DbClient } from "../../PrismaClient";
import { RegionsRepo } from "../RegionsRepo";
import { RegionsMapper } from "../../mappers/RegionsMapper";
import { RegionEntity } from "../../entities/RegionEntity";

export class RegionsRepoImpl implements RegionsRepo {
    async getAllRegions(): Promise<RegionEntity[]> {
        const regions = await DbClient.regions.findMany();
        return RegionsMapper.toEntityList(regions);
    }
}