-- CreateTable
CREATE TABLE "disease_contaminations" (
    "id" TEXT NOT NULL,
    "disease" TEXT NOT NULL,
    "report" TEXT NOT NULL,
    "contamination_date" TIMESTAMP(3) NOT NULL,
    "symptomatic" BOOLEAN,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "disease_contaminations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "disease_contaminations_id_key" ON "disease_contaminations"("id");

-- AddForeignKey
ALTER TABLE "disease_contaminations" ADD CONSTRAINT "disease_contaminations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
