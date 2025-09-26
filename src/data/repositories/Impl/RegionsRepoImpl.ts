import { DbClient } from "../../PrismaClient";
import { RegionsRepo } from "../RegionsRepo";
import { RegionsMapper } from "../../mappers/RegionsMapper";
import { RegionEntity } from "../../entities/RegionEntity";

export class RegionsRepoImpl implements RegionsRepo {
    async getAllRegions(): Promise<RegionEntity[]> {
        const regions = await DbClient.regions.findMany();
        return RegionsMapper.toEntityList(regions);
    }
    async getRegionDetailByID(region_id: number): Promise<RegionEntity> {
        const regions = await DbClient.$queryRawUnsafe<any>(
            `
      SELECT 
        id, uuid, name, description, parent_id,
        ST_AsGeoJSON(geom)::json as geom
      FROM regions
      WHERE id = $1::int
    `,
            region_id
        );

        if (!regions || regions.length === 0) {
            throw new Error("Region not found");
        }

        const region = regions[0];

        return RegionsMapper.toEntity(region);
    }


    async getAllSubRegions(region_id: number): Promise<RegionEntity[]>{
        const regions = await DbClient.$queryRawUnsafe<any>(
            `
      SELECT 
        id, uuid, name, description, parent_id,
        ST_AsGeoJSON(geom)::json as geom
      FROM regions
      WHERE parent_id = $1::int
    `,
            region_id
        );

        if (!regions || regions.length === 0) {
            throw new Error("No subregions found");
        }

        return RegionsMapper.toEntityList(regions);
    }


}