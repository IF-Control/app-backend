-- CreateTable
CREATE TABLE "health_tips" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER,
    "image" TEXT NOT NULL,

    CONSTRAINT "health_tips_pkey" PRIMARY KEY ("id")
);
