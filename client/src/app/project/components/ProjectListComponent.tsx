import { projectSliceType, projectType } from "@/Types/types";
import Link from "next/link";
import ImgComponent from "../../../utilityComponents/ImgComponent";
import { RiProgress3Fill } from "react-icons/ri";
function ProjectListComponent({ arr }: { arr: projectType[] }) {
  return (
    <div className="project-list-component">
      {!arr?.length ? (
        <h3>No project !</h3>
      ) : (
        <section>
          {arr.map((elem: projectType, index: number) => {
            const { _id, name, brief, designs, status, type } = elem;
            return (
              <Link
                className="each-project"
                key={index}
                href={`/project/${_id}`}
              >
                <ImgComponent designs={designs} brief={brief} />
                <h4> {name.length < 20 ? name : `${name.slice(0, 20)}..`} </h4>
                <h5> {type} </h5>
                <h5>
                  <span className={status}>
                    <RiProgress3Fill className="icon" />
                  </span>
                  {status}
                </h5>
              </Link>
            );
          })}
        </section>
      )}
    </div>
  );
}

export default ProjectListComponent;
