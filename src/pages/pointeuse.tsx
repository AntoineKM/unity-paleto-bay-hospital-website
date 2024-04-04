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

const WorkPage: NextPage = () => {
  const [value, setValue] = React.useState(0);
  const session = useSession();
  const { theme } = useTheme();
  const { setToast } = useToasts();

  if (session.status === "loading") {
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
          <Entity
            thumbnail={<Avatar size={32} text={"Evan Impala"} />}
            checkbox={
              <Text color={"light"} size={"small"}>
                {"1."}
              </Text>
            }
            menuContent={<Menu.Item>{"Foo"}</Menu.Item>}
          >
            <EntityField title={"Evan Impala"} description={"Cadre Santé"} />
            <EntityField label title={"Téléphone"} description={"556-8934"} />
            <EntityField justify={"flex-end"} description={"34h 23m 12s"} />
          </Entity>

          <Entity
            thumbnail={<Avatar size={32} text={"Cedric Cardoso"} />}
            checkbox={
              <Text color={"light"} size={"small"}>
                {"2."}
              </Text>
            }
            menuContent={<Menu.Item>{"Foo"}</Menu.Item>}
          >
            <EntityField title={"Cedric Cardoso"} description={"Cadre Santé"} />
            <EntityField label title={"Téléphone"} description={"556-8934"} />
            <EntityField justify={"flex-end"} description={"34h 23m 12s"} />
          </Entity>
        </Container>
      </Container>
    </Container>
  );
};

export default WorkPage;
