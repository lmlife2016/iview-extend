import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import sinon from 'sinon';
import '../utils';
import iveContextmenu from '../../src/components/ive-contextmenu.vue';

describe('ive-contextmenu.vue', () => {
  let wrapper;
  const spy = sinon.spy();
  const options = [
    { name: '选项一', onClick: spy },
    { name: '选项二' },
    { name: '选项三' },
  ];
  beforeEach(() => {
    wrapper = mount(iveContextmenu, {
      propsData: {
        options,
      },
    });
  });
  afterEach(() => {
    wrapper = null;
  });
  it('renders the correct markup', () => {
    expect(wrapper.element.style.display).to.equal('none');
    expect(wrapper.classes()).to.eql(['v-context', 'ive-contextmenu']);
    const menuItems = wrapper.findAll('li');
    expect(menuItems.length).to.equal(3);
    expect(menuItems.at(0).find('a').text()).to.equal('选项一');
    expect(menuItems.at(1).find('a').text()).to.equal('选项二');
    expect(menuItems.at(2).find('a').text()).to.equal('选项三');
  });
  describe('check methods', () => {
    it('open', async () => {
      wrapper.vm.open(new MouseEvent('contextmenu', { clientX: 10, clientY: 20 }), { test: 1 });
      await wrapper.vm.$nextTick();
      const { display, top, left } = wrapper.element.style;
      expect(display).to.equal('');
      expect(top).to.equal('20px');
      expect(left).to.equal('10px');
    });
    it('onClick', async () => {
      const data = { test: 1 };
      wrapper.vm.open(new MouseEvent('contextmenu', { clientX: 10, clientY: 20 }), data);
      await wrapper.vm.$nextTick();
      // branch1 options.onClick
      const menuItems = wrapper.findAll('li');
      menuItems.at(0).find('a').trigger('click');
      expect(spy.calledOnceWith(data, 0));
      // branch2 $emit('click')
      wrapper.vm.open(new MouseEvent('contextmenu'), data);
      menuItems.at(1).find('a').trigger('click');
      const emittedClick = wrapper.emitted().click;
      expect(emittedClick.length).to.equal(1);
      expect(emittedClick[0][0]).to.eql(data);
      expect(wrapper.emitted().click[0][1]).to.eql(1);
      expect(wrapper.emitted().click[0][2]).to.eql(options[1]);
    });
  });
});
