import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | High Throughput Sciences",
  description: "This is Contact Page for High Throughput Sciences",
  // other metadata
};

const ContactPage = () => {
  return (
    <>

      <section id="contact" className="pt-16 md:pt-20 lg:pt-24">
        <div className="container">
          <div className="border-b border-body-color/[.15] pb-4 dark:border-white/[.15] md:pb-6 lg:pb-8">
            <div className="-mx-4 flex flex-wrap items-center justify-center">
              <div className="w-full section-animation px-4">
                <div className="flex flex-wrap items-center justify-center w-full">
                  <iframe width="1000px" height="1000px" src="https://forms.office.com/Pages/ResponsePage.aspx?id=utmvZM8Oz0q8NpNfYjW6iw6-ztwLa0BMo213gULXT3RUREo0NkNCTUZGU1ZVSUhKNDU4MVZTTzFFUSQlQCN0PWcu&embed=true"> </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




    </>
  );
};

export default ContactPage;
