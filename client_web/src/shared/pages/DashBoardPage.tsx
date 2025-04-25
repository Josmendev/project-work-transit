import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getUserInformation } from "../helpers/getUserInformation";
import DefaultLayout from "../layouts/DefaultLayout";
import { SectionLayout } from "../layouts/SectionLayout";

export const DashBoardPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user) throw new Error("User is not defined");

  const { userInformation } = getUserInformation(user);

  return (
    <DefaultLayout>
      <SectionLayout title="Inicio" subtitle="Bienvenido">
        <h3 className="text-h3-semibold">Bienvenido {userInformation ?? ""} 👋👋👋</h3>
      </SectionLayout>
    </DefaultLayout>
  );
};
