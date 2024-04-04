import { Button } from "kitchn";
import { signIn } from "next-auth/react";

const IndexPage = () => {
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
