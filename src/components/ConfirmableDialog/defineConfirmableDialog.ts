import { reactive, VNode } from 'vue';

interface SimpleContent {
  message: string;
}

interface CustomContent {
  content: () => VNode[];
}

type Content = CustomContent | SimpleContent;

export type ConfirmableDialogProps = Content & { title?: string };

interface SetupConfirmableDialog {
  actions?: (properties: ActionsSlotScope) => VNode[];
  cancelText?: string;
  confirmText?: string;
}

interface ActionsSlotScope {
  cancellable: boolean;
  cancel: () => void;
  confirm: () => void;
}

export type ModalDialogProps = SetupConfirmableDialog &
  ConfirmableDialogProps & {
    cancellable?: boolean;
  };

export const defaultConfirmableDialogProps = reactive<SetupConfirmableDialog>({});

export function setupConfirmableDialog(options: SetupConfirmableDialog) {
  Object.assign(defaultConfirmableDialogProps, options);
}
