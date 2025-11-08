import { ActionRepository } from "../../application/repositories/ActionRepository";
import yahooFinance from "yahoo-finance2";
import { Action } from "../../domain/entity/Action";
import { YahooFinanceService } from "./YahooFinanceService";

export class ActionService {

    constructor(
        private repository: ActionRepository,
        private service: YahooFinanceService
    ) {
        this.init();

        setInterval(() => {
            this.init();
        }, 10 * 60 * 1000);
    }

    private async init() {
        const actions = await this.repository.findAll();
        if (actions.length === 0 ) return;
        for (const action of actions) {
            const actionNew = await this.service.getValueAction(action.name);
            if (!actionNew.price) continue;
            const actionObject = new Action(
                crypto.randomUUID(),
                action.name,
                actionNew.price
            );
            this.repository.save(actionObject);
        }
    }

    public async get(action: string): Promise<Action>  {
        const actionExist = await this.repository.findByName(action);
        if (!actionExist) {
            const actionNew = await this.service.getValueAction(action);
            if (!actionNew.price) throw new Error(`Action ${action} no exist`);
            const actionObject = new Action(
                crypto.randomUUID(),
                action,
                actionNew.price
            );
            this.repository.save(actionObject);
            return actionObject;
        }
        return actionExist;
    }
}