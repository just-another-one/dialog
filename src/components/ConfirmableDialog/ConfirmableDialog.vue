<template>
  <modal-dialog
    v-model="isVisible"
    :title="title"
    :close-by-click-outside="false"
    append-to="body"
    class="dialog-confirmation"
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isInstanceWithInjections(instance: any): instance is InstanceWithInjections {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return instance?.providers !== undefined;
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

    if (isInstanceWithInjections(attrs.parentInstance)) {
      assignProviders(attrs.parentInstance);
    }

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
