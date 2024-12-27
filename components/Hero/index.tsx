import Link from "next/link";
import Image from "next/image";


const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[900px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Augmenting the power of <span className="text-primary dark:text-secondary">Convergence</span> with a platform to <span className="text-primary dark:text-secondary">Scale</span>
                </h1>
                <p className="dark:text-body-color-dark mb-12 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl">
                We develop and utilize systematic approaches to accelerate biomedical insights and expand their impact on human health.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="https://nextjstemplates.com/templates/saas-starter-startup"
                    className="rounded-sm shadow-btn bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                    >
                    Let's Collaborate
                  </Link>
                  <Link
                    href="/platform"
                    className="inline-block shadow-btn rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
                    >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]
         opacity-20 lg:opacity-10 dark:opacity-50">

                <Image
                  src="/images/background.svg"
                  alt="logo"
                  sizes="100vw"
                  width={3840}
                  height={2160}
                />

        </div>

      </section>
    </>
  );
};

export default Hero;
