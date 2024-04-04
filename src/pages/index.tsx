import { Button } from "kitchn";
import { signIn, useSession } from "next-auth/react";

const IndexPage = () => {
  const session = useSession();

  console.log("session", session);

  return (
    <Button
      mt={"extraLarge"}
      onClick={() => {
        signIn("discord");
      }}
    >
      {"Se connecter"}
    </Button>
  );
};

export default IndexPage;
