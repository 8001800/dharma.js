import * as _ from "lodash";
import { Dharma } from "../";
import { ECDSASignature, TokenAmount } from "../types";

export class DebtOrder {
    // Signatures
    private debtorSignature?: ECDSASignature;
    private creditorSignature?: ECDSASignature;
    private underwriterSignature?: ECDSASignature;

    constructor(private dharma: Dharma) {}

    public isSignedByUnderwriter(): boolean {
        return !_.isEmpty(this.underwriterSignature);
    }

    public isSignedByDebtor(): boolean {
        return !_.isEmpty(this.debtorSignature);
    }

    public isSignedByCreditor(): boolean {
        return !_.isEmpty(this.creditorSignature);
    }

    public async signAsCreditor() {
        if (this.isSignedByCreditor()) {
            return;
        }
        this.creditorSignature = await this.dharma.sign.asCreditor(this);
    }
}