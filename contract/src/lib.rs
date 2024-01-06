use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap};
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
    pub category: String,
    pub images: Vec<String>,
    pub timelimit: u16,
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone, Debug)]
#[serde(crate = "near_sdk::serde")]
pub struct Category {
    pub name: String,
    pub desc: String,
    pub related_product: Vec<ProductId>,
    pub related_product_count: u32,
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Owner {
    pub account_id: AccountId,
    pub name: String,
    pub desc: String,
    pub own_product: Vec<Product>,
    pub total_product: u64,
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct User {
    pub account_id: AccountId,
    pub name: String,
    pub desc: String,
    pub used_product: Vec<Product>,
    pub total_used: u64,
}

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
    pub category_by_id: LookupMap<String, Category>,
    category_ids: Vec<String>,
    pub all_categories: UnorderedMap<u128, Category>,
    pub categories_count: u128,
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
          categories_count: 0,
          category_ids: Vec::new(), // Add the category_ids field and initialize it with an empty vector
        }
    }

    //* CREATE FUNCTIONs

    #[doc = r"Creates a new owner.

  # Arguments

  * `name` - A string slice that holds the name of the owner.
  * `desc` - A string slice that holds the description of the owner.

  # Returns

  * An instance of `Owner`."]
    pub fn create_owner(&mut self, name: String, desc: String) -> Owner {
        let owner_id = env::signer_account_id();
        assert!(!self.owners.contains_key(&owner_id), "Owner already exists");
        let total_owners = self.total_owners + 1;
        let own_product = Vec::new();
        let owner = Owner {
            account_id: env::signer_account_id(),
            name,
            desc,
            own_product,
            total_product: 0,
        };

        self.owners.insert(&owner_id, &owner);
        self.all_owners.insert(&total_owners, &owner);

        owner
    }

    #[doc = r"Creates a new user.

    # Arguments

    * `name` - A string slice that holds the name of the user.
    * `desc` - A string slice that holds the description of the user.

    # Returns

    * An instance of `User`."]
    pub fn create_user(&mut self, name: String, desc: String) -> User {
        let user_id: AccountId = env::signer_account_id();
        assert!(
            !self.user_by_id.contains_key(&user_id),
            "User already exists"
        );
        let total_users = self.total_users + 1;
        let used_product = Vec::new();
        let user = User {
            account_id: env::signer_account_id(),
            name,
            desc,
            used_product,
            total_used: 0,
        };
        self.user_by_id.insert(&user_id, &user);
        self.all_users.insert(&total_users, &user);

        user
    }

    #[doc = r"Creates a new category.

    # Arguments

    * `name` - A string slice that holds the name of the category.
    * `desc` - A string slice that holds the description of the category.

    # Returns

    * An instance of `Category`."]
    pub fn create_category(&mut self, name: String, desc: String) -> Category {
        let lowercase_name = name.to_lowercase();
        assert!(
            !self.category_by_id.contains_key(&lowercase_name),
            "Category already exists"
        );
        let categories_count = self.categories_count + 1;
        let related_product = Vec::new();
        let category = Category {
            name: lowercase_name.clone(),
            desc,
            related_product,
            related_product_count: 0,
        };
        self.all_categories.insert(&categories_count, &category);
        self.categories_count += 1;
        self.category_by_id.insert(&lowercase_name, &category);

        category
    }

    #[doc = r"Creates a new product.
    # Arguments

    * `product_id` - A string slice that holds the product ID.
    * `price` - A balance that holds the price of the product.
    * `name` - A string slice that holds the name of the product.
    * `desc` - A string slice that holds the description of the product.
    * `category` - A string slice that holds the category of the product.
    * `images` - A vector of strings that holds the images of the product.
    * `timelimit` - A u16 that holds the time limit of the product."]
    pub fn create_product(
        &mut self,
        product_id: ProductId,
        price: Balance,
        name: String,
        desc: String,
        category: String,
        images: Vec<String>,
        timelimit: u16,
    ) {
        let product_price: Balance = price.into();
        let owner_id: AccountId = env::predecessor_account_id();
        let owner_id_clone: AccountId = owner_id.clone();
        assert!(
            self.owners.contains_key(&owner_id),
            "You are not an owner, please register your role"
        );
        assert!(
            !self.product_by_id.contains_key(&product_id.clone()),
            "There is already a product with the same product_id"
        );

        let category_id = category.to_lowercase();
        let desc_category = format!("This is a category tag for {}", category.clone());

        if !self.category_by_id.contains_key(&category_id.clone()) {
            self.create_category(category_id.clone(), desc_category);
        }

        let product: Product = Product {
            product_id: product_id.clone(),
            product_owner_id: owner_id.clone(),
            price: product_price,
            name,
            desc,
            category,
            images,
            timelimit,
        };
        self.total_products += 1;

        // Add product to the related post of the category
        let mut category_to_push = self.category_by_id.get(&category_id.clone()).unwrap();
        category_to_push.related_product.push(product_id.clone());
        category_to_push.related_product_count += 1;
        self.category_by_id
            .insert(&category_id.clone(), &category_to_push);
        let mut owner = self.owners.get(&owner_id).unwrap();
        owner.own_product.push(product.clone());
        owner.total_product += 1;
        self.products.insert(&self.total_products, &product);
        self.owners.insert(&owner_id_clone, &owner);
        self.product_by_id.insert(&product_id, &product.clone());
    }

    //* GET FUNCTIONs

    pub fn get_all_products(&self) -> Vec<(u128, Product)> {
        self.products.to_vec()
    }

    pub fn get_product_by_id(&self, product_id: ProductId) -> Option<Product> {
        self.product_by_id.get(&product_id)
    }

    pub fn get_all_categories(&self) -> Vec<(u128, Category)> {
        self.all_categories.to_vec()
    }

    pub fn get_owner_by_id(&self, owner_id: AccountId) -> Option<Owner> {
        self.owners.get(&owner_id)
    }

    pub fn get_posts_by_category(&self, category_id: String) -> Vec<(u128, Product)> {
        let category = self.category_by_id.get(&category_id);
        match category {
            Some(category) => {
                let mut posts: Vec<(u128, Product)> = Vec::new();
                for product_id in &category.related_product {
                  if let Some(product) = self.product_by_id.get(product_id) {
                      match product_id.clone().parse() {
                          Ok(parsed_id) => posts.push((parsed_id, product.clone())),
                          Err(_) => eprintln!("Failed to parse product ID: {}", product_id),
                      }
                  }
              }
                posts
            }
            None => Vec::new(),
        }
    }

    pub fn product_count(&self) -> u128 {
        self.total_products
    }

    //* EDIT FUNCTIONs
    pub fn edit_category_desc(&mut self, category_id: String, new_desc: String) {
        assert!(
            self.category_by_id.contains_key(&category_id),
            "Category does not exist"
        );

        let mut category = self.category_by_id.get(&category_id).unwrap();
        category.desc = new_desc;
        self.category_by_id.insert(&category_id, &category);
    }

    //* Function to get all categories by ID
    pub fn get_category_by_id(&self) -> Vec<(String, Option<Category>)> {
      self.category_ids.iter()
          .map(|category_id| (category_id.clone(), self.category_by_id.get(category_id)))
          .collect()
    }
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_owner() {
        let mut contract = Contract::init();
        let owner = contract.create_owner("John".to_string(), "Owner of a shop".to_string());
        assert_eq!(owner.name, "John");
        assert_eq!(owner.desc, "Owner of a shop");
    }

    #[test]
    fn test_create_user() {
        let mut contract = Contract::init();
        let user = contract.create_user("Alice".to_string(), "Regular user".to_string());
        assert_eq!(user.name, "Alice");
        assert_eq!(user.desc, "Regular user");
    }

    #[test]
    fn test_create_category() {
        let mut contract = Contract::init();
        let category =
            contract.create_category("Electronics".to_string(), "Electronic products".to_string());
        assert_eq!(category.name, "electronics");
        assert_eq!(category.desc, "Electronic products");
    }

    #[test]
    fn test_create_product() {
        let mut contract = Contract::init();
        let product_id = "123".to_string();
        let price: Balance = 100;
        let name = "Laptop".to_string();
        let desc = "High-performance laptop".to_string();
        let category = "Electronics".to_string();
        let images = vec!["image1.jpg".to_string(), "image2.jpg".to_string()];
        let timelimit: u16 = 30;
        contract.create_owner("John".to_string(), "Owner of a shop".to_string());
        contract.create_category("Electronics".to_string(), "Electronic products".to_string());
        contract.create_product(
            product_id.clone(),
            price,
            name.clone(),
            desc.clone(),
            category.clone(),
            images.clone(),
            timelimit,
        );
        let product = contract.get_product_by_id(product_id.clone()).unwrap();
        assert_eq!(product.product_id, product_id);
        assert_eq!(product.price, price);
        assert_eq!(product.name, name);
        assert_eq!(product.desc, desc);
        assert_eq!(product.category, category);
        assert_eq!(product.images, images);
        assert_eq!(product.timelimit, timelimit);
    }

    #[test]
    fn test_get_all_products() {
        let mut contract = Contract::init();
        contract.create_owner("John".to_string(), "Owner of a shop".to_string());
        contract.create_category("Electronics".to_string(), "Electronic products".to_string());
        contract.create_product(
            "123".to_string(),
            100,
            "Laptop".to_string(),
            "High-performance laptop".to_string(),
            "Electronics".to_string(),
            vec!["image1.jpg".to_string(), "image2.jpg".to_string()],
            30,
        );
        contract.create_product(
            "456".to_string(),
            200,
            "Phone".to_string(),
            "Smartphone".to_string(),
            "Electronics".to_string(),
            vec!["image3.jpg".to_string()],
            15,
        );
        let products = contract.get_all_products();
        assert_eq!(products.len(), 2);
    }

    #[test]
    fn test_get_all_categories() {
        let mut contract = Contract::init();
        contract.create_category("Electronics".to_string(), "Electronic products".to_string());
        contract.create_category("Clothing".to_string(), "Fashion items".to_string());
        let categories = contract.get_all_categories();
        assert_eq!(categories.len(), 2);
    }

    #[test]
    fn test_edit_category_desc() {
        let mut contract = Contract::init();
        contract.create_category("Electronics".to_string(), "Electronic products".to_string());
        contract.edit_category_desc("electronics".to_string(), "Updated description".to_string());
        let category = contract
            .category_by_id
            .get(&"electronics".to_string())
            .unwrap();
        assert_eq!(category.desc, "Updated description");
    }

    #[test]
    fn test_get_posts_by_category() {
        let mut contract = Contract::init();
        contract.create_owner("John".to_string(), "Owner of a shop".to_string());
        contract.create_category("Electronics".to_string(), "Electronic products".to_string());
        contract.create_product(
            "123".to_string(),
            100,
            "Laptop".to_string(),
            "High-performance laptop".to_string(),
            "Electronics".to_string(),
            vec!["image1.jpg".to_string(), "image2.jpg".to_string()],
            30,
        );
        contract.create_product(
            "456".to_string(),
            200,
            "Phone".to_string(),
            "Smartphone".to_string(),
            "Electronics".to_string(),
            vec!["image3.jpg".to_string()],
            15,
        );
        let posts = contract.get_posts_by_category("electronics".to_string());
        assert_eq!(posts.len(), 2);
    }

    // Add more tests for other functions as needed
}
