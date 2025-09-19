-- CreateTable
CREATE TABLE "public"."dem_data" (
    "id" SERIAL NOT NULL,
    "region_id" INTEGER,
    "avg_elevation" INTEGER,

    CONSTRAINT "dem_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."flood_impact_area" (
    "id" SERIAL NOT NULL,
    "region_id" INTEGER,
    "datetime" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flood_impact_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."regions" (
    "id" SERIAL NOT NULL,
    "uuid" UUID DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "geom" geometry NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."water_levels" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "levels_in_meters" DECIMAL(6,2) NOT NULL,
    "region_id" INTEGER,

    CONSTRAINT "water_levels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."dem_data" ADD CONSTRAINT "dem_data_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."flood_impact_area" ADD CONSTRAINT "fk_region" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."regions" ADD CONSTRAINT "fk_regions_parent" FOREIGN KEY ("parent_id") REFERENCES "public"."regions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."water_levels" ADD CONSTRAINT "water_levels_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
