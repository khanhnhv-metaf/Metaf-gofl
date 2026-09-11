import { notFound } from "next/navigation";
import GolfCourseForm from "@/components/admin/GolfCourseForm";
import { updateGolfCourse } from "@/lib/admin/actions/golf-courses";
import { createClient } from "@/lib/supabase/server";
import type { GolfCourseRow } from "@/lib/data/types";

export default async function EditGolfCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("golf_courses")
    .select("*")
    .eq("id", id)
    .maybeSingle<GolfCourseRow>();

  if (!course) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fairway-2">
        Sửa: {course.name_vi}
      </h1>
      <div className="mt-6">
        <GolfCourseForm course={course} action={updateGolfCourse.bind(null, id)} />
      </div>
    </div>
  );
}
