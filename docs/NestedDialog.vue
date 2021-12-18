<script lang="ts">
import { defineComponent, ref } from 'vue';

import { ModalDialog } from '@/components';

export default defineComponent({
  name: 'NestedDialog',
  components: {
    ModalDialog,
  },
  setup() {
    const showNestedDialog = ref(false);
    return { showNestedDialog };
  },
});
</script>
<template>
  <span>
    <button @click="showNestedDialog = true">Open nested dialog</button>
    <ModalDialog
      v-model="showNestedDialog"
      title="Nested Lorem ipsum"
      :class="$style.nestedDialog"
      :disable="true"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec iaculis lectus. Ut vel metus vitae urna iaculis volutpat. Proin vulputate lorem et tellus rhoncus gravida. Sed efficitur urna molestie pretium pretium. Aliquam lacus enim, imperdiet ac tortor vitae, dignissim congue tortor. Curabitur elementum quis ex nec mattis. Proin vulputate ligula sed diam blandit, vitae consectetur libero rhoncus. Donec pretium mollis feugiat. In sed vestibulum ipsum. Sed nec velit ac elit faucibus eleifend. Aenean sodales enim vel congue sodales. Curabitur libero est, maximus a facilisis sit amet, gravida ut diam. Pellentesque porta tellus laoreet diam ultricies fermentum. Maecenas neque dui, pharetra at nibh quis, porta pulvinar dui. Pellentesque maximus nec augue ac aliquam. Nulla interdum eros at nulla pulvinar tempor.
      </p>
      <template #actions="{ handleClose }">
        <button @click="handleClose">Close</button>
      </template>
    </ModalDialog>
  </span>
</template>
<style lang="scss" module>
.nestedDialog {
  --dialog-width: 300px;
}
</style>
