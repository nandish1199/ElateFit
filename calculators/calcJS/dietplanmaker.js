const PROFILE_DB_NAME = "elateFitUserProfileDB";
const PROFILE_STORE_NAME = "profiles";
const PROFILE_RECORD_ID = "profile";
const PLAN_STORAGE_KEY = "elateFitDietPlan";

// Values are per 100 g, matching the nutrition calculator catalog.
let foodCatalog = {
  // --- GRAINS & RICE ---
  rice: {
    label: "Rice",
    category: "grain",
    calories: 130,
    protein: 2.7,
    fiber: 0.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  boiled_rice: {
    label: "Boiled Rice",
    category: "grain",
    calories: 123,
    protein: 2.5,
    fiber: 0.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  brown_rice: {
    label: "Brown Rice",
    category: "grain",
    calories: 111,
    protein: 2.6,
    fiber: 3.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  basmati_rice: {
    label: "Basmati Rice",
    category: "grain",
    calories: 121,
    protein: 2.7,
    fiber: 0.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  red_rice: {
    label: "Red Rice",
    category: "grain",
    calories: 110,
    protein: 3.0,
    fiber: 3.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  black_rice: {
    label: "Black Rice",
    category: "grain",
    calories: 130,
    protein: 4.0,
    fiber: 4.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  sticky_rice: {
    label: "Sticky Rice",
    category: "grain",
    calories: 130,
    protein: 2.4,
    fiber: 0.6,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  beaten_rice_poha: {
    label: "Flattened Rice (Poha)",
    category: "grain",
    calories: 346,
    protein: 6.5,
    fiber: 1.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  thick_poha: {
    label: "Thick Poha",
    category: "grain",
    calories: 340,
    protein: 6.7,
    fiber: 1.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cooked_broken_wheat_daliya: {
    label: "Broken Wheat (Daliya)",
    category: "grain",
    calories: 105,
    protein: 3.8,
    fiber: 4.5,
    tags: ["veg", "lactoseFree"],
  },
  cooked_quinoa: {
    label: "Quinoa",
    category: "grain",
    calories: 120,
    protein: 4.4,
    fiber: 2.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cooked_millets_mix: {
    label: "Mixed Millets",
    category: "grain",
    calories: 119,
    protein: 3.5,
    fiber: 3.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cooked_foxtail_millet: {
    label: "Foxtail Millet (Kangani)",
    category: "grain",
    calories: 125,
    protein: 3.9,
    fiber: 3.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cooked_barnyard_millet: {
    label: "Barnyard Millet (Sawa)",
    category: "grain",
    calories: 107,
    protein: 3.1,
    fiber: 3.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cooked_little_millet: {
    label: "Little Millet (Kutki)",
    category: "grain",
    calories: 110,
    protein: 3.8,
    fiber: 4.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cooked_kodo_millet: {
    label: "Kodo Millet",
    category: "grain",
    calories: 108,
    protein: 3.2,
    fiber: 4.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cooked_proso_millet: {
    label: "Proso Millet (Cheena)",
    category: "grain",
    calories: 119,
    protein: 4.1,
    fiber: 3.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cooked_sorghum_jowar: {
    label: "Sorghum (Jowar)",
    category: "grain",
    calories: 140,
    protein: 4.0,
    fiber: 3.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cooked_pearl_millet_bajra: {
    label: "Pearl Millet (Bajra)",
    category: "grain",
    calories: 145,
    protein: 4.3,
    fiber: 3.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cooked_finger_millet_ragi: {
    label: "Finger Millet (Ragi)",
    category: "grain",
    calories: 125,
    protein: 3.0,
    fiber: 3.6,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  puffed_rice_murmura: {
    label: "Puffed Rice (Murmura)",
    category: "grain",
    calories: 402,
    protein: 7.0,
    fiber: 1.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  roasted_puffed_rice: {
    label: "Roasted Puffed Rice",
    category: "grain",
    calories: 390,
    protein: 6.8,
    fiber: 1.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  vermicelli_upma: {
    label: "Vermicelli Upma",
    category: "breakfast",
    calories: 165,
    protein: 3.5,
    fiber: 1.8,
    tags: ["veg", "lactoseFree"],
  },
  cracked_wheat_upma: {
    label: "Daliya Upma",
    category: "breakfast",
    calories: 145,
    protein: 4.0,
    fiber: 3.8,
    tags: ["veg", "lactoseFree"],
  },
  oat_porridge: {
    label: "Oat Porridge",
    category: "breakfast",
    calories: 88,
    protein: 3.2,
    fiber: 1.7,
    tags: ["veg", "lactoseFree"],
  },
  barley_porridge: {
    label: "Barley Porridge",
    category: "breakfast",
    calories: 95,
    protein: 2.8,
    fiber: 3.0,
    tags: ["veg", "lactoseFree"],
  },
  semolina_upma: {
    label: "Semolina Upma (Rava Upma)",
    category: "breakfast",
    calories: 155,
    protein: 3.2,
    fiber: 2.0,
    tags: ["veg", "lactoseFree"],
  },
  corn_flakes: {
    label: "Corn Flakes",
    category: "breakfast",
    calories: 357,
    protein: 7.5,
    fiber: 1.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  muesli: {
    label: "Muesli",
    category: "breakfast",
    calories: 380,
    protein: 10.0,
    fiber: 8.0,
    tags: ["veg"],
  },

  // --- ROTIS & FLATBREADS ---
  wheat_roti: {
    label: "Wheat Roti (Chapati)",
    category: "roti",
    calories: 297,
    protein: 11.0,
    fiber: 6.0,
    tags: ["veg", "lactoseFree"],
  },
  phulka: {
    label: "Phulka",
    category: "roti",
    calories: 285,
    protein: 10.5,
    fiber: 5.8,
    tags: ["veg", "lactoseFree"],
  },
  tandoori_roti: {
    label: "Tandoori Roti",
    category: "roti",
    calories: 310,
    protein: 10.5,
    fiber: 5.5,
    tags: ["veg", "lactoseFree"],
  },
  rumali_roti: {
    label: "Rumali Roti",
    category: "roti",
    calories: 295,
    protein: 9.2,
    fiber: 3.5,
    tags: ["veg", "lactoseFree"],
  },
  jowar_roti_sorghum: {
    label: "Jowar Roti (Sorghum Millet)",
    category: "roti",
    calories: 349,
    protein: 10.4,
    fiber: 8.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  bajra_roti_pearl_millet: {
    label: "Bajra Roti (Pearl Millet)",
    category: "roti",
    calories: 361,
    protein: 11.6,
    fiber: 7.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  ragi_roti_finger_millet: {
    label: "Ragi Roti (Finger Millet)",
    category: "roti",
    calories: 328,
    protein: 7.3,
    fiber: 9.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  kangani_roti_foxtail_millet: {
    label: "Kangani Roti (Foxtail Millet)",
    category: "roti",
    calories: 331,
    protein: 12.3,
    fiber: 6.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  sawa_roti_barnyard_millet: {
    label: "Sawa Roti (Barnyard Millet)",
    category: "roti",
    calories: 307,
    protein: 11.2,
    fiber: 9.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  kodo_roti_kodo_millet: {
    label: "Kodo Roti (Kodo Millet)",
    category: "roti",
    calories: 309,
    protein: 8.3,
    fiber: 10.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  kutki_roti_little_millet: {
    label: "Kutki Roti (Little Millet)",
    category: "roti",
    calories: 341,
    protein: 7.7,
    fiber: 7.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cheena_roti_proso_millet: {
    label: "Cheena Roti (Proso Millet)",
    category: "roti",
    calories: 341,
    protein: 11.0,
    fiber: 7.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  makki_roti_cornmeal: {
    label: "Makki ki Roti (Cornmeal)",
    category: "roti",
    calories: 360,
    protein: 8.1,
    fiber: 5.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  akki_roti_rice_flour: {
    label: "Akki Roti (Rice Flour)",
    category: "roti",
    calories: 320,
    protein: 6.5,
    fiber: 2.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  missi_roti: {
    label: "Missi Roti (Gram & Wheat Flour)",
    category: "roti",
    calories: 355,
    protein: 14.5,
    fiber: 7.5,
    tags: ["veg", "lactoseFree"],
  },
  thalipeeth: {
    label: "Thalipeeth (Multigrain Flatbread)",
    category: "roti",
    calories: 345,
    protein: 12.0,
    fiber: 8.2,
    tags: ["veg", "lactoseFree"],
  },
  lachha_paratha: {
    label: "Lachha Paratha",
    category: "roti",
    calories: 380,
    protein: 8.5,
    fiber: 4.2,
    tags: ["veg"],
  },
  aloo_paratha: {
    label: "Aloo Paratha",
    category: "roti",
    calories: 275,
    protein: 6.2,
    fiber: 3.5,
    tags: ["veg"],
  },
  paneer_paratha: {
    label: "Paneer Paratha",
    category: "roti",
    calories: 310,
    protein: 11.0,
    fiber: 3.0,
    tags: ["veg"],
  },
  gobhi_paratha: {
    label: "Gobhi Paratha",
    category: "roti",
    calories: 260,
    protein: 6.8,
    fiber: 4.0,
    tags: ["veg"],
  },
  mooli_paratha: {
    label: "Mooli Paratha",
    category: "roti",
    calories: 250,
    protein: 6.5,
    fiber: 4.1,
    tags: ["veg"],
  },
  methi_paratha: {
    label: "Methi Paratha",
    category: "roti",
    calories: 290,
    protein: 7.5,
    fiber: 5.2,
    tags: ["veg"],
  },
  onion_paratha: {
    label: "Onion Paratha",
    category: "roti",
    calories: 285,
    protein: 6.9,
    fiber: 3.8,
    tags: ["veg"],
  },
  ajwain_paratha: {
    label: "Ajwain Paratha",
    category: "roti",
    calories: 330,
    protein: 8.0,
    fiber: 4.5,
    tags: ["veg"],
  },
  pudina_paratha: {
    label: "Pudina Paratha",
    category: "roti",
    calories: 315,
    protein: 8.1,
    fiber: 4.6,
    tags: ["veg"],
  },
  mix_veg_paratha: {
    label: "Mixed Veg Paratha",
    category: "roti",
    calories: 270,
    protein: 7.0,
    fiber: 4.8,
    tags: ["veg"],
  },
  sattu_paratha: {
    label: "Sattu Paratha",
    category: "roti",
    calories: 325,
    protein: 13.5,
    fiber: 6.2,
    tags: ["veg", "lactoseFree"],
  },
  puran_poli: {
    label: "Puran Poli",
    category: "roti",
    calories: 350,
    protein: 7.2,
    fiber: 4.0,
    tags: ["veg"],
  },
  bhatura: {
    label: "Bhatura",
    category: "roti",
    calories: 375,
    protein: 8.0,
    fiber: 2.1,
    tags: ["veg"],
  },
  poori: {
    label: "Poori",
    category: "roti",
    calories: 410,
    protein: 8.2,
    fiber: 2.8,
    tags: ["veg", "lactoseFree"],
  },
  naan: {
    label: "Plain Naan",
    category: "roti",
    calories: 317,
    protein: 9.0,
    fiber: 2.5,
    tags: ["veg"],
  },
  butter_naan: {
    label: "Butter Naan",
    category: "roti",
    calories: 350,
    protein: 8.8,
    fiber: 2.4,
    tags: ["veg"],
  },
  garlic_naan: {
    label: "Garlic Naan",
    category: "roti",
    calories: 340,
    protein: 9.1,
    fiber: 2.6,
    tags: ["veg"],
  },
  cheese_naan: {
    label: "Cheese Naan",
    category: "roti",
    calories: 390,
    protein: 13.0,
    fiber: 2.3,
    tags: ["veg"],
  },
  kulcha: {
    label: "Kulcha",
    category: "roti",
    calories: 300,
    protein: 8.5,
    fiber: 2.5,
    tags: ["veg"],
  },
  paneer_kulcha: {
    label: "Paneer Kulcha",
    category: "roti",
    calories: 335,
    protein: 12.1,
    fiber: 3.0,
    tags: ["veg"],
  },
  masala_kulcha: {
    label: "Masala Kulcha",
    category: "roti",
    calories: 310,
    protein: 9.0,
    fiber: 3.2,
    tags: ["veg"],
  },
  appam: {
    label: "Appam",
    category: "roti",
    calories: 175,
    protein: 3.1,
    fiber: 1.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  idiyappam: {
    label: "Idiyappam (String Hoppers)",
    category: "roti",
    calories: 160,
    protein: 3.0,
    fiber: 1.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  malabar_parotta: {
    label: "Malabar Parotta",
    category: "roti",
    calories: 395,
    protein: 8.0,
    fiber: 3.0,
    tags: ["veg"],
  },

  // --- SOUTH INDIAN BREAKFAST & SNACKS ---
  idli: {
    label: "Idli",
    category: "breakfast",
    calories: 120,
    protein: 5.5,
    fiber: 1.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  rava_idli: {
    label: "Rava Idli",
    category: "breakfast",
    calories: 160,
    protein: 5.0,
    fiber: 2.1,
    tags: ["veg"],
  },
  thatte_idli: {
    label: "Thatte Idli",
    category: "breakfast",
    calories: 130,
    protein: 5.2,
    fiber: 1.6,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  mini_idli: {
    label: "Mini Idli",
    category: "breakfast",
    calories: 122,
    protein: 5.4,
    fiber: 1.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  oats_idli: {
    label: "Oats Idli",
    category: "breakfast",
    calories: 135,
    protein: 6.0,
    fiber: 3.5,
    tags: ["veg"],
  },
  ragi_idli: {
    label: "Ragi Idli",
    category: "breakfast",
    calories: 128,
    protein: 5.1,
    fiber: 4.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  plain_dosa: {
    label: "Plain Dosa",
    category: "breakfast",
    calories: 168,
    protein: 3.9,
    fiber: 0.9,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  masala_dosa: {
    label: "Masala Dosa",
    category: "breakfast",
    calories: 187,
    protein: 3.9,
    fiber: 2.1,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  onion_dosa: {
    label: "Onion Dosa",
    category: "breakfast",
    calories: 172,
    protein: 4.0,
    fiber: 1.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  rava_dosa: {
    label: "Rava Dosa",
    category: "breakfast",
    calories: 195,
    protein: 4.2,
    fiber: 1.2,
    tags: ["veg", "lactoseFree"],
  },
  set_dosa: {
    label: "Set Dosa",
    category: "breakfast",
    calories: 160,
    protein: 3.5,
    fiber: 1.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  paper_dosa: {
    label: "Paper Dosa",
    category: "breakfast",
    calories: 210,
    protein: 4.0,
    fiber: 0.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  ghee_roast_dosa: {
    label: "Ghee Roast Dosa",
    category: "breakfast",
    calories: 245,
    protein: 4.1,
    fiber: 0.9,
    tags: ["veg", "glutenFree"],
  },
  paneer_dosa: {
    label: "Paneer Dosa",
    category: "breakfast",
    calories: 220,
    protein: 9.5,
    fiber: 1.4,
    tags: ["veg", "glutenFree"],
  },
  cheese_dosa: {
    label: "Cheese Dosa",
    category: "breakfast",
    calories: 250,
    protein: 10.2,
    fiber: 1.0,
    tags: ["veg", "glutenFree"],
  },
  mysore_bonda_dosa: {
    label: "Mysore Masala Dosa",
    category: "breakfast",
    calories: 195,
    protein: 4.2,
    fiber: 2.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  egg_dosa: {
    label: "Egg Dosa",
    category: "breakfast",
    calories: 205,
    protein: 9.0,
    fiber: 1.0,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  moong_dosa_pesarattu: {
    label: "Pesarattu (Green Moong Dosa)",
    category: "breakfast",
    calories: 160,
    protein: 8.5,
    fiber: 4.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  uttapam: {
    label: "Uttapam",
    category: "breakfast",
    calories: 165,
    protein: 4.5,
    fiber: 2.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  tomato_uttapam: {
    label: "Tomato Uttapam",
    category: "breakfast",
    calories: 162,
    protein: 4.4,
    fiber: 2.3,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  onion_uttapam: {
    label: "Onion Uttapam",
    category: "breakfast",
    calories: 168,
    protein: 4.5,
    fiber: 2.1,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  mixed_veg_uttapam: {
    label: "Mixed Veg Uttapam",
    category: "breakfast",
    calories: 170,
    protein: 4.8,
    fiber: 2.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  medu_vada: {
    label: "Medu Vada",
    category: "breakfast",
    calories: 275,
    protein: 7.2,
    fiber: 3.1,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  masala_vada_dal_vada: {
    label: "Masala Vada (Dal Vada)",
    category: "breakfast",
    calories: 290,
    protein: 9.1,
    fiber: 4.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  sabudana_vada: {
    label: "Sabudana Vada",
    category: "breakfast",
    calories: 310,
    protein: 3.5,
    fiber: 2.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  bonda_mysore_bonda: {
    label: "Mysore Bonda (Alur Bondha)",
    category: "breakfast",
    calories: 280,
    protein: 4.2,
    fiber: 2.5,
    tags: ["veg", "lactoseFree"],
  },
  bread_vada: {
    label: "Bread Vada",
    category: "breakfast",
    calories: 260,
    protein: 6.0,
    fiber: 2.2,
    tags: ["veg", "lactoseFree"],
  },
  kuzhi_paniyaram_sweet: {
    label: "Sweet Kuzhi Paniyaram",
    category: "breakfast",
    calories: 230,
    protein: 4.0,
    fiber: 1.8,
    tags: ["veg", "lactoseFree"],
  },
  kuzhi_paniyaram_savory: {
    label: "Savory Kuzhi Paniyaram",
    category: "breakfast",
    calories: 210,
    protein: 4.8,
    fiber: 2.2,
    tags: ["veg", "lactoseFree"],
  },
  pongal_ven_pongal: {
    label: "Ven Pongal",
    category: "breakfast",
    calories: 205,
    protein: 6.2,
    fiber: 2.5,
    tags: ["veg", "glutenFree"],
  },
  sweet_pongal: {
    label: "Chakkara Pongal (Sweet Pongal)",
    category: "breakfast",
    calories: 250,
    protein: 4.5,
    fiber: 2.0,
    tags: ["veg", "glutenFree"],
  },
  lemon_rice: {
    label: "Lemon Rice",
    category: "breakfast",
    calories: 172,
    protein: 3.2,
    fiber: 1.1,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  tamarind_rice_gongura: {
    label: "Tamarind Rice (Puliyodarai)",
    category: "breakfast",
    calories: 185,
    protein: 3.0,
    fiber: 1.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  tomato_rice: {
    label: "Tomato Rice",
    category: "breakfast",
    calories: 160,
    protein: 3.1,
    fiber: 1.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  coconut_rice: {
    label: "Coconut Rice",
    category: "breakfast",
    calories: 190,
    protein: 3.4,
    fiber: 1.7,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  curd_rice: {
    label: "Curd Rice",
    category: "breakfast",
    calories: 140,
    protein: 3.8,
    fiber: 0.5,
    tags: ["veg", "glutenFree"],
  },
  bisibelebath: {
    label: "Bisi Bele Bath",
    category: "breakfast",
    calories: 180,
    protein: 6.1,
    fiber: 3.9,
    tags: ["veg", "glutenFree"],
  },
  sambar_rice: {
    label: "Sambar Rice",
    category: "breakfast",
    calories: 155,
    protein: 4.8,
    fiber: 2.9,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },

  // --- DALS, CURRIES & GRAVIES ---
  dal_tadka: {
    label: "Dal Tadka",
    category: "curry",
    calories: 118,
    protein: 6.2,
    fiber: 3.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  dal_fry: {
    label: "Dal Fry",
    category: "curry",
    calories: 125,
    protein: 6.5,
    fiber: 3.4,
    tags: ["veg", "glutenFree"],
  },
  yellow_moong_dal: {
    label: "Yellow Moong Dal Curry",
    category: "curry",
    calories: 104,
    protein: 7.0,
    fiber: 2.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  masoor_dal: {
    label: "Masoor Dal (Red Lentil) Curry",
    category: "curry",
    calories: 116,
    protein: 9.0,
    fiber: 4.1,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  chana_dal: {
    label: "Chana Dal Curry",
    category: "curry",
    calories: 145,
    protein: 8.2,
    fiber: 5.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  urad_dal: {
    label: "Urad Dal Curry",
    category: "curry",
    calories: 140,
    protein: 9.2,
    fiber: 4.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  toor_dal: {
    label: "Toor Dal Curry",
    category: "curry",
    calories: 120,
    protein: 6.8,
    fiber: 3.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  panchratna_dal: {
    label: "Panchratna Dal Curry",
    category: "curry",
    calories: 130,
    protein: 8.0,
    fiber: 4.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  dal_makhani: {
    label: "Dal Makhani Curry",
    category: "curry",
    calories: 165,
    protein: 7.2,
    fiber: 4.5,
    tags: ["veg", "glutenFree"],
  },
  palak_dal: {
    label: "Palak Dal Curry",
    category: "curry",
    calories: 110,
    protein: 6.8,
    fiber: 3.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  methi_dal: {
    label: "Methi Dal Curry",
    category: "curry",
    calories: 112,
    protein: 6.9,
    fiber: 3.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  sambar: {
    label: "Sambar",
    category: "curry",
    calories: 72,
    protein: 3.8,
    fiber: 2.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  rasam: {
    label: "Rasam",
    category: "curry",
    calories: 35,
    protein: 1.2,
    fiber: 0.9,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  kootu: {
    label: "Vegetable Kootu Curry",
    category: "curry",
    calories: 95,
    protein: 4.5,
    fiber: 3.1,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  avial: {
    label: "Avial Curry",
    category: "curry",
    calories: 130,
    protein: 3.0,
    fiber: 3.0,
    tags: ["veg", "glutenFree"],
  },
  veg_kurma: {
    label: "Vegetable Kurma Curry",
    category: "curry",
    calories: 145,
    protein: 3.2,
    fiber: 2.8,
    tags: ["veg", "glutenFree"],
  },
  paneer_butter_masala: {
    label: "Paneer Butter Masala Curry",
    category: "curry",
    calories: 245,
    protein: 11.2,
    fiber: 1.8,
    tags: ["veg", "glutenFree"],
  },
  shahi_paneer: {
    label: "Shahi Paneer Curry",
    category: "curry",
    calories: 260,
    protein: 10.5,
    fiber: 1.5,
    tags: ["veg", "glutenFree"],
  },
  kadai_paneer: {
    label: "Kadai Paneer Curry",
    category: "curry",
    calories: 215,
    protein: 12.0,
    fiber: 2.2,
    tags: ["veg", "glutenFree"],
  },
  palak_paneer: {
    label: "Palak Paneer Curry",
    category: "curry",
    calories: 185,
    protein: 11.5,
    fiber: 3.0,
    tags: ["veg", "glutenFree"],
  },
  paneer_tikka_masala: {
    label: "Paneer Tikka Masala Curry",
    category: "curry",
    calories: 230,
    protein: 13.0,
    fiber: 2.0,
    tags: ["veg", "glutenFree"],
  },
  matar_paneer: {
    label: "Matar Paneer Curry",
    category: "curry",
    calories: 190,
    protein: 9.8,
    fiber: 3.1,
    tags: ["veg", "glutenFree"],
  },
  malai_kofta: {
    label: "Malai Kofta Curry",
    category: "curry",
    calories: 280,
    protein: 6.5,
    fiber: 2.4,
    tags: ["veg"],
  },
  aloo_matar: {
    label: "Aloo Matar Curry",
    category: "curry",
    calories: 115,
    protein: 3.2,
    fiber: 3.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  aloo_jeera: {
    label: "Aloo Jeera Curry",
    category: "curry",
    calories: 135,
    protein: 2.5,
    fiber: 2.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  aloo_gobi: {
    label: "Aloo Gobi Curry",
    category: "curry",
    calories: 110,
    protein: 2.8,
    fiber: 3.9,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  dum_aloo: {
    label: "Dum Aloo Curry",
    category: "curry",
    calories: 160,
    protein: 3.0,
    fiber: 2.9,
    tags: ["veg", "glutenFree"],
  },
  bhindi_masala: {
    label: "Bhindi Masala (Okra) Curry",
    category: "curry",
    calories: 105,
    protein: 2.5,
    fiber: 4.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  baingan_bharta: {
    label: "Baingan Bharta Curry",
    category: "curry",
    calories: 90,
    protein: 2.1,
    fiber: 4.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  mix_veg_curry: {
    label: "Mixed Vegetable Curry",
    category: "curry",
    calories: 102,
    protein: 3.0,
    fiber: 3.6,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  rajma_masala: {
    label: "Rajma Masala (Kidney Beans Curry)",
    category: "curry",
    calories: 140,
    protein: 7.5,
    fiber: 6.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  chole_chana_masala: {
    label: "Chole (Chickpea Curry)",
    category: "curry",
    calories: 164,
    protein: 8.9,
    fiber: 7.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  lobia_curry: {
    label: "Lobia Curry (Black-eyed Peas)",
    category: "curry",
    calories: 135,
    protein: 8.0,
    fiber: 6.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  kala_chana_curry: {
    label: "Kala Chana Curry (Black Chickpea)",
    category: "curry",
    calories: 150,
    protein: 9.0,
    fiber: 7.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  kadhi_pakora: {
    label: "Kadhi Pakora Curry",
    category: "curry",
    calories: 155,
    protein: 5.5,
    fiber: 2.0,
    tags: ["veg"],
  },
  gujarati_kadhi: {
    label: "Gujarati Kadhi Curry",
    category: "curry",
    calories: 95,
    protein: 3.2,
    fiber: 0.8,
    tags: ["veg"],
  },

  // --- COOKED MEATS & EGGS ---
  boiled_egg: {
    label: "Boiled Egg",
    category: "protein",
    calories: 155,
    protein: 13.0,
    fiber: 0.0,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  egg_white_boiled: {
    label: "Boiled Egg White",
    category: "protein",
    calories: 52,
    protein: 10.9,
    fiber: 0.0,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  fried_egg: {
    label: "Fried Egg",
    category: "protein",
    calories: 196,
    protein: 13.6,
    fiber: 0.0,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  sunny_side_up_egg: {
    label: "Sunny Side Up Egg",
    category: "protein",
    calories: 190,
    protein: 13.5,
    fiber: 0.0,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  scrambled_egg: {
    label: "Scrambled Egg",
    category: "protein",
    calories: 149,
    protein: 10.0,
    fiber: 0.0,
    tags: ["nonVeg", "glutenFree"],
  },
  egg_omelette: {
    label: "Plain Omelette",
    category: "protein",
    calories: 154,
    protein: 10.6,
    fiber: 0.0,
    tags: ["nonVeg", "glutenFree"],
  },
  masala_omelette: {
    label: "Masala Omelette",
    category: "protein",
    calories: 172,
    protein: 11.2,
    fiber: 0.8,
    tags: ["nonVeg", "glutenFree"],
  },
  egg_bhurji: {
    label: "Egg Bhurji (Scrambled Curry Style)",
    category: "protein",
    calories: 185,
    protein: 12.0,
    fiber: 1.2,
    tags: ["nonVeg", "glutenFree"],
  },
  boiled_chicken_breast: {
    label: "Boiled Chicken Breast",
    category: "protein",
    calories: 165,
    protein: 31.0,
    fiber: 0.0,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  chicken_curry: {
    label: "Chicken Curry",
    category: "protein",
    calories: 198,
    protein: 18.5,
    fiber: 1.1,
    tags: ["nonVeg", "glutenFree"],
  },
  chicken_tikka: {
    label: "Chicken Tikka",
    category: "protein",
    calories: 170,
    protein: 26.0,
    fiber: 0.5,
    tags: ["nonVeg", "glutenFree"],
  },
  butter_chicken: {
    label: "Butter Chicken",
    category: "protein",
    calories: 230,
    protein: 17.0,
    fiber: 1.0,
    tags: ["nonVeg", "glutenFree"],
  },
  chicken_korma: {
    label: "Chicken Korma",
    category: "protein",
    calories: 215,
    protein: 16.5,
    fiber: 1.5,
    tags: ["nonVeg", "glutenFree"],
  },
  chicken_pepper_fry: {
    label: "Chicken Pepper Fry",
    category: "protein",
    calories: 220,
    protein: 22.0,
    fiber: 1.8,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  chettinad_chicken: {
    label: "Chettinad Chicken",
    category: "protein",
    calories: 210,
    protein: 21.0,
    fiber: 2.0,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  hyderabadi_chicken_biryani: {
    label: "Chicken Biryani",
    category: "protein",
    calories: 195,
    protein: 11.5,
    fiber: 1.2,
    tags: ["nonVeg", "glutenFree"],
  },
  chicken_fried_rice: {
    label: "Chicken Fried Rice",
    category: "protein",
    calories: 175,
    protein: 8.5,
    fiber: 1.0,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  mutton_curry: {
    label: "Mutton Curry",
    category: "protein",
    calories: 245,
    protein: 20.0,
    fiber: 1.0,
    tags: ["nonVeg", "glutenFree"],
  },
  mutton_rogan_josh: {
    label: "Mutton Rogan Josh",
    category: "protein",
    calories: 255,
    protein: 21.0,
    fiber: 1.2,
    tags: ["nonVeg", "glutenFree"],
  },
  mutton_keema: {
    label: "Mutton Keema",
    category: "protein",
    calories: 260,
    protein: 22.5,
    fiber: 1.5,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  mutton_biryani: {
    label: "Mutton Biryani",
    category: "protein",
    calories: 220,
    protein: 12.0,
    fiber: 1.3,
    tags: ["nonVeg", "glutenFree"],
  },
  fish_curry: {
    label: "Fish Curry",
    category: "protein",
    calories: 130,
    protein: 16.0,
    fiber: 0.8,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  fish_fry: {
    label: "Fish Fry",
    category: "protein",
    calories: 195,
    protein: 20.0,
    fiber: 0.9,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  goan_fish_curry: {
    label: "Goan Fish Curry",
    category: "protein",
    calories: 155,
    protein: 15.0,
    fiber: 1.0,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  prawn_curry: {
    label: "Prawn Curry",
    category: "protein",
    calories: 140,
    protein: 17.5,
    fiber: 0.9,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  prawn_fry: {
    label: "Prawn Fry",
    category: "protein",
    calories: 180,
    protein: 21.0,
    fiber: 1.0,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  egg_curry: {
    label: "Egg Curry",
    category: "protein",
    calories: 160,
    protein: 8.5,
    fiber: 1.1,
    tags: ["nonVeg", "glutenFree"],
  },
  grilled_chicken: {
    label: "Grilled Chicken",
    category: "protein",
    calories: 165,
    protein: 30.0,
    fiber: 0.0,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },
  roasted_chicken: {
    label: "Roasted Chicken",
    category: "protein",
    calories: 195,
    protein: 28.0,
    fiber: 0.0,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },

  // --- BOILED SPROUTS & SALADS ---
  boiled_green_gram_sprouts_moong: {
    label: "Boiled Moong Sprouts (Green Gram)",
    category: "sprouts",
    calories: 52,
    protein: 4.2,
    fiber: 2.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  boiled_moth_beans_sprouts_matki: {
    label: "Boiled Matki Sprouts (Moth Beans)",
    category: "sprouts",
    calories: 85,
    protein: 7.0,
    fiber: 4.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  boiled_chickpea_sprouts_chana: {
    label: "Boiled Chickpea Sprouts",
    category: "sprouts",
    calories: 105,
    protein: 7.2,
    fiber: 5.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  boiled_black_chana_sprouts: {
    label: "Boiled Black Chana Sprouts",
    category: "sprouts",
    calories: 115,
    protein: 8.0,
    fiber: 5.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  boiled_cowpea_sprouts_lobia: {
    label: "Boiled Lobia Sprouts (Cowpea)",
    category: "sprouts",
    calories: 90,
    protein: 6.5,
    fiber: 4.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  boiled_horsegram_sprouts: {
    label: "Boiled Horsegram Sprouts",
    category: "sprouts",
    calories: 110,
    protein: 9.5,
    fiber: 6.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  boiled_soyabean_sprouts: {
    label: "Boiled Soybean Sprouts",
    category: "sprouts",
    calories: 122,
    protein: 11.0,
    fiber: 4.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  boiled_fenugreek_sprouts: {
    label: "Boiled Methi Sprouts",
    category: "sprouts",
    calories: 50,
    protein: 4.5,
    fiber: 3.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  mixed_sprouts_salad: {
    label: "Mixed Sprouts Salad",
    category: "salad",
    calories: 78,
    protein: 6.0,
    fiber: 3.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  sprout_chaat: {
    label: "Sprout Chaat",
    category: "salad",
    calories: 95,
    protein: 6.2,
    fiber: 4.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cucumber_salad: {
    label: "Cucumber Salad",
    category: "salad",
    calories: 16,
    protein: 0.7,
    fiber: 0.6,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  tomato_onion_salad: {
    label: "Tomato Onion Salad",
    category: "salad",
    calories: 24,
    protein: 1.0,
    fiber: 1.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  carrot_salad: {
    label: "Grated Carrot Salad",
    category: "salad",
    calories: 41,
    protein: 0.9,
    fiber: 2.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  green_salad: {
    label: "Green Garden Salad",
    category: "salad",
    calories: 20,
    protein: 1.2,
    fiber: 1.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  kachumber_salad: {
    label: "Kachumber Salad",
    category: "salad",
    calories: 22,
    protein: 0.8,
    fiber: 1.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  beetroot_salad: {
    label: "Beetroot Salad",
    category: "salad",
    calories: 43,
    protein: 1.6,
    fiber: 2.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cabbage_salad: {
    label: "Cabbage Slaw Salad",
    category: "salad",
    calories: 28,
    protein: 1.3,
    fiber: 2.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  fruit_salad_mixed: {
    label: "Mixed Fruit Salad",
    category: "salad",
    calories: 55,
    protein: 0.8,
    fiber: 2.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  corn_salad: {
    label: "Sweet Corn Salad",
    category: "salad",
    calories: 96,
    protein: 3.4,
    fiber: 2.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  paneer_salad: {
    label: "Paneer Protein Salad",
    category: "salad",
    calories: 165,
    protein: 12.5,
    fiber: 1.8,
    tags: ["veg", "glutenFree"],
  },
  boiled_egg_salad: {
    label: "Boiled Egg Salad",
    category: "salad",
    calories: 140,
    protein: 9.5,
    fiber: 1.2,
    tags: ["nonVeg", "glutenFree"],
  },
  chicken_salad: {
    label: "Chicken Protein Salad",
    category: "salad",
    calories: 150,
    protein: 20.0,
    fiber: 1.5,
    tags: ["nonVeg", "lactoseFree", "glutenFree"],
  },

  // --- FRUITS ---
  apple: {
    label: "Apple",
    category: "fruit",
    calories: 52,
    protein: 0.3,
    fiber: 2.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  banana: {
    label: "Banana",
    category: "fruit",
    calories: 89,
    protein: 1.1,
    fiber: 2.6,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  ripe_banana: {
    label: "Ripe Banana",
    category: "fruit",
    calories: 95,
    protein: 1.2,
    fiber: 2.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  raw_banana: {
    label: "Raw Green Banana",
    category: "fruit",
    calories: 100,
    protein: 1.3,
    fiber: 3.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  mango: {
    label: "Mango",
    category: "fruit",
    calories: 60,
    protein: 0.8,
    fiber: 1.6,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  alphonso_mango: {
    label: "Alphonso Mango",
    category: "fruit",
    calories: 68,
    protein: 0.9,
    fiber: 1.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  papaya: {
    label: "Papaya",
    category: "fruit",
    calories: 43,
    protein: 0.5,
    fiber: 1.7,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  guava: {
    label: "Guava",
    category: "fruit",
    calories: 68,
    protein: 2.55,
    fiber: 5.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  pomegranate: {
    label: "Pomegranate",
    category: "fruit",
    calories: 83,
    protein: 1.7,
    fiber: 4.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  watermelon: {
    label: "Watermelon",
    category: "fruit",
    calories: 30,
    protein: 0.6,
    fiber: 0.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  muskmelon: {
    label: "Muskmelon (Cantaloupe)",
    category: "fruit",
    calories: 34,
    protein: 0.8,
    fiber: 0.9,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  orange: {
    label: "Orange",
    category: "fruit",
    calories: 47,
    protein: 0.9,
    fiber: 2.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  sweet_lime_mosambi: {
    label: "Sweet Lime (Mosambi)",
    category: "fruit",
    calories: 43,
    protein: 0.8,
    fiber: 0.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  pineapple: {
    label: "Pineapple",
    category: "fruit",
    calories: 50,
    protein: 0.5,
    fiber: 1.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  grapes_green: {
    label: "Green Grapes",
    category: "fruit",
    calories: 69,
    protein: 0.7,
    fiber: 0.9,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  grapes_black: {
    label: "Black Grapes",
    category: "fruit",
    calories: 75,
    protein: 0.7,
    fiber: 1.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  strawberry: {
    label: "Strawberry",
    category: "fruit",
    calories: 32,
    protein: 0.7,
    fiber: 2.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  sapota_chikoo: {
    label: "Sapota (Chikoo)",
    category: "fruit",
    calories: 83,
    protein: 0.4,
    fiber: 5.3,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  pear: {
    label: "Pear",
    category: "fruit",
    calories: 57,
    protein: 0.4,
    fiber: 3.1,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  peach: {
    label: "Peach",
    category: "fruit",
    calories: 39,
    protein: 0.9,
    fiber: 1.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  plum: {
    label: "Plum",
    category: "fruit",
    calories: 46,
    protein: 0.7,
    fiber: 1.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  kiwi: {
    label: "Kiwi",
    category: "fruit",
    calories: 61,
    protein: 1.1,
    fiber: 3.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  dragon_fruit: {
    label: "Dragon Fruit",
    category: "fruit",
    calories: 60,
    protein: 1.2,
    fiber: 2.9,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  fig: {
    label: "Fresh Fig (Anjeer)",
    category: "fruit",
    calories: 74,
    protein: 0.8,
    fiber: 2.9,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  fresh_dates: {
    label: "Fresh Dates",
    category: "fruit",
    calories: 282,
    protein: 2.5,
    fiber: 8.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  dry_dates: {
    label: "Dry Dates (Chuhara)",
    category: "fruit",
    calories: 315,
    protein: 2.8,
    fiber: 8.7,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  raisins: {
    label: "Raisins (Kishmish)",
    category: "fruit",
    calories: 299,
    protein: 3.1,
    fiber: 3.7,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  cherries: {
    label: "Cherries",
    category: "fruit",
    calories: 50,
    protein: 1.0,
    fiber: 1.6,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  blueberries: {
    label: "Blueberries",
    category: "fruit",
    calories: 57,
    protein: 0.7,
    fiber: 2.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  custard_apple_sitaphal: {
    label: "Custard Apple (Sitaphal)",
    category: "fruit",
    calories: 94,
    protein: 2.1,
    fiber: 4.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  jackfruit: {
    label: "Ripe Jackfruit",
    category: "fruit",
    calories: 95,
    protein: 1.7,
    fiber: 1.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  litchi: {
    label: "Litchi",
    category: "fruit",
    calories: 66,
    protein: 0.8,
    fiber: 1.3,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  jamun: {
    label: "Jamun (Black Plum)",
    category: "fruit",
    calories: 60,
    protein: 0.7,
    fiber: 0.9,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  amla_indian_gooseberry: {
    label: "Amla (Indian Gooseberry)",
    category: "fruit",
    calories: 44,
    protein: 0.9,
    fiber: 3.4,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  water_chestnut_singhara: {
    label: "Water Chestnut (Singhara)",
    category: "fruit",
    calories: 97,
    protein: 1.4,
    fiber: 3.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },

  // --- BREADS & BAKERY ---
  white_bread: {
    label: "White Bread",
    category: "bread",
    calories: 265,
    protein: 9.0,
    fiber: 2.7,
    tags: ["veg", "lactoseFree"],
  },
  brown_bread: {
    label: "Brown Bread",
    category: "bread",
    calories: 247,
    protein: 9.5,
    fiber: 5.8,
    tags: ["veg", "lactoseFree"],
  },
  multigrain_bread: {
    label: "Multigrain Bread",
    category: "bread",
    calories: 250,
    protein: 11.0,
    fiber: 7.0,
    tags: ["veg", "lactoseFree"],
  },
  whole_wheat_bread: {
    label: "Whole Wheat Bread",
    category: "bread",
    calories: 245,
    protein: 10.0,
    fiber: 6.5,
    tags: ["veg", "lactoseFree"],
  },
  sandwich_bread: {
    label: "Sandwich Bread",
    category: "bread",
    calories: 260,
    protein: 8.8,
    fiber: 2.5,
    tags: ["veg", "lactoseFree"],
  },
  milk_bread: {
    label: "Milk Bread",
    category: "bread",
    calories: 275,
    protein: 8.5,
    fiber: 2.2,
    tags: ["veg"],
  },
  pav: {
    label: "Ladi Pav (Indian Bread Roll)",
    category: "bread",
    calories: 280,
    protein: 8.2,
    fiber: 2.3,
    tags: ["veg", "lactoseFree"],
  },
  burger_bun: {
    label: "Burger Bun",
    category: "bread",
    calories: 285,
    protein: 8.9,
    fiber: 2.4,
    tags: ["veg", "lactoseFree"],
  },
  hotdog_bun: {
    label: "Hotdog Bun",
    category: "bread",
    calories: 280,
    protein: 8.7,
    fiber: 2.3,
    tags: ["veg", "lactoseFree"],
  },
  rusk: {
    label: "Tea Rusk Toast",
    category: "bread",
    calories: 405,
    protein: 10.0,
    fiber: 3.5,
    tags: ["veg"],
  },
  khari: {
    label: "Khari Biscuit",
    category: "bread",
    calories: 510,
    protein: 7.0,
    fiber: 1.5,
    tags: ["veg"],
  },
  puff_pastry: {
    label: "Veg Puff Pastry",
    category: "bread",
    calories: 420,
    protein: 6.5,
    fiber: 2.0,
    tags: ["veg"],
  },
  fruit_bun: {
    label: "Fruit Bun",
    category: "bread",
    calories: 320,
    protein: 7.5,
    fiber: 2.2,
    tags: ["veg"],
  },
  butter_croissant: {
    label: "Butter Croissant",
    category: "bread",
    calories: 406,
    protein: 8.2,
    fiber: 2.6,
    tags: ["veg"],
  },
  garlic_bread: {
    label: "Garlic Bread",
    category: "bread",
    calories: 350,
    protein: 8.0,
    fiber: 2.5,
    tags: ["veg"],
  },
  pita_bread: {
    label: "Pita Bread",
    category: "bread",
    calories: 275,
    protein: 9.1,
    fiber: 2.2,
    tags: ["veg", "lactoseFree"],
  },
  bagel: {
    label: "Bagel",
    category: "bread",
    calories: 250,
    protein: 10.0,
    fiber: 2.2,
    tags: ["veg", "lactoseFree"],
  },
  wrap_tortilla: {
    label: "Wheat Tortilla Wrap",
    category: "bread",
    calories: 295,
    protein: 8.2,
    fiber: 3.0,
    tags: ["veg", "lactoseFree"],
  },

  // --- SNACKS, STREET FOOD & SWEETS ---
  samosa: {
    label: "Veg Samosa",
    category: "snack",
    calories: 262,
    protein: 4.5,
    fiber: 2.2,
    tags: ["veg", "lactoseFree"],
  },
  aloo_patties: {
    label: "Aloo Patties (Cutlet)",
    category: "snack",
    calories: 235,
    protein: 4.0,
    fiber: 3.1,
    tags: ["veg", "lactoseFree"],
  },
  kachori: {
    label: "Dal Kachori",
    category: "snack",
    calories: 330,
    protein: 6.5,
    fiber: 3.8,
    tags: ["veg", "lactoseFree"],
  },
  dhokla: {
    label: "Khaman Dhokla",
    category: "snack",
    calories: 160,
    protein: 7.0,
    fiber: 2.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  khandvi: {
    label: "Khandvi",
    category: "snack",
    calories: 205,
    protein: 6.8,
    fiber: 1.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  moong_dal_pakora: {
    label: "Moong Dal Pakora (Mangoda)",
    category: "snack",
    calories: 290,
    protein: 11.0,
    fiber: 4.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  pyaaz_pakora: {
    label: "Onion Pakora (Bhajiya)",
    category: "snack",
    calories: 310,
    protein: 5.0,
    fiber: 3.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  aloo_pakora: {
    label: "Potato Pakora",
    category: "snack",
    calories: 270,
    protein: 4.2,
    fiber: 2.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  paneer_pakora: {
    label: "Paneer Pakora",
    category: "snack",
    calories: 340,
    protein: 13.5,
    fiber: 1.2,
    tags: ["veg", "glutenFree"],
  },
  bread_pakora: {
    label: "Bread Pakora",
    category: "snack",
    calories: 315,
    protein: 7.0,
    fiber: 2.2,
    tags: ["veg", "lactoseFree"],
  },
  mirchi_bajji: {
    label: "Mirchi Bajji",
    category: "snack",
    calories: 260,
    protein: 4.0,
    fiber: 3.5,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  pani_puri: {
    label: "Pani Puri (Golgappa)",
    category: "snack",
    calories: 220,
    protein: 3.5,
    fiber: 2.8,
    tags: ["veg", "lactoseFree"],
  },
  sev_puri: {
    label: "Sev Puri",
    category: "snack",
    calories: 290,
    protein: 5.2,
    fiber: 3.1,
    tags: ["veg", "lactoseFree"],
  },
  bhel_puri: {
    label: "Bhel Puri",
    category: "snack",
    calories: 215,
    protein: 4.8,
    fiber: 3.4,
    tags: ["veg", "lactoseFree"],
  },
  dahi_puri: {
    label: "Dahi Puri",
    category: "snack",
    calories: 240,
    protein: 5.0,
    fiber: 2.5,
    tags: ["veg"],
  },
  papdi_chaat: {
    label: "Papdi Chaat",
    category: "snack",
    calories: 275,
    protein: 5.5,
    fiber: 3.0,
    tags: ["veg"],
  },
  aloo_tikki_chaat: {
    label: "Aloo Tikki Chaat",
    category: "snack",
    calories: 230,
    protein: 4.2,
    fiber: 3.2,
    tags: ["veg"],
  },
  samosa_chaat: {
    label: "Samosa Chaat",
    category: "snack",
    calories: 285,
    protein: 5.0,
    fiber: 3.5,
    tags: ["veg"],
  },
  pav_bhaji: {
    label: "Pav Bhaji",
    category: "snack",
    calories: 220,
    protein: 5.1,
    fiber: 4.0,
    tags: ["veg"],
  },
  misal_pav: {
    label: "Misal Pav",
    category: "snack",
    calories: 245,
    protein: 9.0,
    fiber: 6.1,
    tags: ["veg", "lactoseFree"],
  },
  vada_pav: {
    label: "Vada Pav",
    category: "snack",
    calories: 290,
    protein: 6.0,
    fiber: 3.8,
    tags: ["veg", "lactoseFree"],
  },
  dabeli: {
    label: "Kutchi Dabeli",
    category: "snack",
    calories: 310,
    protein: 6.2,
    fiber: 3.5,
    tags: ["veg"],
  },
  momos_veg: {
    label: "Veg Momos",
    category: "snack",
    calories: 165,
    protein: 4.5,
    fiber: 2.1,
    tags: ["veg", "lactoseFree"],
  },
  momos_paneer: {
    label: "Paneer Momos",
    category: "snack",
    calories: 195,
    protein: 9.2,
    fiber: 1.8,
    tags: ["veg"],
  },
  momos_chicken: {
    label: "Chicken Momos",
    category: "snack",
    calories: 185,
    protein: 12.0,
    fiber: 1.5,
    tags: ["nonVeg", "lactoseFree"],
  },
  spring_roll: {
    label: "Veg Spring Roll",
    category: "snack",
    calories: 245,
    protein: 4.0,
    fiber: 2.2,
    tags: ["veg", "lactoseFree"],
  },
  french_fries: {
    label: "French Fries",
    category: "snack",
    calories: 312,
    protein: 3.4,
    fiber: 3.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  potato_wedges: {
    label: "Potato Wedges",
    category: "snack",
    calories: 225,
    protein: 3.0,
    fiber: 3.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  paneer_tikka: {
    label: "Paneer Tikka Starters",
    category: "snack",
    calories: 230,
    protein: 14.0,
    fiber: 1.2,
    tags: ["veg", "glutenFree"],
  },
  tandoori_chicken: {
    label: "Tandoori Chicken Starter",
    category: "snack",
    calories: 175,
    protein: 24.5,
    fiber: 0.5,
    tags: ["nonVeg", "glutenFree"],
  },
  chicken_lollipop: {
    label: "Chicken Lollipop",
    category: "snack",
    calories: 280,
    protein: 19.0,
    fiber: 0.8,
    tags: ["nonVeg", "lactoseFree"],
  },
  fish_fingers: {
    label: "Fish Fingers",
    category: "snack",
    calories: 250,
    protein: 15.0,
    fiber: 1.0,
    tags: ["nonVeg", "lactoseFree"],
  },
  gulab_jamun: {
    label: "Gulab Jamun",
    category: "sweet",
    calories: 360,
    protein: 3.8,
    fiber: 0.5,
    tags: ["veg"],
  },
  jalebi: {
    label: "Jalebi",
    category: "sweet",
    calories: 305,
    protein: 1.5,
    fiber: 0.8,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  rasgulla: {
    label: "Rasgulla",
    category: "sweet",
    calories: 185,
    protein: 6.0,
    fiber: 0.3,
    tags: ["veg", "glutenFree"],
  },
  kaju_katli: {
    label: "Kaju Katli",
    category: "sweet",
    calories: 510,
    protein: 10.5,
    fiber: 1.2,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  motichoor_laddoo: {
    label: "Motichoor Laddoo",
    category: "sweet",
    calories: 420,
    protein: 5.2,
    fiber: 1.5,
    tags: ["veg", "glutenFree"],
  },
  besan_laddoo: {
    label: "Besan Laddoo",
    category: "sweet",
    calories: 450,
    protein: 9.0,
    fiber: 3.2,
    tags: ["veg", "glutenFree"],
  },
  halwa_suji: {
    label: "Suji Halwa (Sheera)",
    category: "sweet",
    calories: 320,
    protein: 4.1,
    fiber: 1.8,
    tags: ["veg"],
  },
  gajar_halwa: {
    label: "Gajar ka Halwa",
    category: "sweet",
    calories: 210,
    protein: 3.9,
    fiber: 2.2,
    tags: ["veg"],
  },
  moong_dal_halwa: {
    label: "Moong Dal Halwa",
    category: "sweet",
    calories: 385,
    protein: 6.5,
    fiber: 2.5,
    tags: ["veg"],
  },
  kheer_rice: {
    label: "Rice Kheer (Payasam)",
    category: "sweet",
    calories: 135,
    protein: 3.5,
    fiber: 0.4,
    tags: ["veg", "glutenFree"],
  },
  rasmalai: {
    label: "Rasmalai",
    category: "sweet",
    calories: 245,
    protein: 8.0,
    fiber: 0.4,
    tags: ["veg", "glutenFree"],
  },
  peda: {
    label: "Milk Peda",
    category: "sweet",
    calories: 380,
    protein: 10.2,
    fiber: 0.2,
    tags: ["veg", "glutenFree"],
  },
  mysore_pak: {
    label: "Mysore Pak",
    category: "sweet",
    calories: 515,
    protein: 5.8,
    fiber: 1.0,
    tags: ["veg", "glutenFree"],
  },

  // --- DAIRY & BEVERAGES ---
  milk_toned: {
    label: "Toned Milk",
    category: "dairy",
    calories: 58,
    protein: 3.1,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  milk_full_cream: {
    label: "Full Cream Milk",
    category: "dairy",
    calories: 67,
    protein: 3.2,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  milk_skimmed: {
    label: "Skimmed Milk",
    category: "dairy",
    calories: 35,
    protein: 3.4,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  curd: {
    label: "Curd (Yogurt)",
    category: "dairy",
    calories: 61,
    protein: 3.5,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  greek_yogurt: {
    label: "Greek Yogurt",
    category: "dairy",
    calories: 97,
    protein: 10.0,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  paneer: {
    label: "Paneer (Cottage Cheese)",
    category: "dairy",
    calories: 265,
    protein: 18.3,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  butter_salted: {
    label: "Salted Butter",
    category: "dairy",
    calories: 717,
    protein: 0.85,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  ghee: {
    label: "Clarified Butter (Ghee)",
    category: "dairy",
    calories: 900,
    protein: 0.0,
    fiber: 0.0,
    tags: ["veg", "lactoseFree", "glutenFree"],
  },
  buttermilk_chaas: {
    label: "Buttermilk (Chaas)",
    category: "dairy",
    calories: 40,
    protein: 2.5,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  lassi_sweet: {
    label: "Sweet Lassi",
    category: "dairy",
    calories: 90,
    protein: 3.0,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  lassi_salted: {
    label: "Salted Lassi",
    category: "dairy",
    calories: 65,
    protein: 3.2,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  cheese_slice: {
    label: "Processed Cheese Slice",
    category: "dairy",
    calories: 310,
    protein: 20.0,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  mozzarella_cheese: {
    label: "Mozzarella Cheese",
    category: "dairy",
    calories: 280,
    protein: 22.0,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  condensed_milk: {
    label: "Sweetened Condensed Milk",
    category: "dairy",
    calories: 321,
    protein: 7.9,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  khoya_mawa: {
    label: "Khoya (Mawa)",
    category: "dairy",
    calories: 410,
    protein: 16.0,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  coconut_water: {
    label: "Tender Coconut Water",
    category: "beverage",
    calories: 19,
    protein: 0.7,
    fiber: 1.1,
    tags: ["veg", "lactoseFree", "glutenFree", "vegan"],
  },
  green_tea: {
    label: "Green Tea (Unsweetened)",
    category: "beverage",
    calories: 2,
    protein: 0.2,
    fiber: 0.0,
    tags: ["veg", "lactoseFree", "glutenFree", "vegan"],
  },
  black_tea: {
    label: "Black Tea",
    category: "beverage",
    calories: 1,
    protein: 0.1,
    fiber: 0.0,
    tags: ["veg", "lactoseFree", "glutenFree", "vegan"],
  },
  milk_tea: {
    label: "Indian Milk Tea",
    category: "beverage",
    calories: 55,
    protein: 2.2,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  masala_chai: {
    label: "Masala Chai",
    category: "beverage",
    calories: 62,
    protein: 2.3,
    fiber: 0.1,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  coffee_black: {
    label: "Black Coffee",
    category: "beverage",
    calories: 2,
    protein: 0.3,
    fiber: 0.0,
    tags: ["veg", "lactoseFree", "glutenFree", "vegan"],
  },
  coffee_with_milk: {
    label: "Coffee with Milk",
    category: "beverage",
    calories: 50,
    protein: 2.0,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  filter_coffee: {
    label: "South Indian Filter Coffee",
    category: "beverage",
    calories: 75,
    protein: 2.8,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  badam_milk: {
    label: "Badam Milk",
    category: "beverage",
    calories: 95,
    protein: 4.0,
    fiber: 0.8,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  rose_milk: {
    label: "Rose Milk",
    category: "beverage",
    calories: 85,
    protein: 2.9,
    fiber: 0.0,
    tags: ["veg", "containsLactose", "glutenFree"],
  },
  sugarcane_juice: {
    label: "Sugarcane Juice",
    category: "beverage",
    calories: 65,
    protein: 0.4,
    fiber: 0.0,
    tags: ["veg", "lactoseFree", "glutenFree", "vegan"],
  },
  lime_juice_nimbu_pani: {
    label: "Nimbu Pani (Lemonade)",
    category: "beverage",
    calories: 30,
    protein: 0.1,
    fiber: 0.2,
    tags: ["veg", "lactoseFree", "glutenFree", "vegan"],
  },
};

const state = { profile: null, targets: null, plan: null, settings: null };
const activityFactors = {
  Sedentary: 1.2,
  Light: 1.375,
  Moderate: 1.55,
  Active: 1.725,
  "Very active": 1.9,
};
const bodyFactors = { Ectomorphic: 1.1, Mesomorphic: 1, Endomorphic: 0.9 };
const targetFactors = {
  "Lose weight": 0.85,
  "Maintain weight": 1,
  "Gain weight": 1.15,
};
const mealNames = [
  "Breakfast",
  "Mid-morning",
  "Lunch",
  "Evening snack",
  "Dinner",
  "Bedtime",
];
const templates = [
  ["grain", "dairy", "fruit"],
  ["fruit", "fat", "dairy"],
  ["grain", "protein", "vegetable"],
  ["fruit", "protein", "fat"],
  ["grain", "protein", "vegetable"],
  ["dairy", "fruit", "fat"],
];

function openProfileDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PROFILE_DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      if (!event.target.result.objectStoreNames.contains(PROFILE_STORE_NAME))
        event.target.result.createObjectStore(PROFILE_STORE_NAME, {
          keyPath: "id",
        });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getProfile(db) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(PROFILE_STORE_NAME, "readonly")
      .objectStore(PROFILE_STORE_NAME)
      .get(PROFILE_RECORD_ID);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function loadFullCatalog() {
  try {
    const response = await fetch("calcJS/calorieCalculator.js", {
      cache: "no-store",
    });
    if (!response.ok) return;
    const source = await response.text();
    const match = source.match(
      /const foodCatalog\s*=\s*({[\s\S]*?});\s*function openNutritionDatabase/,
    );
    if (!match) return;
    const catalog = Function(`return (${match[1]})`)();
    if (catalog && Object.keys(catalog).length)
      foodCatalog = addCatalogMetadata(catalog);
  } catch (error) {
    // The built-in catalog keeps the planner usable from a local file preview.
  }
}

function addCatalogMetadata(catalog) {
  const categoryWords = {
    grain: [
      "rice",
      "wheat",
      "oat",
      "jowar",
      "bajra",
      "ragi",
      "millet",
      "quinoa",
      "corn",
      "sabudana",
    ],
    protein: [
      "dal",
      "lentil",
      "chickpea",
      "bean",
      "soy",
      "paneer",
      "tofu",
      "egg",
      "chicken",
      "fish",
      "meat",
      "mutton",
    ],
    dairy: ["milk", "curd", "yogurt", "buttermilk", "cheese"],
    fruit: [
      "banana",
      "apple",
      "orange",
      "papaya",
      "guava",
      "mango",
      "grape",
      "date",
      "fruit",
      "watermelon",
    ],
    vegetable: [
      "spinach",
      "broccoli",
      "carrot",
      "cucumber",
      "tomato",
      "potato",
      "vegetable",
      "beet",
      "cabbage",
      "cauliflower",
    ],
    fat: [
      "almond",
      "peanut",
      "walnut",
      "cashew",
      "seed",
      "chia",
      "flax",
      "oil",
      "ghee",
    ],
  };
  return Object.fromEntries(
    Object.entries(catalog).map(([key, food]) => {
      const text = `${key} ${food.label}`.toLowerCase();
      const category =
        Object.entries(categoryWords).find(([, words]) =>
          words.some((word) => text.includes(word)),
        )?.[0] || "protein";
      const tags =
        food.tags ||
        (category === "protein" && /chicken|fish|meat|mutton|egg/.test(text)
          ? ["nonveg", "lactoseFree"]
          : ["veg", "lactoseFree"]);
      return [
        key,
        {
          ...food,
          category,
          tags,
          fiber:
            food.fiber ?? (food.solubleFiber || 0) + (food.insolubleFiber || 0),
        },
      ];
    }),
  );
}

function calculateTargets(profile) {
  if (!profile || !profile.weight || !profile.height || !profile.age)
    return null;
  const base =
    10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  const calories = Math.round(
    base *
      (activityFactors[profile.activityLevel] || 1.2) *
      (bodyFactors[profile.bodyType] || 1) *
      (targetFactors[profile.target] || 1),
  );
  const proteinBase =
    { Ectomorphic: 1.9, Mesomorphic: 1.7, Endomorphic: 1.5 }[
      profile.bodyType
    ] || 1.6;
  const proteinFactor =
    profile.target === "Gain weight"
      ? proteinBase + 0.2
      : profile.target === "Lose weight"
        ? Math.max(1.4, proteinBase - 0.1)
        : proteinBase;
  const fiber = Math.round((calories / 1000) * 14);
  return {
    calories,
    protein: Math.round(profile.weight * proteinFactor),
    fiber,
  };
}

function nutrition(food, grams) {
  const factor = grams / 100;
  return {
    calories: food.calories * factor,
    protein: food.protein * factor,
    fiber: food.fiber * factor,
  };
}

function formatNumber(value) {
  return Number(value).toFixed(value >= 100 ? 0 : 1);
}
function escapeHtml(value) {
  return String(value).replace(
    /[&<>\"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character],
  );
}
function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}
function displayTime(value) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(`2000-01-01T${value}`));
}
function dayLabel(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(date);
}

function isAllowed(food, profile, avoid) {
  const label = food.label.toLowerCase();
  if (avoid.some((term) => label.includes(term))) return false;
  if (profile?.dietType === "Vegetarian" && !food.tags.includes("veg"))
    return false;
  if (
    profile?.dietType === "Eggetarian" &&
    food.tags.includes("nonveg") &&
    !food.tags.includes("egg")
  )
    return false;
  if (
    profile?.lactoseIntolerant === "Lactose intolerant" &&
    food.tags.includes("dairy")
  )
    return false;
  return true;
}

function selectedFoodKeys() {
  return new Set(
    [...document.querySelectorAll("#foodChoices input:checked")].map(
      (input) => input.value,
    ),
  );
}

function availableFoods(category, avoid, allowedKeys = selectedFoodKeys()) {
  return Object.values(foodCatalog).filter((food) => {
    const key = Object.keys(foodCatalog).find(
      (itemKey) => foodCatalog[itemKey] === food,
    );
    return (
      food.category === category &&
      (!allowedKeys.size || allowedKeys.has(key)) &&
      !avoid.some((term) => food.label.toLowerCase().includes(term))
    );
  });
}

function selectFood(category, profile, avoid, offset, allowedKeys) {
  const foods = availableFoods(category, avoid, allowedKeys).filter((food) =>
    isAllowed(food, profile, avoid),
  );
  if (!foods.length) return null;
  return foods[offset % foods.length];
}

function makeFoodItem(food, grams) {
  return {
    key: Object.keys(foodCatalog).find((key) => foodCatalog[key] === food),
    label: food.label,
    grams,
    ...nutrition(food, grams),
  };
}

function mealFor(index, targetCalories, profile, avoid, allowedKeys) {
  const template = templates[index % templates.length];
  const mealCalories =
    targetCalories * [1.25, 0.75, 1.55, 0.75, 1.45, 0.45][index] ||
    targetCalories / 5;
  const foods = [];
  template.forEach((category, categoryIndex) => {
    const food = selectFood(
      category,
      profile,
      avoid,
      index + categoryIndex,
      allowedKeys,
    );
    if (!food) return;
    const share =
      category === "protein"
        ? 0.42
        : category === "grain"
          ? 0.38
          : category === "fat"
            ? 0.16
            : 0.2;
    const grams = Math.max(
      category === "fat" ? 10 : 50,
      Math.round(((mealCalories * share) / food.calories) * 100),
    );
    foods.push(makeFoodItem(food, grams));
  });
  if (!foods.length)
    return {
      name: mealNames[index],
      foods: [],
      calories: 0,
      protein: 0,
      fiber: 0,
    };
  return {
    name: mealNames[index],
    foods,
    calories: foods.reduce((sum, food) => sum + food.calories, 0),
    protein: foods.reduce((sum, food) => sum + food.protein, 0),
    fiber: foods.reduce((sum, food) => sum + food.fiber, 0),
  };
}

function generatePlan(settings) {
  const adjustedCalories =
    state.targets.calories * (1 + Number(settings.calorieAdjustment) / 100);
  const plan = [];
  const allowedKeys = new Set(settings.selectedFoods);
  for (let day = 0; day < Number(settings.planDays); day += 1) {
    const meals = [];
    for (let meal = 0; meal < Number(settings.mealsPerDay); meal += 1)
      meals.push(
        mealFor(
          meal,
          adjustedCalories / Number(settings.mealsPerDay),
          state.profile,
          settings.avoid,
          allowedKeys,
        ),
      );
    plan.push({
      day,
      label: dayLabel(day),
      meals,
      calories: meals.reduce((sum, meal) => sum + meal.calories, 0),
      protein: meals.reduce((sum, meal) => sum + meal.protein, 0),
      fiber: meals.reduce((sum, meal) => sum + meal.fiber, 0),
    });
  }
  state.plan = plan;
  state.settings = settings;
  localStorage.setItem(
    PLAN_STORAGE_KEY,
    JSON.stringify({ plan, settings, targets: state.targets }),
  );
  renderPlan();
}

function renderFoodChoices() {
  const container = document.getElementById("foodChoices");
  const foods = Object.entries(foodCatalog).sort(([, first], [, second]) =>
    first.label.localeCompare(second.label),
  );
  container.innerHTML = foods
    .map(
      ([key, food]) =>
        `<label class="foodChoice"><input type="checkbox" value="${key}" checked><span>${escapeHtml(food.label)}</span></label>`,
    )
    .join("");
  updateFoodChoiceCount();
}

function updateFoodChoiceCount() {
  const count = document.querySelectorAll("#foodChoices input:checked").length;
  document.getElementById("foodChoiceCount").textContent = count
    ? `${count} food${count === 1 ? "" : "s"} selected`
    : "Choose at least one food";
}

function renderTargets() {
  const targets = state.targets;
  document.getElementById("targetCalories").textContent = targets
    ? targets.calories
    : "--";
  document.getElementById("targetProtein").textContent = targets
    ? targets.protein
    : "--";
  document.getElementById("targetFiber").textContent = targets
    ? targets.fiber
    : "--";
  document.getElementById("targetNote").textContent = targets
    ? `Based on ${state.profile.target || "your profile"}, ${state.profile.activityLevel || "your activity"}, and your body measurements.`
    : "Targets will be calculated from your saved user profile.";
}

function renderPlan() {
  if (!state.plan) return;
  const style = state.settings.portionStyle;
  document.getElementById("planDate").textContent =
    `${state.plan.length}-day plan · ${state.targets.calories} kcal target`;
  document.getElementById("mealPlanOutput").innerHTML = state.plan
    .map(
      (day) => `
        <article class="dayPlan"><div class="dayHeader"><h3>Day ${day.day + 1} <small>${escapeHtml(day.label)}</small></h3><div class="dayTotals">${formatNumber(day.calories)} kcal · ${formatNumber(day.protein)} g protein · ${formatNumber(day.fiber)} g fiber</div></div>
        <div class="mealGrid">${day.meals.map((meal, mealIndex) => `<div class="mealCard"><div class="mealTime">${displayTime(minutesToTime(Number(state.settings.firstMealMinutes) + mealIndex * Number(state.settings.mealInterval)))}</div><h4>${escapeHtml(meal.name)}</h4>${meal.foods.map((food, foodIndex) => `<div class="mealFood"><span>${escapeHtml(food.label)}</span><small>${style === "gram" ? `${food.grams} g` : `${Math.max(1, Math.round(food.grams / 25) * 25)} g`} <button type="button" class="replaceFoodButton" data-day="${day.day}" data-meal="${mealIndex}" data-food="${foodIndex}">Replace</button></small></div>`).join("")}<div class="mealMacros">${formatNumber(meal.calories)} kcal · ${formatNumber(meal.protein)} g protein</div></div>`).join("")}</div></article>`,
    )
    .join("");
}

function readSettings() {
  const avoid = document
    .getElementById("avoidFoods")
    .value.toLowerCase()
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const [hours, minutes] = document
    .getElementById("firstMealTime")
    .value.split(":")
    .map(Number);
  return {
    planDays: document.getElementById("planDays").value,
    mealsPerDay: document.getElementById("mealsPerDay").value,
    firstMealMinutes: hours * 60 + minutes,
    mealInterval: document.getElementById("mealInterval").value,
    calorieAdjustment: document.getElementById("calorieAdjustment").value,
    portionStyle: document.getElementById("portionStyle").value,
    avoid,
    selectedFoods: [
      ...document.querySelectorAll("#foodChoices input:checked"),
    ].map((input) => input.value),
    notes: document.getElementById("planNotes").value.trim(),
  };
}

function setStatus(message, error = false) {
  const element = document.getElementById("planStatus");
  element.textContent = message;
  element.style.color = error ? "#a45e4c" : "#438376";
}

function setPlannerLocked(locked) {
  const panel = document.querySelector(".setupPanel");
  const requiredMessage = document.getElementById("profileRequired");
  const form = document.getElementById("planForm");
  if (!panel || !requiredMessage || !form) return;
  panel.classList.toggle("is-locked", locked);
  requiredMessage.hidden = !locked;
  form
    .querySelectorAll("input, select, textarea, button")
    .forEach((control) => {
      control.disabled = locked && control.id !== "loadProfileButton";
    });
}

function replaceFood(dayIndex, mealIndex, foodIndex) {
  const meal = state.plan[dayIndex].meals[mealIndex];
  const current = meal.foods[foodIndex];
  const currentFood = foodCatalog[current.key];
  const candidates = availableFoods(
    currentFood.category,
    state.settings.avoid,
    new Set(state.settings.selectedFoods),
  ).filter((food) => isAllowed(food, state.profile, state.settings.avoid));
  const next =
    candidates[
      (candidates.findIndex((food) => food.label === current.label) + 1) %
        candidates.length
    ];
  if (!next) return;
  meal.foods[foodIndex] = makeFoodItem(next, current.grams);
  meal.calories = meal.foods.reduce((sum, food) => sum + food.calories, 0);
  meal.protein = meal.foods.reduce((sum, food) => sum + food.protein, 0);
  meal.fiber = meal.foods.reduce((sum, food) => sum + food.fiber, 0);
  const day = state.plan[dayIndex];
  day.calories = day.meals.reduce((sum, item) => sum + item.calories, 0);
  day.protein = day.meals.reduce((sum, item) => sum + item.protein, 0);
  day.fiber = day.meals.reduce((sum, item) => sum + item.fiber, 0);
  localStorage.setItem(
    PLAN_STORAGE_KEY,
    JSON.stringify({
      plan: state.plan,
      settings: state.settings,
      targets: state.targets,
    }),
  );
  renderPlan();
}

async function loadProfile() {
  try {
    const db = await openProfileDatabase();
    state.profile = await getProfile(db);
  } catch (error) {
    state.profile = null;
  }
  state.targets = calculateTargets(state.profile);
  const pill = document.getElementById("profileStatusPill");
  pill.textContent = state.profile
    ? `Profile: ${state.profile.username}`
    : "Profile not loaded";
  document.getElementById("profileSummary").textContent = state.profile
    ? `${state.profile.dietType} · ${state.profile.target} · ${state.profile.weight} kg · ${state.profile.activityLevel}`
    : "No saved profile found. Set your profile to calculate personalized calories and protein.";
  setPlannerLocked(!state.profile);
  renderTargets();
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadFullCatalog();
  renderFoodChoices();
  await loadProfile();
  document.getElementById("planForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!state.targets) {
      setStatus(
        "Please create and save a user profile before generating a plan.",
        true,
      );
      return;
    }
    const settings = readSettings();
    if (!settings.selectedFoods.length) {
      setStatus("Select at least one food before generating the plan.", true);
      return;
    }
    generatePlan(settings);
    setStatus("Plan generated and saved in this browser.");
    document
      .getElementById("planResults")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document
    .getElementById("loadProfileButton")
    .addEventListener("click", loadProfile);
  document
    .getElementById("foodChoices")
    .addEventListener("change", updateFoodChoiceCount);
  document.getElementById("selectAllFoods").addEventListener("click", () => {
    document
      .querySelectorAll("#foodChoices input")
      .forEach((input) => (input.checked = true));
    updateFoodChoiceCount();
  });
  document.getElementById("clearAllFoods").addEventListener("click", () => {
    document
      .querySelectorAll("#foodChoices input")
      .forEach((input) => (input.checked = false));
    updateFoodChoiceCount();
  });
  document
    .getElementById("printPlanButton")
    .addEventListener("click", () => window.print());
  document
    .getElementById("mealPlanOutput")
    .addEventListener("click", (event) => {
      const button = event.target.closest(".replaceFoodButton");
      if (button)
        replaceFood(
          Number(button.dataset.day),
          Number(button.dataset.meal),
          Number(button.dataset.food),
        );
    });
  document
    .getElementById("calorieAdjustment")
    .addEventListener("change", () => {
      if (state.targets)
        document.getElementById("targetNote").textContent =
          `Profile target: ${state.targets.calories} kcal. The selected adjustment is applied only when you generate the plan.`;
    });
});
