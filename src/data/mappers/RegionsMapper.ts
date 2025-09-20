import { RegionEntity } from "../entities/RegionEntity";

export class RegionsMapper {
    static toEntityList(prismaRegions: any[]): RegionEntity[] {
        return prismaRegions.map((prismaRegion) => ({
            id: prismaRegion.id,
            uuid: prismaRegion.uuid,
            name: prismaRegion.name,
            description: prismaRegion.description,
            parent_id: prismaRegion.parent_id,
            geom: prismaRegion.geom,
        }));
    }
    static toEntity(region: any): RegionEntity {
        return {
            id: region.id,
            uuid: region.uuid ?? '',
            name: region.name,
            description: region.description ?? '',
            parent_id: region.parent_id ?? -1,
            geom: region.geom,
        };
    }
}