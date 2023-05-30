/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Consumer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Consumer_email_key" ON "Consumer"("email");
