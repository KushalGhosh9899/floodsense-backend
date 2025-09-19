import { RepoDI } from '../../../data/RepoDI';
import { RegionsRepo } from '../../../data/repositories/RegionsRepo';
import { RegionsUseCaseMapper } from '../../mappers/RegionsUseCaseMapper';
import { RegionModel } from '../../models/RegionModel';
import { GetAllRegionsUseCase } from '../GetAllRegionsUseCase';

export class GetAllRegionsUseCaseImpl implements GetAllRegionsUseCase {
    private repository: RegionsRepo;

    constructor() {
        this.repository = RepoDI.getRegionsRepository();
    }

    async execute(): Promise<RegionModel[]> {
        const regionEntities = await this.repository.getAllRegions();

        // Map entities to domain models with subregions
        return RegionsUseCaseMapper.toDomain(regionEntities);
    }
}
