
const AboutBiosensorTeam = () => {

  return (
    <>
    <section id="about" className="pt-4">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-4 dark:border-white/[.15]">
        <div className="flex flex-wrap items-center">
          <div className="py-4">
            <h3 className="text-xl font-bold text-black dark:text-white">Principal Investigators</h3>
            <p>Jesse Boehm (MIT)</p>
            <p>Samuel Klempner (MGH)</p>
            <p>Haeseong Park (DFCI)</p>
            <p>Beth Cimini (Broad)</p>
          </div>
          <div
                className="flex flex-wrap gap-6 figure-animation-appear mx-auto lg:mr-0"
              >
                <img
                  src="/images/projects/biosensor/boehmlab.png"
                  alt="Boehm Lab"
                  width={100}
                  height={30}
                  className="block drop-shadow-xl mx-auto max-w-full dark:drop-shadow-none lg:mr-0"
                />
                <img
                  src="/images/projects/biosensor/kilogo.svg"
                  alt="Koch Institute"
                  width={140}
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
                  width={190}
                  height={30}
                  className="block drop-shadow-xl mx-auto max-w-full dark:drop-shadow-none lg:mr-0"
                />

<img
                  src="/images/projects/biosensor/dfcilogo.png"
                  alt="DFCI"
                  width={133}
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
