const getChefBirthday = async (id) => {
  let recipe;

  // 1. Recupero della ricetta
  try {
    const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);

    recipe = await recipeResponse.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Non recupero la ricetta id ${id}`);
  }

  // 2. Controllo dell'errore restituito dall'API
  if (recipe.message) {
    throw new Error(recipe.message);
  }

  // 3. Recupero dei dati dello chef
  let chef;
  const userId = recipe.userId;

  try {
    const chefResponse = await fetch(`https://dummyjson.com/users/${userId}`);

    chef = await chefResponse.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Non recupero lo chef id ${userId}`);
  }

  // 4. Controllo dell'errore restituito dall'API
  if (chef.message) {
    throw new Error(chef.message);
  }

  // 5. Restituzione della data formattata
  return dayjs(chef.birthDate).format("DD/MM/YYYY");
};

// 6. Esecuzione della funzione
(async () => {
  try {
    const birthday = await getChefBirthday(1);
    console.log("Data di nascita dello chef:", birthday);
  } catch (error) {
    console.error("Errore:", error.message);
  }
})();
