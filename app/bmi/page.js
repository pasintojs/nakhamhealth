import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import BMICalculatorSection from "./components/BMICalculatorSection";

export default function BMIPage() {
  return (
    <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))]">
      <NavBar />
      <BMICalculatorSection />
      <Footer />
    </div>
  );
}
