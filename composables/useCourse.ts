import courseData from './courseData'


// SIMPLE
// export const useCourse = () => {
//   return courseData;
// };

type Lesson = {
  title: string;
  slug: string;
  number: number;
  downloadUrl: string;
  videoId: number;
  text: string;
  // optional field with question mark
  sourceUrl?: string;
  path: string;
}

type Chapter = {
  title: string;
  slug: string;
  number: number;
  lessons: Lesson[];
};

type Course = {
  title: string;
  chapters: Chapter[];
}

export const useCourse = (): Course => {
  const chapters: Chapter[] = courseData.chapters.map(
    (chapter) => {
      const lessons: Lesson[] = chapter.lessons.map(
        (lesson) => ({
          ...lesson,
          path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`
        })
      );
      return {
        ...chapter,
        lessons,
      };
    }
  );
  return {
    ...courseData,
    chapters,
  }
};


// TO MAP THE SLUG FOR INTERNAL LINKS
// export const useCourse = () => {
  // return courseData;
  // usiamo map

  // return {
  //   ...courseData,
  //   chapters: courseData.chapters.map((chapter) => {
  //     const lessons: Lesson[] = chapter.lessons.map(
  //       (lesson) => ({
  //         ...lesson,
  //         path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
  //       })
  //     );
  //     return{
  //       ...chapter,
  //       lessons,
  //     };
  //   }),
  // };

  // FIRST VERSION
//   return {
//   ...courseData,
//   chapters: courseData.chapters.map((chapter) => ({
//     ...chapter,
//     lessons: chapter.lessons.map((lesson) => ({
//       ...lesson,
//       path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
//     })),
//   })),
// };


// };
