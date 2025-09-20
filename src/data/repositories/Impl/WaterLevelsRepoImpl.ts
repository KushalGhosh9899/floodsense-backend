import { DemDataEntity } from "../../entities/DemDataEntity";
import { FloodAreasEntity } from "../../entities/FloodAreasEntity";
import { RegionEntity } from "../../entities/RegionEntity";
import { EntityMapper } from "../../mappers/EntityMapper";
import { RegionsMapper } from "../../mappers/RegionsMapper";
import { DbClient } from "../../PrismaClient";
import { WaterLevelsRepo } from "../WaterLevelsRepo";

export class WaterLevelsRepoImpl implements WaterLevelsRepo {
    async addWaterLevel(region_uuid: string, level: number): Promise<boolean> {
        // Check region existence
        const region = await DbClient.regions.findUnique({
            where: { uuid: region_uuid },
        });

        if (!region) {
            console.error("Region not found");
            return false;
        }

        // Insert water level
        await DbClient.water_levels.create({
            data: {
                region_id: region.id,
                levels_in_meters: level,
            },
        });
        return true;
    }
    // Fetch region by UUID
    async getRegionByUUID(region_uuid: string): Promise<RegionEntity | null> {
        const regions = await DbClient.$queryRawUnsafe<any>(
            `
      SELECT 
        id, uuid, name, description, parent_id,
        ST_AsGeoJSON(geom)::json as geom
      FROM regions
      WHERE uuid = $1::uuid
    `,
            region_uuid
        );

        if (!regions || regions.length === 0) return null;

        const region = regions[0];

        return RegionsMapper.toEntity(region);
    }

    // Fetch DEM data by region ID
    async getDemDataByRegionId(region_id: number): Promise<DemDataEntity[]> {
        const demRecords = await DbClient.dem_data.findMany({
            where: { region_id },
        });

        return demRecords.map(
            (d) => EntityMapper.mapToDemEntity(d)
        );
    }

    // Mark a region as flooded
    async markFlooded(region_id: number): Promise<boolean> {
        try {
            await DbClient.flood_impact_area.create({
                data: { region_id },
            });
            return true;
        } catch (err) {
            console.error("Failed to mark region as flooded", err);
            return false;
        }
    }
    async getDemListOfSubRegionsByRegionId(region_id: number): Promise<DemDataEntity[]> {
        // Step 1: Get all subregions where parent_id = region_id
        const subRegions = await DbClient.regions.findMany({
            where: { parent_id: region_id },
            select: { id: true },
        });

        const subRegionIds = subRegions.map(r => r.id);

        if (subRegionIds.length === 0) {
            return [];
        }

        // Step 2: Fetch DEM data for all those subregions
        const demRecords = await DbClient.dem_data.findMany({
            where: {
                region_id: { in: subRegionIds },
            },
        });

        // Step 3: Map to entities
        return demRecords.map((d) => EntityMapper.mapToDemEntity(d));
    }

    async getAllFloodedAreas(): Promise<FloodAreasEntity[] | []> {
        const floodedAreas = await DbClient.flood_impact_area.findMany({
            include: {
                regions: true,
            },
        });

        if (!floodedAreas || floodedAreas.length === 0) return [];

        return floodedAreas.map(fa => EntityMapper.mapToFloodAreasEntity(fa));
    }

}
