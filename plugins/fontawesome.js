import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


import { fad } from "@fortawesome/pro-duotone-svg-icons"
import { fal } from "@fortawesome/pro-light-svg-icons"
import { far } from "@fortawesome/pro-regular-svg-icons"
import { fas } from "@fortawesome/pro-solid-svg-icons"
import { fat } from "@fortawesome/pro-thin-svg-icons"
import { fasl } from "@fortawesome/sharp-light-svg-icons"
import { fasr } from "@fortawesome/sharp-regular-svg-icons"
import { fass } from "@fortawesome/sharp-solid-svg-icons"



library.add(fad, fal, far, fas, fat, fasl, fasr, fass);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon, {});
});