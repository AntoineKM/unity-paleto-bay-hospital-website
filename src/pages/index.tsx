import { Button, Container } from "kitchn";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();
  return (
    <Container align={"center"}>
      <Button onClick={() => router.push("/pointeuse")}>{"Pointeuse"}</Button>
    </Container>
  );
};

export default IndexPage;
