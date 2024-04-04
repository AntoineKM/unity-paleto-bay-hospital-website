import {
  Avatar,
  Button,
  Container,
  Entity,
  EntityField,
  Menu,
  Progress,
  Text,
  useTheme,
  useToasts,
} from "kitchn";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";

import { ResponseMembersEmployeesData } from "./api/members/employees";
import { fetcher } from "../services/swr";

const WorkPage: NextPage = () => {
  const [value, setValue] = React.useState(0);
  const session = useSession();
  const { theme } = useTheme();
  const { setToast } = useToasts();
  const { data } = useSWR<ResponseMembersEmployeesData>(
    "/api/members/employees",
    fetcher,
  );

  if (session.status === "loading" || !data) {
    return <div>{"Loading..."}</div>;
  }

  if (session.status === "unauthenticated") {
    return <div>{"You must be authenticated to view this page."}</div>;
  }

  return (
    <Container>
      <Container align={"center"} gap={"normal"}>
        <Button shape={"round"} size={"small"} type={"dark"}>
          {session.data?.user.name}
        </Button>
        <Text size={"large"} weight={"bold"} align={"center"}>
          {"24h 36m 12s (148%)"}
        </Text>
      </Container>
      <Container w={"mobile"} mx={"auto"} mt={"normal"}>
        <Progress
          value={value}
          colors={{
            0: theme.colors.accent.danger,
            25: theme.colors.accent.primary,
            100: theme.colors.accent.success,
          }}
        />

        <Container
          mt={"large"}
          gap={"tiny"}
          align={"center"}
          justify={"center"}
          row
        >
          <Button
            type={"primary"}
            onClick={() => {
              setToast({
                text: "✨ Prise de service effectuée avec succès.",
                type: "success",
              });
              setValue(value + 10);
            }}
            prefix={"✨"}
          >
            {"Prise de service"}
          </Button>
          <Button
            type={"danger"}
            onClick={() => {
              setToast({
                text: "🚪 Fin de service effectuée avec succès.",
                type: "success",
              });
              setValue(value - 10);
            }}
            prefix={"🚪"}
          >
            {"Fin de service"}
          </Button>
        </Container>

        <Container mt={"large"}>
          {data?.employees &&
            data.employees.length > 0 &&
            data.employees.map((employee, i) => {
              return (
                <Entity
                  key={i}
                  thumbnail={<Avatar size={32} text={"Antoine"} />}
                  checkbox={
                    <Text color={"light"} size={"small"}>
                      {`${i + 1}.`}
                    </Text>
                  }
                  menuContent={
                    <>
                      <Menu.Item>{"Ajouter du temps"}</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item>
                        <Text accent={"danger"} size={"inherit"}>
                          {"Supprimer du temps"}
                        </Text>
                      </Menu.Item>
                      <Menu.Item>
                        <Text accent={"danger"} size={"inherit"}>
                          {"Annuler le service"}
                        </Text>
                      </Menu.Item>
                    </>
                  }
                >
                  <EntityField
                    title={`${employee.firstName} ${employee.lastName}`}
                    description={employee.grade}
                  />
                  <EntityField
                    label
                    title={"Téléphone"}
                    description={employee.phoneNumber}
                  />
                  <EntityField
                    label
                    title={"Ancienneté"}
                    description={`${employee.daysInCompany} jour${
                      employee.daysInCompany > 1 ? "s" : ""
                    }
                      `}
                  />
                  <EntityField
                    justify={"flex-end"}
                    description={"34h 23m 12s"}
                  />
                </Entity>
              );
            })}
        </Container>
      </Container>
    </Container>
  );
};

export default WorkPage;
