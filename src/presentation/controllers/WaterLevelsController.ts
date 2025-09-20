import { Request, Response } from "express";
import { AddWaterLevelUseCaseImpl } from "../../domain/usecases/Impl/AddWaterLevelUseCaseImpl";
import { AddWaterLevelDTO } from "../DTO/Request/AddWaterLevelDTO";
import { ErrorResponse, SuccessResponse } from "../DTO/Response/ResponseDTO";

export class WaterLevelsController {
  private addWaterLevelUseCase = new AddWaterLevelUseCaseImpl();

  async addWaterLevel(req: Request, res: Response) {
    try {
      const body = req.body as Partial<AddWaterLevelDTO>;

      // Basic validation
      if (!body.region_id || typeof body.region_id !== "string") {
        return res.status(400).json(new ErrorResponse("region_id (uuid) is required"));
      }
      if (
        body.levels_in_meters === undefined ||
        typeof body.levels_in_meters !== "number"
      ) {
        return res.status(400).json(new ErrorResponse("levels_in_meters must be a number"));
      }

      const dto: AddWaterLevelDTO = {
        region_id: body.region_id,
        levels_in_meters: body.levels_in_meters,
      };

      const result = await this.addWaterLevelUseCase.execute(dto);

      if (result) {
        return res.json(new SuccessResponse(true, "Water level added successfully"));
      } else {
        return res.status(404).json(new ErrorResponse("Region not found"));
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(new ErrorResponse("Internal server error"));
    }
  }
}
