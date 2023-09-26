import { utils } from 'near-api-js'

export class Contract {

  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async getAllProduct() {
    return product_arr = await this.wallet.viewMethod({ contractId: this.contractId, method: "get_all_product" })
  }

  async addNewOwner(name, desc) {
    this.wallet.callMethod({ contractId: this.contractId, method: "create_owner", args:{name: name, desc: desc}})
  }

}