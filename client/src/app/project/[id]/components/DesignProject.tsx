import { useSelector } from "react-redux";
import ImgRenderer from "@/utilityComponents/ImgRenderer";

function DesignProject() {
  const { singleProject: project } = useSelector(
    (state: any) => state.projectSlice
  );

  const { brief, name, status, type, designs } = project;

  return (
    <div className="software-project project-info">
      <article className="basic-info">
        <h4>
          {" "}
          <span>Project Name</span> {name}{" "}
        </h4>
        <h5 className={status}>
          {" "}
          <span>Status</span>
          {status}{" "}
        </h5>

        <h5>
          {" "}
          <span>project type</span> {type}{" "}
        </h5>
        <p>
          <span>Brand Description </span>
          {brief?.brandDescription}
        </p>
        <p>
          <span>Job Description </span>
          {brief?.jobDescription}
        </p>
      </article>

      {brief?.brandVisuals?.length ? (
        <ImgRenderer title="Brand Visuals" arr={brief?.brandVisuals} />
      ) : (
        ""
      )}
      {designs?.length ? <ImgRenderer title="Designs" arr={designs} /> : ""}
    </div>
  );
}

export default DesignProject;
