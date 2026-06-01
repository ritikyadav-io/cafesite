export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  isRecommended?: boolean;
  isBestSeller?: boolean;
};

export type MenuCategory = {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
};

export const menuData: MenuCategory[] = [
  {
    id: "soups-salads",
    label: "Soups & Salads",
    emoji: "🥗",
    items: [
      { id: "ss1", name: "Rustic Tomato Soup", description: "Classic slow-cooked tomato with herbs and cream swirl", price: 149, isVeg: true },
      { id: "ss2", name: "Sweet Corn Soup", description: "Velvety corn broth with corn kernels and spring onion", price: 149, isVeg: true },
      { id: "ss3", name: "Hot and Sour Soup", description: "Indo-Chinese bold broth, perfectly balanced heat", price: 159, isVeg: true },
      { id: "ss4", name: "Manchow Soup", description: "Crispy noodle-topped clear soup with vegetables", price: 159, isVeg: true },
      { id: "ss5", name: "Makai Shorba", description: "Traditional Indian corn shorba with aromatic spices", price: 149, isVeg: true, isRecommended: true },
      { id: "ss6", name: "Greek Salad", description: "Olives, cucumber, feta, tomato with oregano dressing", price: 199, isVeg: true },
      { id: "ss7", name: "Avocado Salad", description: "Fresh avocado with cherry tomatoes and citrus dressing", price: 229, isVeg: true, isRecommended: true },
      { id: "ss8", name: "TPR Mexican Salad", description: "2πR signature — black beans, corn, jalapeño, lime", price: 209, isVeg: true, isBestSeller: true }
    ]
  },
  {
    id: "starters",
    label: "Starters",
    emoji: "🍢",
    items: [
      { id: "st1", name: "Hara Bhara Cheese Kebab", description: "Spinach and cheese patties with mint chutney", price: 229, isVeg: true, isBestSeller: true },
      { id: "st2", name: "Til Tandoori Aloo", description: "Sesame-crusted baby potatoes from the tandoor", price: 199, isVeg: true },
      { id: "st3", name: "Stuffed Tandoori Mushroom", description: "Portobello mushrooms stuffed with spiced paneer", price: 249, isVeg: true, isRecommended: true },
      { id: "st4", name: "Zafrani Paneer Tikka", description: "Saffron-marinated cottage cheese, charcoal grilled", price: 269, isVeg: true, isRecommended: true },
      { id: "st5", name: "Paneer Hariyali Tikka", description: "Green herb-marinated paneer with mint yogurt dip", price: 259, isVeg: true },
      { id: "st6", name: "Soya Malai Chaap", description: "Cream-marinated soya chaap from the tandoor", price: 239, isVeg: true, isBestSeller: true },
      { id: "st7", name: "Stuffed Soya Tandoori Chaap", description: "Cheese-stuffed chaap, tandoor-finished", price: 259, isVeg: true, isRecommended: true },
      { id: "st8", name: "Honey Chilli Potato", description: "House favourite — crispy potatoes, honey glaze, sesame seeds", price: 199, isVeg: true, isBestSeller: true },
      { id: "st9", name: "Chilli Paneer Dry", description: "Classic Indo-Chinese paneer, bell peppers, soy", price: 239, isVeg: true, isBestSeller: true }
    ]
  },
  {
    id: "main-course",
    label: "Main Course",
    emoji: "🍛",
    items: [
      { id: "mc1", name: "Paneer Lababdar", description: "Rich tomato onion gravy with charred paneer", price: 279, isVeg: true, isBestSeller: true },
      { id: "mc2", name: "Paneer Butter Masala", description: "Velvety butter tomato sauce, a timeless classic", price: 269, isVeg: true },
      { id: "mc3", name: "Kadai Paneer", description: "Paneer with capsicum in smoky kadai masala", price: 269, isVeg: true },
      { id: "mc4", name: "Red Shahi Paneer", description: "Royal red gravy with cashew and saffron", price: 289, isVeg: true, isRecommended: true },
      { id: "mc5", name: "Paneer Pasanda", description: "Layered paneer in sweet almond-based gravy", price: 289, isVeg: true },
      { id: "mc6", name: "Gatte Masala", description: "Rajasthani besan dumplings in tangy yogurt gravy", price: 239, isVeg: true, isRecommended: true },
      { id: "mc7", name: "Handi Matar Mushroom", description: "Slow-cooked clay pot mushroom and peas", price: 249, isVeg: true, isRecommended: true },
      { id: "mc8", name: "Methi Matar Malai", description: "Fenugreek, peas in cream — delicate flavors", price: 249, isVeg: true },
      { id: "mc9", name: "Red Malai Kofta", description: "Fried cottage cheese balls in red cream gravy", price: 269, isVeg: true },
      { id: "mc10", name: "Dal Tadka", description: "Smoky yellow dal with ghee tadka", price: 199, isVeg: true, isBestSeller: true },
      { id: "mc11", name: "Dal Makhani", description: "Overnight slow-cooked black lentils in cream", price: 229, isVeg: true, isBestSeller: true }
    ]
  },
  {
    id: "breads",
    label: "Breads",
    emoji: "🫓",
    items: [
      { id: "br1", name: "Rumali Roti", description: "Paper-thin handkerchief roti", price: 39, isVeg: true },
      { id: "br2", name: "Tandoori Roti", description: "Classic clay oven roti", price: 39, isVeg: true },
      { id: "br3", name: "Aloo Paratha", description: "Spiced potato-stuffed paratha with butter", price: 89, isVeg: true, isBestSeller: true },
      { id: "br4", name: "Paneer Paratha", description: "Cottage cheese-stuffed flaky paratha", price: 99, isVeg: true, isRecommended: true },
      { id: "br5", name: "Laccha Paratha", description: "Multi-layered flaky paratha", price: 69, isVeg: true },
      { id: "br6", name: "Missi Roti", description: "Besan-wheat blend roti with ajwain", price: 49, isVeg: true },
      { id: "br7", name: "Butter Naan", description: "Naan brushed with fresh butter and coriander", price: 69, isVeg: true, isBestSeller: true },
      { id: "br8", name: "Garlic Naan", description: "Naan topped with roasted garlic and parsley", price: 79, isVeg: true, isBestSeller: true },
      { id: "br9", name: "Chilli Cheese Naan", description: "Spicy chilli and melted cheese naan", price: 99, isVeg: true, isRecommended: true },
      { id: "br10", name: "Amritsari Kulcha", description: "Amritsari-style stuffed kulcha with chole", price: 119, isVeg: true, isRecommended: true }
    ]
  },
  {
    id: "rice-biryani",
    label: "Rice & Biryani",
    emoji: "🍚",
    items: [
      { id: "rb1", name: "Jeera Rice", description: "Cumin-tempered long-grain basmati", price: 129, isVeg: true },
      { id: "rb2", name: "Veg Pulao", description: "Fragrant basmati with seasonal vegetables", price: 159, isVeg: true },
      { id: "rb3", name: "Veg Biryani", description: "Layered spiced rice with whole spices and raita", price: 219, isVeg: true, isBestSeller: true },
      { id: "rb4", name: "Shahi Dum Biryani", description: "Royal slow-cooked biryani, saffron-kissed", price: 269, isVeg: true, isRecommended: true }
    ]
  },
  {
    id: "south-indian",
    label: "South Indian",
    emoji: "🥞",
    items: [
      { id: "si1", name: "Plain Dosa", description: "Crispy fermented rice crepe with sambar and chutney", price: 129, isVeg: true },
      { id: "si2", name: "Masala Dosa", description: "Crispy dosa with spiced potato filling", price: 159, isVeg: true, isBestSeller: true },
      { id: "si3", name: "Cheese Dosa", description: "Crispy dosa loaded with melted cheese", price: 179, isVeg: true, isRecommended: true },
      { id: "si4", name: "Mysore Masala Dosa", description: "Spicy red chutney spread inside, potato masala", price: 169, isVeg: true, isRecommended: true },
      { id: "si5", name: "Chilli Cheese Uttapam", description: "Thick rice pancake with chilli and melted cheese", price: 179, isVeg: true }
    ]
  },
  {
    id: "fried-rice-noodles",
    label: "Fried Rice & Noodles",
    emoji: "🍜",
    items: [
      { id: "fr1", name: "Fried Rice", description: "Wok-tossed rice with vegetables, soy and sesame", price: 179, isVeg: true },
      { id: "fr2", name: "Schezwan Fried Rice", description: "Bold spicy Schezwan sauce fried rice", price: 199, isVeg: true, isBestSeller: true },
      { id: "fr3", name: "Hakka Noodles", description: "Indo-Chinese style hakka noodles", price: 189, isVeg: true, isBestSeller: true },
      { id: "fr4", name: "Chilli Garlic Noodles", description: "Fiery garlic noodles with chilli oil", price: 199, isVeg: true, isRecommended: true }
    ]
  },
  {
    id: "pizza-pasta",
    label: "Pizza & Pasta",
    emoji: "🍕",
    items: [
      { id: "pp1", name: "Kulhad Pizza", description: "2πR signature — pizza served in a clay kulhad", price: 249, isVeg: true, isBestSeller: true },
      { id: "pp2", name: "Cheeze Burst Pizza", description: "Legendary four-cheese molten explosion on sourdough", price: 360, isVeg: true, isBestSeller: true },
      { id: "pp3", name: "White Alfredo Pasta", description: "Creamy béchamel with garlic and parmesan", price: 229, isVeg: true, isBestSeller: true },
      { id: "pp4", name: "Mixed Pink Sauce Pasta", description: "Best of both — cream and tomato together", price: 239, isVeg: true, isRecommended: true },
      { id: "pp5", name: "Basil Pesto Pasta", description: "Fresh basil pesto, pine nuts, cherry tomatoes", price: 249, isVeg: true, isRecommended: true }
    ]
  },
  {
    id: "burgers-sandwiches",
    label: "Burgers & Sandwiches",
    emoji: "🍔",
    items: [
      { id: "bs1", name: "Crispy Kurkure Burger", description: "Crunchy kurkure-coated patty, house sauce", price: 189, isVeg: true, isBestSeller: true },
      { id: "bs2", name: "Paneer Makhani Cheese Burger", description: "Grilled paneer in makhani glaze, melted cheese", price: 219, isVeg: true, isRecommended: true },
      { id: "bs3", name: "Veg Cheese Grilled Sandwich", description: "Grilled with veggies and melted cheese", price: 169, isVeg: true, isBestSeller: true },
      { id: "bs4", name: "Mumbai Style Sandwich", description: "Chutney, potato, veggies — the real deal", price: 159, isVeg: true, isRecommended: true },
      { id: "bs5", name: "Paneer Tikka Sandwich", description: "Grilled paneer tikka in a toasted sandwich", price: 199, isVeg: true, isRecommended: true }
    ]
  },
  {
    id: "snacks-chaat",
    label: "Snacks & Chaat",
    emoji: "🌮",
    items: [
      { id: "sc1", name: "Pav Bhaji", description: "Mumbai's finest — spiced bhaji with buttered pav", price: 179, isVeg: true, isBestSeller: true },
      { id: "sc2", name: "Corn Cheese Balls", description: "Fried golden balls of corn and cheese", price: 189, isVeg: true, isBestSeller: true },
      { id: "sc3", name: "Avocado Toast", description: "Smashed avocado on toasted sourdough, chilli flakes", price: 219, isVeg: true, isRecommended: true },
      { id: "sc4", name: "Chilli Cheese Garlic Bread", description: "Crispy bread with chilli cheese garlic topping", price: 159, isVeg: true, isBestSeller: true },
      { id: "sc5", name: "French Fries", description: "Golden crispy fries with ketchup", price: 129, isVeg: true },
      { id: "sc6", name: "Kamal Kakdi Chaat", description: "Lotus stem chaat — crispy, tangy, unique", price: 159, isVeg: true, isRecommended: true }
    ]
  },
  {
    id: "maggi-rolls",
    label: "Maggi & Rolls",
    emoji: "🌯",
    items: [
      { id: "mr1", name: "Masala Maggi", description: "Spiced up Maggi with onion, tomato, spices", price: 119, isVeg: true, isBestSeller: true },
      { id: "mr2", name: "Cheese Corn Maggi", description: "Maggi with sweet corn and cheese melt", price: 139, isVeg: true, isRecommended: true },
      { id: "mr3", name: "Paneer Tikka Roll", description: "Grilled paneer tikka wrapped in roomali roti", price: 189, isVeg: true, isBestSeller: true }
    ]
  },
  {
    id: "accompaniments",
    label: "Accompaniments",
    emoji: "🥣",
    items: [
      { id: "ac1", name: "Veg Raita", description: "Fresh yogurt with grated vegetables", price: 69, isVeg: true },
      { id: "ac2", name: "Bundi Raita", description: "Yogurt with crispy bundi and cumin", price: 69, isVeg: true },
      { id: "ac3", name: "Masala Papad", description: "Papad topped with diced onion, tomato, chilli", price: 59, isVeg: true },
      { id: "ac4", name: "Lehsun Chutney", description: "Garlic chutney, smoky and bold", price: 39, isVeg: true }
    ]
  },
  {
    id: "desserts",
    label: "Desserts",
    emoji: "🍮",
    items: [
      { id: "de1", name: "Gulab Jamun", description: "Soft milk dumplings in rose saffron syrup", price: 99, isVeg: true, isBestSeller: true },
      { id: "de2", name: "Fudge Brownie with Ice Cream", description: "Warm gooey Belgian chocolate fudge brownie met by a freezing scoop of vanilla", price: 190, isVeg: true, isBestSeller: true },
      { id: "de3", name: "Kesar Kulfi", description: "Traditional saffron kulfi on a stick", price: 119, isVeg: true, isRecommended: true }
    ]
  },
  {
    id: "beverages",
    label: "Beverages",
    emoji: "☕",
    items: [
      { id: "bv1", name: "Cafe Latte", description: "Espresso with steamed milk and micro-foam", price: 149, isVeg: true, isBestSeller: true },
      { id: "bv2", name: "Cappuccino", description: "Balanced espresso, milk and foam", price: 149, isVeg: true },
      { id: "bv3", name: "Nutella Frappe", description: "Rich premium Nutella blended with espresso to frozen perfection", price: 240, isVeg: true, isBestSeller: true },
      { id: "bv4", name: "Chocolate KitKat Shake", description: "Decadent dessert and rich milkshake merged in one glorious tall cup", price: 220, isVeg: true, isBestSeller: true },
      { id: "bv5", name: "Watermelon Mojito", description: "Fresh crushed watermelon, muddled mint, limes, sugar cane syrup", price: 160, isVeg: true, isBestSeller: true }
    ]
  }
];
