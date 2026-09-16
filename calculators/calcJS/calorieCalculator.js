const dairyProducts = [
  {
    name: "milk",
    calories_kcal: 0.61,
    protein: 0.24,
    carbs_g: 0.048,
    fat_g: 0.0325,
    fiber_g: 0
  },
  {
    name: "cheese",
    protein: "7",
    calories: "100",
    calcium: "0.05",
  },
  {
    name: "carrot",
    protein: "7",
    calories: "100",
    calcium: "0.05",
  }
];

document.getElementById("loadCalories").addEventListener("click", function() {

    const searchText = document.getElementById("foodSearch").value
        .trim()
        .toLowerCase();
    
    const grams = document.getElementById("enterGrams").value;

    for (const i of dairyProducts) {

        if (searchText === i.name && grams > 0) {
            console.log("Found food: " + i.name);
            console.log("Protein: " + i.protein * grams);
            break;
        }
        else if (searchText === i.name && grams <= 0) {
          alert("Grams must be greater than 0");
          break;
        }
        else {
          alert("Enter the valid food name.");
          break;
        }
    }
});