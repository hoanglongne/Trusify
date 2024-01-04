import { utils } from 'near-api-js'

export class Contract {

  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async getAllProduct() {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: "get_all_product" })
  }

  async getProductById(product_id) {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: "get_product_by_id", args:{product_id: product_id }})
  }

  async addNewOwner(name, desc) {
    await this.wallet.callMethod({ contractId: this.contractId, method: "create_owner", args:{name: name, desc: desc}})
  }

  async addNewProduct(product_id, price , name , desc , category, images, timelimit) {
    await this.wallet.callMethod({ contractId: this.contractId, method: "create_product", args:{product_id: product_id, price: price ,name: name, desc: desc,  category: category, images: images, timelimit: timelimit}})
  }

}