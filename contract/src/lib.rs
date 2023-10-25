use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, AccountId, Balance, PanicOnDefault};
// use uuid::Uuid;

pub type ProductId = String;

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Product {
  pub product_id: ProductId,
  pub product_owner_id: AccountId,
  pub name: String,
  pub price: Balance,
  pub desc: String, // description
  pub category: String,
  pub images: Vec<String>,
  pub timelimit: u16
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Category {
  pub name: String,
  pub desc: String,  
  pub related_product: Vec<ProductId>,
  pub related_product_count: u32
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
  pub user_by_id: LookupMap<AccountId, User>,
  pub all_users: UnorderedMap<u128, User>,
  pub total_users: u128,
  pub owners: LookupMap<AccountId, Owner>,
  pub all_owners: UnorderedMap<u128, Owner>,
  pub total_owners: u128,
  pub total_products: u128,
  pub category_by_id: LookupMap<String,Category>,
  pub all_categories: UnorderedMap<u128, Category>,
  pub categories_count: u128
}

#[near_bindgen]
impl Contract {
  #[init]
  pub fn init() -> Self {
    Self {
      platform_name: env::signer_account_id(),
      product_by_id: LookupMap::new(b"product by id".try_to_vec().unwrap()),
      products: UnorderedMap::new(b"products".try_to_vec().unwrap()),
      user_by_id: LookupMap::new(b"user by id".try_to_vec().unwrap()),
      all_users: UnorderedMap::new(b"all users".try_to_vec().unwrap()),
      total_users: 0,
      owners: LookupMap::new(b"shops".try_to_vec().unwrap()),
      all_owners: UnorderedMap::new(b"all shops".try_to_vec().unwrap()),
      total_owners: 0,
      total_products: 0,
      category_by_id: LookupMap::new(b"category by id".try_to_vec().unwrap()),
      all_categories: UnorderedMap::new(b"categories".try_to_vec().unwrap()),
      categories_count: 0
    }
  }

  pub fn create_owner(&mut self, name: String, desc: String) -> Owner {
    let owner_id = env::signer_account_id();
    assert!(!self.owners.contains_key(&owner_id), "Owner already exists");
    let total_owners = self.total_owners + 1;
    let own_product = Vec::new();
    let owner = Owner { account_id: env::signer_account_id(), name, desc, own_product, total_product: 0 };

    self.owners.insert(&owner_id, &owner);
    self.all_owners.insert(&total_owners, &owner);

    return owner
  }
  pub fn create_user(&mut self, name: String, desc: String) -> User {
    let user_id: AccountId = env::signer_account_id();
    assert!(!self.user_by_id.contains_key(&user_id), "User already exists");
    let total_users = self.total_users + 1;
    let used_product = Vec::new();
    let user = User { account_id: env::signer_account_id(), name, desc, used_product, total_used: 0 };
    self.user_by_id.insert(&user_id, &user);
    self.all_users.insert(&total_users, &user);

    return user
  }

  pub fn create_category(&mut self, name: String, desc: String) -> Category {
    let lowercase_name = name.to_lowercase();
    assert!(!self.category_by_id.contains_key(&lowercase_name), "Category are already exist!!");
    let categories_count = self.categories_count + 1;
    let related_product = Vec::new();
    let category = Category {name: lowercase_name.clone(), desc, related_product, related_product_count: 0};
    self.all_categories.insert(&categories_count, &category);
    self.categories_count = self.categories_count + 1;
    self.category_by_id.insert(&lowercase_name, &category);
    return category
  }

  //TODO: Replace manual adding product_id to uuid
  //TODO: Chưa thể tự động add product vào related_product của Category tag, ngoài ra cũng ko tự động count luôn
  pub fn create_product(&mut self, product_id: ProductId, price: Balance , name: String , desc: String  , category: String, images: Vec<String>, timelimit: u16) {
    let product_price : Balance = price.into();
    let owner_id: AccountId = env::predecessor_account_id();
    let owner_id_clone: AccountId = owner_id.clone();
    // let product_id_something = Uuid::new_v4().to_string();
    assert!(self.owners.contains_key(&owner_id), "You are not an owner, please register your role");
    assert!(!self.product_by_id.contains_key(&product_id.clone()), "There are already exist a product with the same product_id");

    let category_id = category.to_lowercase();
    let desc_category = format!("This is category tag for {}", category.clone());

    if !self.category_by_id.contains_key(&category_id.clone())  {
      self.create_category(category_id.clone(), desc_category);
    }

    let product: Product = Product { 
      product_id: product_id.clone(), 
      product_owner_id: owner_id.clone(), 
      price: product_price, name, 
      desc, 
      category, 
      images, 
      timelimit};
    self.total_products += 1;
    
    // *: Add product to the related post of the category
    let mut category_to_push =  self.category_by_id.get(&category_id.clone()).unwrap();
    category_to_push.related_product.push(product_id.clone());
    category_to_push.related_product_count += 1;
    self.category_by_id.insert(&category_id.clone(),&category_to_push);
    let mut owner =  self.owners.get(&owner_id).unwrap();
    owner.own_product.push(product.clone());
    //TODO: Test xem có tự động count cho total product chưa
    owner.total_product += 1;
    self.products.insert(&self.total_products,&product); 
    self.owners.insert(&owner_id_clone,&owner);
    self.product_by_id.insert(&product_id, &product.clone());
  }

  pub fn get_all_products(self) -> Vec<(u128, Product)> {
      return self.products.to_vec()
  }

  pub fn get_all_categories(self) -> Vec<(u128, Category)> {
      return self.all_categories.to_vec()
  }

  pub fn get_owner_by_id(self, owner_id: AccountId) -> Option<Owner> {
  return self.owners.get(&owner_id)
  }

  pub fn product_count(self) -> u128 {
    return self.total_products;
  }

  //TODO: Function to edit desc of the category

  //TODO: Function to get all post have the same category
  
  //TODO: Function to get owner by id

  //TODO: Function to get product by id
  
  //TODO: Function to get category by id

}