import { Timer } from "../CLASSES/Timer";

export interface IStatus {
    isRunning: boolean,
    timeList: Timer,
    clickCounter: number
}