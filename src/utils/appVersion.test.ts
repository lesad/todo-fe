import { globals } from "src/testUtils";
import { printAppVersion } from "./appVersion";

describe("utils", () => {
    describe("appVersion", () => {
        describe("printAppVersion", () => {
            const logSpy = jest.spyOn(global.console, "log");
            const { NAME, VERSION, COMMIT_HASH, LAST_COMMIT_DATETIME, BUILD_TIME } = globals.APP_INFO;

            it("logs application info to console", () => {
                printAppVersion();
                expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(NAME), expect.anything(), expect.anything());
                expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(VERSION), expect.anything(), expect.anything());
                expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(COMMIT_HASH), expect.anything(), expect.anything());
                expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(LAST_COMMIT_DATETIME), expect.anything(), expect.anything());
                expect(logSpy).toHaveBeenCalledWith(
                    expect.stringContaining(new Date(BUILD_TIME).toISOString()),
                    expect.anything(),
                    expect.anything(),
                );
            });
        });
    });
});
