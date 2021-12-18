<script lang="ts">
import { defineComponent } from 'vue';

import '@/assets/dialog.scss';

import { dialogProps, dialogEmits, useDialog } from './useModalDialog';

export default defineComponent({
  name: 'ModalDialog',
  inheritAttrs: false,
  props: dialogProps,
  emits: dialogEmits,
  setup(props, context) {
    return useDialog(props, context);
  },
});
</script>
<template>
  <teleport :to="appendTo">
    <transition
      name="dialog-transition"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <div
        v-show="isVisible"
        class="overlay"
        @click="onClickOutside"
      >
        <div class="dialog-overlay">
          <div
            ref="dialog"
            :class="['dialog', $attrs.class]"
            role="dialog"
            aria-modal="true"
            :aria-label="title || 'dialog'"
            @click.stop=""
          >
            <template v-if="custom">
              <slot v-bind="{ handleClose }" />
            </template>
            <template v-else>
              <div
                v-if="title || $slots.title"
                class="dialog-header"
              >
                <slot
                  name="title"
                  v-bind="{ handleClose }"
                >
                  <div class="dialog-title">{{ title }}</div>
                  <button
                    v-if="!hideCloseButton"
                    aria-label="close"
                    class="dialog-close"
                    @click="handleClose"
                  >&times;</button>
                </slot>
              </div>
              <div class="dialog-content">
                <slot v-bind="{ handleClose }" />
              </div>
              <template v-if="$slots.actions">
                <div class="dialog-actions">
                  <slot
                    name="actions"
                    v-bind="{ handleClose }"
                  ></slot>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
