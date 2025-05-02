import { Navigate, useNavigate } from "react-router";
import { Button } from "../../../../shared/components/Button/Button";
import { Card } from "../../../../shared/components/Card/Card";
import { Icon } from "../../../../shared/components/Icon";
import DefaultLayout from "../../../../shared/layouts/DefaultLayout";
import { SectionLayout } from "../../../../shared/layouts/SectionLayout";
import { UpsertStaffForm } from "../components/UpsertStaffForm";
import { useStaffManagement } from "../hooks/useStaffManagement";

//📌 => Orden convencional para estructura de componentes
export const StaffUpsertPage = () => {
  const { currentPage, MAIN_ROUTE, shouldRedirect } = useStaffManagement();

  const navigate = useNavigate();
  const ROUTE_INITIAL = `${MAIN_ROUTE}?page=${currentPage || 1}`;
  if (shouldRedirect) return <Navigate to={ROUTE_INITIAL} />;

  return (
    <DefaultLayout>
      <SectionLayout title="Personal" subtitle="Administración de usuarios">
        <Card
          headerCard="Registro"
          headerRightContentCard={
            <Button
              id="btnBack-upsertStaff"
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
          <UpsertStaffForm />
        </Card>
      </SectionLayout>
    </DefaultLayout>
  );
};
