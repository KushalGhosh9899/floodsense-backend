import { RegionModel } from '../models/RegionModel';

export interface GetAllRegionsUseCase {
    execute(): Promise<RegionModel[]>
}
