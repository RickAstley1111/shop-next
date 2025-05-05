import EndiAnniqFooter from "@/components/EndiAnniqFooter";
import FooterdanSalTeparoqTurganNarsa from "@/components/FooterdanSalTeparoqTurganNarsa";
import FooterniOzi from "@/components/FooterniOzi";
import Hero from "@/components/Hero";
import ProductsList from "@/components/ProductsList";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      <div>
        <ProductsList/>
      </div>
      <div>
        <FooterdanSalTeparoqTurganNarsa/>
      </div>
      <div>
        <FooterniOzi/>
      </div>
      <div>
        <EndiAnniqFooter/>
      </div>
    </div>
  );
}
