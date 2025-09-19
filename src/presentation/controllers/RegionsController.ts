// presentation/controllers/RegionsController.ts
import { Request, Response } from "express";
import { GetAllRegionsUseCase } from "../../domain/usecases/GetAllRegionsUseCase";
import { ErrorResponse, SuccessResponse } from "../DTO/Response/ResponseDTO";
import { RegionModel } from "../../domain/models/RegionModel";
import { UseCaseDI } from "../../domain/UseCaseDI";

export class RegionsController {
    private getRegionsUseCase: GetAllRegionsUseCase;

    constructor() {
        this.getRegionsUseCase = UseCaseDI.getRegionsUseCase();
    }

    async getRegions(req: Request, res: Response) {
        try {
            const regions: RegionModel[] = await this.getRegionsUseCase.execute();
            
            const response: SuccessResponse<RegionModel[]> = {
                success: true,
                data: regions,
                message: 'Regions fetched successfully',
            };

            res.json(response);
        } catch (err) {
            
            const errorResponse = new ErrorResponse('DB query failed');
            res.status(500).json(errorResponse);
        }
    }
}
