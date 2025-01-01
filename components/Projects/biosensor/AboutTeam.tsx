
const AboutBiosensorTeam = () => {

  return (
    <>
    <section id="about" className="pt-4">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-4 dark:border-white/[.15]">
        <div className="flex flex-wrap items-center">
          <div className="py-4">
            <h3 className="text-xl font-bold text-black dark:text-white">Principal Investigators</h3>
            <p>Jesse Boehm, PhD (MIT)</p>
            <p>Samuel Klempner, MD (MGH)</p>
            <p>Beth Cimini, PhD (Broad Institute)</p>
          </div>
          <div
                className="flex flex-wrap gap-6 figure-animation-appear mx-auto lg:mr-0"
              >
                <img
                  src="/images/projects/biosensor/kilogo.svg"
                  alt="Koch Institute"
                  width={180}
                  height={30}
                  className="block drop-shadow-xl  mx-auto max-w-full dark:drop-shadow-none lg:mr-0"
                />
                                <img
                  src="/images/projects/biosensor/broadlogo-type.png"
                  alt="Broad Institute"
                  width={133}
                  height={30}
                  className="block dark:hidden drop-shadow-xl  mx-auto max-w-full dark:drop-shadow-none lg:mr-0"
                />
                  <img
                  src="/images/projects/biosensor/broadlogo-white.png"
                  alt="Broad Institute"
                  width={100}
                  height={30}
                  className="hidden dark:block drop-shadow-xl  mx-auto max-w-full dark:drop-shadow-none lg:mr-0"
                />           
            <img
                  src="/images/projects/biosensor/mghlogo.svg"
                  alt="MGH"
                  width={300}
                  height={30}
                  className="block drop-shadow-xl mx-auto max-w-full dark:drop-shadow-none lg:mr-0"
                />

              </div>
          </div>
        </div>
      </div>
      </section>

    </>
  );
};

export default AboutBiosensorTeam;
