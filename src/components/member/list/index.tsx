import {
  Avatar,
  Container,
  Entity,
  EntityField,
  Menu,
  Spacer,
  Text,
} from "kitchn";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { ResponseMembersEmployeesData } from "@/src/pages/api/members/employees";
import { fetcher } from "@/src/services/swr";

const MemberList: React.FC = () => {
  const session = useSession();
  const { data } = useSWR<ResponseMembersEmployeesData>(
    "/api/members/employees",
    fetcher,
  );

  return (
    <Container mt={"large"}>
      {data && session.status === "authenticated"
        ? data.employees &&
          data.employees.length > 0 && (
            <>
              {data.employees
                .filter(
                  (employee) =>
                    employee.discordId === session.data.user.discordId,
                )
                .map((employee, i) => {
                  return (
                    <Entity
                      key={i}
                      thumbnail={
                        <Avatar
                          size={32}
                          text={employee.firstName + " " + employee.lastName}
                        />
                      }
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
              <Spacer y={"normal"} />
              {data.employees
                .filter(
                  (employee) =>
                    employee.discordId !== session.data.user.discordId,
                )
                .map((employee, i) => {
                  return (
                    <Entity
                      key={i}
                      thumbnail={
                        <Avatar
                          size={32}
                          text={employee.firstName + " " + employee.lastName}
                        />
                      }
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
            </>
          )
        : Array.from({ length: 10 }).map((_, i) => (
            <Entity key={i} placeholder>
              <EntityField
                title={"Chargement..."}
                description={"Chargement..."}
              />
              <EntityField
                label
                title={"Téléphone"}
                description={"Chargement..."}
              />
              <EntityField
                label
                title={"Ancienneté"}
                description={"Chargement..."}
              />
              <EntityField justify={"flex-end"} description={"34h 23m 12s"} />
            </Entity>
          ))}
    </Container>
  );
};

export default MemberList;
