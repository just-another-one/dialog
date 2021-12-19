<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { h, ref, provide } from 'vue';

import { ModalDialog, setupConfirmableDialog, useConfirmableDialog } from '@/components';
import NestedDialog from './NestedDialog.vue';

setupConfirmableDialog({
  actions: ({ cancellable, cancel, confirm }) => {
    const confirmButton = h('button', { class: 'btn btn-primary', onClick: confirm }, 'Accept');
    if (cancellable) {
      const cancelButton = h('button', { class: 'btn btn-cancel', onClick: cancel }, 'Reject');
      return [cancelButton, confirmButton];
    }

    return [confirmButton];
  },
});

const showDialog = ref(false);
const { alert, confirm } = useConfirmableDialog();

async function showAlert() {
  await alert('This is alert!!!');
}

async function showConfirm() {
  const result = await confirm({
    title: 'Title',
    content: () => {
      return `⚠️ Custom message` as any;
    },
  });
}

async function beforeClose(close: () => void) {
  if (await confirm('Do you wanna close?')) {
    close();
  }
}
</script>

<template>
  <button @click="showDialog = true">Open dialog</button>
  <button @click="showConfirm">Confirm</button>
  <button @click="showAlert">Show alert</button>
  <ModalDialog
    v-model="showDialog"
    title="Lorem ipsum"
    :before-close="beforeClose"
  >
    <NestedDialog />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec iaculis lectus. Ut vel metus vitae urna iaculis volutpat. Proin vulputate lorem et tellus rhoncus gravida. Sed efficitur urna molestie pretium pretium. Aliquam lacus enim, imperdiet ac tortor vitae, dignissim congue tortor. Curabitur elementum quis ex nec mattis. Proin vulputate ligula sed diam blandit, vitae consectetur libero rhoncus. Donec pretium mollis feugiat. In sed vestibulum ipsum. Sed nec velit ac elit faucibus eleifend. Aenean sodales enim vel congue sodales. Curabitur libero est, maximus a facilisis sit amet, gravida ut diam. Pellentesque porta tellus laoreet diam ultricies fermentum. Maecenas neque dui, pharetra at nibh quis, porta pulvinar dui. Pellentesque maximus nec augue ac aliquam. Nulla interdum eros at nulla pulvinar tempor.
    </p>
    <p>
      Maecenas sit amet posuere nibh. Proin interdum lacinia ante, id commodo nisi lacinia eget. Etiam turpis nibh, vehicula non libero at, rutrum commodo ipsum. In commodo mi ac tristique elementum. Vivamus condimentum accumsan nisl in scelerisque. Praesent eu luctus magna. Mauris vel viverra diam. Vivamus elementum sapien in felis vehicula interdum. Sed vel ante orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </p>
    <p>
      Curabitur ornare metus vel lacinia laoreet. Quisque at nibh eget odio luctus venenatis et nec tellus. Ut ac elit eget risus suscipit ornare. Proin eget viverra ipsum. Vivamus quis laoreet odio, a egestas mauris. Quisque tincidunt purus vel pellentesque cursus. Aliquam erat volutpat. Vivamus mollis pellentesque orci sit amet suscipit. Mauris scelerisque mi nec venenatis congue. Mauris pharetra, nisl id rutrum dapibus, nibh leo lacinia justo, elementum aliquam erat justo et erat. Vestibulum consectetur dolor eget orci facilisis, eu pellentesque quam accumsan. Etiam ac nulla in quam luctus egestas eu in ex. Nunc dignissim dui eu gravida rutrum. Vestibulum at orci sapien. In lorem turpis, rhoncus non pellentesque eu, tincidunt eu tortor.
    </p>
    <p>
      Cras vestibulum ac leo vitae blandit. Donec iaculis elit eu tincidunt aliquet. Mauris non orci at massa facilisis ultrices consectetur eget enim. Integer risus ligula, mattis a sapien non, semper rhoncus lectus. Vestibulum tincidunt neque augue, ac fringilla lacus efficitur vitae. Donec ultricies volutpat tortor, quis scelerisque elit ornare id. Proin id rhoncus ligula, quis dictum felis. Sed pellentesque felis augue, eu fermentum felis placerat finibus. Morbi rhoncus sem id nunc mollis ornare. Fusce varius, diam non sagittis suscipit, augue turpis varius eros, eget laoreet libero libero in massa. Phasellus at massa non est semper aliquam. Vestibulum tempus venenatis tortor, in finibus libero.
    </p>
    <p>
      Donec a neque dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed tristique ligula eros, nec vulputate velit sagittis at. Fusce eu sem commodo libero tristique convallis nec sed lorem. Aenean condimentum leo quis sem pharetra, vel mattis purus molestie. Nunc tempus ut nibh sit amet ultricies. Mauris hendrerit lacinia nulla, sed feugiat magna iaculis ut. Pellentesque id arcu mattis, dapibus neque eu, pulvinar erat. Etiam sed venenatis felis, id faucibus nunc. Aliquam aliquet justo laoreet, rutrum magna et, dignissim sapien.
    </p>
    <p>
      Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam fermentum sit amet enim quis blandit. Mauris sed suscipit leo, et auctor lectus. Etiam rutrum dui sagittis enim ullamcorper placerat. In vehicula ultrices magna a pretium. Fusce ullamcorper egestas eleifend. Ut faucibus rhoncus lorem, eget euismod felis semper vel. Donec libero ex, eleifend ac lorem id, pellentesque pellentesque quam. Suspendisse imperdiet purus posuere lacus aliquam sodales. Proin interdum erat ac ex porta, ac vestibulum lectus consequat. Duis ut mattis nulla. Aliquam erat volutpat.
    </p>
    <p>
      Proin interdum aliquet odio ac congue. Donec vitae sapien quis ligula viverra consequat. Donec maximus quam sit amet ligula mattis, a egestas erat pharetra. Mauris pretium viverra lorem id tincidunt. Nam cursus tortor id eleifend vestibulum. Quisque id enim ut justo pharetra sagittis nec in tortor. Sed quam risus, pellentesque suscipit hendrerit in, tincidunt id diam. Maecenas sed mattis diam. Ut vitae maximus lectus. Aliquam vestibulum semper auctor. Sed malesuada luctus enim ut rhoncus. Integer in nulla neque. Sed vulputate arcu a ex placerat eleifend. Proin non nisl pretium, sodales justo in, rhoncus turpis. Praesent luctus sem odio, at pretium nulla dictum vel.
    </p>
    <template #actions>
      <button>Foo</button>
      <button>Baz</button>
      <button @click="showDialog = false">Close</button>
    </template>
  </ModalDialog>
