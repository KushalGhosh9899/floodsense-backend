import { AddWaterLevelDTO } from "../../presentation/DTO/Request/AddWaterLevelDTO";

export interface AddWaterLevelUseCase {
    execute(data:AddWaterLevelDTO): Promise<boolean>;
}
