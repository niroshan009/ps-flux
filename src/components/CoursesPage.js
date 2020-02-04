import React, { useState, useEffect } from "react";
import coursesStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";

function CourcesPage() {
  const [courses, setCourses] = useState(coursesStore.getCourses());

  useEffect(() => {
    coursesStore.addChangeListener(onChange);
    if (coursesStore.getCourses().length === 0) loadCourses();
    return () => coursesStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setCourses(coursesStore.getCourses());
  }
  return (
    <>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <h2>Courses</h2>
      <CourseList courses={courses} deleteCourse={deleteCourse} />
    </>
  );
}

export default CourcesPage;
