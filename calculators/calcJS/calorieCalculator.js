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
    label: "RICE RAW",
    calories: 365,
    protein: 7.2, // in grams
    saturatedFat: 0.3, // in grams
    unsaturatedFat: 0.6, // in grams
    solubleFiber: 0.55, // in grams
    insolubleFiber: 1.92, // in grams
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.04,
    vitaminK: 0,
    vitaminB1: 0.326,
    vitaminB2: 0.102,
    vitaminB3: 6.27,
    vitaminB6: 0.161,
    folate: 0.003,
    vitaminB12: 0,
    calcium: 8,
    iron: 1.5,
    magnesium: 115,
    zinc: 1.85,
    iodine: 0,
    selenium: 0.0148,
    copper: 0.27,
    potassium: 250,
    phosphorus: 303,
  },
  boiled_rice: {
    label: "RICE BOILED",
    calories: 121.67,
    protein: 2.4, // in grams
    saturatedFat: 0.1, // in grams
    unsaturatedFat: 0.2, // in grams
    solubleFiber: 0.183, // in grams
    insolubleFiber: 0.64, // in grams
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.013,
    vitaminK: 0,
    vitaminB1: 0.109,
    vitaminB2: 0.034,
    vitaminB3: 2.09,
    vitaminB6: 0.054,
    folate: 0.001,
    vitaminB12: 0,
    calcium: 2.67,
    iron: 0.5,
    magnesium: 38.33,
    zinc: 0.617,
    iodine: 0,
    selenium: 0.0049,
    copper: 0.09,
    potassium: 83.33,
    phosphorus: 101,
  },
  brown_rice: {
    label: "BROWN RICE RAW",
    calories: 367,
    protein: 7.3, // in grams
    saturatedFat: 0.6, // in grams
    unsaturatedFat: 2.1, // in grams
    solubleFiber: 0.4, // in grams
    insolubleFiber: 3.0, // in grams
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.59,
    vitaminK: 0.0019,
    vitaminB1: 0.401,
    vitaminB2: 0.093,
    vitaminB3: 6.4,
    vitaminB6: 0.509,
    folate: 0.038,
    vitaminB12: 0,
    calcium: 9,
    iron: 1.29,
    magnesium: 116,
    zinc: 2.13,
    iodine: 0,
    selenium: 0.0171,
    copper: 0.302,
    potassium: 250,
    phosphorus: 311,
  },
  boiled_brown_rice: {
    label: "BROWN RICE BOILED",
    calories: 122.33,
    protein: 2.43, // in grams
    saturatedFat: 0.2, // in grams
    unsaturatedFat: 0.7, // in grams
    solubleFiber: 0.133, // in grams
    insolubleFiber: 1, // in grams
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.197,
    vitaminK: 0.00063,
    vitaminB1: 0.134,
    vitaminB2: 0.031,
    vitaminB3: 2.13,
    vitaminB6: 0.17,
    folate: 0.0127,
    vitaminB12: 0,
    calcium: 3,
    iron: 0.43,
    magnesium: 38.67,
    zinc: 0.71,
    iodine: 0,
    selenium: 0.0057,
    copper: 0.101,
    potassium: 83.33,
    phosphorus: 103.67,
  },
  wheat: {
    label: "WHOLE WHEAT RAW",
    calories: 340,
    protein: 13.2, // in grams
    saturatedFat: 0.43, // in grams
    unsaturatedFat: 1.453, // in grams
    solubleFiber: 1.2, // in grams
    insolubleFiber: 7.0, // in grams
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.71,
    vitaminK: 0.0019,
    vitaminB1: 0.502,
    vitaminB2: 0.165,
    vitaminB3: 4.96,
    vitaminB6: 0.407,
    folate: 0.044,
    vitaminB12: 0,
    calcium: 34,
    iron: 3.6,
    magnesium: 137,
    zinc: 2.6,
    iodine: 0,
    selenium: 0.0618,
    copper: 0.41,
    potassium: 363,
    phosphorus: 357,
  },
  boiled_wheat: {
    label: "WHOLE WHEAT BOILED",
    calories: 113.33,
    protein: 4.4, // in grams
    saturatedFat: 0.143, // in grams
    unsaturatedFat: 0.484, // in grams
    solubleFiber: 0.4, // in grams
    insolubleFiber: 2.333, // in grams
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.237,
    vitaminK: 0.00063,
    vitaminB1: 0.167,
    vitaminB2: 0.055,
    vitaminB3: 1.65,
    vitaminB6: 0.136,
    folate: 0.0147,
    vitaminB12: 0,
    calcium: 11.33,
    iron: 1.2,
    magnesium: 45.67,
    zinc: 0.867,
    iodine: 0,
    selenium: 0.0206,
    copper: 0.137,
    potassium: 121,
    phosphorus: 119,
  },
  oats: {
    label: "OATS RAW",
    calories: 389,
    protein: 16.9, // in grams
    saturatedFat: 1.22, // in grams
    unsaturatedFat: 4.72, // in grams
    solubleFiber: 3.5, // in grams
    insolubleFiber: 6, // in grams
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.42,
    vitaminK: 0.002,
    vitaminB1: 0.763,
    vitaminB2: 0.139,
    vitaminB3: 0.961,
    vitaminB6: 0.119,
    folate: 0.056,
    vitaminB12: 0,
    calcium: 54,
    iron: 4.72,
    magnesium: 177,
    zinc: 3.97,
    iodine: 0,
    selenium: 0.028,
    copper: 0.626,
    potassium: 429,
    phosphorus: 523,
  },
  boiled_oats: {
    label: "OATS BOILED",
    calories: 129.67,
    protein: 5.63,
    saturatedFat: 0.41,
    unsaturatedFat: 1.57,
    solubleFiber: 1.17,
    insolubleFiber: 2,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.14,
    vitaminK: 0.0007,
    vitaminB1: 0.254,
    vitaminB2: 0.046,
    vitaminB3: 0.32,
    vitaminB6: 0.04,
    folate: 0.019,
    vitaminB12: 0,
    calcium: 18,
    iron: 1.57,
    magnesium: 59,
    zinc: 1.32,
    iodine: 0,
    selenium: 0.0093,
    copper: 0.209,
    potassium: 143,
    phosphorus: 174.33,
  },
  jowar: {
    label: "JOWAR RAW",
    calories: 329,
    protein: 10.62, // in grams
    saturatedFat: 0.61, // in grams
    unsaturatedFat: 1.8, // in grams
    solubleFiber: 1.5, // in grams
    insolubleFiber: 8, // in grams
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.5,
    vitaminK: 0,
    vitaminB1: 0.332,
    vitaminB2: 0.096,
    vitaminB3: 3.688,
    vitaminB6: 0.443,
    folate: 0.02,
    vitaminB12: 0,
    calcium: 13,
    iron: 3.36,
    magnesium: 165,
    zinc: 1.67,
    iodine: 0,
    selenium: 0.0122,
    copper: 0.284,
    potassium: 363,
    phosphorus: 289,
  },
  boiled_jowar: {
    label: "JOWAR BOILED",
    calories: 109.67,
    protein: 3.54, // in grams
    saturatedFat: 0.203, // in grams
    unsaturatedFat: 0.6, // in grams
    solubleFiber: 0.5, // in grams
    insolubleFiber: 2.67, // in grams
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.167,
    vitaminK: 0,
    vitaminB1: 0.111,
    vitaminB2: 0.032,
    vitaminB3: 1.229,
    vitaminB6: 0.148,
    folate: 0.0067,
    vitaminB12: 0,
    calcium: 4.33,
    iron: 1.12,
    magnesium: 55,
    zinc: 0.557,
    iodine: 0,
    selenium: 0.0041,
    copper: 0.0947,
    potassium: 121,
    phosphorus: 96.33,
  },
  pearl_millet: {
    label: "PEARL MILLET RAW",
    calories: 378,
    protein: 11.0, // in grams
    saturatedFat: 0.723, // in grams
    unsaturatedFat: 2.903, // in grams
    solubleFiber: 3.0, // in grams
    insolubleFiber: 7.0, // in grams
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.05,
    vitaminK: 0.0009,
    vitaminB1: 0.421,
    vitaminB2: 0.29,
    vitaminB3: 4.72,
    vitaminB6: 0.384,
    folate: 0.085,
    vitaminB12: 0,
    calcium: 8,
    iron: 3.01,
    magnesium: 114,
    zinc: 1.68,
    iodine: 0,
    selenium: 0.0027,
    copper: 0.75,
    potassium: 195,
    phosphorus: 285,
  },
  boiled_pearl_millet: {
    label: "PEARL MILLET BOILED",
    calories: 126,
    protein: 3.67, // in grams
    saturatedFat: 0.241, // in grams
    unsaturatedFat: 0.968, // in grams
    solubleFiber: 1.0, // in grams
    insolubleFiber: 2.333, // in grams
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.017,
    vitaminK: 0.0003,
    vitaminB1: 0.14,
    vitaminB2: 0.097,
    vitaminB3: 1.573,
    vitaminB6: 0.128,
    folate: 0.0283,
    vitaminB12: 0,
    calcium: 2.67,
    iron: 1.003,
    magnesium: 38,
    zinc: 0.56,
    iodine: 0,
    selenium: 0.0009,
    copper: 0.25,
    potassium: 65,
    phosphorus: 95,
  },
  finger_millet: {
    label: "FINGER MILLET RAW",
    calories: 321,
    protein: 7.16,
    saturatedFat: 0,
    unsaturatedFat: 1.3,
    solubleFiber: 1.67,
    insolubleFiber: 9.51,
    vitaminA: 0.006,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.16,
    vitaminK: 0.003,
    vitaminB1: 0.37,
    vitaminB2: 0.17,
    vitaminB3: 1.34,
    vitaminB6: 0.05,
    folate: 0.03466,
    vitaminB12: 0,
    calcium: 364,
    iron: 4.62,
    magnesium: 146,
    zinc: 2.53,
    iodine: 0,
    selenium: 0,
    copper: 0.67,
    potassium: 443,
    phosphorus: 210,
  },
  boiled_finger_millet: {
    label: "FINGER MILLET BOILED",
    calories: 107,
    protein: 2.387,
    saturatedFat: 0,
    unsaturatedFat: 0.433,
    solubleFiber: 0.557,
    insolubleFiber: 3.17,
    vitaminA: 0.002,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.053,
    vitaminK: 0.001,
    vitaminB1: 0.123,
    vitaminB2: 0.057,
    vitaminB3: 0.447,
    vitaminB6: 0.017,
    folate: 0.0116,
    vitaminB12: 0,
    calcium: 121.33,
    iron: 1.54,
    magnesium: 48.67,
    zinc: 0.843,
    iodine: 0,
    selenium: 0,
    copper: 0.223,
    potassium: 147.67,
    phosphorus: 70,
  },
  foxtail_millet: {
    label: "FOXTAIL MILLET RAW",
    calories: 331,
    protein: 12.3,
    saturatedFat: 0.6,
    unsaturatedFat: 3.4,
    solubleFiber: 0.7,
    insolubleFiber: 7,
    vitaminA: 0.032,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.2,
    vitaminK: 0.002,
    vitaminB1: 0.59,
    vitaminB2: 0.11,
    vitaminB3: 3.2,
    vitaminB6: 0.1,
    folate: 0.015,
    vitaminB12: 0,
    calcium: 31,
    iron: 2.8,
    magnesium: 81,
    zinc: 2.4,
    iodine: 0,
    selenium: 0,
    copper: 1.4,
    potassium: 250,
    phosphorus: 188,
  },
  boiled_foxtail_millet: {
    label: "FOXTAIL MILLET BOILED",
    calories: 110.33,
    protein: 4.1,
    saturatedFat: 0.2,
    unsaturatedFat: 1.13,
    solubleFiber: 0.233,
    insolubleFiber: 2.33,
    vitaminA: 0.0107,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.067,
    vitaminK: 0.0007,
    vitaminB1: 0.197,
    vitaminB2: 0.037,
    vitaminB3: 1.067,
    vitaminB6: 0.033,
    folate: 0.005,
    vitaminB12: 0,
    calcium: 10.33,
    iron: 0.933,
    magnesium: 27,
    zinc: 0.8,
    iodine: 0,
    selenium: 0,
    copper: 0.467,
    potassium: 83.33,
    phosphorus: 62.67,
  },
  barnyard_millet: {
    label: "BARNYARD MILLET RAW",
    calories: 307,
    protein: 6.2,
    saturatedFat: 0.4,
    unsaturatedFat: 1.5,
    solubleFiber: 4.2,
    insolubleFiber: 8.1,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 2.4,
    vitaminK: 0,
    vitaminB1: 0.33,
    vitaminB2: 0.1,
    vitaminB3: 4.2,
    vitaminB6: 0.3,
    folate: 0,
    vitaminB12: 0,
    calcium: 20,
    iron: 5.0,
    magnesium: 82,
    zinc: 3.0,
    iodine: 0,
    selenium: 0,
    copper: 0.6,
    potassium: 299,
    phosphorus: 280,
  },
  boiled_barnyard_millet: {
    label: "BARNYARD MILLET BOILED",
    calories: 102.33,
    protein: 2.067,
    saturatedFat: 0.133,
    unsaturatedFat: 0.5,
    solubleFiber: 1.4,
    insolubleFiber: 2.7,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.8,
    vitaminK: 0,
    vitaminB1: 0.11,
    vitaminB2: 0.033,
    vitaminB3: 1.4,
    vitaminB6: 0.1,
    folate: 0,
    vitaminB12: 0,
    calcium: 6.67,
    iron: 1.667,
    magnesium: 27.33,
    zinc: 1,
    iodine: 0,
    selenium: 0,
    copper: 0.2,
    potassium: 99.67,
    phosphorus: 93.33,
  },
  //________________MEAT_________________
  chickpeas: {
    label: "CHICKPEAS RAW",
    calories: 378,
    protein: 20.47,
    saturatedFat: 0.603,
    unsaturatedFat: 4.108,
    solubleFiber: 2,
    insolubleFiber: 6,
    vitaminA: 0.003,
    vitaminC: 4,
    vitaminD: 0,
    vitaminE: 0.82,
    vitaminK: 0.009,
    vitaminB1: 0.477,
    vitaminB2: 0.212,
    vitaminB3: 1.541,
    vitaminB6: 0.535,
    folate: 0.557,
    vitaminB12: 0,
    calcium: 57,
    iron: 4.31,
    magnesium: 79,
    zinc: 2.76,
    iodine: 0,
    selenium: 0,
    copper: 0.656,
    potassium: 718,
    phosphorus: 252,
  },
  boiled_chickpeas: {
    label: "CHICKPEAS BOILED",
    calories: 126,
    protein: 6.823,
    saturatedFat: 0.201,
    unsaturatedFat: 1.369,
    solubleFiber: 0.63,
    insolubleFiber: 2,
    vitaminA: 0.001,
    vitaminC: 1.333,
    vitaminD: 0,
    vitaminE: 0.273,
    vitaminK: 0.003,
    vitaminB1: 0.159,
    vitaminB2: 0.071,
    vitaminB3: 0.514,
    vitaminB6: 0.178,
    folate: 0.186,
    vitaminB12: 0,
    calcium: 19,
    iron: 1.437,
    magnesium: 26.33,
    zinc: 0.92,
    iodine: 0,
    selenium: 0,
    copper: 0.219,
    potassium: 239.33,
    phosphorus: 84,
  },
  roasted_chickpeas: {
    label: "CHICKPEAS ROASTED",
    calories: 378,
    protein: 21.0,
    saturatedFat: 0.6,
    unsaturatedFat: 4.2,
    solubleFiber: 1.8,
    insolubleFiber: 5.5, // Total fiber is around 12.5g
    vitaminA: 0.002,
    vitaminC: 0, // Heat destroys vitamin C
    vitaminD: 0, // Not present in plant foods
    vitaminE: 0.8,
    vitaminK: 0.009,
    vitaminB1: 0.25, // Degrades during roasting
    vitaminB2: 0.2,
    vitaminB3: 1.5,
    vitaminB6: 0.5,
    folate: 0.18, // Significantly degrades from raw (0.557mg) due to heat
    vitaminB12: 0, // Not naturally present in chickpeas
    calcium: 60,
    iron: 4.5,
    magnesium: 85,
    zinc: 2.8,
    iodine: 0,
    selenium: 0.007,
    copper: 0.7,
    potassium: 730,
    phosphorus: 260,
  },
  green_peas: {
    label: "GREEN PEAS RAW",
    calories: 81,
    protein: 5.42,
    saturatedFat: 0.07,
    unsaturatedFat: 0.22, // Combined mono and polyunsaturated fats
    solubleFiber: 1.6,
    insolubleFiber: 4.1, // Total fiber is roughly 5.7g
    vitaminA: 0.038, // 38 mcg RAE (Retinol Activity Equivalents)
    vitaminC: 40,
    vitaminD: 0, // Not present in plant foods
    vitaminE: 0.13,
    vitaminK: 0.0248, // 24.8 mcg converted to mg
    vitaminB1: 0.266,
    vitaminB2: 0.132,
    vitaminB3: 2.09,
    vitaminB6: 0.169,
    folate: 0.065, // 65 mcg converted to mg
    vitaminB12: 0, // Not naturally present in plant foods
    calcium: 25,
    iron: 1.47,
    magnesium: 33,
    zinc: 1.24,
    iodine: 0,
    selenium: 0.0018, // 1.8 mcg converted to mg
    copper: 0.176,
    potassium: 244,
    phosphorus: 108,
  },
  boiled_green_peas: {
    label: "GREEN PEAS BOILED",
    calories: 27,
    protein: 1.807,
    saturatedFat: 0.023,
    unsaturatedFat: 0.073,
    solubleFiber: 0.533,
    insolubleFiber: 1.367,
    vitaminA: 0.0127,
    vitaminC: 13.33,
    vitaminD: 0,
    vitaminE: 0.043,
    vitaminK: 0.0083,
    vitaminB1: 0.0887,
    vitaminB2: 0.044,
    vitaminB3: 0.697,
    vitaminB6: 0.0563,
    folate: 0.0217,
    vitaminB12: 0,
    calcium: 8.33,
    iron: 0.49,
    magnesium: 11,
    zinc: 0.413,
    iodine: 0,
    selenium: 0.0006,
    copper: 0.0587,
    potassium: 81.33,
    phosphorus: 36,
  },
  pigeon_peas: {
    label: "PIGEON PEAS RAW",
    calories: 343,
    protein: 21.7,
    saturatedFat: 0.327,
    unsaturatedFat: 0.948, // Combined mono (0.138g) and poly (0.81g)
    solubleFiber: 4.0, // Estimated breakdown of total 15g fiber
    insolubleFiber: 11.0, // Estimated breakdown of total 15g fiber
    vitaminA: 0.001, // 1 mcg RAE converted to mg
    vitaminC: 0, // Mature dried seeds lose their vitamin C
    vitaminD: 0, // Not present in plant foods
    vitaminE: 0,
    vitaminK: 0,
    vitaminB1: 0.643,
    vitaminB2: 0.187,
    vitaminB3: 2.965,
    vitaminB6: 0.283,
    folate: 0.456, // 456 mcg converted to mg
    vitaminB12: 0, // Not naturally present in plant foods
    calcium: 130,
    iron: 5.23,
    magnesium: 183,
    zinc: 2.76,
    iodine: 0,
    selenium: 0.0082, // 8.2 mcg converted to mg
    copper: 1.057,
    potassium: 1392,
    phosphorus: 367,
  },
  boiled_pigeon_peas: {
    label: "PIGEON PEAS BOILED",
    calories: 114.33,
    protein: 7.233,
    saturatedFat: 0.109,
    unsaturatedFat: 0.316,
    solubleFiber: 1,
    insolubleFiber: 3.7,
    vitaminA: 0.0003,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0,
    vitaminK: 0,
    vitaminB1: 0.214,
    vitaminB2: 0.062,
    vitaminB3: 0.988,
    vitaminB6: 0.094,
    folate: 0.152,
    vitaminB12: 0,
    calcium: 43.33,
    iron: 1.743,
    magnesium: 61,
    zinc: 0.92,
    iodine: 0,
    selenium: 0.0027,
    copper: 0.352,
    potassium: 464,
    phosphorus: 122.33,
  },
  green_gram: {
    label: "GREEN GRAM RAW",
    calories: 347,
    protein: 23.86,
    saturatedFat: 0.348,
    unsaturatedFat: 0.545, // Combined mono (0.161g) and poly (0.384g)
    solubleFiber: 1.5, // Estimated breakdown of 16.3g total fiber
    insolubleFiber: 12.3, // Estimated breakdown of 16.3g total fiber
    vitaminA: 0.011, // 11 mcg RAE converted to mg
    vitaminC: 4.8,
    vitaminD: 0, // Not present in plant foods
    vitaminE: 0.51,
    vitaminK: 0.009, // 9 mcg converted to mg
    vitaminB1: 0.621,
    vitaminB2: 0.233,
    vitaminB3: 2.251,
    vitaminB6: 0.382,
    folate: 0.625, // 625 mcg converted to mg (extremely rich source)
    vitaminB12: 0, // Not naturally present in plant foods
    calcium: 132,
    iron: 6.74,
    magnesium: 189,
    zinc: 2.68,
    iodine: 0,
    selenium: 0.0082, // 8.2 mcg converted to mg
    copper: 0.941,
    potassium: 1246,
    phosphorus: 367,
  },
  boiled_green_gram: {
    label: "GREEN GRAM BOILED",
    calories: 115.67,
    protein: 7.953,
    saturatedFat: 0.116,
    unsaturatedFat: 0.182,
    solubleFiber: 0.5,
    insolubleFiber: 4.1,
    vitaminA: 0.0037,
    vitaminC: 1.6,
    vitaminD: 0,
    vitaminE: 0.17,
    vitaminK: 0.003,
    vitaminB1: 0.207,
    vitaminB2: 0.078,
    vitaminB3: 0.75,
    vitaminB6: 0.127,
    folate: 0.208,
    vitaminB12: 0,
    calcium: 44,
    iron: 2.247,
    magnesium: 63,
    zinc: 0.893,
    iodine: 0,
    selenium: 0.0027,
    copper: 0.314,
    potassium: 415.33,
    phosphorus: 122.33,
  },
  cow_peas: {
    label: "COW PEAS RAW",
    calories: 336,
    protein: 23.52,
    saturatedFat: 0.325,
    unsaturatedFat: 0.649, // Combined mono (0.106g) and poly (0.543g)
    solubleFiber: 2.6, // Estimated breakdown of 10.6g total fiber
    insolubleFiber: 8.0, // Estimated breakdown of 10.6g total fiber
    vitaminA: 0.003, // 3 mcg RAE converted to mg
    vitaminC: 1.5,
    vitaminD: 0, // Not present in plant foods
    vitaminE: 0.39,
    vitaminK: 0,
    vitaminB1: 0.853,
    vitaminB2: 0.226,
    vitaminB3: 2.075,
    vitaminB6: 0.357,
    folate: 0.633, // 633 mcg converted to mg (excellent source)
    vitaminB12: 0, // Not naturally present in plant foods
    calcium: 110,
    iron: 8.27,
    magnesium: 184,
    zinc: 3.37,
    iodine: 0,
    selenium: 0.009, // 9 mcg converted to mg
    copper: 0.845,
    potassium: 1112,
    phosphorus: 424,
  },
  boiled_cow_peas: {
    label: "COW PEAS BOILED",
    calories: 112,
    protein: 7.84,
    saturatedFat: 0.108,
    unsaturatedFat: 0.216,
    solubleFiber: 0.867,
    insolubleFiber: 2.667,
    vitaminA: 0.001,
    vitaminC: 0.5,
    vitaminD: 0,
    vitaminE: 0.13,
    vitaminK: 0,
    vitaminB1: 0.284,
    vitaminB2: 0.075,
    vitaminB3: 0.692,
    vitaminB6: 0.119,
    folate: 0.211,
    vitaminB12: 0,
    calcium: 36.67,
    iron: 2.757,
    magnesium: 61.33,
    zinc: 1.123,
    iodine: 0,
    selenium: 0.003,
    copper: 0.282,
    potassium: 370.67,
    phosphorus: 141.33,
  },
  black_gram: {
    label: "BLACK GRAM RAW",
    calories: 341,
    protein: 25.21,
    saturatedFat: 0.261,
    unsaturatedFat: 0.893, // Combined mono (0.155g) and poly (0.738g)
    solubleFiber: 2.4, // Estimated breakdown of 18.3g total fiber
    insolubleFiber: 12, // Estimated breakdown of 18.3g total fiber
    vitaminA: 0.001, // 1 mcg RAE converted to mg
    vitaminC: 0, // Mature dried seeds lose their vitamin C
    vitaminD: 0, // Not present in plant foods
    vitaminE: 0.39, // Trace amounts
    vitaminK: 0.009, // 9 mcg converted to mg
    vitaminB1: 0.273,
    vitaminB2: 0.254,
    vitaminB3: 1.447,
    vitaminB6: 0.281,
    folate: 0.216, // 216 mcg converted to mg
    vitaminB12: 0, // Not naturally present in plant foods
    calcium: 138,
    iron: 7.57,
    magnesium: 267, // Extremely rich source of magnesium
    zinc: 3.35,
    iodine: 0,
    selenium: 0.0082, // 8.2 mcg converted to mg
    copper: 0.981,
    potassium: 983,
    phosphorus: 379,
  },
  boiled_black_gram: {
    label: "BLACK GRAM BOILED",
    calories: 113.67,
    protein: 8.403,
    saturatedFat: 0.087,
    unsaturatedFat: 0.298,
    solubleFiber: 0.8,
    insolubleFiber: 4,
    vitaminA: 0.0003,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.13,
    vitaminK: 0.003,
    vitaminB1: 0.091,
    vitaminB2: 0.085,
    vitaminB3: 0.482,
    vitaminB6: 0.094,
    folate: 0.072,
    vitaminB12: 0,
    calcium: 46,
    iron: 2.523,
    magnesium: 89,
    zinc: 1.117,
    iodine: 0,
    selenium: 0.0027,
    copper: 0.327,
    potassium: 327.67,
    phosphorus: 126.33,
  },
  boiled_red_lentils: {
    label: "RED LENTILS / MASOOR DAL BOILED",
    calories: 116,
    protein: 9.02,
    saturatedFat: 0.05,
    unsaturatedFat: 0.28,
    solubleFiber: 1.5, // Estimated breakdown of 7.9g total fiber
    insolubleFiber: 6.4,
    vitaminA: 0.001, // 1 mcg RAE converted to mg
    vitaminC: 1.5,
    vitaminD: 0,
    vitaminE: 0.11,
    vitaminK: 0.0017, // 1.7 mcg converted to mg
    vitaminB1: 0.169,
    vitaminB2: 0.073,
    vitaminB3: 1.06,
    vitaminB6: 0.178,
    folate: 0.181, // 181 mcg converted to mg
    vitaminB12: 0,
    calcium: 19,
    iron: 3.33,
    magnesium: 36,
    zinc: 1.27,
    iodine: 0,
    selenium: 0.0028, // 2.8 mcg converted to mg
    copper: 0.251,
    potassium: 369,
    phosphorus: 180,
  },

  boiled_kidney_beans: {
    label: "KIDNEY BEANS / RAJMA BOILED",
    calories: 127,
    protein: 8.67,
    saturatedFat: 0.07,
    unsaturatedFat: 0.35,
    solubleFiber: 1.4, // Estimated breakdown of 6.4g total fiber
    insolubleFiber: 5.0,
    vitaminA: 0,
    vitaminC: 1.2,
    vitaminD: 0,
    vitaminE: 0.03,
    vitaminK: 0.0084, // 8.4 mcg converted to mg
    vitaminB1: 0.16,
    vitaminB2: 0.058,
    vitaminB3: 0.578,
    vitaminB6: 0.12,
    folate: 0.13, // 130 mcg converted to mg
    vitaminB12: 0,
    calcium: 28,
    iron: 2.94,
    magnesium: 42,
    zinc: 1.07,
    iodine: 0,
    selenium: 0.0012, // 1.2 mcg converted to mg
    copper: 0.218,
    potassium: 405,
    phosphorus: 142,
  },

  boiled_horse_gram: {
    label: "HORSE GRAM / KULTHI BOILED",
    calories: 110,
    protein: 7.5,
    saturatedFat: 0.05,
    unsaturatedFat: 0.3,
    solubleFiber: 1.0, // Estimated breakdown of 5.5g total fiber
    insolubleFiber: 4.5,
    vitaminA: 0,
    vitaminC: 1.0,
    vitaminD: 0,
    vitaminE: 0.05,
    vitaminK: 0.002, // 2.0 mcg converted to mg
    vitaminB1: 0.15,
    vitaminB2: 0.07,
    vitaminB3: 0.5,
    vitaminB6: 0.1,
    folate: 0.1, // 100 mcg converted to mg
    vitaminB12: 0,
    calcium: 95, // Notably high calcium for a legume
    iron: 2.5,
    magnesium: 50,
    zinc: 1.1,
    iodine: 0,
    selenium: 0.001, // 1.0 mcg converted to mg
    copper: 0.3,
    potassium: 300,
    phosphorus: 130,
  },

  boiled_black_eyed_peas: {
    label: "BLACK EYED PEAS / LOBIA BOILED",
    calories: 116,
    protein: 7.73,
    saturatedFat: 0.13,
    unsaturatedFat: 0.35,
    solubleFiber: 1.5, // Estimated breakdown of 6.5g total fiber
    insolubleFiber: 5.0,
    vitaminA: 0.001, // 1 mcg RAE converted to mg
    vitaminC: 0.4,
    vitaminD: 0,
    vitaminE: 0.04,
    vitaminK: 0.0017, // 1.7 mcg converted to mg
    vitaminB1: 0.205,
    vitaminB2: 0.055,
    vitaminB3: 0.495,
    vitaminB6: 0.116,
    folate: 0.208, // 208 mcg converted to mg
    vitaminB12: 0,
    calcium: 24,
    iron: 2.39,
    magnesium: 53,
    zinc: 1.29,
    iodine: 0,
    selenium: 0.0015, // 1.5 mcg converted to mg
    copper: 0.264,
    potassium: 278,
    phosphorus: 156,
  },
  // ______________FRUITS_________________
  banana: {
    label: "BANANA",
    calories: 89,
    protein: 1.09,
    saturatedFat: 0.038,
    unsaturatedFat: 0.105, // Combined mono and poly
    solubleFiber: 0.6, // Estimated breakdown of 2.6g total fiber
    insolubleFiber: 2.0, // Estimated breakdown of 2.6g total fiber
    vitaminA: 0.003, // 3 mcg RAE converted to mg
    vitaminC: 8.7,
    vitaminD: 0, // Not present in plant foods
    vitaminE: 0.1,
    vitaminK: 0.0005, // 0.5 mcg converted to mg
    vitaminB1: 0.031,
    vitaminB2: 0.073,
    vitaminB3: 0.665,
    vitaminB6: 0.367,
    folate: 0.02, // 20 mcg converted to mg
    vitaminB12: 0, // Not naturally present in plant foods
    calcium: 5,
    iron: 0.26,
    magnesium: 27,
    zinc: 0.15,
    iodine: 0,
    selenium: 0.001, // 1 mcg converted to mg
    copper: 0.078,
    potassium: 358,
    phosphorus: 22,
  },

  apple: {
    label: "APPLE",
    calories: 52,
    protein: 0.26,
    saturatedFat: 0.028,
    unsaturatedFat: 0.058, // Combined mono and poly
    solubleFiber: 1.0, // Estimated breakdown of 2.4g total fiber (mostly pectin)
    insolubleFiber: 1.4, // Estimated breakdown of 2.4g total fiber
    vitaminA: 0.003, // 3 mcg RAE converted to mg
    vitaminC: 4.6,
    vitaminD: 0,
    vitaminE: 0.18,
    vitaminK: 0.0022, // 2.2 mcg converted to mg
    vitaminB1: 0.017,
    vitaminB2: 0.026,
    vitaminB3: 0.091,
    vitaminB6: 0.041,
    folate: 0.003, // 3 mcg converted to mg
    vitaminB12: 0,
    calcium: 6,
    iron: 0.12,
    magnesium: 5,
    zinc: 0.04,
    iodine: 0,
    selenium: 0,
    copper: 0.027,
    potassium: 107,
    phosphorus: 11,
  },

  orange: {
    label: "ORANGE",
    calories: 47,
    protein: 0.94,
    saturatedFat: 0.015,
    unsaturatedFat: 0.048,
    solubleFiber: 1.4, // Estimated breakdown of 2.4g total fiber
    insolubleFiber: 1.0,
    vitaminA: 0.011, // 11 mcg RAE converted to mg
    vitaminC: 53.2,
    vitaminD: 0,
    vitaminE: 0.18,
    vitaminK: 0,
    vitaminB1: 0.087,
    vitaminB2: 0.04,
    vitaminB3: 0.282,
    vitaminB6: 0.06,
    folate: 0.03, // 30 mcg converted to mg
    vitaminB12: 0,
    calcium: 40,
    iron: 0.1,
    magnesium: 10,
    zinc: 0.07,
    iodine: 0,
    selenium: 0.0005, // 0.5 mcg converted to mg
    copper: 0.045,
    potassium: 181,
    phosphorus: 14,
  },

  pineapple: {
    label: "PINEAPPLE",
    calories: 50,
    protein: 0.54,
    saturatedFat: 0.009,
    unsaturatedFat: 0.053,
    solubleFiber: 0.4, // Estimated breakdown of 1.4g total fiber
    insolubleFiber: 1.0,
    vitaminA: 0.003,
    vitaminC: 47.8,
    vitaminD: 0,
    vitaminE: 0.02,
    vitaminK: 0.0007, // 0.7 mcg converted to mg
    vitaminB1: 0.079,
    vitaminB2: 0.032,
    vitaminB3: 0.5,
    vitaminB6: 0.112,
    folate: 0.018, // 18 mcg converted to mg
    vitaminB12: 0,
    calcium: 13,
    iron: 0.29,
    magnesium: 12,
    zinc: 0.12,
    iodine: 0,
    selenium: 0.0001, // 0.1 mcg converted to mg
    copper: 0.11,
    potassium: 109,
    phosphorus: 8,
  },

  papaya: {
    label: "PAPAYA",
    calories: 43,
    protein: 0.47,
    saturatedFat: 0.043,
    unsaturatedFat: 0.096,
    solubleFiber: 0.7, // Estimated breakdown of 1.7g total fiber
    insolubleFiber: 1.0,
    vitaminA: 0.047, // 47 mcg RAE converted to mg
    vitaminC: 60.9,
    vitaminD: 0,
    vitaminE: 0.3,
    vitaminK: 0.0026, // 2.6 mcg converted to mg
    vitaminB1: 0.023,
    vitaminB2: 0.027,
    vitaminB3: 0.357,
    vitaminB6: 0.038,
    folate: 0.037, // 37 mcg converted to mg
    vitaminB12: 0,
    calcium: 20,
    iron: 0.25,
    magnesium: 21,
    zinc: 0.08,
    iodine: 0,
    selenium: 0.0006, // 0.6 mcg converted to mg
    copper: 0.045,
    potassium: 182,
    phosphorus: 10,
  },

  guava: {
    label: "GUAVA",
    calories: 68,
    protein: 2.55,
    saturatedFat: 0.272,
    unsaturatedFat: 0.489,
    solubleFiber: 1.4, // Estimated breakdown of 5.4g total fiber
    insolubleFiber: 4.0,
    vitaminA: 0.031, // 31 mcg RAE converted to mg
    vitaminC: 228.3, // Extremely rich source of Vitamin C
    vitaminD: 0,
    vitaminE: 0.73,
    vitaminK: 0.0022, // 2.2 mcg converted to mg
    vitaminB1: 0.067,
    vitaminB2: 0.04,
    vitaminB3: 1.084,
    vitaminB6: 0.11,
    folate: 0.049, // 49 mcg converted to mg
    vitaminB12: 0,
    calcium: 18,
    iron: 0.26,
    magnesium: 22,
    zinc: 0.23,
    iodine: 0,
    selenium: 0.0006, // 0.6 mcg converted to mg
    copper: 0.23,
    potassium: 417,
    phosphorus: 40,
  },

  watermelon: {
    label: "WATERMELON",
    calories: 30,
    protein: 0.61,
    saturatedFat: 0.016,
    unsaturatedFat: 0.087,
    solubleFiber: 0.1, // Estimated breakdown of 0.4g total fiber
    insolubleFiber: 0.3,
    vitaminA: 0.028, // 28 mcg RAE converted to mg
    vitaminC: 8.1,
    vitaminD: 0,
    vitaminE: 0.05,
    vitaminK: 0.0001, // 0.1 mcg converted to mg
    vitaminB1: 0.033,
    vitaminB2: 0.021,
    vitaminB3: 0.178,
    vitaminB6: 0.045,
    folate: 0.003, // 3 mcg converted to mg
    vitaminB12: 0,
    calcium: 7,
    iron: 0.24,
    magnesium: 10,
    zinc: 0.1,
    iodine: 0,
    selenium: 0.0004, // 0.4 mcg converted to mg
    copper: 0.042,
    potassium: 112,
    phosphorus: 11,
  },

  musk_melon: {
    label: "MUSK MELON / CANTALOUPE",
    calories: 34,
    protein: 0.84,
    saturatedFat: 0.051,
    unsaturatedFat: 0.081,
    solubleFiber: 0.2, // Estimated breakdown of 0.9g total fiber
    insolubleFiber: 0.7,
    vitaminA: 0.169, // 169 mcg RAE converted to mg (very high in beta-carotene)
    vitaminC: 36.7,
    vitaminD: 0,
    vitaminE: 0.05,
    vitaminK: 0.0025, // 2.5 mcg converted to mg
    vitaminB1: 0.041,
    vitaminB2: 0.019,
    vitaminB3: 0.734,
    vitaminB6: 0.072,
    folate: 0.021, // 21 mcg converted to mg
    vitaminB12: 0,
    calcium: 9,
    iron: 0.21,
    magnesium: 12,
    zinc: 0.18,
    iodine: 0,
    selenium: 0.0004, // 0.4 mcg converted to mg
    copper: 0.041,
    potassium: 267,
    phosphorus: 15,
  },

  mango: {
    label: "MANGO",
    calories: 60,
    protein: 0.82,
    saturatedFat: 0.092,
    unsaturatedFat: 0.211,
    solubleFiber: 0.6, // Estimated breakdown of 1.6g total fiber
    insolubleFiber: 1.0,
    vitaminA: 0.054, // 54 mcg RAE converted to mg
    vitaminC: 36.4,
    vitaminD: 0,
    vitaminE: 0.9,
    vitaminK: 0.0042, // 4.2 mcg converted to mg
    vitaminB1: 0.028,
    vitaminB2: 0.038,
    vitaminB3: 0.669,
    vitaminB6: 0.119,
    folate: 0.043, // 43 mcg converted to mg
    vitaminB12: 0,
    calcium: 11,
    iron: 0.16,
    magnesium: 10,
    zinc: 0.09,
    iodine: 0,
    selenium: 0.0006, // 0.6 mcg converted to mg
    copper: 0.111,
    potassium: 168,
    phosphorus: 14,
  },

  pear: {
    label: "PEAR",
    calories: 57,
    protein: 0.36,
    saturatedFat: 0.009,
    unsaturatedFat: 0.078,
    solubleFiber: 1.1, // Estimated breakdown of 3.1g total fiber
    insolubleFiber: 2.0,
    vitaminA: 0.001, // 1 mcg RAE converted to mg
    vitaminC: 4.3,
    vitaminD: 0,
    vitaminE: 0.12,
    vitaminK: 0.0044, // 4.4 mcg converted to mg
    vitaminB1: 0.012,
    vitaminB2: 0.026,
    vitaminB3: 0.161,
    vitaminB6: 0.029,
    folate: 0.007, // 7 mcg converted to mg
    vitaminB12: 0,
    calcium: 9,
    iron: 0.18,
    magnesium: 7,
    zinc: 0.1,
    iodine: 0,
    selenium: 0.0001, // 0.1 mcg converted to mg
    copper: 0.082,
    potassium: 116,
    phosphorus: 12,
  },

  strawberry: {
    label: "STRAWBERRY",
    calories: 32,
    protein: 0.67,
    saturatedFat: 0.015,
    unsaturatedFat: 0.198,
    solubleFiber: 0.6, // Estimated breakdown of 2.0g total fiber
    insolubleFiber: 1.4,
    vitaminA: 0.001, // 1 mcg RAE converted to mg
    vitaminC: 58.8,
    vitaminD: 0,
    vitaminE: 0.29,
    vitaminK: 0.0022, // 2.2 mcg converted to mg
    vitaminB1: 0.024,
    vitaminB2: 0.022,
    vitaminB3: 0.386,
    vitaminB6: 0.047,
    folate: 0.024, // 24 mcg converted to mg
    vitaminB12: 0,
    calcium: 16,
    iron: 0.41,
    magnesium: 13,
    zinc: 0.14,
    iodine: 0,
    selenium: 0.0004, // 0.4 mcg converted to mg
    copper: 0.048,
    potassium: 153,
    phosphorus: 24,
  },

  green_grapes: {
    label: "GREEN GRAPES",
    calories: 69,
    protein: 0.72,
    saturatedFat: 0.054,
    unsaturatedFat: 0.093,
    solubleFiber: 0.3, // Estimated breakdown of 0.9g total fiber
    insolubleFiber: 0.6,
    vitaminA: 0.003, // 3 mcg RAE converted to mg
    vitaminC: 3.2,
    vitaminD: 0,
    vitaminE: 0.19,
    vitaminK: 0.0146, // 14.6 mcg converted to mg
    vitaminB1: 0.069,
    vitaminB2: 0.07,
    vitaminB3: 0.188,
    vitaminB6: 0.086,
    folate: 0.002, // 2 mcg converted to mg
    vitaminB12: 0,
    calcium: 10,
    iron: 0.36,
    magnesium: 7,
    zinc: 0.07,
    iodine: 0,
    selenium: 0.0001, // 0.1 mcg converted to mg
    copper: 0.127,
    potassium: 191,
    phosphorus: 20,
  },

  black_grapes: {
    label: "BLACK GRAPES",
    calories: 69,
    protein: 0.72,
    saturatedFat: 0.054,
    unsaturatedFat: 0.093,
    solubleFiber: 0.3, // Estimated breakdown of 0.9g total fiber
    insolubleFiber: 0.6,
    vitaminA: 0.003, // Macroscopic profile identical to green grapes in USDA standard DB
    vitaminC: 3.2,
    vitaminD: 0,
    vitaminE: 0.19,
    vitaminK: 0.0146, // 14.6 mcg converted to mg
    vitaminB1: 0.069,
    vitaminB2: 0.07,
    vitaminB3: 0.188,
    vitaminB6: 0.086,
    folate: 0.002, // 2 mcg converted to mg
    vitaminB12: 0,
    calcium: 10,
    iron: 0.36,
    magnesium: 7,
    zinc: 0.07,
    iodine: 0,
    selenium: 0.0001, // 0.1 mcg converted to mg
    copper: 0.127,
    potassium: 191,
    phosphorus: 20,
  },

  chiku: {
    label: "CHIKU / SAPOTA",
    calories: 83,
    protein: 0.44,
    saturatedFat: 0.19,
    unsaturatedFat: 0.81,
    solubleFiber: 1.5, // Estimated breakdown of 5.3g total fiber
    insolubleFiber: 3.8,
    vitaminA: 0.003, // 3 mcg RAE converted to mg
    vitaminC: 14.7,
    vitaminD: 0,
    vitaminE: 0.1,
    vitaminK: 0.001, // ~1 mcg trace converted to mg
    vitaminB1: 0.058,
    vitaminB2: 0.02,
    vitaminB3: 0.2,
    vitaminB6: 0.037,
    folate: 0.014, // 14 mcg converted to mg
    vitaminB12: 0,
    calcium: 21,
    iron: 0.8,
    magnesium: 12,
    zinc: 0.1,
    iodine: 0,
    selenium: 0.0006, // 0.6 mcg converted to mg
    copper: 0.086,
    potassium: 193,
    phosphorus: 12,
  },

  pomegranate: {
    label: "POMEGRANATE",
    calories: 83,
    protein: 1.67,
    saturatedFat: 0.12,
    unsaturatedFat: 0.65,
    solubleFiber: 1.0, // Estimated breakdown of 4.0g total fiber
    insolubleFiber: 3.0,
    vitaminA: 0,
    vitaminC: 10.2,
    vitaminD: 0,
    vitaminE: 0.6,
    vitaminK: 0.0164, // 16.4 mcg converted to mg
    vitaminB1: 0.067,
    vitaminB2: 0.053,
    vitaminB3: 0.293,
    vitaminB6: 0.075,
    folate: 0.038, // 38 mcg converted to mg
    vitaminB12: 0,
    calcium: 10,
    iron: 0.3,
    magnesium: 12,
    zinc: 0.35,
    iodine: 0,
    selenium: 0.0005, // 0.5 mcg converted to mg
    copper: 0.158,
    potassium: 236,
    phosphorus: 36,
  },

  //________________VEGETABLES_________________
  boiled_carrot: {
    label: "CARROT BOILED",
    calories: 35,
    protein: 0.76,
    saturatedFat: 0.028,
    unsaturatedFat: 0.11,
    solubleFiber: 1.3, // Estimated breakdown of 3.0g total fiber
    insolubleFiber: 1.7,
    vitaminA: 0.828, // 828 mcg RAE converted to mg
    vitaminC: 3.6, // Reduced due to boiling
    vitaminD: 0,
    vitaminE: 0.6,
    vitaminK: 0.0137, // 13.7 mcg converted to mg
    vitaminB1: 0.046,
    vitaminB2: 0.04,
    vitaminB3: 0.603,
    vitaminB6: 0.129,
    folate: 0.014, // 14 mcg converted to mg
    vitaminB12: 0,
    calcium: 30,
    iron: 0.34,
    magnesium: 10,
    zinc: 0.2,
    iodine: 0,
    selenium: 0.0006, // 0.6 mcg converted to mg
    copper: 0.035,
    potassium: 235, // Leached into water
    phosphorus: 30,
  },

  boiled_cabbage: {
    label: "CABBAGE BOILED",
    calories: 23,
    protein: 1.27,
    saturatedFat: 0.015,
    unsaturatedFat: 0.03,
    solubleFiber: 0.8, // Estimated breakdown of 1.9g total fiber
    insolubleFiber: 1.1,
    vitaminA: 0.004, // 4 mcg RAE converted to mg
    vitaminC: 37.5,
    vitaminD: 0,
    vitaminE: 0.1,
    vitaminK: 0.109, // 109 mcg converted to mg
    vitaminB1: 0.051,
    vitaminB2: 0.038,
    vitaminB3: 0.234,
    vitaminB6: 0.111,
    folate: 0.03, // 30 mcg converted to mg
    vitaminB12: 0,
    calcium: 48,
    iron: 0.17,
    magnesium: 14,
    zinc: 0.16,
    iodine: 0,
    selenium: 0.0008, // 0.8 mcg converted to mg
    copper: 0.018,
    potassium: 196,
    phosphorus: 33,
  },

  boiled_onion: {
    label: "ONION BOILED",
    calories: 44,
    protein: 1.36,
    saturatedFat: 0.03,
    unsaturatedFat: 0.1,
    solubleFiber: 0.5, // Estimated breakdown of 1.4g total fiber
    insolubleFiber: 0.9,
    vitaminA: 0,
    vitaminC: 5.1,
    vitaminD: 0,
    vitaminE: 0.01,
    vitaminK: 0.0004, // 0.4 mcg converted to mg
    vitaminB1: 0.054,
    vitaminB2: 0.018,
    vitaminB3: 0.1,
    vitaminB6: 0.11,
    folate: 0.013, // 13 mcg converted to mg
    vitaminB12: 0,
    calcium: 22,
    iron: 0.22,
    magnesium: 11,
    zinc: 0.21,
    iodine: 0,
    selenium: 0.0006, // 0.6 mcg converted to mg
    copper: 0.04,
    potassium: 166,
    phosphorus: 30,
  },

  boiled_brinjal: {
    label: "BRINJAL / EGGPLANT BOILED",
    calories: 35,
    protein: 0.83,
    saturatedFat: 0.04,
    unsaturatedFat: 0.1,
    solubleFiber: 1.0, // Estimated breakdown of 2.5g total fiber
    insolubleFiber: 1.5,
    vitaminA: 0.001, // 1 mcg RAE converted to mg
    vitaminC: 1.3,
    vitaminD: 0,
    vitaminE: 0.41,
    vitaminK: 0.0029, // 2.9 mcg converted to mg
    vitaminB1: 0.075,
    vitaminB2: 0.02,
    vitaminB3: 0.6,
    vitaminB6: 0.086,
    folate: 0.014, // 14 mcg converted to mg
    vitaminB12: 0,
    calcium: 6,
    iron: 0.25,
    magnesium: 11,
    zinc: 0.12,
    iodine: 0,
    selenium: 0.0001, // 0.1 mcg converted to mg
    copper: 0.06,
    potassium: 123,
    phosphorus: 15,
  },

  boiled_cucumber: {
    label: "CUCUMBER BOILED",
    calories: 14, // Very rarely boiled, nutrients leach heavily
    protein: 0.6,
    saturatedFat: 0.02,
    unsaturatedFat: 0.03,
    solubleFiber: 0.1, // Estimated breakdown of 0.4g total fiber
    insolubleFiber: 0.3,
    vitaminA: 0.003, // 3 mcg RAE converted to mg
    vitaminC: 1.5,
    vitaminD: 0,
    vitaminE: 0.02,
    vitaminK: 0.012, // 12 mcg converted to mg
    vitaminB1: 0.02,
    vitaminB2: 0.02,
    vitaminB3: 0.06,
    vitaminB6: 0.03,
    folate: 0.004, // 4 mcg converted to mg
    vitaminB12: 0,
    calcium: 14,
    iron: 0.2,
    magnesium: 10,
    zinc: 0.15,
    iodine: 0,
    selenium: 0.0002, // 0.2 mcg converted to mg
    copper: 0.03,
    potassium: 110,
    phosphorus: 18,
  },

  boiled_pumpkin: {
    label: "PUMPKIN BOILED",
    calories: 20,
    protein: 0.72,
    saturatedFat: 0.03,
    unsaturatedFat: 0.02,
    solubleFiber: 0.4, // Estimated breakdown of 1.1g total fiber
    insolubleFiber: 0.7,
    vitaminA: 0.288, // 288 mcg RAE converted to mg
    vitaminC: 4.7,
    vitaminD: 0,
    vitaminE: 0.8,
    vitaminK: 0.0008, // 0.8 mcg converted to mg
    vitaminB1: 0.03,
    vitaminB2: 0.08,
    vitaminB3: 0.4,
    vitaminB6: 0.04,
    folate: 0.009, // 9 mcg converted to mg
    vitaminB12: 0,
    calcium: 15,
    iron: 0.57,
    magnesium: 9,
    zinc: 0.23,
    iodine: 0,
    selenium: 0.0002, // 0.2 mcg converted to mg
    copper: 0.09,
    potassium: 230,
    phosphorus: 30,
  },

  boiled_spinach: {
    label: "SPINACH BOILED",
    calories: 23,
    protein: 2.97,
    saturatedFat: 0.04,
    unsaturatedFat: 0.15,
    solubleFiber: 0.7, // Estimated breakdown of 2.4g total fiber
    insolubleFiber: 1.7,
    vitaminA: 0.524, // 524 mcg RAE converted to mg
    vitaminC: 9.8, // Significant loss from boiling
    vitaminD: 0,
    vitaminE: 2.08,
    vitaminK: 0.493, // 493 mcg converted to mg
    vitaminB1: 0.095,
    vitaminB2: 0.236,
    vitaminB3: 0.49,
    vitaminB6: 0.242,
    folate: 0.146, // 146 mcg converted to mg
    vitaminB12: 0,
    calcium: 136,
    iron: 3.57,
    magnesium: 87,
    zinc: 0.76,
    iodine: 0,
    selenium: 0.0015, // 1.5 mcg converted to mg
    copper: 0.17,
    potassium: 466,
    phosphorus: 56,
  },

  boiled_okra: {
    label: "OKRA / LADY FINGER BOILED",
    calories: 22,
    protein: 1.87,
    saturatedFat: 0.02,
    unsaturatedFat: 0.04,
    solubleFiber: 1.2, // Estimated breakdown of 2.5g total fiber
    insolubleFiber: 1.3,
    vitaminA: 0.014, // 14 mcg RAE converted to mg
    vitaminC: 16.3,
    vitaminD: 0,
    vitaminE: 0.2,
    vitaminK: 0.04, // 40 mcg converted to mg
    vitaminB1: 0.13,
    vitaminB2: 0.05,
    vitaminB3: 0.8,
    vitaminB6: 0.15,
    folate: 0.046, // 46 mcg converted to mg
    vitaminB12: 0,
    calcium: 77,
    iron: 0.4,
    magnesium: 40,
    zinc: 0.4,
    iodine: 0,
    selenium: 0.0005, // 0.5 mcg converted to mg
    copper: 0.07,
    potassium: 135,
    phosphorus: 46,
  },

  boiled_tomato: {
    label: "TOMATO BOILED",
    calories: 18,
    protein: 0.9,
    saturatedFat: 0.03,
    unsaturatedFat: 0.12,
    solubleFiber: 0.3, // Estimated breakdown of 1.0g total fiber
    insolubleFiber: 0.7,
    vitaminA: 0.042, // 42 mcg RAE converted to mg
    vitaminC: 11.6,
    vitaminD: 0,
    vitaminE: 0.5,
    vitaminK: 0.007, // 7 mcg converted to mg
    vitaminB1: 0.03,
    vitaminB2: 0.015,
    vitaminB3: 0.5,
    vitaminB6: 0.07,
    folate: 0.009, // 9 mcg converted to mg
    vitaminB12: 0,
    calcium: 11,
    iron: 0.3,
    magnesium: 10,
    zinc: 0.15,
    iodine: 0,
    selenium: 0,
    copper: 0.05,
    potassium: 218,
    phosphorus: 24,
  },

  boiled_ridge_guard: {
    label: "RIDGE GOURD / TURAII BOILED",
    calories: 15,
    protein: 0.7,
    saturatedFat: 0.02,
    unsaturatedFat: 0.05,
    solubleFiber: 0.4, // Estimated breakdown of 1.2g total fiber
    insolubleFiber: 0.8,
    vitaminA: 0.015, // 15 mcg RAE converted to mg
    vitaminC: 5.0,
    vitaminD: 0,
    vitaminE: 0.08,
    vitaminK: 0,
    vitaminB1: 0.03,
    vitaminB2: 0.02,
    vitaminB3: 0.2,
    vitaminB6: 0.04,
    folate: 0.007, // 7 mcg converted to mg
    vitaminB12: 0,
    calcium: 12,
    iron: 0.3,
    magnesium: 11,
    zinc: 0.12,
    iodine: 0,
    selenium: 0,
    copper: 0.02,
    potassium: 110,
    phosphorus: 14,
  },

  lemon: {
    label: "LEMON",
    calories: 29,
    protein: 0.4,
    saturatedFat: 0.04,
    unsaturatedFat: 0.1,
    solubleFiber: 1.2,
    insolubleFiber: 1.6,
    vitaminA: 0.001,
    vitaminC: 45.0,
    vitaminD: 0,
    vitaminE: 0.15,
    vitaminK: 0,
    vitaminB1: 0.04,
    vitaminB2: 0.02,
    vitaminB3: 0.1,
    vitaminB6: 0.08,
    folate: 0.011,
    vitaminB12: 0,
    calcium: 26,
    iron: 0.6,
    magnesium: 8,
    zinc: 0.06,
    iodine: 0,
    selenium: 0.0004,
    copper: 0.037,
    potassium: 138,
    phosphorus: 16,
  },

  boiled_potato: {
    label: "POTATO BOILED (WITH SKIN)",
    calories: 87,
    protein: 1.87,
    saturatedFat: 0.02,
    unsaturatedFat: 0.04,
    solubleFiber: 0.6, // Estimated breakdown of 1.8g total fiber
    insolubleFiber: 1.2,
    vitaminA: 0.001, // 1 mcg RAE converted to mg
    vitaminC: 13.0,
    vitaminD: 0,
    vitaminE: 0.01,
    vitaminK: 0.0019, // 1.9 mcg converted to mg
    vitaminB1: 0.07,
    vitaminB2: 0.02,
    vitaminB3: 0.9,
    vitaminB6: 0.2,
    folate: 0.009, // 9 mcg converted to mg
    vitaminB12: 0,
    calcium: 8,
    iron: 0.31,
    magnesium: 20,
    zinc: 0.27,
    iodine: 0,
    selenium: 0.0002, // 0.2 mcg converted to mg
    copper: 0.09,
    potassium: 328,
    phosphorus: 44,
  },

  boiled_beans: {
    label: "BEANS / GREEN BEANS BOILED",
    calories: 35,
    protein: 1.9,
    saturatedFat: 0.06,
    unsaturatedFat: 0.14,
    solubleFiber: 1.0, // Estimated breakdown of 3.2g total fiber
    insolubleFiber: 2.2,
    vitaminA: 0.032, // 32 mcg RAE converted to mg
    vitaminC: 9.7,
    vitaminD: 0,
    vitaminE: 0.4,
    vitaminK: 0.047, // 47 mcg converted to mg
    vitaminB1: 0.07,
    vitaminB2: 0.09,
    vitaminB3: 0.6,
    vitaminB6: 0.07,
    folate: 0.029, // 29 mcg converted to mg
    vitaminB12: 0,
    calcium: 44,
    iron: 0.65,
    magnesium: 22,
    zinc: 0.2,
    iodine: 0,
    selenium: 0.0005, // 0.5 mcg converted to mg
    copper: 0.06,
    potassium: 146,
    phosphorus: 29,
  },

  boiled_pointed_guard: {
    label: "POINTED GOURD / PARWAL BOILED",
    calories: 18,
    protein: 1.8,
    saturatedFat: 0.04,
    unsaturatedFat: 0.12,
    solubleFiber: 0.8, // Estimated breakdown of 2.8g total fiber
    insolubleFiber: 2.0,
    vitaminA: 0.2, // 200 mcg RAE converted to mg
    vitaminC: 20.0,
    vitaminD: 0,
    vitaminE: 0.15,
    vitaminK: 0,
    vitaminB1: 0.04,
    vitaminB2: 0.04,
    vitaminB3: 0.4,
    vitaminB6: 0.04,
    folate: 0.01, // 10 mcg converted to mg
    vitaminB12: 0,
    calcium: 25,
    iron: 1.4,
    magnesium: 20,
    zinc: 0.25,
    iodine: 0,
    selenium: 0,
    copper: 0.04,
    potassium: 70,
    phosphorus: 32,
  },

  boiled_beetroot: {
    label: "BEETROOT BOILED",
    calories: 44,
    protein: 1.68,
    saturatedFat: 0.03,
    unsaturatedFat: 0.09,
    solubleFiber: 0.8, // Estimated breakdown of 2.0g total fiber
    insolubleFiber: 1.2,
    vitaminA: 0.002, // 2 mcg RAE converted to mg
    vitaminC: 3.6,
    vitaminD: 0,
    vitaminE: 0.04,
    vitaminK: 0.0002, // 0.2 mcg converted to mg
    vitaminB1: 0.027,
    vitaminB2: 0.04,
    vitaminB3: 0.331,
    vitaminB6: 0.067,
    folate: 0.08, // 80 mcg converted to mg
    vitaminB12: 0,
    calcium: 16,
    iron: 0.79,
    magnesium: 23,
    zinc: 0.35,
    iodine: 0,
    selenium: 0.0007, // 0.7 mcg converted to mg
    copper: 0.074,
    potassium: 305,
    phosphorus: 38,
  },

  boiled_fenugreek: {
    label: "FENUGREEK LEAVES / METHI BOILED",
    calories: 42,
    protein: 4.0,
    saturatedFat: 0.08,
    unsaturatedFat: 0.5,
    solubleFiber: 0.8, // Estimated breakdown of 4.0g total fiber
    insolubleFiber: 3.2,
    vitaminA: 0.4, // 400 mcg RAE converted to mg
    vitaminC: 30.0,
    vitaminD: 0,
    vitaminE: 0.4,
    vitaminK: 0.2, // 200 mcg converted to mg
    vitaminB1: 0.08,
    vitaminB2: 0.2,
    vitaminB3: 0.6,
    vitaminB6: 0.15,
    folate: 0.05, // 50 mcg converted to mg
    vitaminB12: 0,
    calcium: 350,
    iron: 1.5,
    magnesium: 45,
    zinc: 0.35,
    iodine: 0,
    selenium: 0,
    copper: 0.08,
    potassium: 280,
    phosphorus: 40,
  },

  boiled_deumstick: {
    label: "DRUMSTICK / MORINGA PODS BOILED",
    calories: 32,
    protein: 1.8,
    saturatedFat: 0.03,
    unsaturatedFat: 0.1,
    solubleFiber: 0.8, // Estimated breakdown of 2.8g total fiber
    insolubleFiber: 2.0,
    vitaminA: 0.005, // 5 mcg RAE converted to mg
    vitaminC: 100.0, // Still very rich after boiling
    vitaminD: 0,
    vitaminE: 0.15,
    vitaminK: 0,
    vitaminB1: 0.03,
    vitaminB2: 0.05,
    vitaminB3: 0.4,
    vitaminB6: 0.09,
    folate: 0.03, // 30 mcg converted to mg
    vitaminB12: 0,
    calcium: 25,
    iron: 0.3,
    magnesium: 35,
    zinc: 0.35,
    iodine: 0,
    selenium: 0,
    copper: 0.06,
    potassium: 400,
    phosphorus: 42,
  },

  boiled_cluster_beans: {
    label: "CLUSTER BEANS / GAVAR BOILED",
    calories: 14,
    protein: 2.8,
    saturatedFat: 0.04,
    unsaturatedFat: 0.2,
    solubleFiber: 1.8, // Estimated breakdown of 4.8g total fiber
    insolubleFiber: 3.0,
    vitaminA: 0.015, // 15 mcg RAE converted to mg
    vitaminC: 35.0,
    vitaminD: 0,
    vitaminE: 0.2,
    vitaminK: 0,
    vitaminB1: 0.06,
    vitaminB2: 0.02,
    vitaminB3: 0.3,
    vitaminB6: 0.04,
    folate: 0.1, // 100 mcg converted to mg
    vitaminB12: 0,
    calcium: 110,
    iron: 0.9,
    magnesium: 45,
    zinc: 0.5,
    iodine: 0,
    selenium: 0,
    copper: 0.1,
    potassium: 180,
    phosphorus: 45,
  },

  boiled_bitter_guard: {
    label: "BITTER GOURD / KARELA BOILED",
    calories: 15,
    protein: 0.9,
    saturatedFat: 0.02,
    unsaturatedFat: 0.08,
    solubleFiber: 0.7, // Estimated breakdown of 2.5g total fiber
    insolubleFiber: 1.8,
    vitaminA: 0.004, // 4 mcg RAE converted to mg
    vitaminC: 45.0,
    vitaminD: 0,
    vitaminE: 0.1,
    vitaminK: 0.003, // 3 mcg converted to mg
    vitaminB1: 0.03,
    vitaminB2: 0.03,
    vitaminB3: 0.3,
    vitaminB6: 0.03,
    folate: 0.05, // 50 mcg converted to mg
    vitaminB12: 0,
    calcium: 16,
    iron: 0.35,
    magnesium: 14,
    zinc: 0.7,
    iodine: 0,
    selenium: 0.0001, // 0.1 mcg converted to mg
    copper: 0.025,
    potassium: 250,
    phosphorus: 25,
  },

  boiled_spring_onion: {
    label: "SPRING ONION / SCALLIONS BOILED",
    calories: 28,
    protein: 1.6,
    saturatedFat: 0.02,
    unsaturatedFat: 0.09,
    solubleFiber: 0.6, // Estimated breakdown of 2.2g total fiber
    insolubleFiber: 1.6,
    vitaminA: 0.04, // 40 mcg RAE converted to mg
    vitaminC: 10.0,
    vitaminD: 0,
    vitaminE: 0.4,
    vitaminK: 0.15, // 150 mcg converted to mg
    vitaminB1: 0.04,
    vitaminB2: 0.06,
    vitaminB3: 0.4,
    vitaminB6: 0.05,
    folate: 0.045, // 45 mcg converted to mg
    vitaminB12: 0,
    calcium: 60,
    iron: 1.1,
    magnesium: 16,
    zinc: 0.3,
    iodine: 0,
    selenium: 0.0004, // 0.4 mcg converted to mg
    copper: 0.06,
    potassium: 220,
    phosphorus: 30,
  },

  boiled_coriander_leaves: {
    label: "CORIANDER LEAVES / CILANTRO BOILED",
    calories: 20,
    protein: 1.8,
    saturatedFat: 0.01,
    unsaturatedFat: 0.25,
    solubleFiber: 0.4, // Estimated breakdown of 2.0g total fiber
    insolubleFiber: 1.6,
    vitaminA: 0.28, // 280 mcg RAE converted to mg
    vitaminC: 15.0,
    vitaminD: 0,
    vitaminE: 2.0,
    vitaminK: 0.25, // 250 mcg converted to mg
    vitaminB1: 0.04,
    vitaminB2: 0.1,
    vitaminB3: 0.8,
    vitaminB6: 0.1,
    folate: 0.04, // 40 mcg converted to mg
    vitaminB12: 0,
    calcium: 55,
    iron: 1.4,
    magnesium: 20,
    zinc: 0.4,
    iodine: 0,
    selenium: 0.0006, // 0.6 mcg converted to mg
    copper: 0.18,
    potassium: 420,
    phosphorus: 38,
  },

  boiled_mint_leaves: {
    label: "MINT LEAVES BOILED",
    calories: 38,
    protein: 2.8,
    saturatedFat: 0.15,
    unsaturatedFat: 0.28,
    solubleFiber: 1.3, // Estimated breakdown of 6.0g total fiber
    insolubleFiber: 4.7,
    vitaminA: 0.18, // 180 mcg RAE converted to mg
    vitaminC: 8.0,
    vitaminD: 0,
    vitaminE: 0.4,
    vitaminK: 0,
    vitaminB1: 0.06,
    vitaminB2: 0.12,
    vitaminB3: 0.7,
    vitaminB6: 0.1,
    folate: 0.07, // 70 mcg converted to mg
    vitaminB12: 0,
    calcium: 160,
    iron: 9.5,
    magnesium: 50,
    zinc: 0.9,
    iodine: 0,
    selenium: 0,
    copper: 0.18,
    potassium: 360,
    phosphorus: 48,
  },

  boiled_flower: {
    label: "CAULIFLOWER / FLOWER BOILED",
    calories: 23,
    protein: 1.84,
    saturatedFat: 0.038,
    unsaturatedFat: 0.042,
    solubleFiber: 0.8, // Estimated breakdown of 2.3g total fiber
    insolubleFiber: 1.5,
    vitaminA: 0,
    vitaminC: 44.3,
    vitaminD: 0,
    vitaminE: 0.07,
    vitaminK: 0.0138, // 13.8 mcg converted to mg
    vitaminB1: 0.042,
    vitaminB2: 0.05,
    vitaminB3: 0.407,
    vitaminB6: 0.173,
    folate: 0.044, // 44 mcg converted to mg
    vitaminB12: 0,
    calcium: 16,
    iron: 0.32,
    magnesium: 12,
    zinc: 0.22,
    iodine: 0,
    selenium: 0.0006, // 0.6 mcg converted to mg
    copper: 0.033,
    potassium: 142,
    phosphorus: 32,
  },
  raw_raddish: {
    label: "RADISH RAW",
    calories: 16,
    protein: 0.68,
    saturatedFat: 0.03,
    unsaturatedFat: 0.04,
    solubleFiber: 0.5, // Estimated breakdown of 1.6g total fiber
    insolubleFiber: 1.1,
    vitaminA: 0,
    vitaminC: 14.8,
    vitaminD: 0,
    vitaminE: 0,
    vitaminK: 0.0013, // 1.3 mcg converted to mg
    vitaminB1: 0.012,
    vitaminB2: 0.039,
    vitaminB3: 0.254,
    vitaminB6: 0.071,
    folate: 0.025, // 25 mcg converted to mg
    vitaminB12: 0,
    calcium: 25,
    iron: 0.34,
    magnesium: 10,
    zinc: 0.28,
    iodine: 0,
    selenium: 0.0006, // 0.6 mcg converted to mg
    copper: 0.05,
    potassium: 233,
    phosphorus: 20,
  },

  boiled_green_beans: {
    label: "GREEN BEANS / SNAP BEANS BOILED",
    calories: 35,
    protein: 1.9,
    saturatedFat: 0.06,
    unsaturatedFat: 0.14,
    solubleFiber: 1.0, // Estimated breakdown of 3.2g total fiber
    insolubleFiber: 2.2,
    vitaminA: 0.032, // 32 mcg RAE converted to mg
    vitaminC: 9.7,
    vitaminD: 0,
    vitaminE: 0.4,
    vitaminK: 0.047, // 47 mcg converted to mg
    vitaminB1: 0.07,
    vitaminB2: 0.09,
    vitaminB3: 0.6,
    vitaminB6: 0.07,
    folate: 0.029, // 29 mcg converted to mg
    vitaminB12: 0,
    calcium: 44,
    iron: 0.65,
    magnesium: 22,
    zinc: 0.2,
    iodine: 0,
    selenium: 0.0005, // 0.5 mcg converted to mg
    copper: 0.06,
    potassium: 146,
    phosphorus: 29,
  },

  boiled_broad_beans: {
    label: "BROAD BEANS / FAVA BEANS BOILED",
    calories: 110,
    protein: 7.6,
    saturatedFat: 0.06,
    unsaturatedFat: 0.2,
    solubleFiber: 1.4, // Estimated breakdown of 5.4g total fiber
    insolubleFiber: 4.0,
    vitaminA: 0.001, // 1 mcg RAE converted to mg
    vitaminC: 0.3,
    vitaminD: 0,
    vitaminE: 0.05,
    vitaminK: 0.002, // 2 mcg converted to mg
    vitaminB1: 0.097,
    vitaminB2: 0.089,
    vitaminB3: 0.713,
    vitaminB6: 0.072,
    folate: 0.104, // 104 mcg converted to mg
    vitaminB12: 0,
    calcium: 37,
    iron: 1.5,
    magnesium: 43,
    zinc: 1.0,
    iodine: 0,
    selenium: 0.001, // 1 mcg converted to mg
    copper: 0.25,
    potassium: 268,
    phosphorus: 125,
  },

  boiled_bell_pepper: {
    label: "BELL PEPPER / CAPSICUM BOILED",
    calories: 28,
    protein: 0.9,
    saturatedFat: 0.03,
    unsaturatedFat: 0.12,
    solubleFiber: 0.4, // Estimated breakdown of 1.2g total fiber
    insolubleFiber: 0.8,
    vitaminA: 0.046, // 46 mcg RAE converted to mg
    vitaminC: 74.4, // Reduced due to boiling
    vitaminD: 0,
    vitaminE: 0.45,
    vitaminK: 0.004, // 4 mcg converted to mg
    vitaminB1: 0.05,
    vitaminB2: 0.03,
    vitaminB3: 0.4,
    vitaminB6: 0.17,
    folate: 0.012, // 12 mcg converted to mg
    vitaminB12: 0,
    calcium: 9,
    iron: 0.34,
    magnesium: 10,
    zinc: 0.13,
    iodine: 0,
    selenium: 0.0001, // 0.1 mcg converted to mg
    copper: 0.06,
    potassium: 166,
    phosphorus: 19,
  },

  boiled_snake_guard: {
    label: "SNAKE GOURD BOILED",
    calories: 18,
    protein: 0.6,
    saturatedFat: 0.02,
    unsaturatedFat: 0.1,
    solubleFiber: 0.2, // Estimated breakdown of 0.8g total fiber
    insolubleFiber: 0.6,
    vitaminA: 0.01, // 10 mcg RAE converted to mg
    vitaminC: 5.0,
    vitaminD: 0,
    vitaminE: 0.1,
    vitaminK: 0,
    vitaminB1: 0.04,
    vitaminB2: 0.03,
    vitaminB3: 0.3,
    vitaminB6: 0.04,
    folate: 0.015, // 15 mcg converted to mg
    vitaminB12: 0,
    calcium: 20,
    iron: 0.4,
    magnesium: 12,
    zinc: 0.15,
    iodine: 0,
    selenium: 0,
    copper: 0.03,
    potassium: 115,
    phosphorus: 25,
  },

  boiled_sweet_corn: {
    label: "SWEET CORN BOILED",
    calories: 96,
    protein: 3.4,
    saturatedFat: 0.2,
    unsaturatedFat: 0.9,
    solubleFiber: 0.4, // Estimated breakdown of 2.4g total fiber
    insolubleFiber: 2.0,
    vitaminA: 0.013, // 13 mcg RAE converted to mg
    vitaminC: 5.5,
    vitaminD: 0,
    vitaminE: 0.07,
    vitaminK: 0.0003, // 0.3 mcg converted to mg
    vitaminB1: 0.093,
    vitaminB2: 0.057,
    vitaminB3: 1.683,
    vitaminB6: 0.137,
    folate: 0.023, // 23 mcg converted to mg
    vitaminB12: 0,
    calcium: 3,
    iron: 0.45,
    magnesium: 26,
    zinc: 0.62,
    iodine: 0,
    selenium: 0.0002, // 0.2 mcg converted to mg
    copper: 0.04,
    potassium: 218,
    phosphorus: 77,
  },

  mushroom: {
    label: "WHITE BUTTON MUSHROOM RAW",
    calories: 22,
    protein: 3.09,
    saturatedFat: 0.05,
    unsaturatedFat: 0.16,
    solubleFiber: 0.4, // Estimated breakdown of 1.0g total fiber
    insolubleFiber: 0.6,
    vitaminA: 0,
    vitaminC: 2.1,
    vitaminD: 0.0002, // 0.2 mcg converted to mg (Mushrooms contain trace Vitamin D)
    vitaminE: 0.01,
    vitaminK: 0,
    vitaminB1: 0.081,
    vitaminB2: 0.402,
    vitaminB3: 3.607,
    vitaminB6: 0.104,
    folate: 0.017, // 17 mcg converted to mg
    vitaminB12: 0,
    calcium: 3,
    iron: 0.5,
    magnesium: 9,
    zinc: 0.52,
    iodine: 0,
    selenium: 0.0093, // 9.3 mcg converted to mg
    copper: 0.318,
    potassium: 318,
    phosphorus: 86,
  },

  boiled_malbar_spinach: {
    label: "MALABAR SPINACH / BASELLA BOILED",
    calories: 23,
    protein: 2.0,
    saturatedFat: 0.04,
    unsaturatedFat: 0.15,
    solubleFiber: 0.6, // Estimated breakdown of 1.8g total fiber
    insolubleFiber: 1.2,
    vitaminA: 0.4, // 400 mcg RAE converted to mg
    vitaminC: 52.0, // Retains high Vitamin C even after boiling
    vitaminD: 0,
    vitaminE: 1.5,
    vitaminK: 0.3, // 300 mcg converted to mg
    vitaminB1: 0.04,
    vitaminB2: 0.11,
    vitaminB3: 0.4,
    vitaminB6: 0.18,
    folate: 0.09, // 90 mcg converted to mg
    vitaminB12: 0,
    calcium: 109,
    iron: 1.2,
    magnesium: 65,
    zinc: 0.45,
    iodine: 0,
    selenium: 0.0009, // 0.9 mcg converted to mg
    copper: 0.1,
    potassium: 510,
    phosphorus: 50,
  },
  //________________MEAT_________________

  boiled_chicken: {
    label: "CHICKEN BOILED",
    calories: 177,
    protein: 27.29,
    saturatedFat: 1.84,
    unsaturatedFat: 3.93,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.015,
    vitaminC: 0,
    vitaminD: 0.0001,
    vitaminE: 0.265,
    vitaminK: 0.0024,
    vitaminB1: 0.049,
    vitaminB2: 0.163,
    vitaminB3: 6.117,
    vitaminB6: 0.26,
    folate: 0.006,
    vitaminB12: 0.00022,
    calcium: 14,
    iron: 1.17,
    magnesium: 21,
    zinc: 1.99,
    iodine: 0,
    selenium: 0.0209,
    copper: 0.061,
    potassium: 180,
    phosphorus: 150,
  },
  fried_chicken: {
    label: "CHICKEN, MEAT ONLY, COOKED, FRIED",
    calories: 219,
    protein: 30.57,
    saturatedFat: 2.46,
    unsaturatedFat: 6.66,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.059,
    vitaminC: 0,
    vitaminD: 0.0001,
    vitaminE: 0.5,
    vitaminK: 0.0028,
    vitaminB1: 0.1,
    vitaminB2: 0.125,
    vitaminB3: 14.8,
    vitaminB6: 0.64,
    folate: 0.004,
    vitaminB12: 0.00037,
    calcium: 17,
    iron: 1.35,
    magnesium: 31,
    zinc: 1.1,
    iodine: 0,
    selenium: 0.0262,
    copper: 0.054,
    potassium: 257,
    phosphorus: 205,
  },
  boiled_egg: {
    label: "EGG BOILED WHOLE",
    calories: 155,
    protein: 12.6,
    saturatedFat: 3.27,
    unsaturatedFat: 5.49,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.149,
    vitaminC: 0,
    vitaminD: 0.0022,
    vitaminE: 1.03,
    vitaminK: 0.0003,
    vitaminB1: 0.066,
    vitaminB2: 0.513,
    vitaminB3: 0.064,
    vitaminB6: 0.121,
    folate: 0.044,
    vitaminB12: 0.00111,
    calcium: 50,
    iron: 1.19,
    magnesium: 10,
    zinc: 1.05,
    iodine: 0,
    selenium: 0.0308,
    copper: 0.01,
    potassium: 126,
    phosphorus: 172,
  },
  boiled_egg_white: {
    label: "EGG WHITE BOILED",
    calories: 52,
    protein: 10.7,
    saturatedFat: 0,
    unsaturatedFat: 0,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.011,
    vitaminC: 0,
    vitaminD: 0.0001,
    vitaminE: 0.86,
    vitaminK: 0.0047,
    vitaminB1: 0.003,
    vitaminB2: 0.35,
    vitaminB3: 0.088,
    vitaminB6: 0.041,
    folate: 0.003,
    vitaminB12: 0.00007,
    calcium: 7,
    iron: 0.08,
    magnesium: 11,
    zinc: 0.04,
    iodine: 0,
    selenium: 0.027,
    copper: 0.023,
    potassium: 163,
    phosphorus: 15,
  },
  fried_egg_omlet: {
    label: "WHOLE EGG OMLET/BURJI",
    calories: 154,
    protein: 10.57,
    saturatedFat: 3.32,
    unsaturatedFat: 7.56,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.172,
    vitaminC: 0,
    vitaminD: 0.0017,
    vitaminE: 1.29,
    vitaminK: 0.0007,
    vitaminB1: 0.034,
    vitaminB2: 0.386,
    vitaminB3: 0.064,
    vitaminB6: 0.143,
    folate: 0.039,
    vitaminB12: 0.00076,
    calcium: 48,
    iron: 1.48,
    magnesium: 11,
    zinc: 1.09,
    iodine: 0,
    selenium: 0.0258,
    copper: 0.063,
    potassium: 117,
    phosphorus: 167,
  },
  boiled_mutton: {
    label: "MUTTON BOILED",
    calories: 234,
    protein: 33.4,
    saturatedFat: 5.1,
    unsaturatedFat: 6.0,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0.0001,
    vitaminE: 0.1,
    vitaminK: 0.004,
    vitaminB1: 0.09,
    vitaminB2: 0.15,
    vitaminB3: 3.3,
    vitaminB6: 0.13,
    folate: 0.015,
    vitaminB12: 0.00096,
    calcium: 10,
    iron: 4.8,
    magnesium: 31,
    zinc: 3.4,
    iodine: 0,
    selenium: 0.0068,
    copper: 0.1,
    potassium: 409,
    phosphorus: 122,
  },
  boiled_fish: {
    label: "FISH BOILED",
    calories: 146,
    protein: 24.2,
    saturatedFat: 1.0,
    unsaturatedFat: 3.2,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.027,
    vitaminC: 0,
    vitaminD: 0.005,
    vitaminE: 0.7,
    vitaminK: 0.001,
    vitaminB1: 0.05,
    vitaminB2: 0.12,
    vitaminB3: 3.5,
    vitaminB6: 0.46,
    folate: 0.006,
    vitaminB12: 0.0023,
    calcium: 20,
    iron: 0.5,
    magnesium: 30,
    zinc: 0.7,
    iodine: 0.05,
    selenium: 0.04,
    copper: 0.05,
    potassium: 400,
    phosphorus: 200,
  },
  fried_fish: {
    label: "FISH FRIED",
    calories: 221,
    protein: 18.2,
    saturatedFat: 3.6,
    unsaturatedFat: 7.4,
    solubleFiber: 0,
    insolubleFiber: 0.4,
    vitaminA: 0.035,
    vitaminC: 0,
    vitaminD: 0.0005,
    vitaminE: 1.5,
    vitaminK: 0.004,
    vitaminB1: 0.08,
    vitaminB2: 0.12,
    vitaminB3: 3.5,
    vitaminB6: 0.25,
    folate: 0.015,
    vitaminB12: 0.0015,
    calcium: 40,
    iron: 1.2,
    magnesium: 30,
    zinc: 1.0,
    iodine: 0.05,
    selenium: 0.035,
    copper: 0.06,
    potassium: 350,
    phosphorus: 250,
  },
  boiled_prawns: {
    label: "PRAWNS BOILED",
    calories: 119,
    protein: 22.78,
    saturatedFat: 0.52,
    unsaturatedFat: 0.95,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.09,
    vitaminC: 0,
    vitaminD: 0.0001,
    vitaminE: 2.2,
    vitaminK: 0.0004,
    vitaminB1: 0.032,
    vitaminB2: 0.024,
    vitaminB3: 2.678,
    vitaminB6: 0.242,
    folate: 0.024,
    vitaminB12: 0.00166,
    calcium: 91,
    iron: 0.32,
    magnesium: 37,
    zinc: 1.63,
    iodine: 0,
    selenium: 0.0495,
    copper: 0.258,
    potassium: 170,
    phosphorus: 306,
  },
  fried_prawns: {
    label: "PRAWNS FRIED",
    calories: 242,
    protein: 21.39,
    saturatedFat: 2.087,
    unsaturatedFat: 8.897,
    solubleFiber: 0,
    insolubleFiber: 0.4,
    vitaminA: 0.056,
    vitaminC: 1.5,
    vitaminD: 0.0001,
    vitaminE: 1.3,
    vitaminK: 0.0014,
    vitaminB1: 0.129,
    vitaminB2: 0.136,
    vitaminB3: 3.07,
    vitaminB6: 0.098,
    folate: 0.039,
    vitaminB12: 0.00187,
    calcium: 67,
    iron: 1.26,
    magnesium: 40,
    zinc: 1.38,
    iodine: 0,
    selenium: 0.0417,
    copper: 0.274,
    potassium: 225,
    phosphorus: 218,
  },
  boiled_milk: {
    label: "MILK BOILED",
    calories: 61,
    protein: 3.15,
    saturatedFat: 1.865,
    unsaturatedFat: 1.007,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.046,
    vitaminC: 0,
    vitaminD: 0.0001,
    vitaminE: 0.07,
    vitaminK: 0.0003,
    vitaminB1: 0.046,
    vitaminB2: 0.169,
    vitaminB3: 0.089,
    vitaminB6: 0.036,
    folate: 0.005,
    vitaminB12: 0.00045,
    calcium: 113,
    iron: 0.03,
    magnesium: 10,
    zinc: 0.37,
    iodine: 0,
    selenium: 0.0037,
    copper: 0.025,
    potassium: 132,
    phosphorus: 84,
  },
  paneer: {
    label: "PANEER",
    calories: 344,
    protein: 20,
    saturatedFat: 18.02,
    unsaturatedFat: 3.86,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.155,
    vitaminC: 0,
    vitaminD: 0.0053,
    vitaminE: 0.24,
    vitaminK: 0.0015,
    vitaminB1: 0.272,
    vitaminB2: 0.669,
    vitaminB3: 0.509,
    vitaminB6: 0.296,
    folate: 0,
    vitaminB12: 0.00262,
    calcium: 597,
    iron: 0,
    magnesium: 58,
    zinc: 2.04,
    iodine: 0,
    selenium: 0.0093,
    copper: 0,
    potassium: 728,
    phosphorus: 490,
  },
  cheese: {
    label: "CHEESE CHEDDAR",
    calories: 403,
    protein: 22.87,
    saturatedFat: 18.87,
    unsaturatedFat: 10.33,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.337,
    vitaminC: 0,
    vitaminD: 0.0006,
    vitaminE: 0.71,
    vitaminK: 0.0024,
    vitaminB1: 0.029,
    vitaminB2: 0.43,
    vitaminB3: 0.059,
    vitaminB6: 0.066,
    folate: 0.027,
    vitaminB12: 0.0011,
    calcium: 710,
    iron: 0.14,
    magnesium: 27,
    zinc: 3.64,
    iodine: 0,
    selenium: 0.0285,
    copper: 0.03,
    potassium: 76,
    phosphorus: 455,
  },
  yogurt: {
    label: "YOGURT",
    calories: 61,
    protein: 3.47,
    saturatedFat: 2.096,
    unsaturatedFat: 0.985,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.027,
    vitaminC: 0.5,
    vitaminD: 0.0001,
    vitaminE: 0.06,
    vitaminK: 0.0002,
    vitaminB1: 0.055,
    vitaminB2: 0.142,
    vitaminB3: 0.075,
    vitaminB6: 0.032,
    folate: 0.007,
    vitaminB12: 0.00037,
    calcium: 121,
    iron: 0.05,
    magnesium: 12,
    zinc: 0.59,
    iodine: 0.0323,
    selenium: 0.0022,
    copper: 0.009,
    potassium: 155,
    phosphorus: 95,
  },
  curd: {
    label: "CURD",
    calories: 61,
    protein: 3.47,
    saturatedFat: 2.096,
    unsaturatedFat: 0.985,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.027,
    vitaminC: 0.5,
    vitaminD: 0.0001,
    vitaminE: 0.06,
    vitaminK: 0.0002,
    vitaminB1: 0.029,
    vitaminB2: 0.142,
    vitaminB3: 0.075,
    vitaminB6: 0.032,
    folate: 0.007,
    vitaminB12: 0.00037,
    calcium: 121,
    iron: 0.05,
    magnesium: 12,
    zinc: 0.59,
    iodine: 0,
    selenium: 0.0022,
    copper: 0.009,
    potassium: 155,
    phosphorus: 95,
  },
  butter: {
    label: "BUTTER, WITHOUT SALT",
    calories: 717,
    protein: 0.85,
    saturatedFat: 50.5,
    unsaturatedFat: 26.44,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.684,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 2.32,
    vitaminK: 0.007,
    vitaminB1: 0.005,
    vitaminB2: 0.034,
    vitaminB3: 0.042,
    vitaminB6: 0.003,
    folate: 0.003,
    vitaminB12: 0.00017,
    calcium: 24,
    iron: 0.02,
    magnesium: 2,
    zinc: 0.09,
    iodine: 0,
    selenium: 0.001,
    copper: 0.016,
    potassium: 24,
    phosphorus: 24,
  },
  ghee: {
    label: "GHEE, CLARIFIED BUTTER",
    calories: 876,
    protein: 0.28,
    saturatedFat: 61.924,
    unsaturatedFat: 32.426,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.84,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 2.8,
    vitaminK: 0.0086,
    vitaminB1: 0.001,
    vitaminB2: 0.005,
    vitaminB3: 0.003,
    vitaminB6: 0.001,
    folate: 0,
    vitaminB12: 0.00001,
    calcium: 4,
    iron: 0,
    magnesium: 0,
    zinc: 0.01,
    iodine: 0,
    selenium: 0,
    copper: 0,
    potassium: 5,
    phosphorus: 3,
  },
  boiled_soya_chunks: {
    label: "SOYA CHUNKS / TVP BOILED (HYDRATED)",
    calories: 115,
    protein: 17.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.3,
    solubleFiber: 1.5, // Estimated breakdown of 6.0g total hydrated fiber
    insolubleFiber: 4.5,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.1,
    vitaminK: 0,
    vitaminB1: 0.1,
    vitaminB2: 0.05,
    vitaminB3: 0.8,
    vitaminB6: 0.1,
    folate: 0.055, // 55 mcg converted to mg
    vitaminB12: 0,
    calcium: 80,
    iron: 3.0,
    magnesium: 90,
    zinc: 1.5,
    iodine: 0,
    selenium: 0.005, // 5 mcg converted to mg
    copper: 0.3,
    potassium: 600,
    phosphorus: 200,
  },

  boiled_tofu: {
    label: "TOFU (FIRM) BOILED",
    calories: 144,
    protein: 15.8,
    saturatedFat: 1.3,
    unsaturatedFat: 7.4, // Rich in healthy polyunsaturated fats
    solubleFiber: 0.5, // Estimated breakdown of 2.3g total fiber
    insolubleFiber: 1.8,
    vitaminA: 0.008, // 8 mcg RAE converted to mg
    vitaminC: 0.2,
    vitaminD: 0,
    vitaminE: 0.04,
    vitaminK: 0.0024, // 2.4 mcg converted to mg
    vitaminB1: 0.16,
    vitaminB2: 0.1,
    vitaminB3: 0.38,
    vitaminB6: 0.09,
    folate: 0.015, // 15 mcg converted to mg
    vitaminB12: 0,
    calcium: 350, // Can be higher if calcium-set
    iron: 2.7,
    magnesium: 58,
    zinc: 1.6,
    iodine: 0,
    selenium: 0.0174, // 17.4 mcg converted to mg
    copper: 0.38,
    potassium: 237,
    phosphorus: 190,
  },

  boiled_tempeh: {
    label: "TEMPEH BOILED",
    calories: 195,
    protein: 19.3,
    saturatedFat: 2.2,
    unsaturatedFat: 8.6,
    solubleFiber: 2.0, // Estimated breakdown of 9.0g total fiber
    insolubleFiber: 7.0,
    vitaminA: 0.003, // 3 mcg RAE converted to mg
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.22,
    vitaminK: 0.0003, // 0.3 mcg converted to mg
    vitaminB1: 0.08,
    vitaminB2: 0.35,
    vitaminB3: 2.6,
    vitaminB6: 0.22,
    folate: 0.024, // 24 mcg converted to mg
    vitaminB12: 0.0001, // 0.1 mcg converted to mg (trace amounts from fermentation)
    calcium: 111,
    iron: 2.7,
    magnesium: 81,
    zinc: 1.1,
    iodine: 0,
    selenium: 0.0088, // 8.8 mcg converted to mg
    copper: 0.56,
    potassium: 412,
    phosphorus: 266,
  },

  low_fat_paneer: {
    label: "PANEER (LOW FAT / COTTAGE CHEESE)",
    calories: 120,
    protein: 15.0,
    saturatedFat: 3.5,
    unsaturatedFat: 1.5,
    solubleFiber: 0, // Dairy contains no fiber
    insolubleFiber: 0,
    vitaminA: 0.05, // 50 mcg RAE converted to mg
    vitaminC: 0,
    vitaminD: 0.0002, // 0.2 mcg converted to mg
    vitaminE: 0.05,
    vitaminK: 0.001, // 1 mcg converted to mg
    vitaminB1: 0.03,
    vitaminB2: 0.2,
    vitaminB3: 0.1,
    vitaminB6: 0.05,
    folate: 0.012, // 12 mcg converted to mg
    vitaminB12: 0.0012, // 1.2 mcg converted to mg
    calcium: 400, // Excellent source of calcium
    iron: 0.2,
    magnesium: 25,
    zinc: 1.2,
    iodine: 0.02, // 20 mcg converted to mg
    selenium: 0.01, // 10 mcg converted to mg
    copper: 0.02,
    potassium: 120,
    phosphorus: 300,
  },

  milk_powder: {
    label: "MILK POWDER (NON-FAT / SKIM DRY)",
    calories: 362,
    protein: 36.2,
    saturatedFat: 0.5,
    unsaturatedFat: 0.3,
    solubleFiber: 0, // Dairy contains no fiber
    insolubleFiber: 0,
    vitaminA: 0.007, // 7 mcg RAE converted to mg (unfortified)
    vitaminC: 6.8,
    vitaminD: 0,
    vitaminE: 0.01,
    vitaminK: 0,
    vitaminB1: 0.4,
    vitaminB2: 1.55, // Very rich in Riboflavin
    vitaminB3: 0.9,
    vitaminB6: 0.36,
    folate: 0.05, // 50 mcg converted to mg
    vitaminB12: 0.004, // 4 mcg converted to mg (excellent source)
    calcium: 1257, // Extremely dense source of calcium
    iron: 0.3,
    magnesium: 110,
    zinc: 4.1,
    iodine: 0.15, // 150 mcg converted to mg
    selenium: 0.027, // 27 mcg converted to mg
    copper: 0.04,
    potassium: 1794,
    phosphorus: 968,
  },
  //_____________PREPARED FOODS________
  idli: {
    label: "IDLI (STEAMED RICE & URAD BATTER)",
    calories: 148,
    protein: 4.1,
    saturatedFat: 0.1,
    unsaturatedFat: 0.4,
    solubleFiber: 0.4,
    insolubleFiber: 1.1,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.05,
    vitaminK: 0,
    vitaminB1: 0.06,
    vitaminB2: 0.05,
    vitaminB3: 0.8,
    vitaminB6: 0.08,
    folate: 0.035,
    vitaminB12: 0,
    calcium: 25,
    iron: 0.9,
    magnesium: 20,
    zinc: 0.5,
    iodine: 0.01, // Trace from iodized salt
    selenium: 0.002,
    copper: 0.1,
    potassium: 110,
    phosphorus: 70,
  },

  rawa_idli: {
    label: "RAWA IDLI",
    calories: 170,
    protein: 4.5,
    saturatedFat: 0.6,
    unsaturatedFat: 2.4, // From added oil/tempering
    solubleFiber: 0.3,
    insolubleFiber: 0.7,
    vitaminA: 0.015, // Some carrots/curry leaves in tempering
    vitaminC: 0.5,
    vitaminD: 0,
    vitaminE: 0.3,
    vitaminK: 0.002,
    vitaminB1: 0.08,
    vitaminB2: 0.06,
    vitaminB3: 0.9,
    vitaminB6: 0.05,
    folate: 0.02,
    vitaminB12: 0, // Zero assuming no yogurt, or trace if little yogurt used
    calcium: 30,
    iron: 1.2,
    magnesium: 22,
    zinc: 0.4,
    iodine: 0.01,
    selenium: 0.005,
    copper: 0.08,
    potassium: 130,
    phosphorus: 85,
  },

  poha: {
    label: "POHA",
    calories: 180,
    protein: 3.5,
    saturatedFat: 0.8,
    unsaturatedFat: 4.2, // Oil and peanuts
    solubleFiber: 0.4,
    insolubleFiber: 1.1,
    vitaminA: 0.01,
    vitaminC: 2.5, // Lemon juice added at end
    vitaminD: 0,
    vitaminE: 0.8,
    vitaminK: 0.005,
    vitaminB1: 0.05,
    vitaminB2: 0.03,
    vitaminB3: 1.1,
    vitaminB6: 0.1,
    folate: 0.015,
    vitaminB12: 0,
    calcium: 20,
    iron: 2.5, // Flattening process adds iron
    magnesium: 35,
    zinc: 0.6,
    iodine: 0.015,
    selenium: 0.003,
    copper: 0.15,
    potassium: 160,
    phosphorus: 110,
  },

  upma: {
    label: "UPMA",
    calories: 145,
    protein: 3.0,
    saturatedFat: 0.8,
    unsaturatedFat: 3.2,
    solubleFiber: 0.4,
    insolubleFiber: 1.1,
    vitaminA: 0.02, // Veggies
    vitaminC: 1.5,
    vitaminD: 0,
    vitaminE: 0.4,
    vitaminK: 0.003,
    vitaminB1: 0.09,
    vitaminB2: 0.05,
    vitaminB3: 1.0,
    vitaminB6: 0.06,
    folate: 0.025,
    vitaminB12: 0,
    calcium: 22,
    iron: 1.1,
    magnesium: 20,
    zinc: 0.4,
    iodine: 0.015,
    selenium: 0.005,
    copper: 0.09,
    potassium: 140,
    phosphorus: 80,
  },

  veg_pulav: {
    label: "VEG PULAV",
    calories: 155,
    protein: 3.2,
    saturatedFat: 1.0,
    unsaturatedFat: 3.0,
    solubleFiber: 0.5,
    insolubleFiber: 1.5,
    vitaminA: 0.08, // High from carrots
    vitaminC: 4.0,
    vitaminD: 0,
    vitaminE: 0.5,
    vitaminK: 0.008,
    vitaminB1: 0.07,
    vitaminB2: 0.03,
    vitaminB3: 0.6,
    vitaminB6: 0.08,
    folate: 0.02,
    vitaminB12: 0,
    calcium: 25,
    iron: 0.8,
    magnesium: 18,
    zinc: 0.5,
    iodine: 0.015,
    selenium: 0.003,
    copper: 0.1,
    potassium: 130,
    phosphorus: 55,
  },

  puri: {
    label: "PURI (DEEP FRIED)",
    calories: 320,
    protein: 6.5,
    saturatedFat: 2.5,
    unsaturatedFat: 12.5, // High fat from deep frying
    solubleFiber: 0.8,
    insolubleFiber: 2.2,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 1.8,
    vitaminK: 0.012,
    vitaminB1: 0.2,
    vitaminB2: 0.08,
    vitaminB3: 2.5,
    vitaminB6: 0.15,
    folate: 0.03,
    vitaminB12: 0,
    calcium: 25,
    iron: 2.2,
    magnesium: 60,
    zinc: 1.2,
    iodine: 0.01,
    selenium: 0.015,
    copper: 0.2,
    potassium: 180,
    phosphorus: 150,
  },

  dosa: {
    label: "DOSA (PLAIN)",
    calories: 168,
    protein: 4.2,
    saturatedFat: 0.5,
    unsaturatedFat: 3.0,
    solubleFiber: 0.3,
    insolubleFiber: 0.8,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.4,
    vitaminK: 0.002,
    vitaminB1: 0.08,
    vitaminB2: 0.04,
    vitaminB3: 0.9,
    vitaminB6: 0.06,
    folate: 0.025,
    vitaminB12: 0,
    calcium: 20,
    iron: 0.8,
    magnesium: 25,
    zinc: 0.5,
    iodine: 0.01,
    selenium: 0.003,
    copper: 0.1,
    potassium: 105,
    phosphorus: 80,
  },

  masala_dosa: {
    label: "MASALA DOSA",
    calories: 175,
    protein: 3.8,
    saturatedFat: 0.8,
    unsaturatedFat: 3.8,
    solubleFiber: 0.5,
    insolubleFiber: 1.2,
    vitaminA: 0.01,
    vitaminC: 3.5, // From potato filling
    vitaminD: 0,
    vitaminE: 0.6,
    vitaminK: 0.003,
    vitaminB1: 0.09,
    vitaminB2: 0.04,
    vitaminB3: 1.1,
    vitaminB6: 0.12,
    folate: 0.025,
    vitaminB12: 0,
    calcium: 22,
    iron: 1.0,
    magnesium: 28,
    zinc: 0.5,
    iodine: 0.015,
    selenium: 0.003,
    copper: 0.12,
    potassium: 220,
    phosphorus: 80,
  },

  black_gram_vada: {
    label: "BLACK GRAM VADA / MEDU VADA",
    calories: 285,
    protein: 9.5,
    saturatedFat: 2.0,
    unsaturatedFat: 12.0, // Deep fried
    solubleFiber: 1.5,
    insolubleFiber: 3.5,
    vitaminA: 0.002,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 1.5,
    vitaminK: 0.015,
    vitaminB1: 0.15,
    vitaminB2: 0.1,
    vitaminB3: 0.8,
    vitaminB6: 0.1,
    folate: 0.08,
    vitaminB12: 0,
    calcium: 60,
    iron: 2.5,
    magnesium: 90,
    zinc: 1.5,
    iodine: 0.015,
    selenium: 0.005,
    copper: 0.3,
    potassium: 350,
    phosphorus: 140,
  },

  chick_peas_vada: {
    label: "CHICK PEAS VADA / DAL VADA",
    calories: 330,
    protein: 11.0,
    saturatedFat: 2.2,
    unsaturatedFat: 13.8, // Deep fried
    solubleFiber: 1.5,
    insolubleFiber: 4.5,
    vitaminA: 0.005,
    vitaminC: 1.5,
    vitaminD: 0,
    vitaminE: 1.8,
    vitaminK: 0.015,
    vitaminB1: 0.18,
    vitaminB2: 0.08,
    vitaminB3: 0.9,
    vitaminB6: 0.15,
    folate: 0.1,
    vitaminB12: 0,
    calcium: 45,
    iron: 2.8,
    magnesium: 75,
    zinc: 1.8,
    iodine: 0.015,
    selenium: 0.004,
    copper: 0.35,
    potassium: 380,
    phosphorus: 155,
  },

  butter_dosa: {
    label: "BUTTER DOSA",
    calories: 230,
    protein: 4.2,
    saturatedFat: 5.5, // High saturated fat from butter
    unsaturatedFat: 4.0,
    solubleFiber: 0.3,
    insolubleFiber: 0.8,
    vitaminA: 0.08, // Vitamin A from dairy butter
    vitaminC: 0,
    vitaminD: 0.0001, // Trace D from butter
    vitaminE: 0.5,
    vitaminK: 0.003,
    vitaminB1: 0.08,
    vitaminB2: 0.04,
    vitaminB3: 0.9,
    vitaminB6: 0.06,
    folate: 0.025,
    vitaminB12: 0.0001, // Trace B12 from butter
    calcium: 25,
    iron: 0.8,
    magnesium: 25,
    zinc: 0.5,
    iodine: 0.015,
    selenium: 0.003,
    copper: 0.1,
    potassium: 105,
    phosphorus: 80,
  },

  jowar_roti: {
    label: "JOWAR ROTI (DRY COOKED)",
    calories: 205,
    protein: 6.2,
    saturatedFat: 0.3,
    unsaturatedFat: 1.2,
    solubleFiber: 1.2,
    insolubleFiber: 3.8,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.2,
    vitaminK: 0,
    vitaminB1: 0.15,
    vitaminB2: 0.08,
    vitaminB3: 1.8,
    vitaminB6: 0.1,
    folate: 0.02,
    vitaminB12: 0,
    calcium: 20,
    iron: 2.5,
    magnesium: 85,
    zinc: 1.2,
    iodine: 0.005,
    selenium: 0.008,
    copper: 0.2,
    potassium: 220,
    phosphorus: 180,
  },

  wheat_roti: {
    label: "WHEAT ROTI / CHAPATI",
    calories: 297, // Dense, less water than rice
    protein: 9.0,
    saturatedFat: 0.5,
    unsaturatedFat: 2.0,
    solubleFiber: 2.0,
    insolubleFiber: 6.5,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.4,
    vitaminK: 0.001,
    vitaminB1: 0.3,
    vitaminB2: 0.1,
    vitaminB3: 3.5,
    vitaminB6: 0.2,
    folate: 0.04,
    vitaminB12: 0,
    calcium: 30,
    iron: 3.0,
    magnesium: 100,
    zinc: 2.0,
    iodine: 0.005,
    selenium: 0.05,
    copper: 0.3,
    potassium: 250,
    phosphorus: 250,
  },

  pearl_millet_roti: {
    label: "PEARL MILLET ROTI / BAJRA ROTI",
    calories: 220,
    protein: 7.0,
    saturatedFat: 0.5,
    unsaturatedFat: 2.5,
    solubleFiber: 1.5,
    insolubleFiber: 4.5,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.3,
    vitaminK: 0,
    vitaminB1: 0.2,
    vitaminB2: 0.15,
    vitaminB3: 1.5,
    vitaminB6: 0.12,
    folate: 0.03,
    vitaminB12: 0,
    calcium: 25,
    iron: 4.5, // Rich in iron
    magnesium: 90,
    zinc: 1.8,
    iodine: 0.005,
    selenium: 0.005,
    copper: 0.4,
    potassium: 280,
    phosphorus: 200,
  },

  ragi_roti: {
    label: "RAGI ROTI (FINGER MILLET)",
    calories: 210,
    protein: 5.0,
    saturatedFat: 0.2,
    unsaturatedFat: 1.0,
    solubleFiber: 1.5,
    insolubleFiber: 5.5,
    vitaminA: 0.002,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.1,
    vitaminK: 0.001,
    vitaminB1: 0.25,
    vitaminB2: 0.1,
    vitaminB3: 0.8,
    vitaminB6: 0.05,
    folate: 0.02,
    vitaminB12: 0,
    calcium: 220, // Extremely rich in calcium
    iron: 2.8,
    magnesium: 95,
    zinc: 1.5,
    iodine: 0.005,
    selenium: 0.002,
    copper: 0.3,
    potassium: 280,
    phosphorus: 150,
  },

  chicken_biriyani: {
    label: "CHICKEN BIRIYANI",
    calories: 195,
    protein: 10.5,
    saturatedFat: 2.5,
    unsaturatedFat: 5.0,
    solubleFiber: 0.3,
    insolubleFiber: 0.7,
    vitaminA: 0.01,
    vitaminC: 1.5,
    vitaminD: 0.0001,
    vitaminE: 0.8,
    vitaminK: 0.005,
    vitaminB1: 0.08,
    vitaminB2: 0.06,
    vitaminB3: 3.5,
    vitaminB6: 0.2,
    folate: 0.015,
    vitaminB12: 0.0003, // 0.3 mcg converted to mg
    calcium: 25,
    iron: 1.2,
    magnesium: 20,
    zinc: 1.0,
    iodine: 0.015,
    selenium: 0.015,
    copper: 0.1,
    potassium: 160,
    phosphorus: 120,
  },

  mutton_biriyani: {
    label: "MUTTON BIRIYANI (LAMB/GOAT)",
    calories: 225,
    protein: 11.5,
    saturatedFat: 4.5,
    unsaturatedFat: 6.0,
    solubleFiber: 0.3,
    insolubleFiber: 0.7,
    vitaminA: 0.01,
    vitaminC: 1.5,
    vitaminD: 0.0001,
    vitaminE: 0.6,
    vitaminK: 0.005,
    vitaminB1: 0.09,
    vitaminB2: 0.1,
    vitaminB3: 2.5,
    vitaminB6: 0.15,
    folate: 0.015,
    vitaminB12: 0.0012, // 1.2 mcg converted to mg
    calcium: 30,
    iron: 1.8,
    magnesium: 22,
    zinc: 2.2,
    iodine: 0.015,
    selenium: 0.012,
    copper: 0.15,
    potassium: 190,
    phosphorus: 140,
  },

  egg_biriyani: {
    label: "EGG BIRIYANI",
    calories: 185,
    protein: 7.5,
    saturatedFat: 2.0,
    unsaturatedFat: 4.5,
    solubleFiber: 0.3,
    insolubleFiber: 0.7,
    vitaminA: 0.045, // From egg yolk
    vitaminC: 1.5,
    vitaminD: 0.0005, // 0.5 mcg from egg
    vitaminE: 0.8,
    vitaminK: 0.004,
    vitaminB1: 0.07,
    vitaminB2: 0.12,
    vitaminB3: 1.0,
    vitaminB6: 0.08,
    folate: 0.025,
    vitaminB12: 0.0004, // 0.4 mcg converted to mg
    calcium: 35,
    iron: 1.1,
    magnesium: 18,
    zinc: 0.7,
    iodine: 0.02,
    selenium: 0.012,
    copper: 0.08,
    potassium: 130,
    phosphorus: 100,
  },

  egg_curry: {
    label: "EGG CURRY",
    calories: 155,
    protein: 9.0,
    saturatedFat: 2.5,
    unsaturatedFat: 7.5,
    solubleFiber: 0.4,
    insolubleFiber: 0.6,
    vitaminA: 0.075, // From egg and tomato/onion gravy
    vitaminC: 6.0,
    vitaminD: 0.0009, // 0.9 mcg converted to mg
    vitaminE: 1.2,
    vitaminK: 0.008,
    vitaminB1: 0.05,
    vitaminB2: 0.18,
    vitaminB3: 0.8,
    vitaminB6: 0.12,
    folate: 0.025,
    vitaminB12: 0.0007, // 0.7 mcg converted to mg
    calcium: 40,
    iron: 1.2,
    magnesium: 15,
    zinc: 0.8,
    iodine: 0.025,
    selenium: 0.018,
    copper: 0.08,
    potassium: 220,
    phosphorus: 120,
  },

  chicken_curry: {
    label: "CHICKEN CURRY",
    calories: 175,
    protein: 14.5,
    saturatedFat: 2.0,
    unsaturatedFat: 7.0,
    solubleFiber: 0.3,
    insolubleFiber: 0.7,
    vitaminA: 0.03,
    vitaminC: 4.5,
    vitaminD: 0.0001,
    vitaminE: 1.0,
    vitaminK: 0.006,
    vitaminB1: 0.06,
    vitaminB2: 0.12,
    vitaminB3: 4.5,
    vitaminB6: 0.3,
    folate: 0.01,
    vitaminB12: 0.0003, // 0.3 mcg converted to mg
    calcium: 25,
    iron: 1.1,
    magnesium: 20,
    zinc: 1.2,
    iodine: 0.015,
    selenium: 0.015,
    copper: 0.09,
    potassium: 240,
    phosphorus: 130,
  },

  mutton_curry: {
    label: "MUTTON CURRY",
    calories: 215,
    protein: 14.0,
    saturatedFat: 4.5,
    unsaturatedFat: 9.5,
    solubleFiber: 0.3,
    insolubleFiber: 0.7,
    vitaminA: 0.03,
    vitaminC: 4.5,
    vitaminD: 0.0002,
    vitaminE: 0.8,
    vitaminK: 0.006,
    vitaminB1: 0.08,
    vitaminB2: 0.18,
    vitaminB3: 3.5,
    vitaminB6: 0.2,
    folate: 0.012,
    vitaminB12: 0.0015, // 1.5 mcg converted to mg
    calcium: 30,
    iron: 2.2,
    magnesium: 22,
    zinc: 3.5,
    iodine: 0.015,
    selenium: 0.012,
    copper: 0.15,
    potassium: 260,
    phosphorus: 150,
  },

  fish_curry: {
    label: "FISH CURRY",
    calories: 145,
    protein: 12.5,
    saturatedFat: 1.5,
    unsaturatedFat: 6.5, // High in Poly/Mono from fish and oil
    solubleFiber: 0.2,
    insolubleFiber: 0.3,
    vitaminA: 0.04,
    vitaminC: 5.0,
    vitaminD: 0.0025, // 2.5 mcg converted to mg (High from fish)
    vitaminE: 1.1,
    vitaminK: 0.004,
    vitaminB1: 0.06,
    vitaminB2: 0.08,
    vitaminB3: 2.5,
    vitaminB6: 0.25,
    folate: 0.01,
    vitaminB12: 0.002, // 2 mcg converted to mg (High from fish)
    calcium: 45, // Higher if small fish with bones used
    iron: 0.8,
    magnesium: 28,
    zinc: 0.6,
    iodine: 0.045, // High from marine fish
    selenium: 0.03, // High from fish
    copper: 0.08,
    potassium: 280,
    phosphorus: 180,
  },

  pizza: {
    label: "PIZZA (STANDARD CHEESE & VEG)",
    calories: 265,
    protein: 11.5,
    saturatedFat: 4.5,
    unsaturatedFat: 5.5,
    solubleFiber: 0.6,
    insolubleFiber: 1.6,
    vitaminA: 0.08, // From cheese and tomato
    vitaminC: 2.5,
    vitaminD: 0.0002,
    vitaminE: 0.6,
    vitaminK: 0.006,
    vitaminB1: 0.35, // Enriched crust
    vitaminB2: 0.25,
    vitaminB3: 2.8,
    vitaminB6: 0.1,
    folate: 0.08,
    vitaminB12: 0.0004, // 0.4 mcg from cheese
    calcium: 180, // High from cheese
    iron: 2.5,
    magnesium: 24,
    zinc: 1.2,
    iodine: 0.025,
    selenium: 0.02,
    copper: 0.1,
    potassium: 175,
    phosphorus: 210,
  },

  white_bread: {
    label: "WHITE BREAD",
    calories: 265,
    protein: 8.8,
    saturatedFat: 0.7,
    unsaturatedFat: 2.5,
    solubleFiber: 0.7,
    insolubleFiber: 2.0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.2,
    vitaminK: 0.0002,
    vitaminB1: 0.4, // Often fortified
    vitaminB2: 0.25, // Often fortified
    vitaminB3: 3.8, // Often fortified
    vitaminB6: 0.08,
    folate: 0.11, // Often fortified
    vitaminB12: 0,
    calcium: 140, // Often fortified / dough conditioners
    iron: 3.6,
    magnesium: 25,
    zinc: 0.7,
    iodine: 0.01,
    selenium: 0.022,
    copper: 0.12,
    potassium: 115,
    phosphorus: 105,
  },

  brown_bread: {
    label: "BROWN BREAD (WHOLE WHEAT)",
    calories: 250,
    protein: 10.5,
    saturatedFat: 0.8,
    unsaturatedFat: 2.7,
    solubleFiber: 1.5,
    insolubleFiber: 4.5,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.5,
    vitaminK: 0.002,
    vitaminB1: 0.35,
    vitaminB2: 0.15,
    vitaminB3: 4.2,
    vitaminB6: 0.2,
    folate: 0.05,
    vitaminB12: 0,
    calcium: 80,
    iron: 2.8,
    magnesium: 75,
    zinc: 1.5,
    iodine: 0.01,
    selenium: 0.035,
    copper: 0.25,
    potassium: 220,
    phosphorus: 200,
  },
  //____________Seeds___________
  roasted_peanuts: {
    label: "ROASTED PEANUTS (DRY ROASTED)",
    calories: 585,
    protein: 23.7,
    saturatedFat: 6.8,
    unsaturatedFat: 40.0, // Combined mono and poly
    solubleFiber: 2.5,
    insolubleFiber: 6.0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 6.9,
    vitaminK: 0.001, // 1 mcg converted to mg
    vitaminB1: 0.44,
    vitaminB2: 0.1,
    vitaminB3: 13.5,
    vitaminB6: 0.26,
    folate: 0.145, // 145 mcg converted to mg
    vitaminB12: 0,
    calcium: 54,
    iron: 2.26,
    magnesium: 176,
    zinc: 3.3,
    iodine: 0,
    selenium: 0.007, // 7 mcg converted to mg
    copper: 0.67,
    potassium: 658,
    phosphorus: 358,
  },

  roasted_pistachios: {
    label: "ROASTED PISTACHIOS",
    calories: 572,
    protein: 21.0,
    saturatedFat: 5.6,
    unsaturatedFat: 37.5,
    solubleFiber: 2.8,
    insolubleFiber: 7.5,
    vitaminA: 0.013, // 13 mcg RAE converted to mg
    vitaminC: 3.0,
    vitaminD: 0,
    vitaminE: 2.8,
    vitaminK: 0.013, // 13 mcg converted to mg
    vitaminB1: 0.8,
    vitaminB2: 0.23,
    vitaminB3: 1.4,
    vitaminB6: 1.1,
    folate: 0.05, // 50 mcg converted to mg
    vitaminB12: 0,
    calcium: 107,
    iron: 4.0,
    magnesium: 109,
    zinc: 2.3,
    iodine: 0,
    selenium: 0.009, // 9 mcg converted to mg
    copper: 1.3,
    potassium: 1007,
    phosphorus: 469,
  },

  raw_cashews: {
    label: "RAW CASHEWS",
    calories: 553,
    protein: 18.2,
    saturatedFat: 7.8,
    unsaturatedFat: 31.5,
    solubleFiber: 1.0,
    insolubleFiber: 2.3,
    vitaminA: 0,
    vitaminC: 0.5,
    vitaminD: 0,
    vitaminE: 0.9,
    vitaminK: 0.034, // 34 mcg converted to mg
    vitaminB1: 0.4,
    vitaminB2: 0.06,
    vitaminB3: 1.06,
    vitaminB6: 0.4,
    folate: 0.025, // 25 mcg converted to mg
    vitaminB12: 0,
    calcium: 37,
    iron: 6.68,
    magnesium: 292,
    zinc: 5.78,
    iodine: 0,
    selenium: 0.019, // 19 mcg converted to mg
    copper: 2.2,
    potassium: 660,
    phosphorus: 593,
  },

  raisins: {
    label: "RAISINS (DARK SEEDLESS)",
    calories: 299,
    protein: 3.0,
    saturatedFat: 0.1,
    unsaturatedFat: 0.3,
    solubleFiber: 1.5,
    insolubleFiber: 2.2,
    vitaminA: 0,
    vitaminC: 2.3,
    vitaminD: 0,
    vitaminE: 0.1,
    vitaminK: 0.003, // 3 mcg converted to mg
    vitaminB1: 0.1,
    vitaminB2: 0.12,
    vitaminB3: 0.76,
    vitaminB6: 0.17,
    folate: 0.005, // 5 mcg converted to mg
    vitaminB12: 0,
    calcium: 50,
    iron: 1.88,
    magnesium: 32,
    zinc: 0.22,
    iodine: 0,
    selenium: 0.0006, // 0.6 mcg converted to mg
    copper: 0.3,
    potassium: 749,
    phosphorus: 101,
  },

  dried_figs: {
    label: "DRIED FIGS",
    calories: 249,
    protein: 3.3,
    saturatedFat: 0.1,
    unsaturatedFat: 0.4,
    solubleFiber: 2.5,
    insolubleFiber: 7.3,
    vitaminA: 0.001,
    vitaminC: 1.2,
    vitaminD: 0,
    vitaminE: 0.35,
    vitaminK: 0.015, // 15 mcg converted to mg
    vitaminB1: 0.08,
    vitaminB2: 0.08,
    vitaminB3: 0.6,
    vitaminB6: 0.1,
    folate: 0.009, // 9 mcg converted to mg
    vitaminB12: 0,
    calcium: 162, // Very rich in calcium
    iron: 2.0,
    magnesium: 68,
    zinc: 0.55,
    iodine: 0,
    selenium: 0.0006,
    copper: 0.28,
    potassium: 680,
    phosphorus: 67,
  },

  roasted_musk_melon_seeds: {
    label: "ROASTED MUSK MELON SEEDS",
    calories: 550,
    protein: 28.0,
    saturatedFat: 8.5,
    unsaturatedFat: 38.0,
    solubleFiber: 1.5,
    insolubleFiber: 3.5,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 1.5,
    vitaminK: 0,
    vitaminB1: 0.3,
    vitaminB2: 0.1,
    vitaminB3: 1.2,
    vitaminB6: 0.2,
    folate: 0.03, // 30 mcg converted to mg
    vitaminB12: 0,
    calcium: 40,
    iron: 4.5,
    magnesium: 350,
    zinc: 5.0,
    iodine: 0,
    selenium: 0.01, // 10 mcg converted to mg
    copper: 1.2,
    potassium: 850,
    phosphorus: 750,
  },

  roasted_pumpkin_seeds: {
    label: "ROASTED PUMPKIN SEEDS (PEPITAS)",
    calories: 574,
    protein: 29.8,
    saturatedFat: 8.5,
    unsaturatedFat: 39.5,
    solubleFiber: 1.8,
    insolubleFiber: 4.7,
    vitaminA: 0.001,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.5,
    vitaminK: 0.051, // 51 mcg converted to mg
    vitaminB1: 0.2,
    vitaminB2: 0.15,
    vitaminB3: 4.4,
    vitaminB6: 0.2,
    folate: 0.057, // 57 mcg converted to mg
    vitaminB12: 0,
    calcium: 43,
    iron: 8.0,
    magnesium: 550, // Extremely rich source of magnesium
    zinc: 7.6, // Extremely rich source of zinc
    iodine: 0,
    selenium: 0.009, // 9 mcg converted to mg
    copper: 1.3,
    potassium: 780,
    phosphorus: 1174,
  },

  roasted_melon_seeds: {
    label: "ROASTED WATERMELON / MELON SEEDS",
    calories: 557,
    protein: 28.3,
    saturatedFat: 9.7,
    unsaturatedFat: 37.0,
    solubleFiber: 1.5,
    insolubleFiber: 3.5,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0,
    vitaminK: 0,
    vitaminB1: 0.19,
    vitaminB2: 0.14,
    vitaminB3: 3.5,
    vitaminB6: 0.09,
    folate: 0.058, // 58 mcg converted to mg
    vitaminB12: 0,
    calcium: 54,
    iron: 7.2,
    magnesium: 515,
    zinc: 10.2,
    iodine: 0,
    selenium: 0.016, // 16 mcg converted to mg
    copper: 0.68,
    potassium: 648,
    phosphorus: 755,
  },

  soaked_almonds: {
    label: "SOAKED ALMONDS (WITH WATER WEIGHT)",
    calories: 463, // Scaled for ~20% water weight
    protein: 16.9,
    saturatedFat: 3.0,
    unsaturatedFat: 36.3,
    solubleFiber: 1.0,
    insolubleFiber: 9.0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 20.5,
    vitaminK: 0,
    vitaminB1: 0.16,
    vitaminB2: 0.88,
    vitaminB3: 2.8,
    vitaminB6: 0.1,
    folate: 0.035, // 35 mcg converted to mg
    vitaminB12: 0,
    calcium: 215,
    iron: 2.96,
    magnesium: 214,
    zinc: 2.5,
    iodine: 0,
    selenium: 0.002,
    copper: 0.8,
    potassium: 585,
    phosphorus: 380,
  },

  roasted_almonds: {
    label: "ROASTED ALMONDS",
    calories: 598,
    protein: 21.0,
    saturatedFat: 4.1,
    unsaturatedFat: 46.0,
    solubleFiber: 1.2,
    insolubleFiber: 9.7,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 25.0,
    vitaminK: 0,
    vitaminB1: 0.2,
    vitaminB2: 1.1,
    vitaminB3: 3.6,
    vitaminB6: 0.1,
    folate: 0.043, // 43 mcg converted to mg
    vitaminB12: 0,
    calcium: 268,
    iron: 3.7,
    magnesium: 279,
    zinc: 3.3,
    iodine: 0,
    selenium: 0.003, // 3 mcg converted to mg
    copper: 1.0,
    potassium: 728,
    phosphorus: 474,
  },

  peanut_butter: {
    label: "PEANUT BUTTER (100% NATURAL & UNSWEETENED)",
    calories: 588,
    protein: 25.0,
    saturatedFat: 10.0,
    unsaturatedFat: 40.0,
    solubleFiber: 2.0,
    insolubleFiber: 4.0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 9.0,
    vitaminK: 0.003, // 3 mcg converted to mg
    vitaminB1: 0.11,
    vitaminB2: 0.1,
    vitaminB3: 13.2,
    vitaminB6: 0.5,
    folate: 0.074, // 74 mcg converted to mg
    vitaminB12: 0,
    calcium: 43,
    iron: 1.9,
    magnesium: 154,
    zinc: 2.5,
    iodine: 0,
    selenium: 0.005, // 5 mcg converted to mg
    copper: 0.4,
    potassium: 649,
    phosphorus: 358,
  },

  whey_protein: {
    label: "WHEY PROTEIN (UNFLAVORED CONCENTRATE)",
    calories: 382,
    protein: 76.0,
    saturatedFat: 3.5,
    unsaturatedFat: 1.5,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0.03, // 30 mcg RAE converted to mg
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0,
    vitaminK: 0,
    vitaminB1: 0.2,
    vitaminB2: 1.2,
    vitaminB3: 0.5,
    vitaminB6: 0.1,
    folate: 0.01, // 10 mcg converted to mg
    vitaminB12: 0.0025, // 2.5 mcg from dairy source converted to mg
    calcium: 550,
    iron: 0.5,
    magnesium: 70,
    zinc: 0.8,
    iodine: 0.05,
    selenium: 0.02, // 20 mcg converted to mg
    copper: 0.05,
    potassium: 500,
    phosphorus: 350,
  },

  mass_gainer: {
    label: "MASS GAINER (COMMERCIAL POWDER)",
    calories: 380,
    protein: 15.0, // Carbohydrate heavy
    saturatedFat: 1.0,
    unsaturatedFat: 1.5,
    solubleFiber: 0.5,
    insolubleFiber: 1.5,
    vitaminA: 0.15, // Heavily fortified
    vitaminC: 15.0, // Fortified
    vitaminD: 0.001, // 1 mcg fortified converted to mg
    vitaminE: 3.0,
    vitaminK: 0.01, // 10 mcg converted to mg
    vitaminB1: 0.5,
    vitaminB2: 0.5,
    vitaminB3: 5.0,
    vitaminB6: 0.5,
    folate: 0.1, // 100 mcg converted to mg
    vitaminB12: 0.001, // 1 mcg converted to mg
    calcium: 200,
    iron: 3.0,
    magnesium: 50,
    zinc: 3.0,
    iodine: 0.03,
    selenium: 0.015, // 15 mcg converted to mg
    copper: 0.5,
    potassium: 350,
    phosphorus: 200,
  },

  soaked_chea_seeds: {
    label: "SOAKED CHIA SEEDS (WITH WATER WEIGHT)",
    calories: 97, // 100g soaked = approx 20g dry seeds
    protein: 3.3,
    saturatedFat: 0.6,
    unsaturatedFat: 5.5,
    solubleFiber: 1.2,
    insolubleFiber: 5.6,
    vitaminA: 0,
    vitaminC: 0.3,
    vitaminD: 0,
    vitaminE: 0.1,
    vitaminK: 0,
    vitaminB1: 0.12,
    vitaminB2: 0.03,
    vitaminB3: 1.7,
    vitaminB6: 0.01,
    folate: 0.01, // 10 mcg converted to mg
    vitaminB12: 0,
    calcium: 126,
    iron: 1.5,
    magnesium: 67,
    zinc: 0.9,
    iodine: 0,
    selenium: 0.011, // 11 mcg converted to mg
    copper: 0.18,
    potassium: 81,
    phosphorus: 172,
  },

  soaked_basil_seeds: {
    label: "SOAKED BASIL SEEDS / SABJA (WITH WATER WEIGHT)",
    calories: 92, // 100g soaked = approx 20g dry seeds
    protein: 3.0,
    saturatedFat: 0.5,
    unsaturatedFat: 4.0,
    solubleFiber: 1.5,
    insolubleFiber: 6.5,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.1,
    vitaminK: 0.005, // 5 mcg converted to mg
    vitaminB1: 0.02,
    vitaminB2: 0.03,
    vitaminB3: 0.2,
    vitaminB6: 0.03,
    folate: 0.005, // 5 mcg converted to mg
    vitaminB12: 0,
    calcium: 140,
    iron: 1.4,
    magnesium: 60,
    zinc: 0.6,
    iodine: 0,
    selenium: 0.005, // 5 mcg converted to mg
    copper: 0.15,
    potassium: 120,
    phosphorus: 100,
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
  const isFemale = profile.gender === "Female";
  const baseCalories =
    10 * profile.weight +
    6.25 * profile.height -
    5 * profile.age +
    (isFemale ? -161 : 5);
  const calculatedCalories = Math.round(
    baseCalories *
      activityFactor(profile.activityLevel) *
      bodyTypeFactor(profile.bodyType) *
      targetFactor(profile.target),
  );
  const calories =
    profile.calorieTarget > 0
      ? Math.round(profile.calorieTarget)
      : calculatedCalories;
  const proteinRate = Math.max(
    isFemale ? 1.3 : 1.4,
    proteinFactor(profile) - (isFemale ? 0.1 : 0),
  );
  const protein = Math.round(profile.weight * proteinRate);
  const saturatedFat = Math.round((calories * 0.07) / 9);
  const unsaturatedFat = Math.round((calories * 0.17) / 9);
  const totalFiber = Math.max(
    isFemale ? 25 : 38,
    Math.round((calories / 1000) * 14),
  );
  const solubleFiber = Math.round(totalFiber * 0.25);
  const insolubleFiber = Math.max(1, totalFiber - solubleFiber);
  return {
    calories,
    protein,
    saturatedFat,
    unsaturatedFat,
    solubleFiber,
    insolubleFiber,
  };
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

const MICRONUTRIENTS = [
  [
    "vitaminA",
    "Vitamin A",
    0.6,
    "mg RAE",
    "Sweet potatoes, carrots, tuna, butternut squash, spinach, cantaloupe, lettuce, red bell peppers, chicken liver, mango",
  ],
  [
    "vitaminC",
    "Vitamin C",
    45,
    "mg",
    "Oranges, strawberries, kiwi, bell peppers, broccoli, Brussels sprouts, tomatoes, papaya, lemons, grapefruits",
  ],
  [
    "vitaminD",
    "Vitamin D",
    0.005,
    "mg",
    "Salmon, sardines, herring, canned tuna, cod liver oil, egg yolks, mushrooms, fortified milk, fortified orange juice, fortified cereals",
  ],
  [
    "vitaminE",
    "Vitamin E",
    10,
    "mg",
    "Sunflower seeds, almonds, peanuts, spinach, broccoli, hazelnuts, pine nuts, avocado, red bell peppers, mango",
  ],
  [
    "vitaminK",
    "Vitamin K",
    0.055,
    "mg",
    "Kale, spinach, broccoli, Brussels sprouts, cabbage, Swiss chard, collard greens, green beans, prunes, kiwi",
  ],
  [
    "vitaminB1",
    "Vitamin B1 (Thiamine)",
    1.1,
    "mg",
    "Sunflower seeds, brown rice, whole wheat, green peas, lentils, pecans, black beans, macadamia nuts, edamame",
  ],
  [
    "vitaminB2",
    "Vitamin B2 (Riboflavin)",
    1.1,
    "mg",
    "Milk, yogurt, cheese, eggs, chicken breast, salmon, almonds, spinach",
  ],
  [
    "vitaminB3",
    "Vitamin B3 (Niacin)",
    14,
    "mg NE",
    "Chicken breast, turkey breast, chicken liver, tuna, salmon, peanuts, avocado, brown rice, whole wheat, mushrooms",
  ],
  [
    "vitaminB6",
    "Vitamin B6",
    1.3,
    "mg",
    "Chickpeas, chicken liver, tuna, salmon, chicken breast, fortified cereals, potatoes, turkey, bananas, marinara sauce",
  ],
  [
    "folate",
    "Folate (Vitamin B9)",
    0.4,
    "mg DFE",
    "Spinach, black-eyed peas, asparagus, Brussels sprouts, romaine lettuce, avocado, broccoli, mustard greens, green peas, kidney beans",
  ],
  [
    "vitaminB12",
    "Vitamin B12",
    0.0024,
    "mg",
    "Chicken liver, clams, sardines, fortified nutritional yeast, trout, salmon, milk, yogurt, eggs",
  ],
  [
    "calcium",
    "Calcium",
    1000,
    "mg",
    "Milk, cheese, yogurt, fortified orange juice, winter squash, edamame, tofu, canned sardines, almonds, kale",
  ],
  [
    "iron",
    "Iron",
    8,
    "mg",
    "Red meat, poultry, seafood, beans, spinach, raisins, fortified cereals, peas, lentils",
  ],
  [
    "magnesium",
    "Magnesium",
    310,
    "mg",
    "Pumpkin seeds, chia seeds, almonds, spinach, cashews, peanuts, edamame, black beans, peanut butter, brown rice",
  ],
  [
    "zinc",
    "Zinc",
    8,
    "mg",
    "Oysters, crab, pumpkin seeds, turkey, cheddar cheese, shrimp, lentils, chickpeas",
  ],
  [
    "iodine",
    "Iodine",
    0.15,
    "mg",
    "Seaweed, cod, milk, yogurt, cheese, iodized salt, shrimp, tuna, eggs, prunes",
  ],
  [
    "selenium",
    "Selenium",
    0.055,
    "mg",
    "Brazil nuts, halibut, tuna, brown rice, eggs, turkey, chicken, cottage cheese, baked beans",
  ],
  [
    "copper",
    "Copper",
    0.9,
    "mg",
    "Oysters, shiitake mushrooms, tofu, sweet potatoes, sesame seeds, cashews, chickpeas, salmon, dark chocolate, turkey",
  ],
  [
    "potassium",
    "Potassium",
    3500,
    "mg",
    "Bananas, sweet potatoes, spinach, avocados, potatoes, white beans, tomatoes, yogurt, salmon, mushrooms",
  ],
  [
    "phosphorus",
    "Phosphorus",
    700,
    "mg",
    "Chicken, turkey, salmon, milk, yogurt, sunflower seeds, pumpkin seeds, almonds, whole grains",
  ],
];

const GENDER_MICRONUTRIENT_REFERENCES = {
  Male: {
    vitaminA: 0.9,
    vitaminC: 90,
    vitaminK: 0.12,
    vitaminB1: 1.2,
    vitaminB2: 1.3,
    vitaminB3: 16,
    iron: 8,
    magnesium: 400,
    zinc: 11,
    potassium: 3400,
  },
  Female: {
    vitaminA: 0.7,
    vitaminC: 75,
    vitaminK: 0.09,
    vitaminB1: 1.1,
    vitaminB2: 1.1,
    vitaminB3: 14,
    iron: 18,
    magnesium: 310,
    zinc: 8,
    potassium: 2600,
  },
};

function getGenderMicronutrientReference(key, reference, gender) {
  return GENDER_MICRONUTRIENT_REFERENCES[gender]?.[key] ?? reference;
}

function calculateMicronutrients(food, grams) {
  return Object.fromEntries(
    MICRONUTRIENTS.map(([key]) => [key, ((food[key] || 0) * grams) / 100]),
  );
}

function formatMicronutrientAmount(amount) {
  return amount.toFixed(5);
}

function renderMicronutrients(entries) {
  const container = document.getElementById("micronutrientList");
  if (!container) return;
  const totals = Object.fromEntries(MICRONUTRIENTS.map(([key]) => [key, 0]));

  entries.forEach((entry) => {
    const food = getFood(entry.foodKey || entry.foodLabel);
    if (!food) return;
    const values = calculateMicronutrients(food, entry.grams);
    MICRONUTRIENTS.forEach(([key]) => {
      totals[key] += values[key];
    });
  });

  container.innerHTML = MICRONUTRIENTS.map(
    ([key, label, reference, unit, foodSuggestions]) => {
      const adjustedReference = getGenderMicronutrientReference(
        key,
        reference,
        userProfile?.gender,
      );
      const consumed = totals[key];
      const percentage = Math.min(100, (consumed / adjustedReference) * 100);
      const guidance =
        consumed < adjustedReference
          ? `<div class="micronutrientGuidance"><strong>FOODS TO CONSIDER</strong><ul>${foodSuggestions
              .split(", ")
              .map((food) => `<li>${food}</li>`)
              .join("")}</ul></div>`
          : "";
      return `
      <div class="micronutrientCard">
        <div class="micronutrientHeader">
          <span>${label}</span>
          <strong>${formatMicronutrientAmount(consumed)} / ${adjustedReference} ${unit}</strong>
        </div>
        <div class="micronutrientProgressTrack" role="progressbar" aria-label="${label} daily intake" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percentage.toFixed(1)}">
          <span style="width: ${percentage.toFixed(1)}%"></span>
        </div>
        ${guidance}
      </div>`;
    },
  ).join("");
}

function setStatus(message, isError = true) {
  const status = document.getElementById("statusMessage");
  status.textContent = message;
  status.style.color = isError ? "#B42318" : "#757575";
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
  renderMicronutrients(entries);
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
  context.strokeStyle = "#DCE9DF";
  context.fillStyle = "#64756A";
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
  drawLine("calories", "#757575");
  drawLine("protein", "#15803D", 10);
  context.fillStyle = "#64756A";
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
  context.fillStyle = "#757575";
  context.fillRect(width - 154, 10, 12, 3);
  context.fillStyle = "#24352A";
  context.fillText("Calories", width - 136, 14);
  context.fillStyle = "#15803D";
  context.fillRect(width - 76, 10, 12, 3);
  context.fillStyle = "#24352A";
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
        if (!allEntries.length || !confirm("DELETE ALL SAVED FOOD ENTRIES?"))
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
