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
    let category = contract.create_category("Electronics".to_string(), "Electronic products".to_string());
    assert_eq!(category.name, "electronics");
    assert_eq!(category.desc, "Electronic products");
  }

  #[test]
  fn test_create_product() {
    let mut contract = Contract::init();
    let product_id = "123".to_string();
    let price: Balance = 100.into();
    let name = "Laptop".to_string();
    let desc = "High-performance laptop".to_string();
    let category = "Electronics".to_string();
    let images = vec!["image1.jpg".to_string(), "image2.jpg".to_string()];
    let timelimit: u16 = 30;
    contract.create_owner("John".to_string(), "Owner of a shop".to_string());
    contract.create_category("Electronics".to_string(), "Electronic products".to_string());
    contract.create_product(product_id.clone(), price, name.clone(), desc.clone(), category.clone(), images.clone(), timelimit);
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
    contract.create_product("123".to_string(), 100.into(), "Laptop".to_string(), "High-performance laptop".to_string(), "Electronics".to_string(), vec!["image1.jpg".to_string(), "image2.jpg".to_string()], 30);
    contract.create_product("456".to_string(), 200.into(), "Phone".to_string(), "Smartphone".to_string(), "Electronics".to_string(), vec!["image3.jpg".to_string()], 15);
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
    let category = contract.category_by_id.get(&"electronics".to_string()).unwrap();
    assert_eq!(category.desc, "Updated description");
  }

  #[test]
  fn test_get_posts_by_category() {
    let mut contract = Contract::init();
    contract.create_owner("John".to_string(), "Owner of a shop".to_string());
    contract.create_category("Electronics".to_string(), "Electronic products".to_string());
    contract.create_product("123".to_string(), 100.into(), "Laptop".to_string(), "High-performance laptop".to_string(), "Electronics".to_string(), vec!["image1.jpg".to_string(), "image2.jpg".to_string()], 30);
    contract.create_product("456".to_string(), 200.into(), "Phone".to_string(), "Smartphone".to_string(), "Electronics".to_string(), vec!["image3.jpg".to_string()], 15);
    let posts = contract.get_posts_by_category("electronics".to_string());
    assert_eq!(posts.len(), 2);
  }

  #[test]
  fn test_edit_product_price() {
    let mut contract = Contract::init();
    contract.create_owner("John".to_string(), "Owner of a shop".to_string());
    contract.create_category("Electronics".to_string(), "Electronic products".to_string());
    contract.create_product("123".to_string(), 100.into(), "Laptop".to_string(), "High-performance laptop".to_string(), "Electronics".to_string(), vec!["image1.jpg".to_string(), "image2.jpg".to_string()], 30);
    contract.edit_product_price("123".to_string(), 200.into());
    let product = contract.get_product_by_id("123".to_string()).unwrap();
    assert_eq!(product.price, 200.into());
  }

  #[test]
  fn test_delete_product() {
    let mut contract = Contract::init();
    contract.create_owner("John".to_string(), "Owner of a shop".to_string());
    contract.create_category("Electronics".to_string(), "Electronic products".to_string());
    contract.create_product("123".to_string(), 100.into(), "Laptop".to_string(), "High-performance laptop".to_string(), "Electronics".to_string(), vec!["image1.jpg".to_string(), "image2.jpg".to_string()], 30);
    contract.delete_product("123".to_string());
    let product = contract.get_product_by_id("123".to_string());
    assert!(product.is_none());
  }

  // Add more tests for other functions as needed
}