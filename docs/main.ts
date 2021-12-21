import { createApp, h } from 'vue';

import { defineConfirmableDialogPlugin } from '@/components/ConfirmableDialog';

import App from './App.vue';

const ConfirmableDialogPlugin = defineConfirmableDialogPlugin({
  actions: ({ cancellable, cancel, confirm }) => {
    const confirmButton = h('button', { class: 'btn btn-primary', onClick: confirm }, 'Accept');
    if (cancellable) {
      const cancelButton = h('button', { class: 'btn btn-cancel', onClick: cancel }, 'Reject');
      return [cancelButton, confirmButton];
    }

    return [confirmButton];
  },
});

const app = createApp(App);
app.use(ConfirmableDialogPlugin);
app.mount('#app');
