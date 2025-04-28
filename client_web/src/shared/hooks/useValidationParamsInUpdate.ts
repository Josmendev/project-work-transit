import { useLocation, useParams } from "react-router";

export const useValidationParamsInUpdate = (mainRoute: string) => {
  // 📌 Hooks
  const { id } = useParams();
  const location = useLocation();

  // 📌 Validaciones antes del renderizado
  if (id == undefined || isNaN(Number(id))) return false;

  //Validacion para edit
  if (location.pathname !== `${mainRoute}/${id}/edit`) return false;

  return true;
};
