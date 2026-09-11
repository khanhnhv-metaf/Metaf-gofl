import GolfCourseForm from "@/components/admin/GolfCourseForm";
import { createGolfCourse } from "@/lib/admin/actions/golf-courses";

export default function NewGolfCoursePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fairway-2">
        Thêm sân golf mới
      </h1>
      <div className="mt-6">
        <GolfCourseForm action={createGolfCourse} />
      </div>
    </div>
  );
}
