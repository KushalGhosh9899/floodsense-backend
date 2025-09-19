import { RegionEntity } from "../entities/RegionEntity";

export class RegionsMapper {
    static toEntity(prismaRegions: any[]): RegionEntity[] {
        return prismaRegions.map((prismaRegion) => ({
            id: prismaRegion.id,
            uuid: prismaRegion.uuid,
            name: prismaRegion.name,
            description: prismaRegion.description,
            parent_id: prismaRegion.parent_id,
            geom: prismaRegion.geom,
        }));
    }
}