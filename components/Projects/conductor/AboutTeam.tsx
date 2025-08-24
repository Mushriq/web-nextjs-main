
const AboutConductorTeam = () => {

  return (
    <>
    <section id="about" className="pt-4">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-4 dark:border-white/[.15]">
        <div className="flex flex-wrap items-center">
          <div className="py-4">
            <h3 className="text-xl font-bold text-black dark:text-white">Team</h3>
            <p>Mushriq Al-Jazrawe, PhD</p>
            <p>Nicole Ostrovsky, MS</p>
            <p>Ashley Ruehr, BS</p>
            <br /> 
          </div>
          <div
                className="flex flex-wrap gap-6 figure-animation-appear mx-auto lg:mr-0"
              >
                <img
                  src="/images/projects/biosensor/kilogo.svg"
                  alt="Koch Institute"
                  width={200}
                  height={30}
                  className="block drop-shadow-xl  mx-auto max-w-full dark:drop-shadow-none lg:mr-0"
                />


              </div>
          </div>
        </div>
      </div>
      </section>

    </>
  );
};

export default AboutConductorTeam;
