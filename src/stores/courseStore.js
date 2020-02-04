import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _course = [];

class CourseStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _course;
  }

  getCourseBySlug(slug) {
    return _course.find(course => course.slug === slug);
  }
}

const store = new CourseStore();

Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      _course.push(action.course);
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      _course = _course.map(course =>
        course.id === action.course.id ? action.course : course
      );
      store.emitChange();
      break;
    case actionTypes.DELETE_COURSE:
      _course = _course.filter(course => course.id !== parseInt(action.id, 10));
      store.emitChange();

      break;
    case actionTypes.LOAD_COURSES:
      _course = action.courses;
      store.emitChange();
      break;
    default:
  }
});

export default store;
