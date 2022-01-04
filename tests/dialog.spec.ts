import { mount } from '@vue/test-utils';

import { ModalDialog } from '@/components';

describe('ModalDialog', () => {
  const wrapper = mount(ModalDialog);
  it('renders', () => {
    expect(wrapper.html()).toMatchInlineSnapshot();
  });
});
