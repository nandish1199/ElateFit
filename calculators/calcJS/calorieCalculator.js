const NUTRITION_DB_NAME = "elateFitNutritionDB";
const NUTRITION_DB_VERSION = 1;
const NUTRITION_STORE = "foodEntries";
const PROFILE_DB_NAME = "elateFitUserProfileDB";
const PROFILE_STORE_NAME = "profiles";
const PROFILE_RECORD_ID = "profile";

const foodCatalog = {
  // ==========================================
  // 1. GRAINS & MILLETS (Raw & Boiled)
  // ==========================================
  rice: {
    label: "Rice",
    calories: 130,
    protein: 2.7,
    saturatedFat: 0.1,
    unsaturatedFat: 0.2,
    solubleFiber: 0.1,
    insolubleFiber: 0.3,
  },
  boiled_rice: {
    label: "Boiled Rice",
    calories: 123,
    protein: 2.5,
    saturatedFat: 0.1,
    unsaturatedFat: 0.2,
    solubleFiber: 0.1,
    insolubleFiber: 0.3,
  },
  brown_rice: {
    label: "Brown Rice",
    calories: 111,
    protein: 2.6,
    saturatedFat: 0.2,
    unsaturatedFat: 0.6,
    solubleFiber: 0.4,
    insolubleFiber: 3.1,
  },
  wheat: {
    label: "Wheat",
    calories: 340,
    protein: 13.7,
    saturatedFat: 0.4,
    unsaturatedFat: 0.8,
    solubleFiber: 1.2,
    insolubleFiber: 10.0,
  },
  boiled_wheat: {
    label: "Boiled Wheat",
    calories: 125,
    protein: 4.8,
    saturatedFat: 0.1,
    unsaturatedFat: 0.3,
    solubleFiber: 0.5,
    insolubleFiber: 3.5,
  },
  oats: {
    label: "Oats",
    calories: 389,
    protein: 16.9,
    saturatedFat: 1.2,
    unsaturatedFat: 3.5,
    solubleFiber: 4.0,
    insolubleFiber: 6.2,
  },
  cooked_oats: {
    label: "Cooked Oats",
    calories: 71,
    protein: 2.5,
    saturatedFat: 0.2,
    unsaturatedFat: 0.8,
    solubleFiber: 1.0,
    insolubleFiber: 1.5,
  },
  jowar: {
    label: "Jowar (Sorghum)",
    calories: 339,
    protein: 11.3,
    saturatedFat: 0.5,
    unsaturatedFat: 1.5,
    solubleFiber: 1.5,
    insolubleFiber: 8.0,
  },
  boiled_jowar: {
    label: "Boiled Jowar",
    calories: 140,
    protein: 4.5,
    saturatedFat: 0.2,
    unsaturatedFat: 0.6,
    solubleFiber: 0.6,
    insolubleFiber: 3.2,
  },
  bajra: {
    label: "Bajra (Pearl Millet)",
    calories: 361,
    protein: 11.6,
    saturatedFat: 0.5,
    unsaturatedFat: 3.5,
    solubleFiber: 1.2,
    insolubleFiber: 7.3,
  },
  boiled_bajra: {
    label: "Boiled Bajra",
    calories: 135,
    protein: 4.2,
    saturatedFat: 0.2,
    unsaturatedFat: 1.2,
    solubleFiber: 0.5,
    insolubleFiber: 2.8,
  },
  ragi: {
    label: "Ragi (Finger Millet)",
    calories: 328,
    protein: 7.3,
    saturatedFat: 0.3,
    unsaturatedFat: 1.5,
    solubleFiber: 1.8,
    insolubleFiber: 9.5,
  },
  cooked_ragi: {
    label: "Cooked Ragi",
    calories: 115,
    protein: 2.6,
    saturatedFat: 0.1,
    unsaturatedFat: 0.5,
    solubleFiber: 0.6,
    insolubleFiber: 3.2,
  },
  foxtail_millet: {
    label: "Foxtail Millet",
    calories: 331,
    protein: 12.3,
    saturatedFat: 0.4,
    unsaturatedFat: 2.0,
    solubleFiber: 1.5,
    insolubleFiber: 6.5,
  },
  boiled_foxtail_millet: {
    label: "Boiled Foxtail Millet",
    calories: 120,
    protein: 4.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.7,
    solubleFiber: 0.5,
    insolubleFiber: 2.2,
  },
  little_millet: {
    label: "Little Millet",
    calories: 341,
    protein: 7.7,
    saturatedFat: 0.6,
    unsaturatedFat: 2.2,
    solubleFiber: 1.4,
    insolubleFiber: 7.0,
  },
  boiled_little_millet: {
    label: "Boiled Little Millet",
    calories: 125,
    protein: 2.8,
    saturatedFat: 0.2,
    unsaturatedFat: 0.8,
    solubleFiber: 0.5,
    insolubleFiber: 2.5,
  },
  barnyard_millet: {
    label: "Barnyard Millet",
    calories: 307,
    protein: 6.2,
    saturatedFat: 0.2,
    unsaturatedFat: 1.1,
    solubleFiber: 1.2,
    insolubleFiber: 8.6,
  },
  boiled_barnyard_millet: {
    label: "Boiled Barnyard Millet",
    calories: 110,
    protein: 2.2,
    saturatedFat: 0.1,
    unsaturatedFat: 0.4,
    solubleFiber: 0.4,
    insolubleFiber: 3.0,
  },
  kodo_millet: {
    label: "Kodo Millet",
    calories: 309,
    protein: 8.3,
    saturatedFat: 0.4,
    unsaturatedFat: 1.6,
    solubleFiber: 1.6,
    insolubleFiber: 9.0,
  },
  boiled_kodo_millet: {
    label: "Boiled Kodo Millet",
    calories: 115,
    protein: 3.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.6,
    solubleFiber: 0.6,
    insolubleFiber: 3.2,
  },
  proso_millet: {
    label: "Proso Millet",
    calories: 341,
    protein: 11.0,
    saturatedFat: 0.5,
    unsaturatedFat: 2.5,
    solubleFiber: 1.3,
    insolubleFiber: 7.2,
  },
  boiled_proso_millet: {
    label: "Boiled Proso Millet",
    calories: 128,
    protein: 3.8,
    saturatedFat: 0.2,
    unsaturatedFat: 0.9,
    solubleFiber: 0.5,
    insolubleFiber: 2.6,
  },
  corn: {
    label: "Sweet Corn",
    calories: 86,
    protein: 3.3,
    saturatedFat: 0.2,
    unsaturatedFat: 1.0,
    solubleFiber: 0.8,
    insolubleFiber: 1.9,
  },
  boiled_corn: {
    label: "Boiled Corn",
    calories: 96,
    protein: 3.4,
    saturatedFat: 0.3,
    unsaturatedFat: 1.2,
    solubleFiber: 0.9,
    insolubleFiber: 2.1,
  },
  sabudana: {
    label: "Sabudana (Tapioca Sago)",
    calories: 358,
    protein: 0.2,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.2,
    insolubleFiber: 0.3,
  },
  boiled_sabudana: {
    label: "Boiled Sabudana",
    calories: 140,
    protein: 0.1,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.1,
    insolubleFiber: 0.1,
  },
  quinoa: {
    label: "Quinoa",
    calories: 120,
    protein: 4.4,
    saturatedFat: 0.2,
    unsaturatedFat: 1.5,
    solubleFiber: 0.8,
    insolubleFiber: 2.0,
  },

  // ==========================================
  // 2. PULSES & LEGUMES (Raw & Boiled)
  // ==========================================
  dal: {
    label: "Dal (Generic Moong/Toor)",
    calories: 116,
    protein: 9.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.2,
    solubleFiber: 1.3,
    insolubleFiber: 3.1,
  },
  toor_dal: {
    label: "Toor Dal (Raw)",
    calories: 343,
    protein: 22.3,
    saturatedFat: 0.3,
    unsaturatedFat: 1.2,
    solubleFiber: 3.5,
    insolubleFiber: 11.5,
  },
  boiled_toor_dal: {
    label: "Boiled Toor Dal",
    calories: 115,
    protein: 7.5,
    saturatedFat: 0.1,
    unsaturatedFat: 0.4,
    solubleFiber: 1.2,
    insolubleFiber: 3.8,
  },
  moong_dal: {
    label: "Moong Dal (Raw)",
    calories: 347,
    protein: 24.0,
    saturatedFat: 0.3,
    unsaturatedFat: 0.9,
    solubleFiber: 3.2,
    insolubleFiber: 13.0,
  },
  boiled_moong_dal: {
    label: "Boiled Moong Dal",
    calories: 105,
    protein: 7.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.3,
    solubleFiber: 1.0,
    insolubleFiber: 4.0,
  },
  chana_dal: {
    label: "Chana Dal (Raw)",
    calories: 360,
    protein: 20.8,
    saturatedFat: 0.5,
    unsaturatedFat: 2.1,
    solubleFiber: 4.0,
    insolubleFiber: 11.0,
  },
  boiled_chana_dal: {
    label: "Boiled Chana Dal",
    calories: 134,
    protein: 7.2,
    saturatedFat: 0.2,
    unsaturatedFat: 0.8,
    solubleFiber: 1.5,
    insolubleFiber: 4.2,
  },
  masoor_dal: {
    label: "Masoor Dal (Raw)",
    calories: 353,
    protein: 25.0,
    saturatedFat: 0.4,
    unsaturatedFat: 1.0,
    solubleFiber: 3.0,
    insolubleFiber: 8.5,
  },
  boiled_masoor_dal: {
    label: "Boiled Masoor Dal",
    calories: 116,
    protein: 9.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.4,
    solubleFiber: 1.1,
    insolubleFiber: 3.0,
  },
  urad_dal: {
    label: "Urad Dal (Raw)",
    calories: 341,
    protein: 25.2,
    saturatedFat: 0.3,
    unsaturatedFat: 0.8,
    solubleFiber: 4.5,
    insolubleFiber: 13.5,
  },
  boiled_urad_dal: {
    label: "Boiled Urad Dal",
    calories: 110,
    protein: 8.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.3,
    solubleFiber: 1.5,
    insolubleFiber: 4.5,
  },
  rajma: {
    label: "Rajma (Kidney Beans - Raw)",
    calories: 333,
    protein: 23.6,
    saturatedFat: 0.5,
    unsaturatedFat: 1.2,
    solubleFiber: 6.0,
    insolubleFiber: 18.0,
  },
  boiled_rajma: {
    label: "Boiled Rajma",
    calories: 127,
    protein: 8.7,
    saturatedFat: 0.1,
    unsaturatedFat: 0.4,
    solubleFiber: 2.2,
    insolubleFiber: 6.5,
  },
  chole: {
    label: "Kabuli Chana (Chickpeas - Raw)",
    calories: 364,
    protein: 19.0,
    saturatedFat: 0.6,
    unsaturatedFat: 3.5,
    solubleFiber: 5.0,
    insolubleFiber: 12.5,
  },
  boiled_chole: {
    label: "Boiled Chole",
    calories: 164,
    protein: 8.9,
    saturatedFat: 0.3,
    unsaturatedFat: 1.6,
    solubleFiber: 2.0,
    insolubleFiber: 5.6,
  },
  lobia: {
    label: "Black-Eyed Peas (Raw)",
    calories: 336,
    protein: 23.5,
    saturatedFat: 0.5,
    unsaturatedFat: 1.3,
    solubleFiber: 3.5,
    insolubleFiber: 15.0,
  },
  boiled_lobia: {
    label: "Boiled Lobia",
    calories: 116,
    protein: 7.7,
    saturatedFat: 0.2,
    unsaturatedFat: 0.4,
    solubleFiber: 1.2,
    insolubleFiber: 5.0,
  },
  horse_gram: {
    label: "Horse Gram (Kulthi - Raw)",
    calories: 321,
    protein: 22.0,
    saturatedFat: 0.5,
    unsaturatedFat: 1.1,
    solubleFiber: 4.0,
    insolubleFiber: 15.5,
  },
  boiled_horse_gram: {
    label: "Boiled Horse Gram",
    calories: 110,
    protein: 7.5,
    saturatedFat: 0.2,
    unsaturatedFat: 0.4,
    solubleFiber: 1.4,
    insolubleFiber: 5.2,
  },
  moth_beans: {
    label: "Moth Beans (Matki - Raw)",
    calories: 343,
    protein: 23.0,
    saturatedFat: 0.5,
    unsaturatedFat: 1.2,
    solubleFiber: 3.8,
    insolubleFiber: 14.0,
  },
  boiled_moth_beans: {
    label: "Boiled Moth Beans",
    calories: 118,
    protein: 7.9,
    saturatedFat: 0.2,
    unsaturatedFat: 0.4,
    solubleFiber: 1.3,
    insolubleFiber: 4.8,
  },
  green_gram: {
    label: "Green Gram Whole (Raw)",
    calories: 347,
    protein: 24.0,
    saturatedFat: 0.3,
    unsaturatedFat: 0.9,
    solubleFiber: 3.5,
    insolubleFiber: 13.0,
  },
  boiled_green_gram: {
    label: "Boiled Green Gram Whole",
    calories: 105,
    protein: 7.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.3,
    solubleFiber: 1.2,
    insolubleFiber: 4.5,
  },
  matar: {
    label: "Dry Green Peas (Raw)",
    calories: 340,
    protein: 24.5,
    saturatedFat: 0.4,
    unsaturatedFat: 1.1,
    solubleFiber: 5.0,
    insolubleFiber: 20.0,
  },
  boiled_matar: {
    label: "Boiled Green Peas",
    calories: 81,
    protein: 5.4,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 2.0,
    insolubleFiber: 3.0,
  },
  soyabean: {
    label: "Soybean (Raw)",
    calories: 446,
    protein: 36.5,
    saturatedFat: 2.9,
    unsaturatedFat: 16.5,
    solubleFiber: 3.5,
    insolubleFiber: 6.0,
  },
  boiled_soyabean: {
    label: "Boiled Soybean",
    calories: 172,
    protein: 16.6,
    saturatedFat: 1.1,
    unsaturatedFat: 6.3,
    solubleFiber: 1.5,
    insolubleFiber: 2.5,
  },

  // ==========================================
  // 3. VEGETABLES (Raw & Boiled)
  // ==========================================
  potato: {
    label: "Potato",
    calories: 77,
    protein: 2.0,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.3,
    insolubleFiber: 1.4,
  },
  boiled_potato: {
    label: "Boiled Potato",
    calories: 87,
    protein: 1.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.3,
    insolubleFiber: 1.5,
  },
  carrot: {
    label: "Carrot",
    calories: 41,
    protein: 0.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.9,
    insolubleFiber: 1.6,
  },
  boiled_carrot: {
    label: "Boiled Carrot",
    calories: 35,
    protein: 0.8,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8,
    insolubleFiber: 1.5,
  },
  spinach: {
    label: "Spinach",
    calories: 23,
    protein: 2.9,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.6,
    insolubleFiber: 1.5,
  },
  boiled_spinach: {
    label: "Boiled Spinach",
    calories: 23,
    protein: 3.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.7,
    insolubleFiber: 1.7,
  },
  tomato: {
    label: "Tomato",
    calories: 18,
    protein: 0.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.2,
    insolubleFiber: 1.2,
  },
  boiled_tomato: {
    label: "Boiled Tomato",
    calories: 24,
    protein: 1.1,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.3,
    insolubleFiber: 1.5,
  },
  onion: {
    label: "Onion",
    calories: 40,
    protein: 1.1,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.5,
    insolubleFiber: 1.2,
  },
  boiled_onion: {
    label: "Boiled Onion",
    calories: 39,
    protein: 1.0,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.5,
    insolubleFiber: 1.2,
  },
  cauliflower: {
    label: "Cauliflower",
    calories: 25,
    protein: 1.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8,
    insolubleFiber: 1.2,
  },
  boiled_cauliflower: {
    label: "Boiled Cauliflower",
    calories: 23,
    protein: 1.8,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8,
    insolubleFiber: 1.3,
  },
  cabbage: {
    label: "Cabbage",
    calories: 25,
    protein: 1.3,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.6,
    insolubleFiber: 1.9,
  },
  boiled_cabbage: {
    label: "Boiled Cabbage",
    calories: 22,
    protein: 1.0,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.5,
    insolubleFiber: 1.7,
  },
  brinjal: {
    label: "Brinjal (Eggplant)",
    calories: 25,
    protein: 1.0,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 1.3,
    insolubleFiber: 1.7,
  },
  boiled_brinjal: {
    label: "Boiled Brinjal",
    calories: 35,
    protein: 0.8,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 1.5,
    insolubleFiber: 2.0,
  },
  bhindi: {
    label: "Bhindi (Okra / Ladyfinger)",
    calories: 33,
    protein: 1.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 1.8,
    insolubleFiber: 1.4,
  },
  boiled_bhindi: {
    label: "Boiled Bhindi",
    calories: 28,
    protein: 1.7,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 1.5,
    insolubleFiber: 1.2,
  },
  bottle_gourd: {
    label: "Bottle Gourd (Lauki)",
    calories: 14,
    protein: 0.6,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.3,
    insolubleFiber: 1.2,
  },
  boiled_bottle_gourd: {
    label: "Boiled Bottle Gourd",
    calories: 15,
    protein: 0.6,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.3,
    insolubleFiber: 1.2,
  },
  bitter_gourd: {
    label: "Bitter Gourd (Karela)",
    calories: 17,
    protein: 1.0,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8,
    insolubleFiber: 2.0,
  },
  boiled_bitter_gourd: {
    label: "Boiled Bitter Gourd",
    calories: 20,
    protein: 0.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8,
    insolubleFiber: 2.0,
  },
  ridge_gourd: {
    label: "Ridge Gourd (Turai)",
    calories: 20,
    protein: 1.2,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.5,
    insolubleFiber: 2.0,
  },
  boiled_ridge_gourd: {
    label: "Boiled Ridge Gourd",
    calories: 18,
    protein: 1.0,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.5,
    insolubleFiber: 1.8,
  },
  drumstick: {
    label: "Drumstick (Moringa Pods)",
    calories: 37,
    protein: 2.1,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 1.1,
    insolubleFiber: 3.7,
  },
  boiled_drumstick: {
    label: "Boiled Drumstick",
    calories: 30,
    protein: 2.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 1.0,
    insolubleFiber: 3.5,
  },
  capsicum: {
    label: "Capsicum (Bell Pepper)",
    calories: 20,
    protein: 0.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.5,
    insolubleFiber: 1.2,
  },
  boiled_capsicum: {
    label: "Boiled Capsicum",
    calories: 24,
    protein: 0.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.6,
    insolubleFiber: 1.4,
  },
  beetroot: {
    label: "Beetroot",
    calories: 43,
    protein: 1.6,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8,
    insolubleFiber: 2.0,
  },
  boiled_beetroot: {
    label: "Boiled Beetroot",
    calories: 44,
    protein: 1.7,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8,
    insolubleFiber: 2.0,
  },
  radish: {
    label: "Radish (Muli)",
    calories: 16,
    protein: 0.7,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.5,
    insolubleFiber: 1.1,
  },
  boiled_radish: {
    label: "Boiled Radish",
    calories: 18,
    protein: 0.8,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.5,
    insolubleFiber: 1.2,
  },
  turnip: {
    label: "Turnip",
    calories: 28,
    protein: 0.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.6,
    insolubleFiber: 1.2,
  },
  boiled_turnip: {
    label: "Boiled Turnip",
    calories: 24,
    protein: 0.8,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.5,
    insolubleFiber: 1.1,
  },
  sweet_potato: {
    label: "Sweet Potato",
    calories: 86,
    protein: 1.6,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 1.0,
    insolubleFiber: 2.0,
  },
  boiled_sweet_potato: {
    label: "Boiled Sweet Potato",
    calories: 76,
    protein: 1.4,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.9,
    insolubleFiber: 1.9,
  },
  raw_banana: {
    label: "Raw Banana (Plantain)",
    calories: 122,
    protein: 1.3,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 1.2,
    insolubleFiber: 1.8,
  },
  boiled_raw_banana: {
    label: "Boiled Raw Banana",
    calories: 116,
    protein: 1.2,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 1.1,
    insolubleFiber: 1.7,
  },
  raw_papaya: {
    label: "Raw Papaya",
    calories: 29,
    protein: 2.0,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.5,
    insolubleFiber: 1.3,
  },
  boiled_raw_papaya: {
    label: "Boiled Raw Papaya",
    calories: 26,
    protein: 1.8,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.4,
    insolubleFiber: 1.2,
  },
  pumpkin: {
    label: "Pumpkin",
    calories: 26,
    protein: 1.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.5,
    insolubleFiber: 1.0,
  },
  boiled_pumpkin: {
    label: "Boiled Pumpkin",
    calories: 20,
    protein: 0.7,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.4,
    insolubleFiber: 0.8,
  },
  cucumber: {
    label: "Cucumber",
    calories: 15,
    protein: 0.6,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.1,
    insolubleFiber: 0.4,
  },
  amaranth_leaves: {
    label: "Amaranth Leaves (Chaulai)",
    calories: 23,
    protein: 2.5,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8,
    insolubleFiber: 2.1,
  },
  boiled_amaranth_leaves: {
    label: "Boiled Amaranth Leaves",
    calories: 20,
    protein: 2.2,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.7,
    insolubleFiber: 1.9,
  },
  fenugreek_leaves: {
    label: "Fenugreek Leaves (Methi)",
    calories: 49,
    protein: 4.4,
    saturatedFat: 0.1,
    unsaturatedFat: 0.2,
    solubleFiber: 1.5,
    insolubleFiber: 3.5,
  },
  boiled_fenugreek_leaves: {
    label: "Boiled Fenugreek Leaves",
    calories: 40,
    protein: 3.8,
    saturatedFat: 0.1,
    unsaturatedFat: 0.2,
    solubleFiber: 1.3,
    insolubleFiber: 3.0,
  },
  coriander_leaves: {
    label: "Coriander Leaves",
    calories: 23,
    protein: 2.1,
    saturatedFat: 0.0,
    unsaturatedFat: 0.3,
    solubleFiber: 0.5,
    insolubleFiber: 2.3,
  },
  mint_leaves: {
    label: "Mint Leaves (Pudina)",
    calories: 70,
    protein: 3.8,
    saturatedFat: 0.2,
    unsaturatedFat: 0.5,
    solubleFiber: 2.0,
    insolubleFiber: 6.0,
  },
  curry_leaves: {
    label: "Curry Leaves",
    calories: 108,
    protein: 6.1,
    saturatedFat: 0.2,
    unsaturatedFat: 0.8,
    solubleFiber: 2.5,
    insolubleFiber: 6.4,
  },
  jackfruit_raw: {
    label: "Raw Jackfruit (Kathal)",
    calories: 95,
    protein: 1.7,
    saturatedFat: 0.3,
    unsaturatedFat: 0.2,
    solubleFiber: 1.5,
    insolubleFiber: 3.5,
  },
  boiled_jackfruit: {
    label: "Boiled Raw Jackfruit",
    calories: 92,
    protein: 1.5,
    saturatedFat: 0.2,
    unsaturatedFat: 0.2,
    solubleFiber: 1.4,
    insolubleFiber: 3.2,
  },
  colocasia: {
    label: "Colocasia Root (Arbi)",
    calories: 112,
    protein: 1.5,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 1.0,
    insolubleFiber: 3.1,
  },
  boiled_colocasia: {
    label: "Boiled Colocasia Root",
    calories: 97,
    protein: 1.3,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.9,
    insolubleFiber: 2.8,
  },
  yam: {
    label: "Elephant Foot Yam (Suran)",
    calories: 79,
    protein: 1.5,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8,
    insolubleFiber: 3.2,
  },
  boiled_yam: {
    label: "Boiled Elephant Foot Yam",
    calories: 74,
    protein: 1.4,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.7,
    insolubleFiber: 3.0,
  },
  cluster_beans: {
    label: "Cluster Beans (Guar)",
    calories: 33,
    protein: 3.2,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 2.0,
    insolubleFiber: 3.4,
  },
  boiled_cluster_beans: {
    label: "Boiled Cluster Beans",
    calories: 30,
    protein: 2.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 1.8,
    insolubleFiber: 3.1,
  },
  french_beans: {
    label: "French Beans",
    calories: 31,
    protein: 1.8,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.9,
    insolubleFiber: 2.5,
  },
  boiled_french_beans: {
    label: "Boiled French Beans",
    calories: 35,
    protein: 1.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 1.0,
    insolubleFiber: 2.7,
  },
  ash_gourd: {
    label: "Ash Gourd (Petha)",
    calories: 13,
    protein: 0.4,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.2,
    insolubleFiber: 0.8,
  },
  boiled_ash_gourd: {
    label: "Boiled Ash Gourd",
    calories: 12,
    protein: 0.4,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.2,
    insolubleFiber: 0.8,
  },
  pointed_gourd: {
    label: "Pointed Gourd (Parwal)",
    calories: 20,
    protein: 2.0,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.5,
    insolubleFiber: 2.5,
  },
  boiled_pointed_gourd: {
    label: "Boiled Pointed Gourd",
    calories: 18,
    protein: 1.8,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.4,
    insolubleFiber: 2.2,
  },
  tinda: {
    label: "Round Gourd (Tinda)",
    calories: 21,
    protein: 1.4,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.5,
    insolubleFiber: 1.2,
  },
  boiled_tinda: {
    label: "Boiled Round Gourd",
    calories: 19,
    protein: 1.2,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.4,
    insolubleFiber: 1.1,
  },
  raw_mango: {
    label: "Raw Mango",
    calories: 50,
    protein: 0.6,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.5,
    insolubleFiber: 1.3,
  },
  knol_khol: {
    label: "Knol Khol (Kohlrabi)",
    calories: 27,
    protein: 1.7,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8,
    insolubleFiber: 2.8,
  },
  boiled_knol_khol: {
    label: "Boiled Knol Khol",
    calories: 24,
    protein: 1.5,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.7,
    insolubleFiber: 2.5,
  },
  spring_onion: {
    label: "Spring Onion",
    calories: 32,
    protein: 1.8,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.6,
    insolubleFiber: 2.0,
  },
  garlic_cloves: {
    label: "Garlic",
    calories: 149,
    protein: 6.4,
    saturatedFat: 0.1,
    unsaturatedFat: 0.2,
    solubleFiber: 1.0,
    insolubleFiber: 1.1,
  },
  ginger: {
    label: "Ginger Root",
    calories: 80,
    protein: 1.8,
    saturatedFat: 0.2,
    unsaturatedFat: 0.5,
    solubleFiber: 0.5,
    insolubleFiber: 1.5,
  },
  lemon: {
    label: "Lemon",
    calories: 29,
    protein: 1.1,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8,
    insolubleFiber: 2.0,
  },
  raw_banana_flower: {
    label: "Banana Flower (Kele ka Phool)",
    calories: 51,
    protein: 1.6,
    saturatedFat: 0.1,
    unsaturatedFat: 0.2,
    solubleFiber: 1.2,
    insolubleFiber: 4.5,
  },
  boiled_banana_flower: {
    label: "Boiled Banana Flower",
    calories: 45,
    protein: 1.4,
    saturatedFat: 0.1,
    unsaturatedFat: 0.2,
    solubleFiber: 1.0,
    insolubleFiber: 4.0,
  },

  // ==========================================
  // 4. FRUITS (Raw)
  // ==========================================
  banana: {
    label: "Banana",
    calories: 89,
    protein: 1.1,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.7,
    insolubleFiber: 1.0,
  },
  apple: {
    label: "Apple",
    calories: 52,
    protein: 0.3,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 1.0,
    insolubleFiber: 1.2,
  },
  mango: {
    label: "Mango",
    calories: 60,
    protein: 0.8,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8,
    insolubleFiber: 1.0,
  },
  papaya: {
    label: "Papaya",
    calories: 43,
    protein: 0.5,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.5,
    insolubleFiber: 1.3,
  },
  guava: {
    label: "Guava",
    calories: 68,
    protein: 2.55,
    saturatedFat: 0.1,
    unsaturatedFat: 0.4,
    solubleFiber: 2.0,
    insolubleFiber: 3.4,
  },
  pomegranate: {
    label: "Pomegranate",
    calories: 83,
    protein: 1.7,
    saturatedFat: 0.1,
    unsaturatedFat: 0.2,
    solubleFiber: 0.8,
    insolubleFiber: 3.0,
  },
  orange: {
    label: "Orange",
    calories: 47,
    protein: 0.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.8,
    insolubleFiber: 1.6,
  },
  mosambi: {
    label: "Sweet Lime (Mosambi)",
    calories: 43,
    protein: 0.8,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.7,
    insolubleFiber: 1.5,
  },
  watermelon: {
    label: "Watermelon",
    calories: 30,
    protein: 0.6,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.1,
    insolubleFiber: 0.3,
  },
  muskmelon: {
    label: "Muskmelon (Kharbuja)",
    calories: 34,
    protein: 0.8,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.3,
    insolubleFiber: 0.6,
  },
  grapes: {
    label: "Grapes",
    calories: 69,
    protein: 0.7,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.4,
    insolubleFiber: 0.5,
  },
  pineapple: {
    label: "Pineapple",
    calories: 50,
    protein: 0.5,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.4,
    insolubleFiber: 1.0,
  },
  sapota: {
    label: "Sapota (Chikoo)",
    calories: 83,
    protein: 0.4,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 1.5,
    insolubleFiber: 3.8,
  },
  custard_apple: {
    label: "Custard Apple (Sitaphal)",
    calories: 94,
    protein: 2.1,
    saturatedFat: 0.1,
    unsaturatedFat: 0.2,
    solubleFiber: 1.2,
    insolubleFiber: 2.2,
  },
  pear: {
    label: "Pear",
    calories: 57,
    protein: 0.4,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 1.2,
    insolubleFiber: 1.9,
  },
  peach: {
    label: "Peach",
    calories: 39,
    protein: 0.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.5,
    insolubleFiber: 1.0,
  },
  plum: {
    label: "Plum",
    calories: 46,
    protein: 0.7,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.6,
    insolubleFiber: 0.8,
  },
  litchi: {
    label: "Litchi",
    calories: 66,
    protein: 0.8,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.4,
    insolubleFiber: 0.9,
  },
  jackfruit_ripe: {
    label: "Ripe Jackfruit",
    calories: 95,
    protein: 1.7,
    saturatedFat: 0.3,
    unsaturatedFat: 0.2,
    solubleFiber: 1.5,
    insolubleFiber: 3.5,
  },
  coconut_water: {
    label: "Tender Coconut Water",
    calories: 19,
    protein: 0.7,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  coconut_kernel: {
    label: "Raw Coconut Kernel",
    calories: 354,
    protein: 3.3,
    saturatedFat: 29.7,
    unsaturatedFat: 3.0,
    solubleFiber: 1.5,
    insolubleFiber: 7.5,
  },
  amla: {
    label: "Amla (Indian Gooseberry)",
    calories: 44,
    protein: 0.9,
    saturatedFat: 0.1,
    unsaturatedFat: 0.2,
    solubleFiber: 1.0,
    insolubleFiber: 3.3,
  },
  jamun: {
    label: "Jamun (Black Plum)",
    calories: 60,
    protein: 0.7,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.9,
    insolubleFiber: 1.6,
  },
  fig: {
    label: "Fresh Fig (Anjeer)",
    calories: 74,
    protein: 0.8,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.9,
    insolubleFiber: 2.0,
  },
  dates: {
    label: "Fresh Dates",
    calories: 282,
    protein: 2.5,
    saturatedFat: 0.0,
    unsaturatedFat: 0.4,
    solubleFiber: 2.0,
    insolubleFiber: 6.0,
  },
  strawberry: {
    label: "Strawberry",
    calories: 32,
    protein: 0.7,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.6,
    insolubleFiber: 1.4,
  },
  kiwi: {
    label: "Kiwi",
    calories: 61,
    protein: 1.1,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 1.0,
    insolubleFiber: 2.0,
  },
  ber: {
    label: "Ber (Indian Jujube)",
    calories: 74,
    protein: 0.8,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 1.0,
    insolubleFiber: 1.5,
  },
  karonda: {
    label: "Karonda (Carissa carandas)",
    calories: 35,
    protein: 0.5,
    saturatedFat: 0.0,
    unsaturatedFat: 0.0,
    solubleFiber: 0.8,
    insolubleFiber: 2.0,
  },

  // ==========================================
  // 5. DAIRY PRODUCTS
  // ==========================================
  milk: {
    label: "Milk",
    calories: 61,
    protein: 3.2,
    saturatedFat: 1.9,
    unsaturatedFat: 0.8,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  toned_milk: {
    label: "Toned Milk",
    calories: 58,
    protein: 3.3,
    saturatedFat: 1.8,
    unsaturatedFat: 0.7,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  skimmed_milk: {
    label: "Skimmed Milk",
    calories: 35,
    protein: 3.4,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  buffalo_milk: {
    label: "Buffalo Milk",
    calories: 97,
    protein: 3.7,
    saturatedFat: 5.5,
    unsaturatedFat: 1.8,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  curd: {
    label: "Curd (Yogurt)",
    calories: 61,
    protein: 3.5,
    saturatedFat: 1.2,
    unsaturatedFat: 0.5,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  skim_curd: {
    label: "Skimmed Milk Curd",
    calories: 56,
    protein: 4.5,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  paneer: {
    label: "Paneer",
    calories: 265,
    protein: 18.3,
    saturatedFat: 14.0,
    unsaturatedFat: 7.0,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  butter: {
    label: "Butter",
    calories: 717,
    protein: 0.85,
    saturatedFat: 51.0,
    unsaturatedFat: 21.0,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  ghee: {
    label: "Ghee (Clarified Butter)",
    calories: 900,
    protein: 0.0,
    saturatedFat: 61.9,
    unsaturatedFat: 28.7,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  cheese: {
    label: "Cheese",
    calories: 402,
    protein: 25.0,
    saturatedFat: 21.0,
    unsaturatedFat: 9.0,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  chaas: {
    label: "Chaas (Buttermilk)",
    calories: 40,
    protein: 2.5,
    saturatedFat: 0.8,
    unsaturatedFat: 0.3,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  khoya: {
    label: "Khoya / Mawa",
    calories: 376,
    protein: 16.0,
    saturatedFat: 18.0,
    unsaturatedFat: 7.5,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  fresh_cream: {
    label: "Fresh Cream",
    calories: 345,
    protein: 2.1,
    saturatedFat: 22.0,
    unsaturatedFat: 8.0,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  condensed_milk: {
    label: "Sweetened Condensed Milk",
    calories: 321,
    protein: 7.9,
    saturatedFat: 4.8,
    unsaturatedFat: 2.0,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  shrikhand: {
    label: "Shrikhand",
    calories: 260,
    protein: 5.5,
    saturatedFat: 5.0,
    unsaturatedFat: 2.0,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  chenna: {
    label: "Chenna",
    calories: 198,
    protein: 17.5,
    saturatedFat: 9.5,
    unsaturatedFat: 4.0,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },

  // ==========================================
  // 6. NUTS & SEEDS (Raw & Roasted)
  // ==========================================
  peanuts: {
    label: "Peanuts (Raw)",
    calories: 567,
    protein: 25.8,
    saturatedFat: 7.3,
    unsaturatedFat: 36.0,
    solubleFiber: 2.1,
    insolubleFiber: 6.0,
  },
  roasted_peanuts: {
    label: "Roasted Peanuts",
    calories: 585,
    protein: 24.0,
    saturatedFat: 6.9,
    unsaturatedFat: 42.0,
    solubleFiber: 2.3,
    insolubleFiber: 6.5,
  },
  almonds: {
    label: "Almonds (Raw)",
    calories: 579,
    protein: 21.1,
    saturatedFat: 3.8,
    unsaturatedFat: 44.0,
    solubleFiber: 2.9,
    insolubleFiber: 9.5,
  },
  roasted_almonds: {
    label: "Roasted Almonds",
    calories: 598,
    protein: 21.0,
    saturatedFat: 4.0,
    unsaturatedFat: 46.0,
    solubleFiber: 3.0,
    insolubleFiber: 9.2,
  },
  cashews: {
    label: "Cashews (Raw)",
    calories: 553,
    protein: 18.2,
    saturatedFat: 7.8,
    unsaturatedFat: 32.7,
    solubleFiber: 1.0,
    insolubleFiber: 2.3,
  },
  roasted_cashews: {
    label: "Roasted Cashews",
    calories: 574,
    protein: 15.3,
    saturatedFat: 8.5,
    unsaturatedFat: 35.0,
    solubleFiber: 1.1,
    insolubleFiber: 2.2,
  },
  pistachios: {
    label: "Pistachios (Raw)",
    calories: 562,
    protein: 20.2,
    saturatedFat: 5.4,
    unsaturatedFat: 39.0,
    solubleFiber: 3.0,
    insolubleFiber: 7.3,
  },
  roasted_pistachios: {
    label: "Roasted Pistachios",
    calories: 594,
    protein: 21.0,
    saturatedFat: 6.0,
    unsaturatedFat: 41.0,
    solubleFiber: 3.2,
    insolubleFiber: 7.4,
  },
  walnuts: {
    label: "Walnuts",
    calories: 654,
    protein: 15.2,
    saturatedFat: 6.1,
    unsaturatedFat: 58.0,
    solubleFiber: 1.9,
    insolubleFiber: 4.8,
  },
  raisins: {
    label: "Raisins (Dry Fruits)",
    calories: 299,
    protein: 3.1,
    saturatedFat: 0.1,
    unsaturatedFat: 0.3,
    solubleFiber: 1.5,
    insolubleFiber: 5.2,
  },
  dates_dry: {
    label: "Dry Dates (Chhuhara)",
    calories: 309,
    protein: 2.8,
    saturatedFat: 0.1,
    unsaturatedFat: 0.4,
    solubleFiber: 3.5,
    insolubleFiber: 5.5,
  },
  sunflower_seeds: {
    label: "Sunflower Seeds",
    calories: 584,
    protein: 20.8,
    saturatedFat: 4.5,
    unsaturatedFat: 43.0,
    solubleFiber: 3.0,
    insolubleFiber: 5.5,
  },
  roasted_sunflower_seeds: {
    label: "Roasted Sunflower Seeds",
    calories: 601,
    protein: 21.0,
    saturatedFat: 4.8,
    unsaturatedFat: 45.0,
    solubleFiber: 3.1,
    insolubleFiber: 5.6,
  },
  pumpkin_seeds: {
    label: "Pumpkin Seeds",
    calories: 559,
    protein: 30.2,
    saturatedFat: 8.7,
    unsaturatedFat: 39.0,
    solubleFiber: 2.0,
    insolubleFiber: 4.0,
  },
  roasted_pumpkin_seeds: {
    label: "Roasted Pumpkin Seeds",
    calories: 574,
    protein: 31.0,
    saturatedFat: 9.0,
    unsaturatedFat: 40.0,
    solubleFiber: 2.1,
    insolubleFiber: 4.1,
  },
  flax_seeds: {
    label: "Flax Seeds",
    calories: 534,
    protein: 18.3,
    saturatedFat: 3.7,
    unsaturatedFat: 37.0,
    solubleFiber: 10.0,
    insolubleFiber: 17.3,
  },
  roasted_flax_seeds: {
    label: "Roasted Flax Seeds",
    calories: 545,
    protein: 18.5,
    saturatedFat: 3.9,
    unsaturatedFat: 38.0,
    solubleFiber: 10.2,
    insolubleFiber: 17.5,
  },
  sesame_seeds: {
    label: "Sesame Seeds (Til)",
    calories: 573,
    protein: 17.7,
    saturatedFat: 9.6,
    unsaturatedFat: 38.8,
    solubleFiber: 2.0,
    insolubleFiber: 9.8,
  },
  roasted_sesame_seeds: {
    label: "Roasted Sesame Seeds",
    calories: 589,
    protein: 18.0,
    saturatedFat: 9.8,
    unsaturatedFat: 40.0,
    solubleFiber: 2.1,
    insolubleFiber: 10.0,
  },
  melon_seeds: {
    label: "Melon Seeds (Magaj)",
    calories: 557,
    protein: 28.3,
    saturatedFat: 4.0,
    unsaturatedFat: 41.0,
    solubleFiber: 1.5,
    insolubleFiber: 3.5,
  },
  charoli: {
    label: "Charoli (Chironji)",
    calories: 656,
    protein: 21.0,
    saturatedFat: 6.0,
    unsaturatedFat: 50.0,
    solubleFiber: 2.0,
    insolubleFiber: 4.5,
  },

  // ==========================================
  // 7. MEATS & EGGS (Boiled, Fried & Curried)
  // ==========================================
  egg: {
    label: "Egg (Whole Raw)",
    calories: 155,
    protein: 13.0,
    saturatedFat: 3.1,
    unsaturatedFat: 5.4,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  boiled_egg: {
    label: "Boiled Egg",
    calories: 155,
    protein: 12.6,
    saturatedFat: 3.3,
    unsaturatedFat: 5.3,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  fried_egg: {
    label: "Fried Egg",
    calories: 196,
    protein: 13.6,
    saturatedFat: 4.1,
    unsaturatedFat: 9.2,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  egg_white_boiled: {
    label: "Boiled Egg White",
    calories: 52,
    protein: 10.9,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  chicken: {
    label: "Chicken Breast (Raw)",
    calories: 165,
    protein: 31.0,
    saturatedFat: 1.0,
    unsaturatedFat: 1.6,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  boiled_chicken: {
    label: "Boiled Chicken",
    calories: 172,
    protein: 31.8,
    saturatedFat: 1.1,
    unsaturatedFat: 1.8,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  fried_chicken: {
    label: "Fried Chicken",
    calories: 246,
    protein: 23.5,
    saturatedFat: 5.2,
    unsaturatedFat: 11.5,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  chicken_curry: {
    label: "Chicken Curry",
    calories: 185,
    protein: 16.5,
    saturatedFat: 4.2,
    unsaturatedFat: 8.0,
    solubleFiber: 0.2,
    insolubleFiber: 0.5,
  },
  mutton: {
    label: "Mutton (Goat Meat - Raw)",
    calories: 143,
    protein: 27.1,
    saturatedFat: 1.8,
    unsaturatedFat: 1.5,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  boiled_mutton: {
    label: "Boiled Mutton",
    calories: 205,
    protein: 30.0,
    saturatedFat: 3.5,
    unsaturatedFat: 4.2,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  mutton_curry: {
    label: "Mutton Curry",
    calories: 235,
    protein: 18.0,
    saturatedFat: 7.5,
    unsaturatedFat: 9.0,
    solubleFiber: 0.3,
    insolubleFiber: 0.6,
  },
  fish_rohu: {
    label: "Rohu Fish (Raw)",
    calories: 97,
    protein: 17.5,
    saturatedFat: 0.5,
    unsaturatedFat: 1.2,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  boiled_fish: {
    label: "Boiled Fish",
    calories: 112,
    protein: 19.5,
    saturatedFat: 0.6,
    unsaturatedFat: 1.5,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  fried_fish: {
    label: "Fried Fish",
    calories: 185,
    protein: 21.0,
    saturatedFat: 3.2,
    unsaturatedFat: 8.5,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  fish_curry: {
    label: "Fish Curry",
    calories: 135,
    protein: 14.5,
    saturatedFat: 2.1,
    unsaturatedFat: 5.0,
    solubleFiber: 0.2,
    insolubleFiber: 0.4,
  },
  prawns: {
    label: "Prawns (Raw)",
    calories: 99,
    protein: 24.0,
    saturatedFat: 0.3,
    unsaturatedFat: 0.6,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  boiled_prawns: {
    label: "Boiled Prawns",
    calories: 105,
    protein: 25.1,
    saturatedFat: 0.3,
    unsaturatedFat: 0.7,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  fried_prawns: {
    label: "Fried Prawns",
    calories: 170,
    protein: 22.0,
    saturatedFat: 2.5,
    unsaturatedFat: 7.0,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  prawn_curry: {
    label: "Prawn Curry",
    calories: 150,
    protein: 15.0,
    saturatedFat: 3.8,
    unsaturatedFat: 6.2,
    solubleFiber: 0.2,
    insolubleFiber: 0.4,
  },
  pomfret: {
    label: "Pomfret Fish",
    calories: 115,
    protein: 19.0,
    saturatedFat: 0.8,
    unsaturatedFat: 2.0,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  surmai: {
    label: "Surmai (Kingfish)",
    calories: 138,
    protein: 20.5,
    saturatedFat: 1.0,
    unsaturatedFat: 3.5,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  crab: {
    label: "Crab Meat",
    calories: 97,
    protein: 19.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.6,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },

  // ==========================================
  // 8. FLAKES & PUFFED GRAINS
  // ==========================================
  poha: {
    label: "Poha (Flattened Rice - Raw)",
    calories: 346,
    protein: 6.5,
    saturatedFat: 0.3,
    unsaturatedFat: 0.5,
    solubleFiber: 0.5,
    insolubleFiber: 1.2,
  },
  cooked_poha: {
    label: "Cooked Poha (Kanda Poha)",
    calories: 142,
    protein: 2.6,
    saturatedFat: 1.5,
    unsaturatedFat: 4.2,
    solubleFiber: 0.4,
    insolubleFiber: 1.0,
  },
  murmura: {
    label: "Murmura (Puffed Rice)",
    calories: 402,
    protein: 7.1,
    saturatedFat: 0.1,
    unsaturatedFat: 0.4,
    solubleFiber: 0.3,
    insolubleFiber: 1.5,
  },
  corn_flakes: {
    label: "Corn Flakes",
    calories: 357,
    protein: 7.5,
    saturatedFat: 0.2,
    unsaturatedFat: 0.6,
    solubleFiber: 1.0,
    insolubleFiber: 2.5,
  },
  ragi_flakes: {
    label: "Ragi Flakes",
    calories: 350,
    protein: 7.8,
    saturatedFat: 0.4,
    unsaturatedFat: 1.2,
    solubleFiber: 1.6,
    insolubleFiber: 8.0,
  },
  oats_flakes: {
    label: "Oats Flakes (Rolled)",
    calories: 379,
    protein: 13.5,
    saturatedFat: 1.1,
    unsaturatedFat: 3.2,
    solubleFiber: 3.8,
    insolubleFiber: 6.0,
  },
  aval_sweet: {
    label: "Sweet Aval (Beaten Rice Dish)",
    calories: 185,
    protein: 3.0,
    saturatedFat: 2.5,
    unsaturatedFat: 3.1,
    solubleFiber: 0.6,
    insolubleFiber: 1.4,
  },
  kurmura_chaat: {
    label: "Bhel Puri / Murmura Mix",
    calories: 220,
    protein: 4.2,
    saturatedFat: 3.0,
    unsaturatedFat: 8.5,
    solubleFiber: 0.8,
    insolubleFiber: 2.2,
  },

  // ==========================================
  // 9. SPROUTS (Raw & Boiled)
  // ==========================================
  moong_sprouts_raw: {
    label: "Raw Moong Sprouts",
    calories: 30,
    protein: 3.0,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8,
    insolubleFiber: 1.0,
  },
  moong_sprouts_boiled: {
    label: "Boiled Moong Sprouts",
    calories: 35,
    protein: 3.2,
    saturatedFat: 0.0,
    unsaturatedFat: 0.1,
    solubleFiber: 0.9,
    insolubleFiber: 1.2,
  },
  chana_sprouts_raw: {
    label: "Raw Chana Sprouts",
    calories: 95,
    protein: 7.2,
    saturatedFat: 0.1,
    unsaturatedFat: 0.5,
    solubleFiber: 1.5,
    insolubleFiber: 3.8,
  },
  chana_sprouts_boiled: {
    label: "Boiled Chana Sprouts",
    calories: 102,
    protein: 7.5,
    saturatedFat: 0.1,
    unsaturatedFat: 0.6,
    solubleFiber: 1.6,
    insolubleFiber: 4.0,
  },
  matki_sprouts_raw: {
    label: "Raw Matki Sprouts",
    calories: 52,
    protein: 4.5,
    saturatedFat: 0.0,
    unsaturatedFat: 0.2,
    solubleFiber: 1.1,
    insolubleFiber: 2.5,
  },
  matki_sprouts_boiled: {
    label: "Boiled Matki Sprouts",
    calories: 58,
    protein: 4.8,
    saturatedFat: 0.1,
    unsaturatedFat: 0.3,
    solubleFiber: 1.2,
    insolubleFiber: 2.8,
  },
  mixed_sprouts_raw: {
    label: "Raw Mixed Sprouts",
    calories: 42,
    protein: 4.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.3,
    solubleFiber: 1.0,
    insolubleFiber: 2.2,
  },
  mixed_sprouts_boiled: {
    label: "Boiled Mixed Sprouts",
    calories: 48,
    protein: 4.3,
    saturatedFat: 0.1,
    unsaturatedFat: 0.3,
    solubleFiber: 1.1,
    insolubleFiber: 2.4,
  },
  alfalfa_sprouts: {
    label: "Alfalfa Sprouts",
    calories: 23,
    protein: 4.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.1,
    solubleFiber: 0.5,
    insolubleFiber: 1.4,
  },

  // ==========================================
  // 10. SOUTH INDIAN DISHES & SNACKS
  // ==========================================
  idli: {
    label: "Idli",
    calories: 58,
    protein: 2.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.3,
    solubleFiber: 0.3,
    insolubleFiber: 1.0,
  },
  medu_vada: {
    label: "Medu Vada",
    calories: 275,
    protein: 6.8,
    saturatedFat: 4.5,
    unsaturatedFat: 14.0,
    solubleFiber: 0.8,
    insolubleFiber: 2.5,
  },
  sambar_vada: {
    label: "Sambar Vada",
    calories: 195,
    protein: 5.5,
    saturatedFat: 2.8,
    unsaturatedFat: 8.5,
    solubleFiber: 1.2,
    insolubleFiber: 3.0,
  },
  dosa: {
    label: "Plain Dosa",
    calories: 133,
    protein: 3.5,
    saturatedFat: 1.5,
    unsaturatedFat: 4.0,
    solubleFiber: 0.4,
    insolubleFiber: 1.2,
  },
  masala_dosa: {
    label: "Masala Dosa",
    calories: 187,
    protein: 3.8,
    saturatedFat: 3.0,
    unsaturatedFat: 6.5,
    solubleFiber: 0.9,
    insolubleFiber: 2.3,
  },
  uttapam: {
    label: "Uttapam",
    calories: 165,
    protein: 4.2,
    saturatedFat: 2.0,
    unsaturatedFat: 5.0,
    solubleFiber: 0.8,
    insolubleFiber: 2.0,
  },
  upma: {
    label: "Upma",
    calories: 195,
    protein: 4.5,
    saturatedFat: 3.2,
    unsaturatedFat: 7.0,
    solubleFiber: 0.8,
    insolubleFiber: 2.1,
  },
  pongal: {
    label: "Ven Pongal",
    calories: 210,
    protein: 5.0,
    saturatedFat: 6.5,
    unsaturatedFat: 5.5,
    solubleFiber: 0.6,
    insolubleFiber: 1.8,
  },
  sambar: {
    label: "Sambar",
    calories: 65,
    protein: 3.0,
    saturatedFat: 0.8,
    unsaturatedFat: 2.2,
    solubleFiber: 1.0,
    insolubleFiber: 2.5,
  },
  rasam: {
    label: "Rasam",
    calories: 35,
    protein: 1.2,
    saturatedFat: 0.4,
    unsaturatedFat: 1.0,
    solubleFiber: 0.4,
    insolubleFiber: 1.1,
  },
  lemon_rice: {
    label: "Lemon Rice",
    calories: 172,
    protein: 3.0,
    saturatedFat: 2.1,
    unsaturatedFat: 5.2,
    solubleFiber: 0.3,
    insolubleFiber: 1.0,
  },
  tamarind_rice: {
    label: "Puliyogare (Tamarind Rice)",
    calories: 198,
    protein: 3.2,
    saturatedFat: 3.5,
    unsaturatedFat: 6.0,
    solubleFiber: 0.5,
    insolubleFiber: 1.5,
  },
  curd_rice: {
    label: "Curd Rice",
    calories: 120,
    protein: 3.8,
    saturatedFat: 2.5,
    unsaturatedFat: 2.0,
    solubleFiber: 0.2,
    insolubleFiber: 0.5,
  },
  appam: {
    label: "Appam",
    calories: 155,
    protein: 2.1,
    saturatedFat: 1.8,
    unsaturatedFat: 3.0,
    solubleFiber: 0.3,
    insolubleFiber: 0.8,
  },
  puttu: {
    label: "Puttu",
    calories: 180,
    protein: 3.0,
    saturatedFat: 2.2,
    unsaturatedFat: 1.5,
    solubleFiber: 0.4,
    insolubleFiber: 1.2,
  },
  bisi_bele_bath: {
    label: "Bisi Bele Bath",
    calories: 185,
    protein: 5.2,
    saturatedFat: 3.8,
    unsaturatedFat: 5.0,
    solubleFiber: 1.2,
    insolubleFiber: 3.2,
  },
  avial: {
    label: "Avial",
    calories: 125,
    protein: 2.5,
    saturatedFat: 5.0,
    unsaturatedFat: 3.0,
    solubleFiber: 1.1,
    insolubleFiber: 2.8,
  },
  kootu: {
    label: "Vegetable Kootu",
    calories: 110,
    protein: 4.5,
    saturatedFat: 1.5,
    unsaturatedFat: 2.8,
    solubleFiber: 1.3,
    insolubleFiber: 3.0,
  },
  pesarattu: {
    label: "Pesarattu (Green Gram Dosa)",
    calories: 170,
    protein: 8.5,
    saturatedFat: 1.2,
    unsaturatedFat: 4.5,
    solubleFiber: 1.5,
    insolubleFiber: 4.0,
  },
  mysore_bonda: {
    label: "Mysore Bonda",
    calories: 290,
    protein: 5.0,
    saturatedFat: 5.2,
    unsaturatedFat: 12.5,
    solubleFiber: 0.8,
    insolubleFiber: 2.0,
  },

  // ==========================================
  // 11. NORTH INDIAN BREADS, CURRIES & DISHES
  // ==========================================
  roti: {
    label: "Chapati / Roti (Plain Wheat)",
    calories: 297,
    protein: 11.0,
    saturatedFat: 0.4,
    unsaturatedFat: 0.8,
    solubleFiber: 1.2,
    insolubleFiber: 6.0,
  },
  jowarRoti: {
    label: "Jowar (Sorghum) Roti",
    calories: 349,
    protein: 10.4,
    saturatedFat: 0.5,
    unsaturatedFat: 1.5,
    solubleFiber: 1.5,
    insolubleFiber: 8.5,
  },
  bajraRoti: {
    label: "Bajra (Pearl Millet) Roti",
    calories: 361,
    protein: 11.6,
    saturatedFat: 0.6,
    unsaturatedFat: 2.3,
    solubleFiber: 1.8,
    insolubleFiber: 7.0,
  },
  ragiRoti: {
    label: "Ragi (Finger Millet) Roti",
    calories: 328,
    protein: 7.3,
    saturatedFat: 0.4,
    unsaturatedFat: 1.2,
    solubleFiber: 2.0,
    insolubleFiber: 9.5,
  },
  kanganiRoti: {
    label: "Kangani (Foxtail Millet) Roti",
    calories: 331,
    protein: 12.3,
    saturatedFat: 0.5,
    unsaturatedFat: 1.8,
    solubleFiber: 1.6,
    insolubleFiber: 6.5,
  },
  sawaRoti: {
    label: "Sawa (Barnyard Millet) Roti",
    calories: 307,
    protein: 11.2,
    saturatedFat: 0.4,
    unsaturatedFat: 1.3,
    solubleFiber: 2.5,
    insolubleFiber: 9.0,
  },
  kodoRoti: {
    label: "Kodo (Kodo Millet) Roti",
    calories: 309,
    protein: 8.3,
    saturatedFat: 0.3,
    unsaturatedFat: 1.1,
    solubleFiber: 2.2,
    insolubleFiber: 10.0,
  },
  kutkiRoti: {
    label: "Kutki (Little Millet) Roti",
    calories: 341,
    protein: 7.7,
    saturatedFat: 0.4,
    unsaturatedFat: 1.4,
    solubleFiber: 1.5,
    insolubleFiber: 7.0,
  },
  cheenaRoti: {
    label: "Cheena (Proso Millet) Roti",
    calories: 341,
    protein: 11.0,
    saturatedFat: 0.5,
    unsaturatedFat: 1.9,
    solubleFiber: 1.4,
    insolubleFiber: 7.2,
  },
  makkiRoti: {
    label: "Makki (Cornmeal) Roti",
    calories: 360,
    protein: 8.1,
    saturatedFat: 0.9,
    unsaturatedFat: 2.8,
    solubleFiber: 1.5,
    insolubleFiber: 5.8,
  },
  akkiRoti: {
    label: "Akki (Rice Flour) Roti",
    calories: 320,
    protein: 6.5,
    saturatedFat: 0.4,
    unsaturatedFat: 1.0,
    solubleFiber: 0.5,
    insolubleFiber: 2.4,
  },
  missiRoti: {
    label: "Missi (Gram Flour & Wheat) Roti",
    calories: 355,
    protein: 14.5,
    saturatedFat: 0.8,
    unsaturatedFat: 2.5,
    solubleFiber: 1.9,
    insolubleFiber: 7.5,
  },
  butter_roti: {
    label: "Butter Roti",
    calories: 345,
    protein: 10.5,
    saturatedFat: 4.5,
    unsaturatedFat: 2.0,
    solubleFiber: 1.1,
    insolubleFiber: 5.8,
  },
  naan: {
    label: "Plain Naan",
    calories: 310,
    protein: 9.0,
    saturatedFat: 1.2,
    unsaturatedFat: 3.5,
    solubleFiber: 1.0,
    insolubleFiber: 2.5,
  },
  butter_naan: {
    label: "Butter Naan",
    calories: 360,
    protein: 8.8,
    saturatedFat: 6.0,
    unsaturatedFat: 5.0,
    solubleFiber: 0.9,
    insolubleFiber: 2.4,
  },
  tandoori_roti: {
    label: "Tandoori Roti",
    calories: 275,
    protein: 10.2,
    saturatedFat: 0.3,
    unsaturatedFat: 0.7,
    solubleFiber: 1.3,
    insolubleFiber: 6.2,
  },
  rumali_roti: {
    label: "Rumali Roti",
    calories: 290,
    protein: 9.5,
    saturatedFat: 0.5,
    unsaturatedFat: 1.0,
    solubleFiber: 1.0,
    insolubleFiber: 3.5,
  },
  puri: {
    label: "Puri (Fried Wheat Bread)",
    calories: 388,
    protein: 7.2,
    saturatedFat: 7.5,
    unsaturatedFat: 15.2,
    solubleFiber: 1.0,
    insolubleFiber: 4.5,
  },
  bhatura: {
    label: "Bhatura",
    calories: 375,
    protein: 8.0,
    saturatedFat: 8.0,
    unsaturatedFat: 14.5,
    solubleFiber: 0.9,
    insolubleFiber: 3.0,
  },
  paratha: {
    label: "Plain Paratha",
    calories: 326,
    protein: 7.5,
    saturatedFat: 8.2,
    unsaturatedFat: 7.0,
    solubleFiber: 1.0,
    insolubleFiber: 4.0,
  },
  aloo_paratha: {
    label: "Aloo Paratha",
    calories: 260,
    protein: 5.5,
    saturatedFat: 5.0,
    unsaturatedFat: 6.2,
    solubleFiber: 0.9,
    insolubleFiber: 3.2,
  },
  paneer_paratha: {
    label: "Paneer Paratha",
    calories: 295,
    protein: 11.2,
    saturatedFat: 7.5,
    unsaturatedFat: 6.5,
    solubleFiber: 0.8,
    insolubleFiber: 2.8,
  },
  methi_paratha: {
    label: "Methi Paratha",
    calories: 285,
    protein: 7.0,
    saturatedFat: 6.0,
    unsaturatedFat: 5.8,
    solubleFiber: 1.4,
    insolubleFiber: 4.5,
  },
  dal_makhani: {
    label: "Dal Makhani",
    calories: 152,
    protein: 6.0,
    saturatedFat: 5.2,
    unsaturatedFat: 4.5,
    solubleFiber: 1.8,
    insolubleFiber: 5.0,
  },
  paneer_butter_masala: {
    label: "Paneer Butter Masala",
    calories: 245,
    protein: 7.8,
    saturatedFat: 12.5,
    unsaturatedFat: 8.0,
    solubleFiber: 0.6,
    insolubleFiber: 1.5,
  },
  palak_paneer: {
    label: "Palak Paneer",
    calories: 180,
    protein: 9.0,
    saturatedFat: 8.0,
    unsaturatedFat: 5.5,
    solubleFiber: 1.2,
    insolubleFiber: 3.0,
  },
  chole_bhature: {
    label: "Chole (Chickpea Curry)",
    calories: 175,
    protein: 6.5,
    saturatedFat: 3.5,
    unsaturatedFat: 6.0,
    solubleFiber: 2.2,
    insolubleFiber: 6.0,
  },
  shahi_paneer: {
    label: "Shahi Paneer",
    calories: 270,
    protein: 8.2,
    saturatedFat: 15.0,
    unsaturatedFat: 7.5,
    solubleFiber: 0.7,
    insolubleFiber: 1.8,
  },
  malai_kofta: {
    label: "Malai Kofta",
    calories: 295,
    protein: 5.5,
    saturatedFat: 14.0,
    unsaturatedFat: 9.0,
    solubleFiber: 1.0,
    insolubleFiber: 2.2,
  },
  kadai_paneer: {
    label: "Kadai Paneer",
    calories: 215,
    protein: 10.5,
    saturatedFat: 10.0,
    unsaturatedFat: 6.0,
    solubleFiber: 1.1,
    insolubleFiber: 2.5,
  },
  bhindi_masala: {
    label: "Bhindi Masala",
    calories: 110,
    protein: 2.0,
    saturatedFat: 2.5,
    unsaturatedFat: 6.5,
    solubleFiber: 1.5,
    insolubleFiber: 3.0,
  },
  aloo_jeera: {
    label: "Aloo Jeera",
    calories: 135,
    protein: 2.2,
    saturatedFat: 2.0,
    unsaturatedFat: 5.5,
    solubleFiber: 0.5,
    insolubleFiber: 2.0,
  },
  rajma_curry: {
    label: "Rajma Masala",
    calories: 145,
    protein: 6.8,
    saturatedFat: 2.2,
    unsaturatedFat: 4.0,
    solubleFiber: 2.0,
    insolubleFiber: 5.8,
  },
  mix_veg_curry: {
    label: "Mix Vegetable Curry",
    calories: 115,
    protein: 2.5,
    saturatedFat: 3.0,
    unsaturatedFat: 4.5,
    solubleFiber: 1.2,
    insolubleFiber: 3.5,
  },
  sarson_ka_saag: {
    label: "Sarson ka Saag",
    calories: 95,
    protein: 3.5,
    saturatedFat: 3.8,
    unsaturatedFat: 4.2,
    solubleFiber: 1.8,
    insolubleFiber: 4.0,
  },
  makki_di_roti: {
    label: "Makki di Roti",
    calories: 330,
    protein: 7.0,
    saturatedFat: 2.5,
    unsaturatedFat: 3.0,
    solubleFiber: 1.5,
    insolubleFiber: 7.5,
  },
  chicken_biryani: {
    label: "Chicken Biryani",
    calories: 198,
    protein: 9.5,
    saturatedFat: 3.2,
    unsaturatedFat: 6.5,
    solubleFiber: 0.4,
    insolubleFiber: 1.2,
  },
  mutton_biryani: {
    label: "Mutton Biryani",
    calories: 220,
    protein: 10.2,
    saturatedFat: 5.5,
    unsaturatedFat: 7.0,
    solubleFiber: 0.4,
    insolubleFiber: 1.2,
  },
  veg_biryani: {
    label: "Vegetable Biryani",
    calories: 165,
    protein: 3.5,
    saturatedFat: 2.5,
    unsaturatedFat: 5.0,
    solubleFiber: 0.8,
    insolubleFiber: 2.2,
  },
  egg_biryani: {
    label: "Egg Biryani",
    calories: 180,
    protein: 7.5,
    saturatedFat: 3.0,
    unsaturatedFat: 5.5,
    solubleFiber: 0.5,
    insolubleFiber: 1.4,
  },
  khichdi: {
    label: "Moong Dal Khichdi",
    calories: 125,
    protein: 4.2,
    saturatedFat: 2.2,
    unsaturatedFat: 3.0,
    solubleFiber: 0.9,
    insolubleFiber: 2.5,
  },
  dal_tadka: {
    label: "Dal Tadka",
    calories: 130,
    protein: 6.5,
    saturatedFat: 2.5,
    unsaturatedFat: 4.0,
    solubleFiber: 1.2,
    insolubleFiber: 3.2,
  },
  kadhi_pakora: {
    label: "Kadhi Pakora",
    calories: 155,
    protein: 4.8,
    saturatedFat: 3.5,
    unsaturatedFat: 4.5,
    solubleFiber: 0.7,
    insolubleFiber: 1.8,
  },

  // ==========================================
  // 12. STREET FOODS, SNACKS & SWEETS
  // ==========================================
  samosa: {
    label: "Samosa",
    calories: 262,
    protein: 3.5,
    saturatedFat: 5.5,
    unsaturatedFat: 12.0,
    solubleFiber: 0.8,
    insolubleFiber: 2.2,
  },
  kachori: {
    label: "Kachori",
    calories: 310,
    protein: 4.8,
    saturatedFat: 7.0,
    unsaturatedFat: 15.0,
    solubleFiber: 1.0,
    insolubleFiber: 2.8,
  },
  dhokla: {
    label: "Khaman Dhokla",
    calories: 160,
    protein: 7.2,
    saturatedFat: 0.8,
    unsaturatedFat: 3.5,
    solubleFiber: 0.8,
    insolubleFiber: 2.0,
  },
  khandvi: {
    label: "Khandvi",
    calories: 205,
    protein: 6.5,
    saturatedFat: 2.5,
    unsaturatedFat: 7.0,
    solubleFiber: 0.9,
    insolubleFiber: 2.2,
  },
  pani_puri: {
    label: "Pani Puri / Golgappa",
    calories: 180,
    protein: 2.5,
    saturatedFat: 2.0,
    unsaturatedFat: 5.0,
    solubleFiber: 0.6,
    insolubleFiber: 1.8,
  },
  bhel_puri: {
    label: "Bhel Puri",
    calories: 195,
    protein: 3.8,
    saturatedFat: 2.5,
    unsaturatedFat: 6.0,
    solubleFiber: 0.7,
    insolubleFiber: 2.0,
  },
  sev_puri: {
    label: "Sev Puri",
    calories: 230,
    protein: 4.0,
    saturatedFat: 4.5,
    unsaturatedFat: 9.0,
    solubleFiber: 0.8,
    insolubleFiber: 2.1,
  },
  pav_bhaji: {
    label: "Pav Bhaji",
    calories: 210,
    protein: 4.5,
    saturatedFat: 6.0,
    unsaturatedFat: 7.5,
    solubleFiber: 1.2,
    insolubleFiber: 3.2,
  },
  vada_pav: {
    label: "Vada Pav",
    calories: 275,
    protein: 5.2,
    saturatedFat: 5.0,
    unsaturatedFat: 11.0,
    solubleFiber: 0.9,
    insolubleFiber: 2.8,
  },
  aloo_tikki: {
    label: "Aloo Tikki",
    calories: 215,
    protein: 3.0,
    saturatedFat: 4.0,
    unsaturatedFat: 9.5,
    solubleFiber: 0.8,
    insolubleFiber: 2.5,
  },
  pakora: {
    label: "Mixed Vegetable Pakora",
    calories: 290,
    protein: 5.0,
    saturatedFat: 5.5,
    unsaturatedFat: 14.0,
    solubleFiber: 1.0,
    insolubleFiber: 3.0,
  },
  bread_pakora: {
    label: "Bread Pakora",
    calories: 330,
    protein: 6.2,
    saturatedFat: 6.5,
    unsaturatedFat: 16.0,
    solubleFiber: 0.9,
    insolubleFiber: 2.4,
  },
  jalebi: {
    label: "Jalebi",
    calories: 450,
    protein: 1.5,
    saturatedFat: 2.0,
    unsaturatedFat: 12.0,
    solubleFiber: 0.2,
    insolubleFiber: 0.5,
  },
  gulab_jamun: {
    label: "Gulab Jamun",
    calories: 360,
    protein: 4.0,
    saturatedFat: 7.5,
    unsaturatedFat: 10.0,
    solubleFiber: 0.1,
    insolubleFiber: 0.3,
  },
  rasgulla: {
    label: "Rasgulla",
    calories: 186,
    protein: 4.5,
    saturatedFat: 1.0,
    unsaturatedFat: 1.5,
    solubleFiber: 0.1,
    insolubleFiber: 0.2,
  },
  kheer: {
    label: "Rice Kheer (Payasam)",
    calories: 135,
    protein: 3.5,
    saturatedFat: 3.2,
    unsaturatedFat: 2.0,
    solubleFiber: 0.2,
    insolubleFiber: 0.5,
  },
  halwa_suji: {
    label: "Suji Halwa",
    calories: 285,
    protein: 3.2,
    saturatedFat: 7.8,
    unsaturatedFat: 9.0,
    solubleFiber: 0.5,
    insolubleFiber: 1.5,
  },
  gajar_halwa: {
    label: "Gajar ka Halwa",
    calories: 210,
    protein: 3.8,
    saturatedFat: 6.5,
    unsaturatedFat: 6.0,
    solubleFiber: 1.0,
    insolubleFiber: 2.2,
  },
  motichoor_ladoo: {
    label: "Motichoor Ladoo",
    calories: 420,
    protein: 4.2,
    saturatedFat: 9.0,
    unsaturatedFat: 15.0,
    solubleFiber: 0.3,
    insolubleFiber: 0.8,
  },
  mysore_pak: {
    label: "Mysore Pak",
    calories: 510,
    protein: 5.0,
    saturatedFat: 21.0,
    unsaturatedFat: 22.0,
    solubleFiber: 0.2,
    insolubleFiber: 0.5,
  },
  barfi_kaju: {
    label: "Kaju Katli (Barfi)",
    calories: 535,
    protein: 10.5,
    saturatedFat: 4.5,
    unsaturatedFat: 30.0,
    solubleFiber: 1.0,
    insolubleFiber: 2.0,
  },
  peda: {
    label: "Peda",
    calories: 380,
    protein: 8.5,
    saturatedFat: 12.0,
    unsaturatedFat: 7.0,
    solubleFiber: 0.0,
    insolubleFiber: 0.0,
  },
  soan_papdi: {
    label: "Soan Papdi",
    calories: 470,
    protein: 4.0,
    saturatedFat: 14.0,
    unsaturatedFat: 20.0,
    solubleFiber: 0.5,
    insolubleFiber: 1.0,
  },
};

let nutritionDb;
let selectedPeriod = 7;
let allEntries = [];
let userProfile = null;

function openNutritionDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(NUTRITION_DB_NAME, NUTRITION_DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(NUTRITION_STORE)) {
        const store = db.createObjectStore(NUTRITION_STORE, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getAllEntries() {
  return new Promise((resolve, reject) => {
    const request = nutritionDb
      .transaction(NUTRITION_STORE, "readonly")
      .objectStore(NUTRITION_STORE)
      .getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

function saveEntry(entry) {
  return new Promise((resolve, reject) => {
    const request = nutritionDb
      .transaction(NUTRITION_STORE, "readwrite")
      .objectStore(NUTRITION_STORE)
      .put(entry);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function deleteEntry(id) {
  return new Promise((resolve, reject) => {
    const request = nutritionDb
      .transaction(NUTRITION_STORE, "readwrite")
      .objectStore(NUTRITION_STORE)
      .delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function deleteAllEntries() {
  return new Promise((resolve, reject) => {
    const request = nutritionDb
      .transaction(NUTRITION_STORE, "readwrite")
      .objectStore(NUTRITION_STORE)
      .clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function openProfileDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PROFILE_DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(PROFILE_STORE_NAME)) {
        db.createObjectStore(PROFILE_STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getSavedProfile(db) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(PROFILE_STORE_NAME, "readonly")
      .objectStore(PROFILE_STORE_NAME)
      .get(PROFILE_RECORD_ID);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

function normalizeFoodName(value) {
  return value.trim().toLowerCase();
}

function getFood(value) {
  const key = normalizeFoodName(value);
  return (
    foodCatalog[key] ||
    Object.values(foodCatalog).find((food) => food.label.toLowerCase() === key)
  );
}

function renderFoodSuggestions(query) {
  const suggestions = document.getElementById("foodSuggestions");
  const normalizedQuery = normalizeFoodName(query);
  const matches = Object.values(foodCatalog).filter(
    (food) =>
      !normalizedQuery || food.label.toLowerCase().includes(normalizedQuery),
  );

  suggestions.innerHTML = matches
    .map(
      (food) =>
        `<button type="button" class="foodSuggestion" data-food="${food.label}" role="option">${food.label}<small>${food.calories} kcal - ${food.protein} g protein - ${food.saturatedFat} g saturated fat per 100 g</small></button>`,
    )
    .join("");
  suggestions.classList.toggle(
    "is-visible",
    matches.length > 0 &&
      document.activeElement === document.getElementById("foodSearch"),
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function dayKey(date) {
  const local = new Date(date);
  return `${local.getFullYear()}-${String(local.getMonth() + 1).padStart(2, "0")}-${String(local.getDate()).padStart(2, "0")}`;
}

function activityFactor(level) {
  const factors = {
    Sedentary: 1.2,
    Light: 1.375,
    Moderate: 1.55,
    Active: 1.725,
    "Very active": 1.9,
  };
  return factors[level] || 1.2;
}

function bodyTypeFactor(bodyType) {
  const factors = {
    Ectomorphic: 1.1,
    Mesomorphic: 1.0,
    Endomorphic: 0.9,
  };
  return factors[bodyType] || 1.0;
}

function targetFactor(target) {
  const factors = {
    "Lose weight": 0.85,
    "Maintain weight": 1.0,
    "Gain weight": 1.15,
  };
  return factors[target] || 1.0;
}

function proteinFactor(profile) {
  const factors = {
    Ectomorphic: 1.9,
    Mesomorphic: 1.7,
    Endomorphic: 1.5,
  };
  const base = factors[profile.bodyType] || 1.6;
  if (profile.target === "Gain weight") return base + 0.2;
  if (profile.target === "Lose weight") return Math.max(1.4, base - 0.1);
  return base;
}

function calculateNutritionTargets(profile) {
  const baseCalories =
    10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  const calories = Math.round(
    baseCalories *
      activityFactor(profile.activityLevel) *
      bodyTypeFactor(profile.bodyType) *
      targetFactor(profile.target),
  );
  const protein = Math.round(profile.weight * proteinFactor(profile));
  return { calories, protein };
}

function calculateNutrition(food, grams) {
  return {
    calories: (food.calories * grams) / 100,
    protein: (food.protein * grams) / 100,
    saturatedFat: (food.saturatedFat * grams) / 100,
    unsaturatedFat: (food.unsaturatedFat * grams) / 100,
    solubleFiber: (food.solubleFiber * grams) / 100,
    insolubleFiber: (food.insolubleFiber * grams) / 100,
  };
}

function setStatus(message, isError = true) {
  const status = document.getElementById("statusMessage");
  status.textContent = message;
  status.style.color = isError ? "#a45e4c" : "#1f6b5b";
}

function getTodayEntries() {
  const today = dayKey(new Date());
  return allEntries.filter((entry) => dayKey(entry.createdAt) === today);
}

function renderEntries() {
  const entries = getTodayEntries().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  const list = document.getElementById("entryList");
  list.innerHTML = entries.length
    ? entries
        .map(
          (entry) => `
        <div class="entryRow">
            <div class="entryFood"><strong>${entry.foodLabel}</strong><small>${formatDate(new Date(entry.createdAt))} · ${formatTime(new Date(entry.createdAt))}</small></div>
            <span>${entry.grams} g</span><span>${entry.calories.toFixed(0)} kcal</span><span>${entry.protein.toFixed(1)} g</span>
            <span>${(entry.saturatedFat || 0).toFixed(1)} g</span><span>${(entry.unsaturatedFat || 0).toFixed(1)} g</span>
            <span>${(entry.solubleFiber || 0).toFixed(1)} g</span><span>${(entry.insolubleFiber || 0).toFixed(1)} g</span>
            <button type="button" class="deleteEntry" data-id="${entry.id}" data-food="${entry.foodLabel}" aria-label="Delete ${entry.foodLabel}"><i class="fa-solid fa-xmark"></i></button>
        </div>`,
        )
        .join("")
    : '<div class="entryEmpty">No food entries saved for today.</div>';
  const calories = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const protein = entries.reduce((sum, entry) => sum + entry.protein, 0);
  const saturatedFat = entries.reduce(
    (sum, entry) => sum + (entry.saturatedFat || 0),
    0,
  );
  const unsaturatedFat = entries.reduce(
    (sum, entry) => sum + (entry.unsaturatedFat || 0),
    0,
  );
  const solubleFiber = entries.reduce(
    (sum, entry) => sum + (entry.solubleFiber || 0),
    0,
  );
  const insolubleFiber = entries.reduce(
    (sum, entry) => sum + (entry.insolubleFiber || 0),
    0,
  );
  document.getElementById("todayCalories").textContent =
    `${calories.toFixed(0)} kcal`;
  document.getElementById("todayProtein").textContent =
    `${protein.toFixed(1)} g`;
  document.getElementById("todayEntries").textContent = entries.length;
  document.getElementById("todaySaturatedFat").textContent =
    `${saturatedFat.toFixed(1)} g`;
  document.getElementById("todayUnsaturatedFat").textContent =
    `${unsaturatedFat.toFixed(1)} g`;
  document.getElementById("todaySolubleFiber").textContent =
    `${solubleFiber.toFixed(1)} g`;
  document.getElementById("todayInsolubleFiber").textContent =
    `${insolubleFiber.toFixed(1)} g`;
}

function renderProfileTargets() {
  const calorieCard = document.getElementById("calorieTargetCard");
  const proteinCard = document.getElementById("proteinTargetCard");
  const calorieValue = document.getElementById("calorieTargetValue");
  const calorieLeft = document.getElementById("calorieTargetLeft");
  const calorieBadge = document.getElementById("calorieTargetBadge");
  const proteinValue = document.getElementById("proteinTargetValue");
  const proteinLeft = document.getElementById("proteinTargetLeft");
  const proteinBadge = document.getElementById("proteinTargetBadge");
  if (!calorieCard || !proteinCard) return;

  const entries = getTodayEntries();
  const todayCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const todayProtein = entries.reduce((sum, entry) => sum + entry.protein, 0);

  if (!userProfile) {
    calorieCard.classList.remove("is-complete");
    proteinCard.classList.remove("is-complete");
    calorieValue.textContent = "Set profile";
    calorieLeft.textContent = "Add a profile to calculate your calorie target.";
    calorieBadge.innerHTML = "Profile needed";
    proteinValue.textContent = "Set profile";
    proteinLeft.textContent = "Add a profile to calculate your protein target.";
    proteinBadge.innerHTML = "Profile needed";
    return;
  }

  const targets = calculateNutritionTargets(userProfile);
  const calorieRemaining = targets.calories - todayCalories;
  const proteinRemaining = targets.protein - todayProtein;
  const calorieComplete = calorieRemaining <= 0;
  const proteinComplete = proteinRemaining <= 0;

  calorieCard.classList.toggle("is-complete", calorieComplete);
  proteinCard.classList.toggle("is-complete", proteinComplete);
  calorieValue.textContent = `${targets.calories} kcal`;
  calorieLeft.textContent = calorieComplete
    ? `Target reached. ${Math.abs(calorieRemaining).toFixed(0)} kcal over.`
    : `${calorieRemaining.toFixed(0)} kcal left to reach your target.`;
  calorieBadge.innerHTML = calorieComplete
    ? '<i class="fa-solid fa-star"></i> Target reached'
    : "In progress";
  proteinValue.textContent = `${targets.protein} g`;
  proteinLeft.textContent = proteinComplete
    ? `Target reached. ${Math.abs(proteinRemaining).toFixed(1)} g over.`
    : `${proteinRemaining.toFixed(1)} g left to reach your target.`;
  proteinBadge.innerHTML = proteinComplete
    ? '<i class="fa-solid fa-star"></i> Target reached'
    : "In progress";
}

function aggregateByDay(days) {
  const end = new Date();
  const values = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(end);
    date.setDate(end.getDate() - offset);
    const key = dayKey(date);
    const dayEntries = allEntries.filter(
      (entry) => dayKey(entry.createdAt) === key,
    );
    values.push({
      key,
      label: new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
      }).format(date),
      calories: dayEntries.reduce((sum, entry) => sum + entry.calories, 0),
      protein: dayEntries.reduce((sum, entry) => sum + entry.protein, 0),
    });
  }
  return values;
}

function drawChart(data) {
  const canvas = document.getElementById("nutritionChart");
  const context = canvas.getContext("2d");
  const width = canvas.clientWidth || 600;
  const height = canvas.clientHeight || 290;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  const padding = { top: 20, right: 16, bottom: 38, left: 44 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(
    10,
    ...data.map((day) => Math.max(day.calories, day.protein * 10)),
  );
  context.font = "11px Segoe UI, sans-serif";
  context.strokeStyle = "#e3ebe6";
  context.fillStyle = "#687873";
  for (let tick = 0; tick <= 4; tick += 1) {
    const y = padding.top + chartHeight - (chartHeight * tick) / 4;
    context.beginPath();
    context.moveTo(padding.left, y);
    context.lineTo(width - padding.right, y);
    context.stroke();
    context.fillText(Math.round((maxValue * tick) / 4), 5, y + 4);
  }
  function drawLine(valueSelector, color, scale = 1) {
    context.beginPath();
    data.forEach((day, index) => {
      const x =
        padding.left + (chartWidth * index) / Math.max(1, data.length - 1);
      const y =
        padding.top +
        chartHeight -
        (chartHeight * day[valueSelector] * scale) / maxValue;
      index ? context.lineTo(x, y) : context.moveTo(x, y);
    });
    context.strokeStyle = color;
    context.lineWidth = 2.5;
    context.stroke();
    data.forEach((day, index) => {
      const x =
        padding.left + (chartWidth * index) / Math.max(1, data.length - 1);
      const y =
        padding.top +
        chartHeight -
        (chartHeight * day[valueSelector] * scale) / maxValue;
      context.fillStyle = "#ffffff";
      context.beginPath();
      context.arc(x, y, 4.5, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, 3, 0, Math.PI * 2);
      context.fill();
    });
  }
  drawLine("calories", "#1f6b5b");
  drawLine("protein", "#b58b45", 10);
  context.fillStyle = "#687873";
  data.forEach((day, index) => {
    if (
      data.length <= 10 ||
      index % Math.ceil(data.length / 7) === 0 ||
      index === data.length - 1
    ) {
      const x =
        padding.left + (chartWidth * index) / Math.max(1, data.length - 1);
      context.fillText(day.label, x - 15, height - 12);
    }
  });
  context.fillStyle = "#1f6b5b";
  context.fillRect(width - 154, 10, 12, 3);
  context.fillStyle = "#24332f";
  context.fillText("Calories", width - 136, 14);
  context.fillStyle = "#b58b45";
  context.fillRect(width - 76, 10, 12, 3);
  context.fillStyle = "#24332f";
  context.fillText("Protein", width - 58, 14);
}

function trendText(data, key, unit) {
  const split = Math.floor(data.length / 2);
  const previous = data.slice(0, split).reduce((sum, day) => sum + day[key], 0);
  const current = data.slice(split).reduce((sum, day) => sum + day[key], 0);
  if (!previous && !current) return "No data recorded in this period.";
  if (!previous) return "New intake recorded in the latest period.";
  const change = ((current - previous) / previous) * 100;
  return `${change >= 0 ? "up" : "down"} ${Math.abs(change).toFixed(0)}% versus the earlier period (${current.toFixed(0)} ${unit}).`;
}

function renderProgress() {
  const data = aggregateByDay(selectedPeriod);
  drawChart(data);
  document.getElementById("calorieTrend").textContent = trendText(
    data,
    "calories",
    "kcal",
  );
  document.getElementById("proteinTrend").textContent = trendText(
    data,
    "protein",
    "g",
  );
}

async function refreshDashboard() {
  allEntries = await getAllEntries();
  renderEntries();
  renderProfileTargets();
  renderProgress();
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    nutritionDb = await openNutritionDatabase();
    try {
      const profileDb = await openProfileDatabase();
      userProfile = await getSavedProfile(profileDb);
    } catch (error) {
      userProfile = null;
    }
    const dataList = document.getElementById("foodOptions");
    dataList.innerHTML = Object.values(foodCatalog)
      .map((food) => `<option value="${food.label}"></option>`)
      .join("");
    const foodSearch = document.getElementById("foodSearch");
    const foodSuggestions = document.getElementById("foodSuggestions");
    foodSearch.addEventListener("focus", function () {
      renderFoodSuggestions(this.value);
    });
    foodSearch.addEventListener("input", function () {
      renderFoodSuggestions(this.value);
      const food = getFood(this.value);
      document.getElementById("foodPreview").textContent = food
        ? `${food.label}: ${food.calories} kcal and ${food.protein} g protein per 100 g.`
        : "Choose a food to see its nutrition per 100 g.";
    });
    foodSearch.addEventListener("blur", function () {
      setTimeout(() => foodSuggestions.classList.remove("is-visible"), 150);
    });
    foodSuggestions.addEventListener("click", function (event) {
      const suggestion = event.target.closest(".foodSuggestion");
      if (!suggestion) return;
      foodSearch.value = suggestion.dataset.food;
      foodSearch.dispatchEvent(new Event("input", { bubbles: true }));
      foodSearch.focus();
    });
    document
      .getElementById("foodForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
        const food = getFood(document.getElementById("foodSearch").value);
        const grams = Number(document.getElementById("enterGrams").value);
        if (!food || !grams || grams <= 0) {
          setStatus(
            "Choose a listed food and enter a gram amount greater than zero.",
          );
          return;
        }
        const nutrition = calculateNutrition(food, grams);
        await saveEntry({
          id: crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
          foodKey: normalizeFoodName(food.label),
          foodLabel: food.label,
          grams,
          calories: nutrition.calories,
          protein: nutrition.protein,
          saturatedFat: nutrition.saturatedFat,
          unsaturatedFat: nutrition.unsaturatedFat,
          solubleFiber: nutrition.solubleFiber,
          insolubleFiber: nutrition.insolubleFiber,
          createdAt: new Date().toISOString(),
        });
        this.reset();
        document.getElementById("foodPreview").textContent =
          "Food saved with the current date and time.";
        setStatus("Food added to today's journal.", false);
        await refreshDashboard();
      });
    document
      .getElementById("entryList")
      .addEventListener("click", async function (event) {
        const button = event.target.closest(".deleteEntry");
        if (!button) return;
        if (!confirm(`Delete ${button.dataset.food} from today's intake?`))
          return;
        await deleteEntry(button.dataset.id);
        await refreshDashboard();
      });
    document
      .getElementById("deleteAllButton")
      .addEventListener("click", async function () {
        if (!allEntries.length || !confirm("Delete all saved food entries?"))
          return;
        if (
          !confirm(
            "This will permanently delete every saved food entry. Continue?",
          )
        )
          return;
        await deleteAllEntries();
        setStatus("All saved food entries were deleted.", false);
        await refreshDashboard();
      });
    document.querySelectorAll(".periodButton").forEach((button) =>
      button.addEventListener("click", function () {
        selectedPeriod = Number(this.dataset.period);
        document
          .querySelectorAll(".periodButton")
          .forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
        renderProgress();
      }),
    );
    window.addEventListener("resize", renderProgress);
    await refreshDashboard();
  } catch (error) {
    console.error("Unable to initialize nutrition journal:", error);
    setStatus("Nutrition storage is unavailable in this browser.");
  }
});
