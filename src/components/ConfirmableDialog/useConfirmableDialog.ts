import { getCurrentInstance, h, render as nodeRender, ref, onUnmounted, AppContext } from 'vue';

import {
  getDefaultAppContext,
  DEFAULT_CONFIRMABLE_OPTIONS,
  ConfirmableDialogOptions,
  ConfirmableDialogProps,
  ModalDialogProps,
} from './plugin';
import ConfirmableDialog from './ConfirmableDialog.vue';

function normalizeProperties(confirmMessageOrProps: string | ConfirmableDialogProps): ModalDialogProps {
  if (typeof confirmMessageOrProps === 'object') {
    return confirmMessageOrProps;
  }

  return { message: confirmMessageOrProps };
}

function extractSots(props: ModalDialogProps) {
  const { actions } = props;
  if ('content' in props) {
    const { content } = props;
    return { actions, default: content };
  }
  return { actions };
}

function defineWrapper() {
  const host = ref<Element>();

  function createHost(): Element {
    const element = document.createElement('div');
    // document.body.appendChild(element); // ???
    return element;
  }

  function render(props: ModalDialogProps, appContext: AppContext) {
    host.value = createHost();
    const slots = extractSots(props);
    const vnode = h(ConfirmableDialog, props, slots);
    vnode.appContext = appContext;
    nodeRender(vnode, host.value);
  }

  function destroy() {
    if (host.value) {
      // eslint-disable-next-line unicorn/no-null
      nodeRender(null, host.value);
    }
  }

  return { destroy, render };
}

export function useConfirmableDialog() {
  const instance = getCurrentInstance()!;
  const { destroy, render } = defineWrapper();

  if (instance) {
    onUnmounted(destroy);
  }

  function create(dialogProps: ModalDialogProps) {
    return new Promise<boolean>((resolve) => {
      const result = ref(false);
      const appContext = instance?.root?.appContext || getDefaultAppContext();
      const defaultConfirmableDialogOptions = appContext.provides[
        DEFAULT_CONFIRMABLE_OPTIONS as symbol
      ] as ConfirmableDialogOptions;

      const props = {
        ...defaultConfirmableDialogOptions,
        ...dialogProps,
        result,
        parentInstance: instance,
        onClose: () => {
          resolve(result.value);
        },
        onClosed: () => {
          destroy();
        },
        onConfirm: () => {
          result.value = true;
        },
      };

      render(props, appContext);
    });
  }

  function confirm(confirmMessageOrProps: string | ConfirmableDialogProps) {
    return create({
      ...normalizeProperties(confirmMessageOrProps),
      cancellable: true,
    });
  }

  function alert(alertMessageOrProps: string | ConfirmableDialogProps) {
    return create(normalizeProperties(alertMessageOrProps));
  }

  return {
    alert,
    confirm,
  };
}
