<template>
  <modal-dialog
    v-model="isVisible"
    :title="title"
    :class="$style.dialogMessages"
    :close-by-click-outside="false"
    hide-close-button
    @keydown.enter.prevent="confirm"
  >
    <slot v-bind="{ message }">{{ message }}</slot>
    <template #actions>
      <slot
        name="actions"
        v-bind="{ cancellable, cancel, confirm }"
      >
        <button
          v-if="cancellable"
          @click="cancel"
        >{{ cancelText }}</button>
        <button @click="confirm">{{ confirmText }}</button>
      </slot>
    </template>
  </modal-dialog>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref, ComponentInternalInstance } from 'vue';

import { ModalDialog } from '@/components/ModalDialog';

interface InstanceWithInjections extends ComponentInternalInstance {
  provides: Record<string | symbol, unknown>;
}

function assignProviders(parent: InstanceWithInjections) {
  const instance = getCurrentInstance() as InstanceWithInjections;
  instance.provides = parent.provides;
}

export default defineComponent({
  name: 'DialogWrapper',
  components: {
    ModalDialog,
  },
  props: {
    message: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    confirmText: {
      type: String,
      default: 'Ok',
    },
    cancellable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['cancel', 'confirm'],
  setup(_, { attrs, emit }) {
    const isVisible = ref(true);

    assignProviders(attrs.parentInstance as InstanceWithInjections);

    function close() {
      isVisible.value = false;
    }

    function cancel() {
      emit('cancel');
      close();
    }

    function confirm() {
      emit('confirm');
      close();
    }

    return { isVisible, cancel, confirm };
  },
});
</script>
<style lang="scss" module>
.dialogMessages {
  --dialog-width: fit-content;
}
</style>
