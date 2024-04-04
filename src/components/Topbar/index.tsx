import { Container, Link, Text } from "kitchn";
import useSWR from "swr";

import { ResponseCountsData } from "../../pages/api/counts";
import { fetcher } from "../../services/swr";

const Topbar = () => {
  const { data, error, isLoading } = useSWR<ResponseCountsData>(
    "/api/counts",
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  return (
    <Container px={"normal"} h={30} align={"center"} row>
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
  );
};

export default Topbar;
