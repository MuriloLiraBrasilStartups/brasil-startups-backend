-- CreateTable
CREATE TABLE "calling_applications" (
    "id" TEXT NOT NULL,
    "callingId" TEXT NOT NULL,
    "userId" TEXT,
    "applicantName" TEXT NOT NULL,
    "applicantEmail" TEXT NOT NULL,
    "stepData" JSONB NOT NULL,
    "score" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "calling_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "calling_applications_callingId_idx" ON "calling_applications"("callingId");

-- CreateIndex
CREATE INDEX "calling_applications_applicantEmail_idx" ON "calling_applications"("applicantEmail");

-- AddForeignKey
ALTER TABLE "calling_applications" ADD CONSTRAINT "calling_applications_callingId_fkey" FOREIGN KEY ("callingId") REFERENCES "callings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calling_applications" ADD CONSTRAINT "calling_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
