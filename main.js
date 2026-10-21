//Esercizio il compleanno dello Chef

const getChefBirthday = async (id) => {
  try {
    // 1. Recupero della ricetta
    const res = await fetch(`https://dummyjson.com/recipes/${id}`);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const recipe = await res.json();

    // 2. Recupero dell'identificativo dello chef
    const userId = recipe.userId;

    // 3. Recupero dei dati dello chef
    const resChef = await fetch(`https://dummyjson.com/users/${userId}`);

    if (!resChef.ok) {
      throw new Error(`HTTP ${resChef.status}: ${resChef.statusText}`);
    }

    const chefData = await resChef.json();

    // 4. Formattazione della data di nascita
    return dayjs(chefData.birthDate).format("DD/MM/YYYY");
  } catch (error) {
    console.error("Errore durante il recupero dei dati:", error.message);

    throw error;
  }
};

// 5. Esecuzione della funzione
getChefBirthday(1)
  .then((birthday) => {
    console.log("Data di nascita dello chef:", birthday);
  })
  .catch((error) => {
    console.error("Errore:", error.message);
  });
