import { Container, Link, Skeleton, Text } from "kitchn";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { ResponseCountsData } from "../../pages/api/counts";
import { fetcher } from "../../services/swr";

const Topbar = () => {
  const session = useSession();
  const { data, error, isLoading } = useSWR<ResponseCountsData>(
    "/api/counts",
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  return (
    <Container px={"normal"} h={30} align={"center"} row>
      <Container align={"center"} row>
        <Text size={"small"} span>
          <Link href={"/"}>
            <Text size={"inherit"} weight={"black"} span>
              {"Unity RP 🐬"}
            </Text>
          </Link>
          <Text size={"inherit"} color={"light"} span>
            <Text size={"inherit"} color={"light"} mx={"tiny"} span>
              {"•"}
            </Text>
            {`${data && !error && !isLoading ? data.players : "-"} citoyens en ville`}
          </Text>
          <Text size={"inherit"} color={"light"} span>
            <Text size={"inherit"} color={"light"} mx={"tiny"} span>
              {"•"}
            </Text>
            {`${data && !error && !isLoading ? data.members : "-"} effectifs`}
          </Text>
          <Text size={"inherit"} color={"light"} span>
            <Text size={"inherit"} color={"light"} mx={"tiny"} span>
              {"•"}
            </Text>
            {`${data && !error && !isLoading ? data.workingMembers : "-"} ems en service`}
          </Text>
        </Text>
      </Container>
      <Container ml={"auto"} align={"center"} row>
        <Skeleton show={session.status === "loading"}>
          <Text size={"small"} color={"light"} span>
            {`Connecté en tant que ${session.data?.user?.firstName} ${session.data?.user?.lastName}`}
          </Text>
        </Skeleton>
      </Container>
    </Container>
  );
};

export default Topbar;
