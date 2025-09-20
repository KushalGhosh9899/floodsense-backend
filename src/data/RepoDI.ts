import { RegionsRepoImpl } from "./repositories/Impl/RegionsRepoImpl";
import { WaterLevelsRepoImpl } from "./repositories/Impl/WaterLevelsRepoImpl";
import { RegionsRepo } from "./repositories/RegionsRepo";
import { WaterLevelsRepo } from "./repositories/WaterLevelsRepo";

export class RepoDI {
    // Singleton instance
    private static regionsRepoInstance: RegionsRepo;
    private static waterLevelsRepoInstance: WaterLevelsRepo;

    // Factory method to get the singleton instance
    public static getRegionsRepository(): RegionsRepo {
        if (!RepoDI.regionsRepoInstance) {
            RepoDI.regionsRepoInstance = new RegionsRepoImpl();
        }
        return RepoDI.regionsRepoInstance;
    }

    public static getWaterLevelsRepository(): WaterLevelsRepo {
        if (!RepoDI.waterLevelsRepoInstance) {
            RepoDI.waterLevelsRepoInstance = new WaterLevelsRepoImpl();
        }
        return RepoDI.waterLevelsRepoInstance;
    }
}
