import { App, AppContext, InjectionKey, VNode } from 'vue';

interface SimpleContent {
  message: string;
}

interface CustomContent {
  content: () => VNode[];
}

type Content = CustomContent | SimpleContent;

export type ConfirmableDialogProps = Content & { title?: string };

export interface ConfirmableDialogOptions {
  actions?: (properties: ActionsSlotScope) => VNode[];
  cancelText?: string;
  confirmText?: string;
}

export interface ActionsSlotScope {
  cancellable: boolean;
  cancel: () => void;
  confirm: () => void;
}

export type ModalDialogProps = ConfirmableDialogOptions &
  ConfirmableDialogProps & {
    cancellable?: boolean;
  };

export let defaultApp: App;

export const DEFAULT_CONFIRMABLE_OPTIONS: InjectionKey<ConfirmableDialogOptions> =
  Symbol('DEFAULT_CONFIRMABLE_OPTIONS');

export function getDefaultAppContext(): AppContext {
  return defaultApp._context;
}

export function defineConfirmableDialogPlugin(options?: ConfirmableDialogOptions) {
  function install(app: App) {
    defaultApp = app;
    app.provide(DEFAULT_CONFIRMABLE_OPTIONS, options);
  }

  return { install };
}
