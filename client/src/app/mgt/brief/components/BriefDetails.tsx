import ImgComponent from "@/utilityComponents/ImgComponent";
import { imageType, weakBriefType } from "@/Types/types";
import { IoMdDownload } from "react-icons/io";
function BriefDetails({ obj }: { obj: weakBriefType }) {
  const {
    brandName,
    brandServices,
    brandContact,
    brandColors,
    brandValues,
    brandEmail,
    brandLocation,
    brandDescription,
    jobDescription,
    brandVisuals,
    jobType,
    // client
    clientContact,
    clientName,
    clientEmail,
    clientLocation,
  } = obj;
  async function createBlobUrl(url: string) {
    const first = await fetch(url, { cache: "no-cache" });
    const second = await first.blob();
    const blobUrl = URL.createObjectURL(second);
    const elem = document.createElement("a");
    elem.href = blobUrl;
    elem.style.display = "none";
    elem.download = `${brandName}`;
    elem.click();
    document.body.appendChild(elem);
  }
  return (
    <div className="brief-details-components">
      <article className="brand-details">
        <h4>Brand Details</h4>
        <p>
          <span>Name</span>
          {brandName || ""}
        </p>
        <p className="desc">
          <span>Services</span>
          {brandServices?.join(" | ") || ""}
        </p>
        <p className="desc">
          <span>Values</span>
          {brandValues?.join(" | ") || ""}
        </p>
        <p className="desc">
          <span>Colors</span>
          {brandColors?.join(" | ") || ""}
        </p>
        <p>
          <span>Description</span>
          {brandDescription || ""}
        </p>
        <p>
          <span>Job Description</span>
          {jobDescription || ""}
        </p>
        <p>
          <span>Job Type</span>
          {jobType || ""}
        </p>
        <p>
          <span>Contact</span>
          {brandContact || ""}
        </p>
        <p>
          <span>Email</span>
          {brandEmail || ""}
        </p>
        <p>
          <span>Location</span>
          {brandLocation || ""}
        </p>
      </article>
      <article className="client-details">
        <h4>Client Details</h4>
        <p>
          <span>Name</span>
          {clientName || ""}
        </p>
        <p>
          <span>Contact</span>
          {clientContact || ""}
        </p>
        <p>
          <span>Email</span>
          {clientEmail || ""}
        </p>
        <p>
          <span>Location</span>
          {clientLocation || ""}
        </p>
      </article>
      {!brandVisuals?.length ? (
        ""
      ) : (
        <section className="brand-visuals">
          <h4>Brand Visuals</h4>
          <div>
            {brandVisuals.map((elem: imageType, index: number) => {
              return (
                <section key={index}>
                  <ImgComponent url={elem.url} />
                  <button
                    type="button"
                    onClick={() => {
                      createBlobUrl(elem.url);
                    }}
                  >
                    {" "}
                    {""} <IoMdDownload className="icon" />{" "}
                  </button>
                </section>
              );
            })}
          </div>
        </section>
      )}
      {/* <button type="button" onClick={createBlobUrl} className="download-btn">
        Download
      </button> */}
    </div>
  );
}

export default BriefDetails;
