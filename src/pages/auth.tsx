import { Container, Spinner, Text } from "kitchn";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

const AuthPage: NextPage = () => {
  const session = useSession();

  if (session.status === "unauthenticated") {
    signIn("discord");
  }

  return (
    <Container
      position={"absolute"}
      top={"0"}
      left={"0"}
      w={"100vw"}
      h={"100vh"}
      align={"center"}
      justify={"center"}
      bg={"darkest"}
      zIndex={1000}
    >
      <Spinner />
      <Text size={"medium"} weight={"bold"} mt={"normal"}>
        {"Connexion en cours..."}
      </Text>
    </Container>
  );
};

export default AuthPage;
