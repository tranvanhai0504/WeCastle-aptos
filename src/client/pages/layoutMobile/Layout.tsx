import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import "@fontsource/vt323";
import SideBar from "../../components/layout/SideBar";
import MobileHeader from "../../components/layout/Header/MobileHeader";

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  height: 100svh;
  background-color: black;
  background: radial-gradient(
      72.4% 40.52% at 50% 50%,
      rgba(255, 255, 255, 0) 0%,  
      rgba(0, 0, 0, 0.6) 100%
    ),
    url("/background-no-castle.png");
  background-size: cover; /* This will make the background cover the entire area */
  background-position: center; /* This centers the background image */
`;

const MainContentWrapper = styled.div`
  grid-column: span 12;
  grid-row: span 12;
  max-height: 100%;
  overflow-y: scroll;
`;

const SideBarWrapper = styled.div`
  grid-column: span 12;
  grid-row: span 12;
`;

const HeaderWrapper = styled.div`
  grid-column: span 12;
`;

const Layout = () => {
  const location = useLocation();
  const hideSidebarRoutes = ["/marketplace", "/playGame"];

  return (
    <LayoutContainer className="">
      <HeaderWrapper>
        <MobileHeader />
      </HeaderWrapper>
      <MainContentWrapper>
        <Outlet />
      </MainContentWrapper>
      {!hideSidebarRoutes.includes(location.pathname) && (
        <SideBarWrapper>
          <SideBar />
        </SideBarWrapper>
      )}
    </LayoutContainer>
  );
};

export default Layout;
