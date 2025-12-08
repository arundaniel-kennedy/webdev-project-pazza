import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa6";

export default function AssignmentControlButtons({
  assignmentId,
  onRemoveAssignment,
}: {
  assignmentId: string;
  onRemoveAssignment: (assignmentId: string) => void;
}) {
  return (
    <div className="ms-auto">
      <FaTrash
        className="text-danger me-3 mt-1"
        onClick={() => {
          if (confirm("Are you sure you want to delete?")) {
            onRemoveAssignment(assignmentId);
          }
        }}
        style={{ cursor: "pointer" }}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
