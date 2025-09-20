import { WaterLevelsRepo } from "../../../data/repositories/WaterLevelsRepo";
import { RepoDI } from "../../../data/RepoDI";
import { AddWaterLevelUseCase } from "../../../domain/usecases/AddWaterLevelUseCase";
import { WaterLevelsServiceImpl } from "../../services/Impl/WaterLevelsServiceImpl";
import { AddWaterLevelDTO } from "../../../presentation/DTO/Request/AddWaterLevelDTO";

export class AddWaterLevelUseCaseImpl implements AddWaterLevelUseCase {
    private service: WaterLevelsServiceImpl;

    constructor() {
        this.service = new WaterLevelsServiceImpl();
    }

    async execute(data:AddWaterLevelDTO): Promise<boolean> {
        return await this.service.addWaterLevelAndCheckFlood(data);
    }
}
