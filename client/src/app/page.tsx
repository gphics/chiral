import LoadingComponent from "@/utilityComponents/LoadingComponent";
import First from "./components/First";
import Fourth from "./components/Fourth";
import Second from "./components/Second";
import Third from "./components/Third";

function LandingPage() {
  return (
    <main className="landing-page">

      <First />
      <Second />
      <Third />
      <Fourth />
    </main>
  );
}

export default LandingPage;
