import { AddWaterLevelUseCase } from "./usecases/AddWaterLevelUseCase";
import { GetAllRegionsUseCase } from "./usecases/GetAllRegionsUseCase";
import { AddWaterLevelUseCaseImpl } from "./usecases/Impl/AddWaterLevelUseCaseImpl";
import { GetAllRegionsUseCaseImpl } from "./usecases/Impl/GetAllRegionsUseCaseImpl";

export class UseCaseDI {
    // Singleton instances
    private static getRegionsUseCaseInstance: GetAllRegionsUseCase;
    private static addWaterLevelsUseCaseInstance: AddWaterLevelUseCase;

    // Factory method to get GetRegionsUseCase singleton
    public static getRegionsUseCase(): GetAllRegionsUseCase {
        if (!UseCaseDI.getRegionsUseCaseInstance) {
            UseCaseDI.getRegionsUseCaseInstance = new GetAllRegionsUseCaseImpl();
        }
        return UseCaseDI.getRegionsUseCaseInstance;
    }
    public static addWaterLevelUseCase(): AddWaterLevelUseCase {
        if (!UseCaseDI.addWaterLevelsUseCaseInstance) {
            UseCaseDI.addWaterLevelsUseCaseInstance = new AddWaterLevelUseCaseImpl();
        }
        return UseCaseDI.addWaterLevelsUseCaseInstance;
    }
}
