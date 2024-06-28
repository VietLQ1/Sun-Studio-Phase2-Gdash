class LevelProgressManager {
    private static instance: LevelProgressManager;
    public static getInstance(): LevelProgressManager {
        if (!LevelProgressManager.instance) {
            LevelProgressManager.instance = new LevelProgressManager();
        }
        return LevelProgressManager.instance;
    }

    private levels: Map<number, number>;

    public getLevelProgress(level: number): number {
        if (!this.levels.has(level)) {
            this.levels.set(level, 0);
        }
        return this.levels.get(level)!;
    }
    public setLevelProgress(level: number, progress: number): void {
        if (!this.levels.has(level)) {
            this.levels.set(level, progress);
        }
        else if (this.levels.get(level)! < progress)
        {
            this.levels.set(level, progress);
        }
    }
}