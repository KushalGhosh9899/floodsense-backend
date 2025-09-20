import { DemDataEntity } from "../entities/DemDataEntity";

export class EntityMapper {
    static mapToDemEntity(data: any): DemDataEntity {
        return { 
            id: data.id, 
            region_id: data.region_id, 
            avg_elevation: data.avg_elevation 
        }
    }
}