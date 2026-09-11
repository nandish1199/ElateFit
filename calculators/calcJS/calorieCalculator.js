document.getElementById('loadCalories').addEventListener('click', async () => {
    try {
      const response = await fetch('calorieData.json');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Display the retrieved data
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  });