import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="mb-8 md:mb-16">
          <SectionTitle
            title="A platform for impactful data-driven discovery."
            paragraph="Solving complex biomedical questions takes more than just collecting more data—it requires innovative assays, novel study systems, and automated processes that produce consistent, high-quality results. Given the breadth of biomedical research, we often need custom solutions and infrastructure for unique samples, readouts, and analyses. At HTS, we aim to democratize data production and analysis so we empower all researchers to extract meaningful insights."
            center
            width="1000px"
          />
</div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 ">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
