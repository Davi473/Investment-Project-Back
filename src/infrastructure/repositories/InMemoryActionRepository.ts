import { ActionRepository } from "../../application/repositories/ActionRepository";
import { Action } from "../../domain/entity/Action";

export class InMemoryActionRepository implements ActionRepository {
    private memory: Map<string, Action> = new Map();

    public async save(action: Action): Promise<void> {
        this.memory.set(action.name, action);
    }
    
    public async findAll(): Promise<Action[]> {
        let actions: Action[] = [];
        this.memory.forEach(action => {
            actions.push(action);
        });
        return actions;
    }
    
    public async findById(id: string): Promise<Action | null> {
        let actionExist: Action | null = null;
        this.memory.forEach(action => {
            if (action.id === id) actionExist = action;
        });
        return actionExist;
    }

    public async findByName(name: string): Promise<Action | null> {
        return this.memory.get(name) || null;
    }
}