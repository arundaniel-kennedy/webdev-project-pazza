import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { Badge } from "react-bootstrap";
export default function AssignmentSectionControl() {
  return (
    <div className="float-end">
      <Badge className="border rounded-pill text-dark bg-transparent border-dark">40% of total</Badge>
      <FaPlus className="position-relative mx-2" style={{ bottom: "1px" }} />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
