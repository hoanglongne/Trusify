use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap, Vector};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, AccountId, Balance, PanicOnDefault};

pub type ProductId = String;

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Product {
  pub product_id: ProductId,
  pub product_owner_id: AccountId,
  pub name: String,
  pub price: Balance,
  pub desc: String, // description
  pub categories: String,
  pub images: Vec<String>,
  pub timelimit: u16
}



#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Owner {
  pub account_id: AccountId,
  pub name: String,
  pub desc: String,
  pub own_product: Vec<Product>,
  pub total_product: u64
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct User {
  pub account_id: AccountId,
  pub name: String,
  pub desc: String,
  pub used_product: Vec<Product>,
  pub total_used: u64
}

// Define the contract structure
#[near_bindgen]
#[derive(PanicOnDefault, BorshDeserialize, BorshSerialize)]
pub struct Contract {
  pub platform_name: AccountId,
  pub product_by_id: LookupMap<ProductId, Product>,
  pub products: UnorderedMap<u128, Product>,
  pub users: LookupMap<AccountId, User>,
  pub all_users: UnorderedMap<u128, User>,
  pub total_users: u128,
  pub owners: LookupMap<AccountId, Owner>,
  pub all_owners: UnorderedMap<u128, Owner>,
  pub total_owners: u128,
  pub total_products: u128,
}

#[near_bindgen]
impl Contract {
  #[init]
  pub fn init() -> Self {
    Self {
      platform_name: env::signer_account_id(),
      product_by_id: LookupMap::new(b"product by id".try_to_vec().unwrap()),
      products: UnorderedMap::new(b"products".try_to_vec().unwrap()),
      users: LookupMap::new(b"shops".try_to_vec().unwrap()),
      all_users: UnorderedMap::new(b"all shops".try_to_vec().unwrap()),
      total_users: 0,
      owners: LookupMap::new(b"shops".try_to_vec().unwrap()),
      all_owners: UnorderedMap::new(b"all shops".try_to_vec().unwrap()),
      total_owners: 0,
      total_products: 0,
    }
  }

  pub fn create_owner(&mut self, name: String, desc: String) -> Owner {
    let owner_id = env::signer_account_id();
    assert!(!self.owners.contains_key(&owner_id), "Owner already exists");
    let total_owners = self.total_owners + 1;
    let mut own_product = Vec::new();
    let owner = Owner { account_id: env::signer_account_id(), name, desc, own_product, total_product: 0 };

    self.owners.insert(&owner_id, &owner);
    self.all_owners.insert(&total_owners, &owner);

    return owner
  }
  pub fn create_user(&mut self, name: String, desc: String) -> User {
    let user_id: AccountId = env::signer_account_id();
    assert!(!self.users.contains_key(&user_id), "User already exists");
    let total_users = self.total_users + 1;
    let mut used_product = Vec::new();
    let user = User { account_id: env::signer_account_id(), name, desc, used_product, total_used: 0 };
    self.users.insert(&user_id, &user);
    self.all_users.insert(&total_users, &user);

    return user
  }
  
  pub fn create_product(&mut self, product_id: ProductId , price: Balance , name: String , desc: String  , categories: String, images: Vec<String>, timelimit: u16) {
    let product_price : Balance = price.into();
    let owner_id: AccountId = env::predecessor_account_id();
    let owner_id_clone: AccountId = owner_id.clone();
    assert!(self.owners.contains_key(&owner_id), "You are not an owner, please register your role");
    assert!(!self.product_by_id.contains_key(&product_id.clone()), "There are already exist a product with the same product_id");

    let product: Product = Product { 
      product_id: product_id.clone(), 
      product_owner_id: owner_id.clone(), 
      price: product_price, name, 
      desc, 
      categories, 
      images, 
      timelimit};
    let product_to_insert = product.clone();
    let mut owner =  self.owners.get(&owner_id).unwrap();
    self.total_products = self.total_products + 1;

    owner.own_product.push(product.clone());
    self.products.insert(&self.total_products,&product); 

    self.owners.insert(&owner_id_clone,&owner);

    self.product_by_id.insert(&product_id, &product_to_insert);

  }

  pub fn get_all_products(&mut self) -> Vec<(u128, Product)> {
      return self.products.to_vec()
  }

  pub fn product_count(&mut self) -> u128 {
    return self.total_products;
  }



}