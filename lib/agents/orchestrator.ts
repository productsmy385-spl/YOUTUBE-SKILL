import { CreatorBriefInput, WorkflowExecutionState, StoryboardShot } from "./types";
import { MasterAgentOrchestrator } from "./agent-engine";

export class AgentOrchestrator {
  private orchestrator: MasterAgentOrchestrator;

  constructor(input: CreatorBriefInput) {
    this.orchestrator = new MasterAgentOrchestrator(input);
  }

  getState(): WorkflowExecutionState {
    return this.orchestrator.getState();
  }

  async runFullWorkflow(input: CreatorBriefInput): Promise<WorkflowExecutionState> {
    return this.orchestrator.runFullWorkflow(input);
  }

  async regenerateScene(sceneId: number): Promise<StoryboardShot | null> {
    return this.orchestrator.regenerateScene(sceneId);
  }

  async approveAndPublish(): Promise<WorkflowExecutionState> {
    return this.orchestrator.approveAndPublish();
  }
}
