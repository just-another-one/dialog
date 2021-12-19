import { computed, nextTick, ref, watch, onMounted, ExtractPropTypes, PropType, SetupContext } from 'vue';

import { useModalKeyHandlers, KeyCode } from '@/compositions/useModalKeyHandlers';

export const dialogProps = {
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  appendTo: {
    type: [String, Boolean] as PropType<string | false>,
    default: false,
    validator: (value: unknown) => value === false || typeof value === 'string',
  },
  hideCloseButton: {
    type: Boolean,
    default: false,
  },
  beforeClose: {
    type: Function as PropType<(close: () => void) => void>,
    default: undefined,
  },
  closeByClickOutside: {
    type: Boolean,
    default: true,
  },
  closeByEscape: {
    type: Boolean,
    default: true,
  },
  custom: {
    type: Boolean,
    default: false,
  },
} as const;

export const dialogEmits = {
  open: null,
  opened: null,
  close: null,
  closed: null,
  keydown: (event: Event) => event instanceof Event,
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
};

export type DialogEmits = typeof dialogEmits;

export type DialogProps = ExtractPropTypes<typeof dialogProps>;

export const useDialog = (props: DialogProps, { emit }: SetupContext<DialogEmits>) => {
  const dialog = ref<HTMLElement>();
  const isVisible = ref(false);
  const isTelportDiabled = computed(() => props.appendTo === false);

  function afterEnter() {
    emit('opened');
    dialog.value?.focus();
  }

  function afterLeave() {
    emit('closed');
    emit('update:modelValue', false);
  }

  function beforeLeave() {
    emit('close');
  }

  async function open() {
    isVisible.value = true;
    await nextTick();
    dialog.value?.scrollTo({ top: 0 });
  }

  function close() {
    isVisible.value = false;
  }

  function handleClose() {
    if (props.beforeClose) {
      props.beforeClose(close);
    } else {
      close();
    }
  }

  function onClickOutside() {
    if (props.closeByClickOutside) {
      handleClose();
    }
  }

  function onEscapePressed() {
    if (props.closeByEscape) {
      handleClose();
    }
  }

  watch(
    () => props.modelValue,
    async (value) => {
      if (value) {
        await open();
        emit('open');
      } else {
        if (isVisible.value) {
          close();
        }
      }
    },
  );

  onMounted(async () => {
    if (props.modelValue) {
      await open();
    }
  });

  useModalKeyHandlers(isVisible, {
    [KeyCode.Enter]: (event: KeyboardEvent) => emit('keydown', event),
    [KeyCode.Escape]: onEscapePressed,
  });

  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onClickOutside,
    onEscapePressed,
    dialog,
    isVisible,
    isTelportDiabled,
  };
};