</template>
<style lang="scss">
@import 'normalize.css';

body {
  font-family: -apple-system, 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: 'liga', 'kern';
}

// body {
//   font-size: 14px;
//   line-height: 1.33333;
//   font-family: Source Sans Pro, Trebuchet MS, sans-serif;
// }

// .btn {
//   padding: 0.4rem 0.8rem;
//   font-size: 0.85rem;
//   line-height: 1.33333;

//   margin-bottom: 0;
//   font-family: 'Source Sans Pro', 'Trebuchet MS', sans-serif;
//   font-weight: 600;
//   text-align: center;
//   text-transform: uppercase;
//   letter-spacing: 0.015em;
//   word-spacing: 0.05em;
//   vertical-align: middle;
//   touch-action: manipulation;

//   border: none;
//   border-radius: 3px;
//   white-space: nowrap;
// }

// .btn-default {
//   background: #96b9c9;
//   color: #fff;

//   &:hover {
//     background: #74a3b8;
//   }
// }

// .btn-primary {
//   background: #3f65ea;
//   color: #fff;

//   &:hover {
//     background: #1844de;
//   }
// }

// :root {
//   --dialog-animation: 0;
//   --dialog-border: none;
//   --dialog-border-radius: 5px;
//   --dialog-box-shadow: 1px 1px 10px 0 rgb(0 0 0 / 38%);
//   --dialog-overlay-bg-color: rgba(19, 50, 75, 0.6);
//   --dialog-padding: 1.33333em;
//   --dialog-width: 520px;
//   --dialog-confirmation-width: 520px;
// }

// .dialog {
//   .dialog-close {
//     background: #13324b;
//     color: #fff;
//     border-radius: 50%;
//     position: absolute;
//     font-size: 18px;
//     top: -9px;
//     left: -9px;
//   }
//   .dialog-header {
//     padding: calc(var(--dialog-padding) / 2) var(--dialog-padding);
//     border-bottom: 1px solid #dbe3eb;
//     .dialog-title {
//       font-size: 1.4rem;
//       font-weight: 600;
//     }
//   }
//   .dialog-actions {
//     border-top: 1px solid #dbe3eb;
//     padding: calc(var(--dialog-padding) / 2) var(--dialog-padding);
//   }
// }
</style>
