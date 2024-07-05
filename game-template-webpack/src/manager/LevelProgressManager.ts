class LevelProgressManager {
    private static instance: LevelProgressManager;
    public static getInstance(): LevelProgressManager {
        if (!LevelProgressManager.instance) {
            LevelProgressManager.instance = new LevelProgressManager();
        }
        return LevelProgressManager.instance;
    }


    public getLevelProgress(level: string): number {
        if (!localStorage.getItem(level)) {
            localStorage.setItem(level, "0");
        }
        return parseFloat(localStorage.getItem(level)!);
    }
    public setLevelProgress(level: string, progress: number): void {
        if (!localStorage.getItem(level)) {
            localStorage.setItem(level, progress.toString());
        }
        else if (parseFloat(localStorage.getItem(level)!) < progress)
        {
            localStorage.setItem(level, progress.toString());
        }
    }
    public resetLevelProgress(level: string): void {
        localStorage.setItem(level, "0");
    }
}
export default LevelProgressManager;