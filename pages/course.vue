<template>
    <p>Questa è una pagina allo stesso livello di index, per poterla vedere, inserire /nome-pagina nell'url quando sei nella pagina index</p>
    <p><strong>Direi che è andata bene?</strong></p>
    <p>Nuxt genera direttamente la route guaredando la cartella pages</p>
    <p>NB il componente che fa partire il tutto è il file app.vue</p>
    <div class="bg-slate-500 flex justify-between h-[80vh]">
        <div class="w-full max-w-xs bg-red-300 h-full">
            <h2>Capitoli</h2>
            <div class="mb-4 flex flex-col"
            v-for="chapter in chapters"
            :key="chapter.slug">
                <h4>{{ chapter.title }}</h4>
                <!-- <a v-for="(lesson, index) in chapter.lessons"
                :key="lesson.slug"
                class="flex flex=row"
                :href="`/course/chapter/${chapter.slug}/lesson/${lesson.slug}`">
                    <span>{{ index + 1 }}</span>
                    <span>{{ lesson.title }}</span>
                </a> -->
                <!-- si usa nuxtlink per i link e sfruttare potenzialità nb bisogna cabiare l'attributo href con to -->
                <NuxtLink v-for="(lesson, index) in chapter.lessons"
                :key="lesson.slug"
                class="flex flex=row"
                :to="lesson.path"
                :class="{
                    'text-blue-500': lesson.path === $route.fullPath,
                    'text-gray-600': lesson.path !== $route.fullPath,
                }">
                    <span>{{ index + 1 }}</span>
                    <span>{{ lesson.title }}</span>
                </NuxtLink>

            </div>
        </div>
        <div class="w-full bg-green-200 h-full">
            <h3>Lezioni</h3>
            
            <div class="lesson-page-wrapper bg-emerald-500">
                <!-- qui va a prendersi le pagine (file) ch stanno dentro la cartella course -->
                <NuxtPage />
            </div>
        </div>
    </div>
</template> 

<script setup>
const { chapters } = useCourse();


// per un custom layout che deve essere inserito solo in questa pagina, si può fare come scritto qua sotto, o inserito direttamente dentro il tag NuxtLayout
// questo si può evitare di mettere, se andiamo a lavorare sul tag NuxtLayout
// definePageMeta({
//     // layout: false,
//     layout: 'custom',
// });


</script>


<!-- <style scoped>
.router-link-active {
    @apply text-blue-500;
}
</style> -->