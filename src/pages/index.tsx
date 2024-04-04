import kitchn, { Container, convertRGBToRGBA, Image, Text } from "kitchn";
import Head from "next/head";

import Topbar from "../components/Topbar";

const IndexPage = () => {
  return (
    <>
      <Topbar />
      <Container
        maxW={"laptop"}
        mx={"auto"}
        p={"extraLarge"}
        justify={"space-between"}
        align={"center"}
      >
        <Head>
          <title>{"Paleto Bay Hospital"}</title>
          <link rel={"icon"} href={"/favicon.ico"} />
        </Head>
        <Centered pt={"Large"} justify={"center"} align={"center"} gap={18} row>
          <Image src={"/icon.png"} alt={"Kitchn Icon"} h={75} />
          <Text size={42} weight={"bold"}>
            {"Paleto Bay Hospital"}
          </Text>
        </Centered>
      </Container>
    </>
  );
};

const Centered = kitchn(Container)`
  position: relative;

  &::before, &::after {
    content: '';
    left: 50%;
    position: absolute;
    filter: blur(45px);
    transform: translateZ(0);
  }

  &::before {
    background: linear-gradient(
      to bottom right,
      ${({ theme }) => convertRGBToRGBA(theme.colors.accent.primary, 0)},
      ${({ theme }) => convertRGBToRGBA(theme.colors.accent.primary, 0)},
      ${({ theme }) => convertRGBToRGBA(theme.colors.accent.primary, 0.3)}
    );
    border-radius: 50%;
    width: 480px;
    height: 360px;
    margin-left: -400px;
  }

  &::after {
    background: radial-gradient(
      ${({ theme }) => convertRGBToRGBA(theme.colors.accent.primary, 0.4)}, 
      ${({ theme }) => convertRGBToRGBA(theme.colors.accent.primary, 0)}
    );
    width: 240px;
    height: 180px;
    z-index: -1;
  }
`;

export default IndexPage;
