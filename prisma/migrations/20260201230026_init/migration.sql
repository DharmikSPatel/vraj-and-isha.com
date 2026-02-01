-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NO_RESPONSE', 'ATTENDING', 'NOT_ATTENDING');

-- CreateTable
CREATE TABLE "guests" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isAttending" "Status" NOT NULL DEFAULT 'NO_RESPONSE',
    "head_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_head_id_fkey" FOREIGN KEY ("head_id") REFERENCES "guests"("id") ON DELETE SET NULL ON UPDATE CASCADE;
