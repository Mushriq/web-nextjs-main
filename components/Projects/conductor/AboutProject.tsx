import Image from "next/image";
import SectionTitle from "../../Common/SectionTitle";
import AboutConductorTeam from "./AboutTeam";


const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutConductorProject = () => {

  return (
    <>
    <section id="about" className="pt-16 md:pt-20 lg:pt-24">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-4 dark:border-white/[.15] md:pb-6 lg:pb-8">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full section-animation px-4 lg:w-1/2">
              <SectionTitle
              title="Automate Lab Workflows"
              paragraph="Design automated experiments in the cloud with Composer UI. Enter project details, add steps, reorder tiles, and attach analysis scripts where supported. Submitted workflows join a shared queue, where automated systems with matching capabilities claim and execute jobs via the Conductor API."
              mb="0px"
              width="800px"
              />
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div
                className="mx-auto max-w-[500px] aspect-square flex items-center justify-center bg-white rounded-2xl shadow"
              >
                <Image
                  src="/images/projects/conductor/composer-ui.png"
                  alt="composer-ui-image"
                  width={3000}
                  height={3000}
                  className="max-h-[80%] max-w-[80%] object-contain"
                />
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>

    <AboutConductorTeam />

    </>
  );
};

export default AboutConductorProject;
