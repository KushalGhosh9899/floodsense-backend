import { AnalyseFloodImpactDTO } from "../../presentation/DTO/Request/AnalyseFloodImpactDTO";
import { FloodedAreaDTO } from "../../presentation/DTO/Response/FloodedAreaDTO";

export interface AnalyseFloodImpactUseCase {
    execute(data: AnalyseFloodImpactDTO): Promise<FloodedAreaDTO[]>
}