import { Button, Container } from "kitchn";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

const IndexPage = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <Container align={"center"}>
      {session.data ? (
        <Button onClick={() => router.push("/pointeuse")}>
          {"Connecté en tant que "}
          {session.data.user?.name}
        </Button>
      ) : (
        <Button onClick={() => signIn("discord")}>
          {"Se connecter avec Discord"}
        </Button>
      )}
    </Container>
  );
};

export default IndexPage;
