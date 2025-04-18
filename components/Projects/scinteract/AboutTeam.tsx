
const AboutSCInteractTeam = () => {

  return (
    <>
    <section id="about" className="pt-4">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-4 dark:border-white/[.15]">
        <div className="flex flex-wrap items-center">
          <div className="py-4">
            <h3 className="text-xl font-bold text-black dark:text-white">Principal Investigators</h3>
            <p>Mushriq Al-Jazrawe, PhD (MIT)</p>
            <p>Joelle Straehla, PhD (Seattle Children&apos;s)</p>
            <p>Candace Haddox, MD (DFCI)</p>
            <p>David Shulman, PhD (DFCI)</p>
            <p>Aaron Thorner, PhD (DFCI)</p>
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
     
            <img
                  src="/images/logo/dfci.png"
                  alt="DFCI"
                  width={200}
                  height={30}
                  className="block drop-shadow-xl mx-auto max-w-full dark:drop-shadow-none lg:mr-0"
                />

<img
                  src="/images/logo/seattle.png"
                  alt="Seattle Children&apos;s Research Institute"
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

export default AboutSCInteractTeam;
