import ImgComponent from "@/utilityComponents/ImgComponent";
import { imageType, weakBriefType } from "@/Types/types";


function BriefDetails({
  obj,
  downloadUrl,
}: {
  obj: weakBriefType;
  downloadUrl: string;
}) {
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
  async function createBlobUrl() {
    const first = await fetch(downloadUrl, { cache: "no-cache" });
    const second = await first.blob();
    const blobUrl = URL.createObjectURL(second);
    const elem = document.createElement("a");
    elem.href = blobUrl;
    elem.style.display = "none"
    elem.download = `${brandName}-project.pdf`
    elem.click()
    document.body.appendChild(elem)
  }
  return (
    <div className="brief-details-components">
      <article className="brand-details">
        <h4>Brand Details</h4>
        <p>
          <span>Name</span>
          {brandName || ""}
        </p>
        <p>
          <span>Services</span>
          {brandServices?.join(" | ") || ""}
        </p>
        <p>
          <span>Values</span>
          {brandValues?.join(" | ") || ""}
        </p>
        <p>
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
              return <ImgComponent key={index} url={elem.url} />;
            })}
          </div>
        </section>
      )}
      <button type="button" onClick={createBlobUrl} className="download-btn">
        Download
      </button>
    </div>
  );
}

export default BriefDetails;
