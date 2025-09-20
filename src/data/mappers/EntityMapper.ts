import { DemDataEntity } from "../entities/DemDataEntity";
import { FloodAreasEntity } from "../entities/FloodAreasEntity";

export class EntityMapper {
    static mapToDemEntity(data: any): DemDataEntity {
        return {
            id: data.id,
            region_id: data.region_id,
            avg_elevation: data.avg_elevation
        }
    }
    static mapToFloodAreasEntity(data: any): FloodAreasEntity {
        return {
            id: data.id,
            region_id: data.region_id,
            datetime: data.datetime
        }
    }
}