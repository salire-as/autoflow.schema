import { Bundle } from "../bundle";

export interface ExecutionEvent {
  method: string;
  bundle: Bundle;
}
