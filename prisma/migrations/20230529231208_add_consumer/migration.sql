/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Consumer" (
    "id" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "pronouns" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "mrn" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Consumer_pkey" PRIMARY KEY ("id")
);
