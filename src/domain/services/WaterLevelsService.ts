import { AddWaterLevelDTO } from "../../presentation/DTO/Request/AddWaterLevelDTO";

export interface WaterLevelsService {
    addWaterLevelAndCheckFlood(input: AddWaterLevelDTO): Promise<boolean>;
}
