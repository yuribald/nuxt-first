import courseData from './courseData'


// SIMPLE
// export const useCourse = () => {
//   return courseData;
// };

// TO MAP THE SLUG FOR INTERNAL LINKS
export const useCourse = () => {
  // return courseData;
  // usiamo map
  return {
  ...courseData,
  chapters: courseData.chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map((lesson) => ({
      ...lesson,
      path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
    })),
  })),
};
};
