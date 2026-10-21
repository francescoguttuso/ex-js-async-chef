//Esercizio il compleanno dello Chef

const fetchJson = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
};

const getChefBirthday = async (id) => {
  try {
    const recipe = await fetchJson(`https://dummyjson.com/recipes/${id}`);

    const userId = recipe.userId;

    const chef = await fetchJson(`https://dummyjson.com/users/${userId}`);

    return dayjs(chef.birthDate).format("DD/MM/YYYY");
  } catch (error) {
    console.error("Errore durante il recupero dei dati:", error.message);
    throw error;
  }
};

getChefBirthday(1)
  .then((birthday) => console.log("Data di nascita dello chef:", birthday))
  .catch((error) => console.error("Errore:", error.message));
