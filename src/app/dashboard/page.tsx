import Container from "@/components/Dashboard/Container";
import WelcomeSection from "@/components/Dashboard/WelcomeSection";
import Layout from "@/components/PageLayout/Layout";
import BoxRecycle from "../../assets/images/the-box-recycle.png";
import Coupon from "@/components/Dashboard/Coupon";
import WrappedMapComponent from "@/components/Dashboard/WrappedMapComponent";

const userInfo = {
  name: "John",
  points: 3500,
};

const containers = [
  { src: BoxRecycle, label: "Container 01" },
  { src: BoxRecycle, label: "Container 02" },
  { src: BoxRecycle, label: "Container 03" },
  { src: BoxRecycle, label: "Container 04" },
  { src: BoxRecycle, label: "Container 05" },
  { src: BoxRecycle, label: "Container 06" },
  { src: BoxRecycle, label: "Container 07" },
  { src: BoxRecycle, label: "Container 08" },
  { src: BoxRecycle, label: "Container 09" },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        <WelcomeSection name={userInfo.name} points={userInfo.points} />
        <Container containers={containers} />
        <Coupon />
        <div className="overflow-x-hidden w-full">
          <WrappedMapComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
