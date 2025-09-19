import { RegionsRepoImpl } from "./repositories/Impl/RegionsRepoImpl";
import { RegionsRepo } from "./repositories/RegionsRepo";

export class RepoDI {
    // Singleton instance
    private static regionsRepoInstance: RegionsRepo;

    // Factory method to get the singleton instance
    public static getRegionsRepository(): RegionsRepo {
        if (!RepoDI.regionsRepoInstance) {
            RepoDI.regionsRepoInstance = new RegionsRepoImpl();
        }
        return RepoDI.regionsRepoInstance;
    }
}
