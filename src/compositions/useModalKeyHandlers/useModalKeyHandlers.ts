import { useEventListener } from '@vueuse/core';
import { watch, Ref } from 'vue';

export enum KeyCode {
  Enter = 'Enter',
  Escape = 'Escape',
  NumpadEnter = 'NumpadEnter',
}

type EventHandlers = Partial<Record<KeyCode, EventHandler>>;

type EventHandler = (event: KeyboardEvent) => void;

const modals: EventHandlers[] = [];

function callEventHandler(event: KeyboardEvent, keyCode: KeyCode, ...altCodes: string[]) {
  if (event.code === keyCode || altCodes.includes(event.code)) {
    event.stopPropagation();
    const eventHandlers = modals[modals.length - 1];
    eventHandlers[keyCode]?.(event);
  }
}

export function useModalKeyHandlers(instance: Ref, eventHandlers: EventHandlers) {
  watch(
    instance,
    (isVisible) => {
      if (isVisible) {
        modals.push(eventHandlers);
      } else {
        const index = modals.indexOf(eventHandlers);
        if (index > -1) {
          modals.splice(index, 1);
        }
      }
    },
    { immediate: true },
  );
}

function eventHandler(event: KeyboardEvent) {
  if (modals.length === 0) {
    return;
  }
  callEventHandler(event, KeyCode.Enter, KeyCode.NumpadEnter);
  callEventHandler(event, KeyCode.Escape);
}

useEventListener(document, 'keydown', eventHandler);
