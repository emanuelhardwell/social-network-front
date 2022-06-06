export const capitalizeFirstLetter = (str) => {
  const respaldo = "Noencontrado";

  if (str === undefined) {
    return respaldo.charAt(0).toUpperCase() + respaldo.slice(1);
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};
