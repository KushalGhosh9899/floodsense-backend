import { Request, Response } from "express";
import { AddWaterLevelDTO } from "../DTO/Request/AddWaterLevelDTO";
import { ErrorResponse, SuccessResponse } from "../DTO/Response/ResponseDTO";
import { GetFloodedAreaDTO } from "../DTO/Request/GetFloodedAreaDTO";
import { Utility } from "../../common/utility";
import { AddWaterLevelUseCase } from "../../domain/usecases/AddWaterLevelUseCase";
import { UseCaseDI } from "../../domain/UseCaseDI";
import { GetAllFloodedRegionsUseCase } from "../../domain/usecases/GetAllFloodedRegionsUseCase";
import { AnalyseFloodImpactDTO } from "../DTO/Request/AnalyseFloodImpactDTO";
import { AnalyseFloodImpactUseCase } from "../../domain/usecases/AnalyseFloodImpactUseCase";

export class WaterLevelsController {
  private addWaterLevelUseCase: AddWaterLevelUseCase;
  private getAllFloodedRegionsUseCase: GetAllFloodedRegionsUseCase;
  private analyseFloodImpactUseCase: AnalyseFloodImpactUseCase
  constructor() {
    this.addWaterLevelUseCase = UseCaseDI.addWaterLevelUseCase();
    this.getAllFloodedRegionsUseCase = UseCaseDI.getAllFloodedRegionsUseCase();
    this.analyseFloodImpactUseCase = UseCaseDI.analyseFloodImpactUseCase();
  }

  async addWaterLevel(req: Request, res: Response) {
    try {
      const body = req.body as Partial<AddWaterLevelDTO>;

      // Basic validation
      if (!body.region_id || typeof body.region_id !== "string") {
        return res.status(400).json(new ErrorResponse("region_id (uuid) is required"));
      }

      if (!Utility.validateUUID(body.region_id)) {
        res.status(400).json(new ErrorResponse("region_id must be a valid UUID"));
        return null;
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

  async getFloodImpactedArea(req: Request, res: Response) {
    try {
      const body = req.body as Partial<GetFloodedAreaDTO>;

      // Basic validation
      if (!body.region_id || typeof body.region_id !== "string") {
        return res.status(400).json(new ErrorResponse("region_id (uuid) is required"));
      }

      if (!Utility.validateUUID(body.region_id)) {
        res.status(400).json(new ErrorResponse("region_id must be a valid UUID"));
        return null;
      }

      // from date
      if (!body.from_in_ddMMyyHHmmss || typeof body.from_in_ddMMyyHHmmss !== "string") {
        res.status(400).json(new ErrorResponse("from_in_ddMMyyHHmmss is required and must be a string"));
        return null;
      }
      const fromDate = Utility.parseDDMMYYHHMMSS(body.from_in_ddMMyyHHmmss);
      if (!fromDate) {
        res.status(400).json(new ErrorResponse("from_in_ddMMyyHHmmss must be in ddMMyyHHmmss format"));
        return null;
      }

      // to date
      if (!body.to_in_ddMMyyHHmmss || typeof body.to_in_ddMMyyHHmmss !== "string") {
        res.status(400).json(new ErrorResponse("to_in_ddMMyyHHmmss is required and must be a string"));
        return null;
      }
      const toDate = Utility.parseDDMMYYHHMMSS(body.to_in_ddMMyyHHmmss);
      if (!toDate) {
        res.status(400).json(new ErrorResponse("to_in_ddMMyyHHmmss must be in ddMMyyHHmmss format"));
        return null;
      }

      // check chronological order
      if (fromDate >= toDate) {
        res.status(400).json(new ErrorResponse("from_in_ddMMyyHHmmss must be earlier than to_in_ddMMyyHHmmss"));
        return null;
      }

      const dto: GetFloodedAreaDTO = {
        region_id: body.region_id,
        from_in_ddMMyyHHmmss: body.from_in_ddMMyyHHmmss,
        to_in_ddMMyyHHmmss: body.to_in_ddMMyyHHmmss
      };

      const result = await this.getAllFloodedRegionsUseCase.execute(dto);

      if (result.length != 0) {
        return res.json(new SuccessResponse(result, "Flood impacted areas"));
      } else {
        return res.status(404).json(new ErrorResponse("No Flood Impacted Area Found"));
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(new ErrorResponse("Internal server error"));
    }
  }
  async analyseFloodImpactedArea(req: Request, res: Response){
    try {
      const body = req.body as Partial<AnalyseFloodImpactDTO>;

      // Basic validation
      if (!body.region_id || typeof body.region_id !== "string") {
        return res.status(400).json(new ErrorResponse("region_id (uuid) is required"));
      }

      if (!Utility.validateUUID(body.region_id)) {
        res.status(400).json(new ErrorResponse("region_id must be a valid UUID"));
        return null;
      }

      if (
        body.water_levels_in_meters === undefined ||
        typeof body.water_levels_in_meters !== "number"
      ) {
        return res.status(400).json(new ErrorResponse("water_levels_in_meters must be a number"));
      }

      const dto: AnalyseFloodImpactDTO = {
        region_id: body.region_id,
        water_levels_in_meters:body.water_levels_in_meters
      };

      const result = await this.analyseFloodImpactUseCase.execute(dto);

      if (result.length != 0) {
        return res.json(new SuccessResponse(result, "Analysis of flood impacted areas"));
      } else {
        return res.status(404).json(new ErrorResponse("No Flood Impacted Area Found"));
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(new ErrorResponse("Internal server error"));
    }
  }
}
