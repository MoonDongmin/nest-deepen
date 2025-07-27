"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test1752127937567 = void 0;
class Test1752127937567 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "test"
                             (
                               id SERIAL
                             )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "test"
    `);
    }
}
exports.Test1752127937567 = Test1752127937567;
//# sourceMappingURL=1752127937567-test.js.map