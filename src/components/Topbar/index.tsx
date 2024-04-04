import { Container, Link, Text } from "kitchn";
import useSWR from "swr";

import { fetcher } from "../../services/swr";

const Topbar = () => {
  const { data, error, isLoading } = useSWR<{
    Data: {
      clients: number;
    };
  }>("https://servers-frontend.fivem.net/api/servers/single/q8538p", fetcher, {
    refreshInterval: 5000,
  });

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
          {`${data && !error && !isLoading ? data.Data.clients : "-"} citoyens en ville`}
        </Text>
        <Text size={"inherit"} color={"light"} span>
          <Text size={"inherit"} color={"light"} mx={"tiny"} span>
            {"•"}
          </Text>
          {`${data && !error && !isLoading ? data.Data.clients : "-"} effectifs`}
        </Text>
        <Text size={"inherit"} color={"light"} span>
          <Text size={"inherit"} color={"light"} mx={"tiny"} span>
            {"•"}
          </Text>
          {`${data && !error && !isLoading ? data.Data.clients : "-"} ems en service`}
        </Text>
      </Text>
    </Container>
  );
};

export default Topbar;
