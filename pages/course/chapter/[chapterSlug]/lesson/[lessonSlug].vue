<template>
    <h2>Questa è una lezione</h2>
    <p class="uppercase"> Lesson {{ chapter.number }} - {{ lesson.number }}</p>
    <!-- <p>Capitolo:  {{ $route.params.chapterSlug }}</p> -->
    <!-- <p>Lezione:  {{ $route.params.lessonSlug }}</p> -->
    <NuxtLink v-if="lesson.sourceUrl" :to="lesson.sourceUrl">Download source code</NuxtLink>
    <NuxtLink v-if="lesson.downloadUrl" :to="lesson.downloadUrl">Download video</NuxtLink>
    <p>Capitolo:  {{ chapter.title }}</p>
    <p>Lezione:  {{ lesson.title }}</p>
    <div class="p-3">
        {{ lesson.text }}
    </div>
    <VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" />
    <!-- <ClientOnly> -->
        <!-- per avere lo stesso effetto ClientOnly su questo componente, basta mettere .client nel nome del componente -->
        <LessonCompleteButton :model-value="isLessonComplete" @update:model-value="toggleComplete" />
    <!-- </ClientOnly> -->
    
</template>

<script setup>
const course = useCourse();
console.log(course);
const route = useRoute();

const chapter = computed(() => {
    return course.chapters.find(
        (chapter) => chapter.slug == route.params.chapterSlug
    );
});

const lesson = computed(() => {
    return chapter.value.lessons.find(
        (lesson) => lesson.slug == route.params.lessonSlug
    );
});

const title = computed(() => {
    return `${lesson.value.title} - ${course.title}`;
});

useHead({
    title,
});

const progress = useLocalStorage('progress', []);

const isLessonComplete = computed(()  =>  {
    if (!progress.value[chapter.value.number - 1]) {
        return false;
    }


    if (!progress.value[chapter.value.number - 1][lesson.value.number - 1]) {
        return false;
    }

    return progress.value[chapter.value.number - 1][lesson.value.number - 1];
});

const toggleComplete = () => {
  if (!progress.value[chapter.value.number - 1]) {
    progress.value[chapter.value.number - 1] = [];
  }

  progress.value[chapter.value.number - 1][
    lesson.value.number - 1
  ] = !isLessonComplete.value;
};
</script>