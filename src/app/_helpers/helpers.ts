export const saveToLocalStorage = (name: string, state: any) => {
  try {
    localStorage.setItem(name, JSON.stringify(state));
  } catch (e) {
    console.error("ERROR AL GUARDAR EN LOCALSTORAGE");
    console.error(e);
  }
};

export const loadFromLocalStorage = (name: string) => {
  try {
    const stateStr = localStorage.getItem(name);
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error("ERROR AL CARGAR DE LOCALSTORAGE");
    console.error(e);
    return undefined;
  }
};
