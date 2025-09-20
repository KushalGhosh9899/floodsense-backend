import { AddWaterLevelUseCase } from "./usecases/AddWaterLevelUseCase";
import { GetAllFloodedRegionsUseCase } from "./usecases/GetAllFloodedRegionsUseCase";
import { GetAllRegionsUseCase } from "./usecases/GetAllRegionsUseCase";
import { AddWaterLevelUseCaseImpl } from "./usecases/Impl/AddWaterLevelUseCaseImpl";
import { GetAllFloodedRegionsUseCaseImpl } from "./usecases/Impl/GetAllFloodedRegionsUseCaseImpl";
import { GetAllRegionsUseCaseImpl } from "./usecases/Impl/GetAllRegionsUseCaseImpl";

export class UseCaseDI {
    // Singleton instances
    private static getRegionsUseCaseInstance: GetAllRegionsUseCase;
    private static addWaterLevelsUseCaseInstance: AddWaterLevelUseCase;
    private static getAllFloodedRegionsUseCaseInstance: GetAllFloodedRegionsUseCase;

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
    public static getAllFloodedRegionsUseCase(): GetAllFloodedRegionsUseCase {
        if (!UseCaseDI.getAllFloodedRegionsUseCaseInstance) {
            UseCaseDI.getAllFloodedRegionsUseCaseInstance = new GetAllFloodedRegionsUseCaseImpl();
        }
        return UseCaseDI.getAllFloodedRegionsUseCaseInstance;
    }
}
