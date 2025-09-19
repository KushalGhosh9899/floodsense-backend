import { GetAllRegionsUseCase } from "./usecases/GetAllRegionsUseCase";
import { GetAllRegionsUseCaseImpl } from "./usecases/Impl/GetAllRegionsUseCaseImpl";

export class UseCaseDI {
    // Singleton instances
    private static getRegionsUseCaseInstance: GetAllRegionsUseCase;

    // Factory method to get GetRegionsUseCase singleton
    public static getRegionsUseCase(): GetAllRegionsUseCase {
        if (!UseCaseDI.getRegionsUseCaseInstance) {
            UseCaseDI.getRegionsUseCaseInstance = new GetAllRegionsUseCaseImpl();
        }
        return UseCaseDI.getRegionsUseCaseInstance;
    }
}
