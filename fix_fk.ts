import { AppDataSource } from "./src/shared/typeorm/data-source";

AppDataSource.initialize().then(async () => {
    try {
        await AppDataSource.query(`ALTER TABLE "jogos" DROP CONSTRAINT "FK_9d827be8b29c23e8dc1bf3bb302"`);
    } catch(err) {} // ignore if doesn't exist
    
    await AppDataSource.query(`ALTER TABLE "jogos" ADD CONSTRAINT "FK_9d827be8b29c23e8dc1bf3bb302" FOREIGN KEY ("estudio_id") REFERENCES "estudios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    console.log("Success");
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
