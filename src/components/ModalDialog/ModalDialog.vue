<script lang="ts">
import { defineComponent } from 'vue';

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
<style lang="scss" scoped>
@mixin overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
}

@keyframes modal-dialog-transition {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dialog-transition {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.dialog-transition-enter-active {
  animation: var(--modal-dialog-animation, modal-dialog-transition 0.3s ease-in-out);
  .dialog-overlay {
    animation: var(--dialog-animation, dialog-transition 0.3s ease-in-out);
  }
}

.dialog-transition-leave-active {
  animation: var(--modal-dialog-animation, modal-dialog-transition 0.3s ease-in-out);
  animation-direction: reverse;
  .dialog-overlay {
    animation: var(--dialog-animation, dialog-transition 0.3s ease-in-out);
    animation-direction: reverse;
  }
}

.overlay {
  @include overlay;
  z-index: var(--dialog-z-index, 1024);
  background-color: #00000080;
}

.dialog-overlay {
  @include overlay;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog {
  position: relative;
  color: var(--dialog-color, #000);
  background: var(--dialog-bg-color, #fff);
  box-shadow: var(--dialog-box-shadow, 0 2px 10px 0 rgba(0, 0, 0, 0.3));
  box-sizing: border-box;

  width: var(--dialog-width, 50%);
  max-height: 90%;
  padding: var(--dialog-padding, 1rem);
  border: var(--dialog-border, 1px solid #000);
  outline: none;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dialog-header {
  flex: 0 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
}

.dialog-title {
  font-size: 2rem;
  font-weight: 100;
  flex: 1;
}

.dialog-close {
  align-self: flex-start;

  height: 1em;
  width: 1em;
  padding: 0;
  border: none;
  outline: none;

  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1;

  color: inherit;
  background: transparent;
  cursor: pointer;
}

.dialog-content {
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: scroll;
  will-change: scroll-position;
}

.dialog-actions {
  flex: 0 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: var(--dialog-actions-gap, 0.5rem);
}
</style>
