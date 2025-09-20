import { RegionEntity } from "../../data/entities/RegionEntity";
import { RegionModel } from "../models/RegionModel";

export class RegionsUseCaseMapper {
    /**
     * Convert flat RegionEntity array into RegionModel with nested sub_regions
     */
    static toDomain(regions: RegionEntity[]): RegionModel[] {
        const regionMap = new Map<number, RegionModel>();

        // First, create all parent RegionModels
        regions.forEach((r) => {
            if (!r.parent_id || r.parent_id === -1) {
                regionMap.set(r.id, {
                    id: r.uuid,
                    name: r.name,
                    description: r.description ?? "",
                    sub_regions: [],
                });
            }
        });

        // Then, assign subregions
        regions.forEach((r) => {
            if (r.parent_id && r.parent_id !== -1) {
                const parent = regionMap.get(r.parent_id);
                if (parent) {
                    parent.sub_regions!.push({
                        id: r.uuid,
                        name: r.name,
                        description: r.description ?? ""
                    });
                }
            }
        });

        // Return all parent regions as array
        return Array.from(regionMap.values());
    }
}
