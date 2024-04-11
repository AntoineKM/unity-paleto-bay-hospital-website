import { Button, Container, Progress, Text, useTheme } from "kitchn";
import { NextPage } from "next";
import React from "react";

import MemberList from "../components/member/list";

const WorkPage: NextPage = () => {
  const [value, setValue] = React.useState(0);
  const { theme } = useTheme();

  return (
    <Container>
      <Container align={"center"} gap={"normal"}>
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
              setValue(value + 10);
            }}
            prefix={"✨"}
          >
            {"Prise de service"}
          </Button>
          <Button
            type={"danger"}
            onClick={() => {
              setValue(value - 10);
            }}
            prefix={"🚪"}
          >
            {"Fin de service"}
          </Button>
        </Container>

        <MemberList />
      </Container>
    </Container>
  );
};

export default WorkPage;
