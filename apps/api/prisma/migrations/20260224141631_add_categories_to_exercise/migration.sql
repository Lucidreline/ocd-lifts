-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "categories" TEXT[];

-- AlterTable
ALTER TABLE "PR" ALTER COLUMN "score" SET DATA TYPE DOUBLE PRECISION;
