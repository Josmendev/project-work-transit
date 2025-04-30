import { Navigate, useNavigate } from "react-router";
import { Button } from "../../../../shared/components/Button/Button";
import { Card } from "../../../../shared/components/Card/Card";
import { Icon } from "../../../../shared/components/Icon";
import DefaultLayout from "../../../../shared/layouts/DefaultLayout";
import { SectionLayout } from "../../../../shared/layouts/SectionLayout";
import { UpsertVehicleForm } from "../components/UpsertVehicleForm";
import { useVehicleManagement } from "../hooks/useVehicleManagement";

export const VehicleUpsertPage = () => {
  const { currentPage, MAIN_ROUTE, shouldRedirect } = useVehicleManagement();

  const navigate = useNavigate();
  const ROUTE_INITIAL = `${MAIN_ROUTE}?page=${currentPage || 1}`;
  if (shouldRedirect) return <Navigate to={ROUTE_INITIAL} />;

  return (
    <DefaultLayout>
      <SectionLayout title="Vehículo" subtitle="Administración de vehículos">
        <Card
          headerCard="Registro"
          headerRightContentCard={
            <Button
              id="btnBack-upsertVehicle"
              title="Regresar"
              classButton="btn-primary !w-auto text-paragraph-regular py-2"
              type="button"
              iconLeft={<Icon.Back />}
              onClick={() => navigate(ROUTE_INITIAL)}
            >
              Regresar
            </Button>
          }
        >
          <UpsertVehicleForm />
        </Card>
      </SectionLayout>
    </DefaultLayout>
  );
};
