-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "characterName" TEXT,
    "class" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "magicItems" JSONB NOT NULL,
    "strength" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");
