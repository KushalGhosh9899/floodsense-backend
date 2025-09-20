import { GetFloodedAreaDTO } from "../../presentation/DTO/Request/GetFloodedAreaDTO";
import { FloodedAreaDTO } from "../../presentation/DTO/Response/FloodedAreaDTO";

export interface GetAllFloodedRegionsUseCase {
    execute(data: GetFloodedAreaDTO): Promise<FloodedAreaDTO[]>
}