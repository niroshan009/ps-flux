import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";
import { toast } from "react-toastify";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug;

    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }

    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function handleChange(event) {
    const updatedCourse = {
      ...course,
      [event.target.name]: event.target.value
    };
    setCourse(updatedCourse);
  }

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.category) _errors.category = "Category is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved..");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      {props.match.params.slug}
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;