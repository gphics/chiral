import { projectType, urlType } from "@/Types/types";
import { useSelector } from "react-redux";
import GalleryComponents from "./GalleryComponents";

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
          {brief.brandDescription}
        </p>
        <p>
          <span>Job Description </span>
          {brief.jobDescription}
        </p>
      </article>
      {brief.brandVisuals.length ? (
        <GalleryComponents
          height={300}
          width={300}
          title="Brand Visuals"
          srcs={brief.brandVisuals}
        />
      ) : (
        ""
      )}
      {designs.length ? (
        <GalleryComponents
          height={300}
          width={300}
          title="Designs"
          srcs={designs}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default DesignProject;
